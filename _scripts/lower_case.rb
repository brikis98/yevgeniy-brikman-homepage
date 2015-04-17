GLOBS = ["assets/**/*.JPG", "assets/**/*.PNG"]

GLOBS.each do |glob|
  files = Dir[glob]
  puts files
  files.each do |file|
    lower_case = file.gsub(/.JPG$/, '.jpg').gsub(/.PNG$/, '.png')
    puts "Renaming #{file} to #{lower_case}"
    File.rename(file, lower_case)
  end
end