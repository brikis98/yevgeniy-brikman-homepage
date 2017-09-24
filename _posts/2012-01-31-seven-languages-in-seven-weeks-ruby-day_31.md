---
layout: post
title: 'Seven Languages in Seven Weeks&#58; Ruby, Day 3'
date: '2012-01-31T22:11:00.000-08:00'
author: Yevgeniy Brikman
tags:
- Seven Languages in Seven Weeks
modified_time: '2012-02-01T00:44:38.173-08:00'
blogger_id: tag:blogger.com,1999:blog-5422014336627804072.post-1047876557696501596
blogger_orig_url: http://brikis98.blogspot.com/2012/01/seven-languages-in-seven-weeks-ruby-day_31.html
thumbnail_path: blog/seven-languages/book-cover.jpg
---

This is my 3rd day of [Ruby in the Seven Languages in Seven 
Weeks](https://www.ybrikman.com/writing/tags/#Seven%20Languages%20in%20Seven%20Weeks) 
series of posts. You can find [the previous day 
here](https://www.ybrikman.com/writing/2012/01/29/seven-languages-in-seven-weeks-ruby-day_29/). 

## Ruby, Day 3: Thoughts

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

{% highlight ruby %}
class LinkedInProfile
  SIMPLE_PROFILE_FIELDS = %w[id summary headline honors interests specialties industry first_name last_name public_profile_url picture_url associations]
 
  SIMPLE_PROFILE_FIELDS.each do |field|
    define_method(field.to_sym) do
      @json[field]
    end
  end
 
  def initialize(json)
    @json = json
  end
end
{% endhighlight %}

Instead of defining dozens of getters and setters as in the [LinkedIn API Java 
Library](http://code.google.com/p/linkedin-j/source/browse/trunk/linkedin-j/core/src/main/java/com/google/code/linkedinapi/schema/impl/PersonImpl.java), 
I just declared the fields in an array (`SIMPLE_PROFILE_FIELDS`), looped over 
them, and used define_method to create the appropriate methods. To be fair, 
this is kids stuff; if you really want to see metaprogramming shine, take a 
gander over at 
[ActiveRecord](http://guides.rubyonrails.org/active_record_querying.html). 

Of course, with great power comes great big bullet wounds in the foot. 
Metaprogramming must be used with more a bit more caution than other 
programming techniques, as chasing down errors in dynamic methods and trying 
to discern "magic" can be painful. 

## Ruby, Day 3: Problems

### CSV application 

There was only one problem to solve on this day: modify the CSV application 
(see [Ruby, Day 2](http://localhost:4000/writing/2012/01/29/seven-languages-in-seven-weeks-ruby-day_29)) 
to return a `CsvRow` object. Use `method_missing` on that `CsvRow` to return the value 
for the column given a heading. 

{% highlight ruby %}
module ActsAsCsv
  def self.included(base)
    base.extend ClassMethods
  end
  
  module ClassMethods
    def acts_as_csv
      include InstanceMethods
      include Enumerable
    end
  end
  
  module InstanceMethods
    attr_accessor :headers, :csv_contents
    
    def initialize
      read
    end
    
    def read
      @csv_contents = []
      filename = self.class.to_s.downcase + '.csv'
      file = File.new(filename)
      
      @headers = parse_row file.gets
            
      file.each do |row|
        @csv_contents << CsvRow.new(@headers, parse_row(row))
      end
    end
    
    def parse_row(row)
      row.chomp.split(', ')
    end
    
    def each
      @csv_contents.each { |row| yield row }
    end
        
    class CsvRow
      def initialize(headers, row)
        @headers = headers
        @row = row
      end
      
      def respond_to?(sym)
        @headers.index(name.to_s) || super(sym)
      end
      
      def method_missing name, *args, &block
        index = @headers.index(name.to_s)
        if index
          @row[index]
        else
          super
        end        
      end      
    end
  end
end

class RubyCsv
  include ActsAsCsv
  acts_as_csv
end

csv = RubyCsv.new
puts csv.headers.inspect
puts csv.csv_contents.inspect
csv.each { |row| puts "#{row.name}, #{row.age}" }
{% endhighlight %}

Using this sample file: 

{% highlight text %}
name, location, age
Jim, Menlo Park, 27
Bob, Palo Alto, 37
Steve, NYC, 28
{% endhighlight %}

The code above will produce the following output: 

{% highlight text %}
$ ruby csv_new.rb
["name", "location", "age"]
[#<ActsAsCsv::InstanceMethods::CsvRow:0x25814 @row=["Jim", "Menlo Park", "27"], @headers=["name", "location", "age"]>, #<ActsAsCsv::InstanceMethods::CsvRow:0x25738 @row=["Bob", "Palo Alto", "37"], @headers=["name", "location", "age"]>, #<ActsAsCsv::InstanceMethods::CsvRow:0x2565c @row=["Steve", "NYC", "28"], @headers=["name", "location", "age"]>]
Jim, 27
Bob, 37
Steve, 28
{% endhighlight %}

## Moving on

This was the final day in the Ruby chapter. Join me next time as I work my way 
through a totally new language: [Io](http://iolanguage.com/). 