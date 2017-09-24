---
layout: post
title: 'Seven Languages in Seven Weeks&#58; Io, Day 3'
date: '2012-02-07T11:25:00.000-08:00'
author: Yevgeniy Brikman
tags:
- Seven Languages in Seven Weeks
modified_time: '2012-02-11T19:47:00.426-08:00'
blogger_id: tag:blogger.com,1999:blog-5422014336627804072.post-3537176025951135200
blogger_orig_url: http://brikis98.blogspot.com/2012/02/seven-languages-in-seven-weeks-io-day-3.html
thumbnail_path: blog/seven-languages/book-cover.jpg
---

Today is the final chapter of Io in the [Seven Languages in Seven 
Weeks](https://www.ybrikman.com/writing/tags/#Seven%20Languages%20in%20Seven%20Weeks) 
series of posts. You can find the [previous day of Io 
here](https://www.ybrikman.com/writing/2012/02/04/seven-languages-in-seven-weeks-io-day-2/). 

## Io, Day 3: Thoughts

Although I'm only on the second language out of seven in [the 
book](http://www.amazon.com/Seven-Languages-Weeks-Programming-Programmers/dp/193435659X), 
a pattern is emerging: day 1 is very basic syntax, day 2 is more advanced 
syntax, and day 3 shows you some of the advanced applications that set the 
current language apart from all the others.  

It's a great strategy: each jump is small enough that you can follow 
along, but big enough that you're able to get a thorough look at the language 
in just a few days. In fact, my biggest complaint so far is that the examples 
in the final day of Io are very intriguing, but also very short, so I'm dying 
to see more. 

In a single chapter, we tore through using metaprogramming *and* 
concurrency in the span of just a few pages. It was tough to appreciate it 
all in such a short time. I was able to get a little more practice with Io 
metaprogramming by implementing a super simple `doInTransaction` method 
similar to the one I created in 
[Ruby](https://gist.github.com/1700969#file_transaction.rb): 

{% highlight io %}
doInTransaction := Object clone do(
  curlyBrackets := method(
    "Starting transaction" println
    call evalArgs
    "Ending transaction" println
  )
)
 
doInTransaction { 
  "do some first thing" println 
  "do some second thing" println
  "do a third thing" println  
}
 
/*

Starting transaction
do some first thing
do some second thing
do a third thing
Ending transaction

*/
{% endhighlight %}

The idea was to be able to run some code, such as starting and ending a 
transaction, before and after a "block" of statements. For added fun, I wanted 
to be able to support curly braces for defining blocks. Accomplishing both was 
trivial by taking advantage of the fact that Io treats `{` as the message 
`curlyBrackets`. Handle that message properly in your object, add some basic 
introspection, and you're done. 

Unfortunately, I wasn't able to think of a suitable "toy" example to learn 
more about coroutines. I'm still fuzzy on a lot of the nuances, such as how 
memory is shared between the "threads", how many threads there are, and how 
yield and resume really interact. I'd love to see some more examples, 
especially those that show a practical use case for Io actors. 

## Io, Day 3: Problems 

### Enhance Builder XML 

Enhance the XML program (see the [original 
source](https://gist.github.com/1750650#file_builder_original.io), the 
[original test 
file](https://gist.github.com/1750650#file_builder_original_test.io), and the 
[original 
output](https://gist.github.com/1750650#file_builder_original_output.html)) to 
add spaces to show the indentation structure. Also, enhance the XML program to 
handle attributes: if the first argument is a map (use the curly brackets 
syntax), add attributes to the XML program. For example, 
`book({"author": "Tate"}..)` would print `<book author="Tate">`. 

This is an awesome example of Io's flexibility and power when it comes to 
creating DSLs. In some 30 lines of code, Io can process this Builder format: 

{% highlight io %}
Builder html(
  head(
    title("Test webpage")
  ),
  body(
    h1("Welcome to my test webpage!"),
    div({"class": "content", "id": "main"},
      p("Lots of fun to be had!"),
      p("Don't forget to sign the guest book")
    )
  )
)
{% endhighlight %}

To produce the equivalent HTML output: 

{% highlight html %}
<html>
  <head>
    <title>
      Test webpage
    </title>
  </head>
  <body>
    <h1>
      Welcome to my test webpage!
    </h1>
    <div class="content" id="main">
      <p>
        Lots of fun to be had!
      </p>
      <p>
        Don't forget to sign the guest book
      </p>
    </div>
  </body>
</html>
{% endhighlight %}

Most of the (surprisingly concise and elegant) [builder source 
code](https://gist.github.com/1750650#file_builder_original.io) came from the 
book. Here's my updated version that handles indentation and attributes: 

{% highlight io %}
OperatorTable addAssignOperator(":", "atParseHash")
 
Builder := Object clone do (
  indent := ""
 
  atParseHash := method(
    key := call evalArgAt(0) asMutable removePrefix("\"") removeSuffix("\"")
    value := call evalArgAt(1)
    " #{key}=\"#{value}\"" interpolate
  )
 
  curlyBrackets := method(
    call message arguments map(arg, self doMessage(arg)) join("")
  )
 
  forward := method(    
    arguments := call message arguments
    name := call message name
    
    attrs := ""    
    if(arguments size > 0 and arguments at(0) name == "curlyBrackets",
      attrs = doMessage(arguments removeFirst)
    )
        
    writeln(indent, "<", name, attrs, ">")
    arguments foreach(index, arg,
      indent = indent .. "  "      
      content := self doMessage(arg)
      if (content type == "Sequence", writeln(indent, content))
      indent = indent exclusiveSlice(2)
    )
    writeln(indent, "</", name, ">")
  )
)
 
doFile("BuilderNewTest.io")
{% endhighlight %}

The biggest stumbling point was trying to use `addAssignOperator` in the same 
file as the test script. This doesn't work: the `OperatorTable` has already been 
loaded and can't be changed. By splitting the code into two files, one for 
source and one for testing, I was able to properly handle the colon and avoid 
the very frustrating "Sequence does not respond to ':'" error. 

### Create a list syntax that uses brackets 

{% highlight io %}
squareBrackets := method(
  call message arguments
)
 
test := [1, 2, 3, 4]
 
test println // list(1, 2, 3, 4)
{% endhighlight %}

A much easier problem, but another great example of the flexibility of Io: 
Ruby-like syntax for lists in just a couple lines of code. 

## Wrapping up Io 

This was the last day of Io and I must admit, I'm a bit sad to see it go. It's 
a beautiful example of just how simple and flexible a language can be. Of 
course, being able&mdash;and tempted&mdash;to change just about anything is a bit of 
double-edged sword: more than once I saw unexpected consequences from 
overriding the "forward" method. However, it's undeniably powerful. If nothing 
else, Io has made me more excited to learn about the Lisp family, with Clojure 
being the 6th language in the book. 

I wish I got to see some more examples of concurrency in Io, but the book was 
pretty sparse in that area. Even worse, I can't find much online. 
Unfortunately, Io's community is tiny. It's hard to justify spending too much 
time on a language that, in all honesty, I'll probably never use in any 
capacity besides learning. 

## Time for something new 

Continue on to [Prolog, Day 
1](https://www.ybrikman.com/writing/2012/02/09/seven-languages-in-seven-weeks-prolog/), 
to learn about a radically different style of programming. 