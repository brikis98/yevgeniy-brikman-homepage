FILES_TO_CONVERT_GLOB = "_posts/*.md"
FRONT_MATTER = "---"
EXPECTED_FRONT_MATTER_COUNT = 2
BLOGSPOT_PATTERN = 'brikis98.blogspot'

files = Dir[FILES_TO_CONVERT_GLOB]

files.each do |file|
  front_matter_count = 0
  IO.read(file).each_line do |line|
    if front_matter_count >= EXPECTED_FRONT_MATTER_COUNT
      if line.include? BLOGSPOT_PATTERN
        puts "#{file}: #{line}"
      end
    elsif line.start_with? FRONT_MATTER
      front_matter_count = front_matter_count + 1
    end
  end
end
