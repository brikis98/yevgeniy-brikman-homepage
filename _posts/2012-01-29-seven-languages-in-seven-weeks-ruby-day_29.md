---
layout: post
title: 'Seven Languages in Seven Weeks&#58; Ruby, Day 2'
date: '2012-01-29T15:56:00.000-08:00'
author: Yevgeniy Brikman
tags:
- Seven Languages in Seven Weeks
modified_time: '2012-02-01T00:45:15.459-08:00'
blogger_id: tag:blogger.com,1999:blog-5422014336627804072.post-108414827713914395
blogger_orig_url: http://brikis98.blogspot.com/2012/01/seven-languages-in-seven-weeks-ruby-day_29.html
thumbnail_path: blog/seven-languages/book-cover.jpg
---

In my [previous 
post](https://www.ybrikman.com/writing/2012/01/29/seven-languages-in-seven-weeks-ruby-day/), 
I went through the [Day 1 Ruby 
problems](https://www.ybrikman.com/writing/2012/01/29/seven-languages-in-seven-weeks-ruby-day/) 
from [Seven Languages in Seven 
Weeks](https://www.ybrikman.com/writing/tags/#Seven%20Languages%20in%20Seven%20Weeks). 
Today, I'll share my solutions to the Day 2 problems and some more thoughts 
about Ruby. 

## Ruby, Day 2: Thoughts

I originally learned Ruby (and many other programming languages) the "hacker 
way": that is, I did a 10 minute syntax tutorial, browsed other peoples' code 
a bit, and then just started using the language, looking up missing pieces as 
I went. Although this is the most fun and productive way I've found to get 
started with a language, it can also lead to missing some of the finer points 
and subtleties. 

For example, until the "Ruby, Day 2" chapter, I never had a full appreciation 
for Ruby code blocks and the yield keyword. For example, even though I 
frequently used 
"[times](http://ruby-doc.org/core-1.9.3/Integer.html#method-i-times)" to do 
looping, I never thought deeply about how it worked: 

{% highlight ruby %}
10.times { puts "Jim" }
{% endhighlight %}

It turns out that `times` is just a function (slightly obscured because Ruby 
doesn't require parentheses for function calls) on the `Integer` class that 
takes a code block as an argument. It could be implemented as follows: 

{% highlight ruby %}
class Integer
  def times
    1.upto(self) { yield }
  end
end
{% endhighlight %}

This style of coding allows for some powerful possibilities. For example, it 
is surprisingly easy to introduce a "do in a transaction" function: 

{% highlight ruby %}
def within_a_transaction
  start_transaction
  yield
  end_transaction
end
{% endhighlight %}

Using this, I can now trivially wrap any number of statements in a 
transaction: 

{% highlight ruby %}
within_a_transaction { do_something }
 
within_a_transaction do
  do_something
  do_something_else
  do_a_third_thing
end
{% endhighlight %}

The equivalent in less expressive languages, such as Java, often involves 
vastly more code, implementing arbitrary interfaces, anonymous inner classes, 
and a lot of very hard-to-read code. For comparison, here is an example of how 
Java's [Spring Framework](http://www.springsource.org/) recommends wrapping 
[JDBC code in 
transactions](http://static.springsource.org/spring/docs/2.5.x/reference/jdbc.html): 

{% highlight java %}
return _transactionManager.execute(new VoidDBExecCallback() {
  public void doExecute(DBExecContext dbExecContext) throws TransactionException {
    dbExecContext.getJdbcTemplate().execute(
      "Select name from tbl_foo where id = ?", 
      new PreparedStatementSetter() {
        public void setValues(PreparedStatement ps) throws SQLException
        {
          ps.setInt(1, 12345);
        }
      }, 
      new RowCallbackHandler() {
        public void processRow(ResultSet rs) throws SQLException
        {
          String name = rs.getString(1);
        }
      }
    );
  }
});
{% endhighlight %}

## Ruby, Day 2: Problems

The Day 2 problems are only slightly tougher than Day 1. The most fun part was 
coming up with a way to keep the code as concise as possible. 

### Print 16 

Print the contents of an Array of 16 numbers, 4 numbers at a time, using just 
`each`. Now, do the same with `each_slice` in 
[Enumerable](http://ruby-doc.org/core-1.8.7/Enumerable.html). 

{% highlight ruby %}
arr = (1..16).to_a
arr.each { |i| print "#{i}#{i % 4 == 0 ? "\n" : ','}" }
{% endhighlight %}

{% highlight ruby %}
arr = (1..16).to_a
arr.each_slice(4) { |slice| puts slice.join(", ") }
{% endhighlight %}

### Tree 

Modify the `Tree` class initializer (original code 
[here](https://gist.github.com/1700969#file_tree_original.rb)) so it can 
accept a nested structure of Hashes. Trickiest part here was that the 
`collect` function can call the passed in block with either one argument 
that's an Array or two arguments that represent the (key, value) pair. 

{% highlight ruby %}
class Tree
  attr_accessor :children, :node_name
  
  def initialize(tree = {})
    @node_name = tree.keys[0]
    @children = tree[@node_name].collect{ |k, v| Tree.new({k => v}) }
  end
  
  def visit_all(&block)
    visit &block
    children.each { |c| c.visit_all &block }
  end
  
  def visit(&block)
    block.call self
  end
end
 
tree = Tree.new({"grandpa" => {"dad" => {"child1" => {}, "child2" => {}}, "uncle" => {"child3" => {}, "child4" => {}}}})
tree.visit_all { |node| puts node.node_name }
{% endhighlight %}

## Grep 

Write a simple grep that will print the lines and line numbers of a file 
having any occurrence of a phrase anywhere in that line. 

{% highlight ruby %}
# Usage: ruby grep.rb <regular_expression> <file_name>

IO.readlines(ARGV[1]).each_with_index{ |line, index| puts "#{index + 1}: #{line}" if line =~ /#{ARGV[0]}/}
{% endhighlight %}

## Ruby vs. Java, Round 2

I couldn't resist implementing the grep code in Java to see how it compares: 

{% highlight java %}
import java.io.BufferedReader;
import java.io.File;
import java.io.FileReader;
import java.io.IOException;
import java.util.regex.Pattern;
import java.util.regex.Matcher;
 
/**
 * Usage: java Grep <regular_expression> <file_name>
 */
public class Grep {
  public static void main(String[] args) throws IOException {
    Pattern pattern = Pattern.compile(args[0]);
    BufferedReader br = null;
    String line = null;
    int lineNumber = 1;
    
    try {
      br = new BufferedReader(new FileReader(new File(args[1])));
      while((line = br.readLine()) != null) {
        Matcher matcher = pattern.matcher(line);
        if (matcher.find()) {
          System.out.println(lineNumber + ": " + line);
        }
        lineNumber++;
      }    
    } finally {
      if (br != null) {
        br.close();
      }
    }
  }
}
{% endhighlight %}

It's **33 lines long**. The Ruby solution was a one-liner. 

## Ruby, Continued 

Check out more Ruby goodness on [Ruby, Day 
3](https://www.ybrikman.com/writing/2012/01/31/seven-languages-in-seven-weeks-ruby-day_31/). 