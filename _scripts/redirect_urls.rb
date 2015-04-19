# The Blogger template language is some awful XML garbage, so there doesn't seem
# to be a nice way to use it to generate redirect URLs. Therefore, we generate
# very manual looking code to do it the hard way and shove this into the blogger
# template with a big middle finger.

REDIRECT_TEMPLATE = <<eos
    <head>
      <meta charset="utf-8"/>
      <title>Redirecting...</title>
      <link rel="canonical" href="__REDIRECT_URL__"/>
      <meta http-equiv="refresh" content="0; url=__REDIRECT_URL__"/>
    </head>
    <body>
      <h1>Redirecting...</h1>
      <p>
        This website has been migrated to a new URL. Click this link if you are 
        not redirected automatically:
      </p>
      <a href="__REDIRECT_URL__">__REDIRECT_URL__</a>
      <script>window.location.href = '__REDIRECT_URL__';</script>
    </body>
eos

XML_TEMPLATE = <<eos
<?xml version="1.0" encoding="UTF-8" ?>
<!DOCTYPE html>
<html b:version='2' class='v2' expr:dir='data:blog.languageDirection' xmlns='http://www.w3.org/1999/xhtml' xmlns:b='http://www.google.com/2005/gml/b' xmlns:data='http://www.google.com/2005/gml/data' xmlns:expr='http://www.google.com/2005/gml/expr'>
  __IF_STATEMENT__
    __IF_STATEMENT_BODY__
  __ELSE_IF_STATEMENTS__
  <b:else/>
    __ELSE_STATEMENT_BODY__
  </b:if>
  <b:section class='header' id='header' maxwidgets='1' showaddelement='no'>
  </b:section>  
  <b:skin></b:skin>
  <b:template-skin></b:template-skin>
</html>
eos

IF_TEMPLATE = "<b:if cond='__CONDITION__'>"
ELSE_IF_TEMPLATE = "<b:elseif cond='__CONDITION__'/>"
CONDITION_TEMPLATE = 'data:blog.canonicalUrl == "__URL__"'

YBRIKMAN_DOMAIN = "http://www.ybrikman.com/writing"

BLOG_POST_GLOB = "_posts/*.md"
BLOGGER_ORIG_PATTERN = /^blogger_orig_url: (.+?)\s/

# To convert a Jekyll blog post file name to a ybrikman.com URL, we need to:
# 
# 1. Strip folder prefix
# 2. Strip markdown file extension
# 3. Replace the dashes in the date with slashes
# 4. Prepend ybrikman.com
#
# Example:
#
# Input: _posts/2014-04-02-foo-bar-baz.md
# Output: 2014/04/foo-bar-baz.html
#
def convert_jekyll_file_to_ybrikman_url(file_name)
  base_name = File.basename(file_name, '.*')
  path = base_name[0..3] + "/" + base_name[5..6] + "/" + base_name[8..9] + "/" + base_name[11..-1]
  "#{YBRIKMAN_DOMAIN}/#{path}/"
end

files = Dir[BLOG_POST_GLOB]

conditionals = files.map do |file|
  content = IO.read(file)
  lazy_regex_matches = content.lines.lazy.map { |line| line.match(BLOGGER_ORIG_PATTERN) }
  first_match = lazy_regex_matches.find { |matcher| !matcher.nil? }

  if first_match
    blogger_url = first_match[1]
    ybrikman_url = convert_jekyll_file_to_ybrikman_url(file)
    conditional = CONDITION_TEMPLATE.sub("__URL__", blogger_url) 
        
    {:conditional => conditional, :ybrikman_url => ybrikman_url}
  end
end

# Ugly way to drop posts that were not from blogger
conditionals = conditionals.compact

first_conditional = conditionals.first
if_statement = IF_TEMPLATE.gsub("__CONDITION__", first_conditional[:conditional])
if_statement_body = REDIRECT_TEMPLATE.gsub("__REDIRECT_URL__", first_conditional[:ybrikman_url])

elseif_statements = conditionals[1..-1].map do |conditional|
  elseif_statement = ELSE_IF_TEMPLATE.gsub("__CONDITION__", conditional[:conditional])
  elseif_statement_body = REDIRECT_TEMPLATE.gsub("__REDIRECT_URL__", conditional[:ybrikman_url])

  "#{elseif_statement}\n#{elseif_statement_body}"
end

else_statement_body = REDIRECT_TEMPLATE.gsub("__REDIRECT_URL__", YBRIKMAN_DOMAIN)

final_output = 
  XML_TEMPLATE
    .sub('__IF_STATEMENT__', if_statement)
    .sub('__IF_STATEMENT_BODY__', if_statement_body)
    .sub('__ELSE_IF_STATEMENTS__', elseif_statements.join("\n"))
    .sub('__ELSE_STATEMENT_BODY__', else_statement_body)    

puts final_output