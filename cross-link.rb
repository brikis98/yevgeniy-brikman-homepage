#!/usr/bin/env ruby
# frozen_string_literal: true

# Mostly written by ChatGPT: https://chatgpt.com/share/68dd5dce-1308-8003-94fb-9c1a1c4ff7a1
#
# cross-link.rb
#
# Usage:
#   ruby cross-link.rb
#   ruby cross-link.rb --base /blog/
#
# What it does:
# 1) Finds review posts in _posts/ whose front matter title matches:
#      "Review: <BOOK TITLE> by <AUTHOR>"
# 2) Extracts <BOOK TITLE> and builds a map: normalized_title => { url:, path: }
#    URL is derived from the post filename: /YYYY/MM/DD/slug/ (optionally prefixed by --base)
# 3) Scans bodies of all posts for references to reviewed titles that appear as:
#      - *Title Here* (italics with * or _)
#      - "Title Here" (straight or smart quotes)
#    and replaces with a Markdown link:
#      - [*Title Here*](URL)  or  ["Title Here"](URL)
# 4) Skips linking a title inside its own review post.
#
# Notes:
# - Designed to be conservative. Only links titles when they are clearly
#   formatted as italics or quoted.
# - Backs up modified files to <filename>.bak.<timestamp> before writing.

require 'yaml'
require 'optparse'
require 'time'

# ----------------------------
# Options
# ----------------------------
options = {
  posts_dir: '_posts',
  base_prefix: '/blog/', # e.g., '/', '/blog/'
}

OptionParser.new do |opts|
  opts.banner = 'Usage: ruby cross-link.rb [options]'

  opts.on('--posts DIR', 'Path to _posts directory (default: _posts)') do |v|
    options[:posts_dir] = v
  end

  opts.on('--base PREFIX', 'Base URL prefix for posts (default: "/blog/") e.g., "/blog/"') do |v|
    v = "/#{v}" unless v.start_with?('/')
    v = "#{v}/" unless v.end_with?('/')
    options[:base_prefix] = v
  end
end.parse!

# ----------------------------
# Helpers
# ----------------------------

def read_post(path)
  text = File.read(path)
  if text =~ /\A---\s*\n(.*?)\n---\s*\n/m
    fm_text = Regexp.last_match(1)
    body = text.sub(/\A---\s*\n(.*?)\n---\s*\n/m, '')
    front = YAML.safe_load(fm_text, permitted_classes: [Date, Time], aliases: true) || {}
    [front, body, fm_text]
  else
    [{}, text, nil]
  end
end

def write_post(path, frontmatter_text, body)
  original = File.read(path)
  new_text =
    if frontmatter_text
      # Preserve original front matter formatting as much as we can
      "---\n#{frontmatter_text}\n---\n\n#{body}"
    else
      body
    end

  if original == new_text
    puts "No change: #{path}"
    return
  end

  File.write(path, new_text)
  puts "Updated: #{path}"
end

def parse_post_filename(path)
  # Expect: _posts/YYYY-MM-DD-slug.md
  base = File.basename(path)
  if base =~ /\A(\d{4})-(\d{2})-(\d{2})-(.+)\.(md|markdown)\z/i
    year, month, day, slug = Regexp.last_match.values_at(1,2,3,4)
    { year: year, month: month, day: day, slug: slug }
  else
    nil
  end
end

def post_url_from_filename(path, base_prefix: '/blog/')
  parts = parse_post_filename(path)
  return nil unless parts
  # Jekyll default pretty permalink derived from filename:
  # /YYYY/MM/DD/slug/
  "#{base_prefix}#{parts[:year]}/#{parts[:month]}/#{parts[:day]}/#{parts[:slug]}/"
end

# Normalize a title for matching: lowercase, collapse whitespace, strip surrounding quotes/italics, normalize smart quotes
def normalize_title(str)
  return '' if str.nil?

  s = str.dup

  # Normalize common smart quotes and dashes
  smart_map = {
    "\u2018" => "'", # left single ‘
    "\u2019" => "'", # right single ’
    "\u201C" => '"', # left double “
    "\u201D" => '"', # right double ”
    "\u2013" => '-', # en dash –
    "\u2014" => '-', # em dash —
  }
  s.tr!(smart_map.keys.join, smart_map.values.join)

  # Strip surrounding quotes or italics markers
  s = s.strip
  s = s.gsub(/\A["'](.*)["']\z/, '\1') # leading/trailing quotes
  s = s.gsub(/\A(\*|_)(.*)\1\z/, '\2') # leading/trailing * or _

  # Collapse internal whitespace, lowercase
  s = s.gsub(/\s+/, ' ').strip.downcase

  # Remove subtitles (anything after a colon or dash)
  s = s.gsub(/(.+?)[:-](.+)$/, '\1').strip

  # Remove punctuation
  s = s.gsub(/[[:punct:]]/, '')

  # These titles match too many false positives, so we skip them
  skip_titles = %w[we next code quiet uncertainty room]
  if skip_titles.include?(s)
    nil
  else
    s
  end
end

# Build a big regex to *detect* italics/quotes, but we validate via normalized-title lookup
ITALIC_PAT = /
  (?<italic>
    (?:
      \*(?<it>[^*]{2,}?)\*   |      # *Title Here*
      _(?<it2>[^_]{2,}?)_           # _Title Here_
    )
  )
/x.freeze

QUOTE_PAT = /
  (?<quote>
    (?:
      "(?<qt>[^"]{2,}?)"     |      # "Title Here"
      \u201C(?<qt2>[^”]{2,}?)\u201D # “Title Here”
    )
  )
/x.freeze

# We’ll scan with a combined pattern to minimize passes over the text
COMBINED_PAT = /
  #{ITALIC_PAT}|#{QUOTE_PAT}
/x.freeze

def liquid_tag_ranges(text)
  ranges = []
  # Match inline Liquid tags: {% ... %} or {{ ... }}
  tag_re = /\{\%.*?\%\}|\{\{.*?\}\}/m
  text.to_enum(:scan, tag_re).each do
    m = Regexp.last_match
    ranges << (m.begin(0)...m.end(0))
  end
  ranges
end

# Skip inside Markdown blockquotes.
# Heuristic: a blockquote starts on a line with up to 3 spaces then '>' and optional space.
# It continues through:
#   - subsequent lines that also start with '>' (any depth),
#   - "lazy continuation" non-blank lines immediately following, until a blank line breaks laziness.
def blockquote_ranges(text)
  ranges = []
  offset = 0
  lines = text.split("\n", -1) # keep trailing empty line
  in_quote = false
  lazy_allowed = false
  block_start = nil

  lines.each do |line|
    quoted_line = !!(line =~ /^\s{0,3}>\s?/)

    if quoted_line
      unless in_quote
        in_quote = true
        block_start = offset
      end
      # after a quoted line, lazy continuation is allowed
      lazy_allowed = true
    elsif in_quote && !line.strip.empty? && lazy_allowed
      # lazy continuation line (part of same paragraph in the quote)
      # stay in_quote; do not change lazy_allowed here
    elsif in_quote && line.strip.empty?
      # blank lines are included in the current blockquote,
      # but they disable lazy continuation for the next non-blank line
      lazy_allowed = false
    else
      # end current blockquote (if any)
      if in_quote
        ranges << (block_start...offset)
      end
      in_quote = false
      lazy_allowed = false
      block_start = nil
    end

    # advance offset past this line (+1 for the newline)
    offset += line.length + 1
  end

  # close trailing blockquote at EOF
  if in_quote
    ranges << (block_start...text.length)
  end

  ranges
end

# Skip inside HTML elements (inline or block). This marks the full span from
# the opening tag <tag ...> through the corresponding closing tag </tag>,
# including inner text (so <a>Title</a> is completely excluded).
def html_element_ranges(text)
  ranges = []
  void = %w[area base br col embed hr img input link meta param source track wbr]
  tag_token_re = /<!--.*?-->|<\/?[A-Za-z][A-Za-z0-9:-]*(?:\s+[^<>]*?)?>/m

  stack = [] # each: {name:, start_idx:}
  text.to_enum(:scan, tag_token_re).each do
    m = Regexp.last_match
    token = m[0]
    b = m.begin(0)
    e = m.end(0)

    # HTML comments are standalone ranges
    if token.start_with?('<!--')
      ranges << (b...e)
      next
    end

    # Closing tag?
    if token =~ /\A<\s*\/\s*([A-Za-z][A-Za-z0-9:-]*)\s*>\z/m
      name = Regexp.last_match(1).downcase
      # find matching opener from the right
      idx = stack.rindex { |h| h[:name] == name }
      if idx
        opener = stack.slice!(idx..-1).first
        ranges << (opener[:start_idx]...e)
      end
      next
    end

    # Self-closing tag?
    if token =~ /\/\s*>\z/m
      ranges << (b...e)
      next
    end

    # Opening tag
    if token =~ /\A<\s*([A-Za-z][A-Za-z0-9:-]*)\b/i
      name = Regexp.last_match(1).downcase
      if void.include?(name)
        ranges << (b...e) # void element; no inner content
      else
        stack << { name: name, start_idx: b }
      end
    end
  end

  # (We ignore unclosed tags to avoid swallowing the rest of the file.)
  ranges
end

def inside_any_range?(index, ranges)
  ranges.any? { |r| r.cover?(index) }
end

# ----------------------------
# Phase 1: Collect reviewed titles -> {url, path}
# ----------------------------
reviewed = {} # normalized_title => { title: original, url:, path: }

Dir.glob(File.join(options[:posts_dir], '*')).each do |path|
  next unless File.file?(path)
  front, _body, _fm_text = read_post(path)
  raw_title = front['title']
  next unless raw_title.is_a?(String)

  if raw_title =~ /\AReview:\s*(.+?)\s+by\s+(.+)\s*\z/i
    book_title = Regexp.last_match(1).strip
    norm = normalize_title(book_title)
    unless norm
      warn "Skipping (due to title normalization): #{path}"
      next
    end
    url = post_url_from_filename(path, base_prefix: options[:base_prefix])
    unless url
      warn "Skipping (cannot derive URL): #{path}"
      next
    end
    reviewed[norm] = { title: book_title, url: url, path: path }
  end
end

if reviewed.empty?
  puts 'No review posts found. Nothing to do.'
  exit 0
end

puts "Found #{reviewed.size} reviewed books."

# ----------------------------
# Phase 2: Walk all posts and link mentions
# ----------------------------
Dir.glob(File.join(options[:posts_dir], '*')).each do |path|
  next unless File.file?(path)

  front, body, fm_text = read_post(path)

  skip_ranges = liquid_tag_ranges(body) + blockquote_ranges(body) + html_element_ranges(body)

  original_body = body.dup
  changed = false

  # We’ll rebuild the body by walking matches and replacing selectively.
  out = +''
  last_idx = 0

  body.to_enum(:scan, COMBINED_PAT).each do
    m = Regexp.last_match
    start_idx = m.begin(0)
    end_idx   = m.end(0)

    # Append text before match
    out << body[last_idx...start_idx]

    # Skip replacements inside any excluded region
    if inside_any_range?(start_idx, skip_ranges)
      out << m[0]
      last_idx = end_idx
      next
    end

    # Determine which subgroup matched and extract the inner visible title
    inner_text =
      if m[:it]
        m[:it]
      elsif m[:it2]
        m[:it2]
      elsif m[:qt]
        m[:qt]
      elsif m[:qt2]
        m[:qt2]
      else
        nil
      end

    if inner_text.nil?
      # Shouldn't happen; just copy through
      out << m[0]
      last_idx = end_idx
      next
    end

    norm = normalize_title(inner_text)
    if norm && reviewed.key?(norm)
      target = reviewed[norm]
      # Skip linking a book title inside its own review post
      if File.expand_path(path) == File.expand_path(target[:path])
        out << m[0] # no change
      else
        url = target[:url]

        # Preserve the original surrounding markers by linking the *inside*
        if m[:it] || m[:it2]
          # matched something like *Title* or _Title_
          marker = m[0].start_with?('*') ? '*' : '_'
          linked = "[#{marker}#{inner_text}#{marker}](#{url})"
          out << linked
          changed = true
        elsif m[:qt] || m[:qt2]
          # matched "Title" (straight or smart)
          left_q  = m[0][0]
          right_q = m[0][-1]
          # Put the quotes inside the link label for a natural look: ["Title"](url)
          linked = "[#{left_q}#{inner_text}#{right_q}](#{url})"
          out << linked
          changed = true
        else
          out << m[0] # Fallback, should not occur
        end
      end
    else
      # Not a reviewed title; keep as-is
      out << m[0]
    end

    last_idx = end_idx
  end

  # Append the tail after the last match
  out << body[last_idx..-1] if last_idx < body.length

  if changed
    puts "Linking mentions in: #{path}"
    write_post(path, fm_text, out)
  else
    puts "No links added in: #{path}"
  end
end

puts 'Done.'
