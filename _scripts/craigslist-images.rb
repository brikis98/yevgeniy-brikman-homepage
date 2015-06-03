# A script to fetch the thumbnails from the craigslist posts in garage-sale.yml

require 'yaml'
require 'net/http'

IMAGE_START = "class=\"slide first visible\"><img src=\""

garage_sale_items = YAML.load_file('_data/garage-sale.yml')

new_yaml = ""

garage_sale_items.each do |item|
  name = item["name"]
  url = item["url"]

  puts "[INFO] Loading #{url}"
  uri = URI(url)
  result = Net::HTTP.get(uri)
  
  img_index_start = result.index IMAGE_START
  if img_index_start
    image_start = result[(img_index_start + IMAGE_START.length)..result.length]
    img_index_end = image_start.index "\""
    if img_index_end
      image = image_start[0..(img_index_end - 1)]
      new_yaml = new_yaml + "- name: \"#{name}\"\n"
      new_yaml = new_yaml + "  url: \"#{url}\"\n"
      new_yaml = new_yaml + "  image: \"#{image}\"\n"
    else
      puts "[ERROR] Couldn't find end index for #{name}"
    end
  else
    puts "[ERROR] Couldn't find start index for #{name}"
  end
end

puts new_yaml