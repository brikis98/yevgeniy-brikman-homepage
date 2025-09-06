#!/usr/bin/env ruby
# frozen_string_literal: true

# Goodreads CSV -> Markdown generator
#
# Usage:
#   ruby goodreads_to_md.rb path/to/goodreads_library_export.csv markdown_output_dir/ images_output_dir/
#
# Env vars (required for Amazon Product Advertising API):
#   AMAZON_PARTNER_TAG, AMAZON_ACCESS_KEY, AMAZON_SECRET_KEY
#   AMAZON_MARKETPLACE (e.g., "www.amazon.com")
#   AMAZON_HOST        (e.g., "webservices.amazon.com")
#   AMAZON_REGION      (e.g., "us-east-1")
#
# What it does:
#   - For each row in the CSV, create: output_dir/YYYY-MM-DD-<dasherized-title>.md
#   - Try Amazon PA-API v5 to get:
#       * Affiliate DetailPageURL (with your PartnerTag)
#       * Primary image URL (cover)
#       * Category/BrowseNode names (for tags)
#   - Fall back to Open Library / Google Books if necessary
#   - Download a cover image into images_output_dir/<dasherized-title>.<ext>
#   - Resize cover to max 600x600 (preserving aspect)
#   - Gather tags
#
# Notes:
#   - Expects Goodreads CSV headers typical of exports:
#       "Title","Author","My Rating","Date Read","Date Added","My Review","ISBN","ISBN13","Bookshelves"
#   - Skips rows with no Title.
#   - If "Date Read" is missing, falls back to "Date Added"; if still missing, uses today's date.
#
# Dependencies:
#   gem install mini_magick reverse_markdown nokogiri ffi vacuum
#   ImageMagick must be installed on your system.

require "csv"
require "json"
require "net/http"
require "uri"
require "fileutils"
require "date"
require "mini_magick"
require 'open-uri'
require "reverse_markdown"
require "vacuum"

# --------------- Config ---------------

AMZ_PARTNER_TAG = ENV.fetch("AMAZON_PARTNER_TAG")
AMZ_ACCESS_KEY  = ENV.fetch("AMAZON_ACCESS_KEY")
AMZ_SECRET_KEY  = ENV.fetch("AMAZON_SECRET_KEY")
AMZ_MARKETPLACE = ENV.fetch("AMAZON_MARKETPLACE", "US")

# --------------- Helpers ---------------

def dasherize(str)
  str.to_s
     .downcase
     .gsub(/[’'`]/, "")           # drop apostrophes
     .gsub(/[^a-z0-9]+/, "-")     # non-alnum -> dash
     .gsub(/^-+|-+$/, "")         # trim leading/trailing dashes
end

def parse_date(str)
  return nil if str.nil? || str.strip.empty?
  # Goodreads often uses "YYYY/MM/DD" or "MM/DD/YYYY" (varies by export)
  # Try a few formats, then ISO, then Date.parse
  candidates = [
    "%Y/%m/%d", "%m/%d/%Y", "%d/%m/%Y",
    "%Y-%m-%d", "%d-%m-%Y"
  ]
  candidates.each do |fmt|
    begin
      return Date.strptime(str.strip, fmt)
    rescue ArgumentError
      next
    end
  end
  Date.parse(str.strip) rescue nil
end

def date_for_row(row)
  d = parse_date(row["Date Read"])
  d ||= parse_date(row["Date Added"])
  d ||= Date.today
  d
end

def http_get_json(url)
  open(url) do |res|
    return JSON.parse(res.read)
  end
end

def download_file(url, file_path)
  if File.exist?(file_path)
    puts "File '#{file_path}' already exists, will not download again"
    return
  end

  puts "Downloading #{url} to #{file_path}"
  download = open(url)
  IO.copy_stream(download, file_path)
end

def ensure_dir(path)
  FileUtils.mkdir_p(path) unless Dir.exist?(path)
end

# ---------------- Tag extraction / cover lookup ----------------

def guess_fictionality(tags)
  # Based on top-level categories here: https://www.amazon.com/best-sellers-books-Amazon/zgbs/books/ref=zg_bs_nav_books_0
  fiction_keywords = %w[
    fiction
    children
    comics
    humor
    literature
    mystery
    romance
    thriller
    suspense
    fantasy
    teen
    young
  ]
  nonfiction_keywords = %w[
    nonfiction
    arts
    crafts
    photography
    biographies
    memoirs
    business
    money
    computers
    technology
    cookbooks
    calendars
    education
    engineering
    languages
    health
    fitness
    history
    law
    medical
    parenting
    politics
    reference
    religion
    science
    math
    self-help
    sports
    travel
    textbooks
    test
  ]

  text = (tags || []).map(&:downcase).join(" | ")
  return "nonfiction" if nonfiction_keywords.any?{ |word| text.include?(word) }
  return "fiction" if fiction_keywords.any?{ |word| text.include?(word) }
  raise Exception.new("Could not classify tags as fiction or nonfiction: #{tags}")
end

def normalize_tag(tag)
  t = tag.to_s.downcase.strip
  t = t.gsub(/[^\p{Alnum}\s\-\/\+&]/, "") # keep simple punctuation for compound tags
  t = t.gsub(/\s+/, " ")
  t
end

def top_specific_tags_from_open_library(subjects)
  return [] if !subjects || subjects.empty?
  subjects = subjects.map { |s| normalize_tag(s) }
  # Keep concise, specific subjects; drop super generic noise
  drop = %w[accessible book lists protected daisy overdrive internet archive wishes bestseller ( : = , books]
  filtered = subjects.reject { |s| drop.include?(s) || s.length < 3  || s.length > 20 }
  # Prefer a few most specific-looking items (longer strings)
  filtered.sort_by { |s| -s.length }.first(6)
end

def tags_from_google_books(categories)
  return [] unless categories && !categories.empty?
  categories.map { |c| normalize_tag(c) }
end

def merge_and_infer_tags(ol_subjects, gb_categories, title:, rating:)
  tags = []

  # Fiction vs Nonfiction inference
  f = guess_fictionality(ol_subjects) || guess_fictionality(gb_categories) || guess_fictionality(tags)
  tags << f if f

  tags << "#{rating}-stars"

  tags += top_specific_tags_from_open_library(ol_subjects)
  tags += tags_from_google_books(gb_categories)

  # Clean up & dedupe & take at most 5 tags
  tags = tags.compact.map { |t| normalize_tag(t) }.reject(&:empty?).take(5)
  tags.uniq
end

# ---------------- Amazon PA-API v5 ----------------

class PaapiClient
  def initialize(access_key:, secret_key:, partner_tag:, marketplace:)
    @vacuum_client = Vacuum.new(marketplace: marketplace,
                                access_key: access_key,
                                secret_key: secret_key,
                                partner_tag: partner_tag)
  end

  # Returns: { asin:, title:, image_url:, detail_url:, categories: [] } or nil
  def find_book(title:, author: nil, isbn: nil)
    resources = [
      "Images.Primary.Small",
      "Images.Primary.Medium",
      "Images.Primary.Large",
      "ItemInfo.Title",
      "ItemInfo.ByLineInfo",
      "BrowseNodeInfo.BrowseNodes",
      "BrowseNodeInfo.BrowseNodes.Ancestor"
    ]

    # I originally searched by including the ISBN in the keywords, but for some reason, this finds the books less
    # effectively than searching by author and title
    # keywords = [isbn, title, author].compact.join(" ")

    puts "Doing Amazon search for title '#{title}' and author '#{author}'"

    response = @vacuum_client.search_items(resources: resources, search_index: "Books", title: title, author: author)

    item, categories = first_bookish_item(response)

    raise Exception.new("Failed to find a bookish item in response: #{response.to_h}") unless item

    asin        = item.dig("ASIN")
    detail_url  = item.dig("DetailPageURL")
    image_url   = item.dig("Images", "Primary", "Large", "URL") ||
                  item.dig("Images", "Primary", "Medium", "URL") ||
                  item.dig("Images", "Primary", "Small", "URL")
    ititle      = item.dig("ItemInfo", "Title", "DisplayValue")

    { asin: asin, title: ititle, image_url: image_url, detail_url: detail_url, categories: categories }
  end

  private

  # Look for books with at least 3 categories. Fewer than that is some sort of weird item, like a book collection.
  def first_bookish_item(response)
    items = response.dig("SearchResult", "Items") || []
    items.each do |item|
      categories = extract_browse_nodes(item)
      if categories.size >= 3
        return [item, categories]
      end
    end
    nil
  end

  def extract_browse_nodes(item)
    nodes = (item.dig("BrowseNodeInfo", "BrowseNodes") || [])
    names = []
    nodes.each do |n|
      names << n.dig("ContextFreeName")
      # Walk ancestors for hierarchical tags
      anc = n["Ancestor"]
      while anc
        names << anc["ContextFreeName"]
        anc = anc["Ancestor"]
      end
    end
    names.compact.uniq
  end
end

# ----- Open Library -----
# Search order:
#   1) ISBN13 / ISBN if present
#   2) title + author
# Get subjects & cover

def open_library_by_isbn(isbn)
  return nil if isbn.nil? || isbn.strip.empty?
  isbn = isbn.gsub(/[^0-9xX]/, "")
  url = "https://openlibrary.org/isbn/#{isbn}.json"
  data = http_get_json(url)
  return nil unless data
  # Work subjects usually live on the work record; follow "works" link if present
  works = data["works"]
  work_subjects = []
  if works && works.first && works.first["key"]
    work = http_get_json("https://openlibrary.org#{works.first["key"]}.json")
    work_subjects = work && work["subjects"] ? work["subjects"] : []
  end

  cover_id = data["covers"]&.first
  cover_url = cover_id ? "https://covers.openlibrary.org/b/id/#{cover_id}-L.jpg" : nil
  {
    source: :open_library,
    subjects: work_subjects || [],
    cover_url: cover_url
  }
end

def open_library_by_query(title:, author:)
  return nil if title.to_s.strip.empty?
  q = URI.encode_www_form_component(title.to_s)
  a = URI.encode_www_form_component(author.to_s) unless author.to_s.strip.empty?
  url = "https://openlibrary.org/search.json?title=#{q}"
  url += "&author=#{a}" if a
  data = http_get_json(url)
  return nil unless data && data["docs"] && !data["docs"].empty?
  best = data["docs"].first
  # Try work key for richer subjects
  subjects = best["subject"] || []
  cover_id = best["cover_i"]
  cover_url = cover_id ? "https://covers.openlibrary.org/b/id/#{cover_id}-L.jpg" : nil
  {
    source: :open_library,
    subjects: subjects || [],
    cover_url: cover_url
  }
end

# ----- Google Books (fallback) -----

def google_books_search(title:, author:, isbn:)
  q_parts = []
  if isbn.to_s.strip.empty?
    q_parts << "intitle:#{title}" unless title.to_s.strip.empty?
    q_parts << "inauthor:#{author}" unless author.to_s.strip.empty?
  else
    q_parts << "isbn:#{isbn}"
  end
  return nil if q_parts.empty?
  q = URI.encode_www_form_component(q_parts.join(" "))
  url = "https://www.googleapis.com/books/v1/volumes?q=#{q}&maxResults=1"
  data = http_get_json(url)
  return nil unless data && data["items"] && !data["items"].empty?
  info = data["items"][0]["volumeInfo"] || {}
  categories = info["categories"] || []
  image_links = info["imageLinks"] || {}
  # Prefer higher-res if available
  cover_url = image_links["extraLarge"] || image_links["large"] || image_links["medium"] || image_links["thumbnail"] || image_links["smallThumbnail"]
  # Upgrade Google thumbnails (http -> https, zoom param tricks)
  cover_url = cover_url&.gsub(/^http:/, "https:")
  { source: :google_books, categories: categories, cover_url: cover_url }
end

def pick_primary_category(tags)
  # Based on top-level categories here: https://www.amazon.com/best-sellers-books-Amazon/zgbs/books/ref=zg_bs_nav_books_0
  # - I drill down into subcategories where I want more specific tags
  # - The sort order here matters. Items nearer the top will be selected before those towards the bottom.
  preferred_category_keywords = [
    # I read a lot of these
    "science fiction & fantasy",
    "mystery, thriller & suspense",

    # A few more specific subcategories, as I read a lot of books here
    "databases & big data",
    "networking & cloud computing",
    "programming",
    "computer security & encryption",
    "web development & design",
    "computers & technology",

    # I also read a lot of these
    "business & money",
    "health, fitness & dieting",
    "sports & outdoors",
    "history",

    # Everything else
    "arts & photography",
    "biographies & memoirs",
    "comics & graphic novels",
    "cookbooks, food & wine",
    "crafts, hobbies & home",
    "education & teaching",
    "engineering & transportation",
    "humor & entertainment",
    "law",
    "lesbian, gay, bisexual & transgender books",
    "libros en español",
    "literature & fiction",
    "medical books",
    "new, used & rental textbooks",
    "parenting & relationships",
    "politics & social sciences",
    "reference",
    "religion & spirituality",
    "romance",
    "science & math",
    "self-help",
    "teens",
    "test preparation",
    "travel"
  ]

  text = (tags || []).map(&:downcase).join(" | ")
  category = preferred_category_keywords.find { |category| text.include?(category) }
  raise Exception.new("Could not find primary category in tags: #{tags}") unless category
  category
end

# I want three tags for every book:
#
# - fiction or nonfiction
# - n-stars, where n is the rating
# - category such as "thriller" or "business" or "programming"
def normalize_tags(tags, rating)
  fictionality_tag = guess_fictionality(tags)
  rating_tag = "#{rating}-stars"
  category_tag = pick_primary_category(tags)

  [fictionality_tag, rating_tag, category_tag]
end

def fetch_tags_and_cover_and_affiliate(paapi:, title:, author:, isbn:, isbn13:, rating:)
  attempts = 0
  max_attempts = 3

  begin
    attempts += 1
    found = paapi.find_book(title: title, author: author, isbn: (isbn13.empty? ? isbn : isbn13))
    affiliate_url = found[:detail_url] # already includes your PartnerTag
    cover_url = found[:image_url]
    amazon_tags = normalize_tags(found[:categories] || [], rating)
    return [amazon_tags, cover_url, affiliate_url]
  rescue => e
    puts "Amazon lookup failed for '#{title}': #{e}"
    if attempts < max_attempts
      sleep_sec = 3
      puts "Sleeping for #{sleep_sec} seconds and will try again"
      sleep(sleep_sec)
      retry
    else
      raise Exception.new("Failed to look up title '#{title}' on Amazon, even after #{attempts} attempts.")
    end
  end


  # TODO: put back Open Library and Google Books fallback?
  #
  # # ---------- Fall back to Open Library and Google Books ----------
  # ol = open_library_by_isbn(isbn13) || open_library_by_isbn(isbn) || open_library_by_query(title: title, author: author)
  # gb = google_books_search(title: nil, author: nil, isbn: isbn13 || isbn) || google_books_search(title: title, author: author, isbn: nil)
  #
  # puts "Open Library result for '#{title}':"
  # puts ol.inspect
  # puts "Google Books result for '#{title}':"
  # puts gb.inspect
  #
  # subjects = ol ? ol[:subjects] : []
  # categories = gb ? gb[:categories] : []
  # cover_url = (ol && ol[:cover_url]) || (gb && gb[:cover_url])
  #
  # tags = merge_and_infer_tags(subjects, categories, title: title, rating: rating)
  # [tags, cover_url, nil]
end

def file_extension_from_url(url)
  return "jpg" if url.end_with?("jpeg") || url.end_with?("jpg") || url.include?("books.google.com")
  return "png" if url.end_with?("png")
  return "gif" if url.end_with?("gif")
  return "bmp" if url.end_with?("bmp")
  return "webp" if url.end_with?("webp")
  raise Exception.new("Could not figure out extension for url '#{url}'")
end

def download_and_resize_cover(cover_url, images_dir, base_name)
  return nil if cover_url.nil? || cover_url.strip.empty?
  ext = file_extension_from_url(cover_url)
  dest = File.join(images_dir, "#{base_name}.#{ext}")
  download_file(cover_url, dest)

  # Resize to max 600x600, keep aspect, don't upscale
  image = MiniMagick::Image.open(dest)
  image.resize "600x600>"
  image.write dest

  dest
end

def yaml_escape(s)
  # Quote and escape double quotes for YAML
  '"' + s.to_s.gsub('"', '\"') + '"'
end

def yaml_array(arr)
  # Render as YAML inline list: ["a", "b"]
  items = arr.map { |t| yaml_escape(t) }.join(", ")
  "[#{items}]"
end

def preprocess_review_html(html)
  return "" if html.nil? || html.strip.empty?
  s = html.dup
  # Drop unsafe/script/style just in case
  s.gsub!(/<script.*?>.*?<\/script>/mi, "")
  s.gsub!(/<style.*?>.*?<\/style>/mi, "")
  s
end

def html_to_markdown(html)
  cleaned = preprocess_review_html(html)
  # Convert with GitHub-flavored Markdown; bypass unknown tags as plain text
  ReverseMarkdown.convert(cleaned,
                          unknown_tags: :bypass,
                          github_flavored: true,
                          tag_border: ""
  ).strip
end

# The CSV has some weird values for ISBN...
def clean_isbn(isbn)
  isbn.delete_prefix('=').delete_prefix('"').delete_suffix('"')
end

# GoodReads titles sometimes include the title of the series in the end, in parens, so we strip that out, as well as
# extra whitespace
def clean_title(title)
  title.gsub(/\(.+\)/, '').gsub(/\s+/, ' ').strip
end

# GoodReads authors sometimes include extra whitespace at the end or even in the middle, so we strip that out
def clean_author(author)
  author.gsub(/\s+/, ' ').strip
end

# --------------- Main ---------------

if ARGV.length < 3
  warn "Usage: ruby #{File.basename(__FILE__)} path/to/goodreads_library_export.csv markdown_output_dir/ images_output_dir/"
  exit 1
end

csv_path = ARGV[0]
markdown_out_dir  = ARGV[1].sub(%r{/\z}, "")
images_dir  = ARGV[2].sub(%r{/\z}, "")

unless File.file?(csv_path)
  warn "CSV not found: #{csv_path}"
  exit 1
end

ensure_dir(markdown_out_dir)
ensure_dir(images_dir)

paapi = PaapiClient.new(
  access_key:   AMZ_ACCESS_KEY,
  secret_key:   AMZ_SECRET_KEY,
  partner_tag:  AMZ_PARTNER_TAG,
  marketplace:  AMZ_MARKETPLACE
)

count = 0
max = 15

CSV.foreach(csv_path, headers: true) do |row|
  title  = clean_title((row["Title"] || ""))
  next if title.empty?

  shelf = (row["Exclusive Shelf"] || "").strip
  if shelf.empty?
    puts "Shelf not specified for title '#{title}', skipping."
    next
  end

  puts
  if shelf == "read"
    puts "Processing read book with title '#{title}'"
  else
    puts "Skipping to-read book with title '#{title}'"
    next
  end

  author = clean_author(row["Author"] || "")
  rating = (row["My Rating"] || row["Rating"] || "").to_s.strip
  review_html = (row["My Review"] || row["Review"] || "").to_s.strip
  isbn   = clean_isbn((row["ISBN"] || "").to_s.strip)
  isbn13 = clean_isbn((row["ISBN13"] || "").to_s.strip)

  date = date_for_row(row)
  yyyy = date.year
  mm   = format("%02d", date.month)
  dd   = format("%02d", date.day)

  base_slug = dasherize(title)
  date_slug = "#{yyyy}-#{mm}-#{dd}"
  md_filename = "#{date_slug}-#{base_slug}.md"
  md_path = File.join(markdown_out_dir, md_filename)

  review_md = html_to_markdown(review_html).strip
  if review_md.empty?
    review_md = "_(I did not write up a text review or notes on this book)_."
  end

  unless review_md.match(/\d(\.\d)? stars/i)
    review_md = "#{rating} stars\n\n#{review_md}"
  end

  tags, cover_url, affiliate_url = fetch_tags_and_cover_and_affiliate(paapi: paapi, title: title, author: author, isbn: isbn, isbn13: isbn13, rating: rating)

  # Download cover (if any)
  if cover_url
    img_path = download_and_resize_cover(cover_url, images_dir, base_slug)
  end

  # Build front matter
  fm_title = "Review: #{title} by #{author}"
  fm_tags  = tags.empty? ? '["book"]' : yaml_array(tags)
  fm_img   = (img_path || "").delete_prefix("assets/img/")

  front_matter = <<~YAML
    ---
    layout: post
    title: #{yaml_escape(fm_title)}
    tags: #{fm_tags}
    thumbnail_path: #{fm_img}
    header_image: #{fm_img}
    header_image_url: #{affiliate_url}
    date: #{date_slug}
    ---
  YAML

  body = front_matter + "\n" + review_md

  File.write(md_path, body)
  count += 1
  puts "Wrote #{md_path}"

  if count >= max
    puts "Hit max limit of #{max}"
    break
  end

  sleep_time_sec = 1
  puts "Sleeping for #{sleep_time_sec} before looking up next book to avoid Amazon API throttling"
  sleep(sleep_time_sec)
end

puts "Done. Generated #{count} posts in #{markdown_out_dir}"
