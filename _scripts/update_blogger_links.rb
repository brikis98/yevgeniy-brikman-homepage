FILES_TO_CONVERT_GLOB = "_posts/*.md"
FRONT_MATTER = "---"
EXPECTED_FRONT_MATTER_COUNT = 2
BLOGGER_ORIG_PATTERN = /^blogger_orig_url: (.+?)\s/
YBRIKMAN_DOMAIN = "http://www.ybrikman.com/writing"

files = Dir[FILES_TO_CONVERT_GLOB]

def convert_jekyll_file_to_ybrikman_url(file_name)
  base_name = File.basename(file_name, '.*')
  path = base_name[0..3] + "/" + base_name[5..6] + "/" + base_name[8..9] + "/" + base_name[11..-1]
  "#{YBRIKMAN_DOMAIN}/#{path}/"
end

blogger_urls = []
files.each do |file|
  content = IO.read(file)
  content.each_line do |line|
    match = line.match(BLOGGER_ORIG_PATTERN)
    if match
      blogger_url = match[1]
      ybrikman_url = convert_jekyll_file_to_ybrikman_url(file)
      
      blogger_urls.push({:blogger_url => blogger_url, :ybrikman_url => ybrikman_url})
      break
    end
  end
end

def fix_blogger_urls(line, blogger_urls)
  blogger_urls.reduce(line) { |prev_content, urls| prev_content.gsub(urls[:blogger_url], urls[:ybrikman_url]) }
end

files.each do |file|
  front_matter_count = 0
  out = ""
  IO.read(file).each_line do |line|
    next_line = line
    if front_matter_count >= EXPECTED_FRONT_MATTER_COUNT
      next_line = fix_blogger_urls(line, blogger_urls)
    elsif line.start_with? FRONT_MATTER
      front_matter_count = front_matter_count + 1
    end
    out = out + next_line
  end

  IO.write(file, out)
end
