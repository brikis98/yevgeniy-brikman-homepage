# I moved my blog from /writing to /blog. This script updates all posts in the _posts folder to add a redirect_from
# entry to the front matter to redirect /writing/xxx to /blog/xxx.

# Example: 2008-01-10-new-job.md
FILE_NAME_REGEX = /(\d{4})-(\d{2})-(\d{2})-(.*?).md/

# Try to capture the closing front matter text, which usually has a blank newline after it (whereas the opening front
# matter text always has other stuff after it, like layout: xxx). Also capture a redirect_from we might have added
# in a previous run, which makes this script a bit more idempotent.
FRONT_MATTER_END_REGEX = /(redirect_from: .+\n)?(^---\s*\n\s*\n)/

posts = Dir["#{__dir__}/../_posts/*.md"]

posts.each do |post|
  post_file_name = File.basename(post)
  if match = post_file_name.match(FILE_NAME_REGEX)
    year, month, day, name = match.captures
    old_url = "/writing/#{year}/#{month}/#{day}/#{name}"
    post_contents = File.read(post)

    if post_contents.match(FRONT_MATTER_END_REGEX)
      updated_contents = post_contents.gsub(FRONT_MATTER_END_REGEX, "redirect_from:\n  - \"#{old_url}\"\n  - \"#{old_url}/\"\n\\2")

      if post_contents != updated_contents
        puts "Updating #{post_file_name}"
        File.write(post, updated_contents)
      end
    else
      puts "WARN: couldn't find closing front matter in '#{post_file_name}'"
    end
  else
    puts "WARN: file name '#{post_file_name}' did not match expected pattern."
  end
end