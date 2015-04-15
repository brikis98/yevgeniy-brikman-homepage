---
layout: post
title: 'Seven Languages in Seven Weeks: Ruby, Day 3'
date: '2012-01-31T22:11:00.000-08:00'
author: Yevgeniy Brikman
tags:
- Seven Languages in Seven Weeks
- Software Engineering
modified_time: '2012-02-01T00:44:38.173-08:00'
blogger_id: tag:blogger.com,1999:blog-5422014336627804072.post-1047876557696501596
blogger_orig_url: http://brikis98.blogspot.com/2012/01/seven-languages-in-seven-weeks-ruby-day_31.html
thumbnail_path: blog/seven-languages/book-cover.jpg
---

This is my 3rd day of [Ruby in the Seven Languages in Seven 
Weeks](http://brikis98.blogspot.com/search/label/Seven%20Languages%20in%20Seven%20Weeks) 
series of posts. You can find [the previous day 
here](http://brikis98.blogspot.com/2012/01/seven-languages-in-seven-weeks-ruby-day_29.html). 

<span style="font-size: x-large;">**Ruby, Day 3: Thoughts** 

The third day combines 
[metaprogramming](http://en.wikipedia.org/wiki/Metaprogramming) techniques 
([define_method](http://www.raulparolari.com/Ruby2/define_method), 
[method_missing](http://technicalpickles.com/posts/using-method_missing-and-respond_to-to-create-dynamic-methods/), 
and [mixins](http://ruby-doc.org/docs/ProgrammingRuby/html/tut_modules.html)) 
with what what we learned in the previous chapters (flexible syntax, blocks, 
yield) to work some magic. Whereas day 1 and 2 showed how Ruby could be more 
concise and expressive than other languages, this chapter shows some of the 
capabilities available in Ruby, such as beautiful DSLs and composable designs, 
that are nearly impossible in stricter languages. 

I saw small of examples of this when I was working on the [Resume 
Builder](http://resume.linkedinlabs.com/): the profile data I was fetching 
from the [LinkedIn APIs](http://developer.linkedin.com/) came back as JSON. I 
wanted to have a nice Ruby class to wrap the JSON data and was able to do this 
cleanly and concisely using some very simple metaprogramming: 


<script 
src="https://gist.github.com/1715263.js?file=LinkedInProfile.rb"></script> 
Instead of defining dozens of getters and setters as in the [LinkedIn API Java 
Library](http://code.google.com/p/linkedin-j/source/browse/trunk/linkedin-j/core/src/main/java/com/google/code/linkedinapi/schema/impl/PersonImpl.java), 
I just declared the fields in an array (SIMPLE_PROFILE_FIELDS), looped over 
them, and used define_method to create the appropriate methods. To be fair, 
this is kids stuff; if you really want to see metaprogramming shine, take a 
gander over at 
[ActiveRecord](http://guides.rubyonrails.org/active_record_querying.html). 

Of course, with great power comes great big bullet wounds in the foot. 
Metaprogramming must be used with more a bit more caution than other 
programming techniques, as chasing down errors in dynamic methods and trying 
to discern "magic" can be painful. 

<span style="font-size: x-large;">**Ruby, Day 3: Problems** 
<b> 
</b> 
## CSV application 

There was only one problem to solve on this day: modify the CSV application 
(see the [original code 
here](https://gist.github.com/1715263#file_csv_original.rb) and the [original 
output here](https://gist.github.com/1715263#file_csv_original_output.txt)) to 
return a CsvRow object. Use method_missing on that CsvRow to return the value 
for the column given a heading. 


<script src="https://gist.github.com/1715263.js?file=csv_new.rb"></script> 
Using this sample file: 

<script src="https://gist.github.com/1715263.js?file=rubycsv.csv"></script> 
The code above will produce the following output: 

<script 
src="https://gist.github.com/1715263.js?file=csv_new_output.txt"></script> 
<span style="font-size: x-large;">**Moving on** 

This was the final day in the Ruby chapter. Join me next time as I work my way 
through a totally new language: [Io](http://iolanguage.com/). 