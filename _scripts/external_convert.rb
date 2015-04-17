EXTERNAL_POSTS = [
  {:date => "2014-01-21", :url => "http://engineering.linkedin.com/play/composable-and-streamable-play-apps", :title => "Composable and Streamable Play Apps"},
  {:date => "2013-12-09", :url => "http://www.quora.com/LinkedIn-6/What-is-the-current-webstack-LinkedIn-uses/answer/Yevgeniy-Brikman?srid=XPv&amp;share=1", :title => "What is the current webstack LinkedIn uses?"},
  {:date => "2013-12-03", :url => "http://www.quora.com/Play-Framework/In-which-ways-do-you-use-the-play-framework-in-your-company/answer/Yevgeniy-Brikman?srid=XPv&amp;share=1", :title => "In which ways do you use the play framework in your company?"},
  {:date => "2013-03-31", :url => "http://www.quora.com/Play-Framework/What-are-the-pros-and-cons-of-the-Play-Framework-2-for-a-Java-developer/answer/Yevgeniy-Brikman?srid=XPv&amp;share=1", :title => "What are the pros and cons of Play Framework 2, for a Java developer?"},
  {:date => "2013-03-30", :url => "http://www.quora.com/Play-Framework/What-are-the-pros-and-cons-of-Play-Framework-2-for-a-Scala-developer/answer/Yevgeniy-Brikman?srid=XPv&amp;share=1", :title => "What are the pros and cons of Play Framework 2, for a Scala developer?"},
  {:date => "2013-03-27", :url => "http://engineering.linkedin.com/play/play-framework-async-io-without-thread-pool-and-callback-hell", :title => "Play Framework: async I/O without the thread pool and callback hell"},
  {:date => "2013-02-20", :url => "http://engineering.linkedin.com/play/play-framework-linkedin", :title => "The Play Framework at LinkedIn"},
  {:date => "2012-10-01", :url => "http://www.quora.com/Web-Development/What-are-the-pros-and-cons-of-client-side-rendering/answer/Yevgeniy-Brikman?srid=XPv&amp;share=1", :title => "What are the pros and cons of client-side rendering?"},
  {:date => "2011-06-12", :url => "http://engineering.linkedin.com/23/linkedin-hackdays", :title => "LinkedIn Hackdays"},
  {:date => "2011-06-12", :url => "http://engineering.linkedin.com/21/coffeescript-javascript-that%E2%80%99s-easy-eyes-0", :title => "CoffeeScript: JavaScript that’s easy on the eyes"},
  {:date => "2011-04-18", :url => "http://opensource.com/life/11/4/i-finally-understand-open-source-software", :title => "I finally understand open source software"},
  {:date => "2011-01-15", :url => "http://www.quora.com/Does-the-computer-programming-profession-have-a-future/answer/Yevgeniy-Brikman?srid=XPv&amp;share=1", :title => "Does the computer programming profession have a future?"},
  {:date => "2015-04-09", :url => "http://www.quora.com/What-does-it-mean-for-a-software-company-startup-to-be-able-to-iterate-quickly/answer/Yevgeniy-Brikman", :title => "What does it mean for a software company/startup to be able to iterate quickly?"},
  {:date => "2015-03-21", :url => "http://www.quora.com/In-a-startup-how-does-equity-work/answer/Yevgeniy-Brikman", :title => "In a startup, how does equity work?"},
  {:date => "2015-03-06", :url => "http://www.quora.com/What-are-some-good-books-to-read-for-starting-entrepreneurs/answer/Yevgeniy-Brikman", :title => "What are some good books to read for starting entrepreneurs?"},
  {:date => "2015-02-19", :url => "http://www.quora.com/How-do-you-make-sure-that-someone-doesnt-steal-a-startup-idea-that-you-are-in-the-initial-stages-of-working-on/answer/Yevgeniy-Brikman", :title => "How do you make sure that someone doesn't steal a startup idea that you are in the initial stages of working on?"},
  {:date => "2015-02-12", :url => "http://www.quora.com/Should-I-start-a-company-or-work-for-one/answer/Yevgeniy-Brikman", :title => "Should I start a company or work for one?"},
  {:date => "2015-02-27", :url => "http://www.quora.com/How-can-you-validate-an-idea-before-jumping-in-and-actually-implementing-it/answer/Yevgeniy-Brikman", :title => "How can you validate an idea before jumping in and actually implementing it?"},
  {:date => "2015-02-12", :url => "http://www.quora.com/What-are-the-best-server-monitor-tools/answer/Yevgeniy-Brikman", :title => "What are the best server monitor tools?"},
  {:date => "2015-02-12", :url => "http://www.quora.com/How-does-one-get-a-job-at-a-startup/answer/Yevgeniy-Brikman", :title => "How does one get a job at a startup?"},
  {:date => "2015-02-17", :url => "http://www.quora.com/What-do-you-give-a-child-as-good-reasons-for-why-he-she-should-read/answer/Yevgeniy-Brikman", :title => "What do you give a child as good reasons for why he/she should read?"},
  {:date => "2015-03-02", :url => "https://www.reddit.com/r/cscareerquestions/comments/2xmn7n/need_advice_should_i_join_a_promising_well_funded/cp1nxmo", :title => "Need advice: Should I join a promising, well funded startup or accept an offer from a Silicon Valley company?"}
]

POST_TEMPLATE = <<eos
---
layout: post
title: "__TITLE__"
tags:
- External Writing
- __TAG__
thumbnail_path: "blog/thumbs/__THUMB__"
external_url: "__URL__"
---  

__EXCERPT__:

{% include figure.html path=page.thumbnail_path caption=page.title url=page.external_url %}

eos

POST_ATTRIBUTES_MAP = [
  {
    :url_regex => /.+quora.+/, 
    :thumb => "quora-logo.png", 
    :tags => "Startups",
    :excerpt => "My answer on Quora to [{{ page.title }}]({{ page.external_url }})"
  },
  {
    :url_regex => /.+engineering\.linkedin\.com/,
    :thumb => "linkedin-blueprint.jpg", 
    :tags => "Software Engineering",
    :excerpt => "A blog post I wrote on the LinkedIn Engineering Blog about [{{ page.title }}]({{ page.external_url }}):"
  },
  {
    :url_regex => /.+reddit.+/,
    :thumb => "reddit-alien.png",
    :tags => "Startups",
    :excerpt => "My answer on Reddit to [{{ page.title }}]({{ page.external_url }})"
  },
  {
    :url_regex => /.*/,
    :thumb => "",
    :tags => "",
    :excerpt => ""
  }
]

def slugify(text)
  text.downcase.strip.gsub(' ', '-').gsub(/[^\w-]/, '')
end

def post_content(post)
  post_attributes = POST_ATTRIBUTES_MAP.find do |attrs|
    post[:url] =~ attrs[:url_regex]
  end

  POST_TEMPLATE
    .sub("__TITLE__", post[:title])
    .sub("__TAG__", post_attributes[:tags])
    .sub("__THUMB__", post_attributes[:thumb])
    .sub("__URL__", post[:url])
    .sub("__EXCERPT__", post_attributes[:excerpt])
end

EXTERNAL_POSTS.each do |post|
  slug = slugify(post[:title])
  file_path = "_posts/#{post[:date]}-#{slug}.md"
  content = post_content(post)
  
  puts "Writing #{file_path}"
  IO.write(file_path, content) 
end




