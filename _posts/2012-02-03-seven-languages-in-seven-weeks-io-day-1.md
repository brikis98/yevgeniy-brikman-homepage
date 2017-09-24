---
layout: post
title: 'Seven Languages in Seven Weeks&#58; Io, Day 1'
date: '2012-02-03T11:14:00.000-08:00'
author: Yevgeniy Brikman
tags:
- Seven Languages in Seven Weeks
modified_time: '2012-02-11T19:47:00.441-08:00'
blogger_id: tag:blogger.com,1999:blog-5422014336627804072.post-815047107515517475
blogger_orig_url: http://brikis98.blogspot.com/2012/02/seven-languages-in-seven-weeks-io-day-1.html
thumbnail_path: blog/seven-languages/book-cover.jpg
---

Welcome to the first day of [Io](http://iolanguage.com/) in my [Seven 
Languages in Seven 
Weeks](https://www.ybrikman.com/writing/tags/#Seven%20Languages%20in%20Seven%20Weeks) 
series of blog posts. After spending a few days playing around with 
[Ruby](https://www.ybrikman.com/writing/2012/01/29/seven-languages-in-seven-weeks-ruby-day/), 
Io is definitely a change of pace. 

## Io, Day 1: Thoughts 

From what I've seen so far, Io is a prototype-based language (similar to 
JavaScript), with extremely minimal syntax (none of Ruby's syntax sugar), 
objects are just a collection of "slots" that contain either data or methods, 
and you interact with objects by passing them messages. To give you a taste, 
here are some snippets: 

We'll start with the classic Hello World: 

{% highlight io %}
"Hello, world!" println
{% endhighlight %}

The way to think about this in Io terms is that you are passing the `println` 
message to the "Hello, World!" String object. I must note that having a space 
between object and message makes the code noticeably harder for my mind to 
parse. If the code had used a dot instead&mdash;`"Hello, World!".println`&mdash;I 
would've found it much easier! As it is, perhaps because I'm not used to it, 
my comprehension is slowed and my aesthetic sense is tingling. 

Here's a simple example of defining variables and methods: 

{% highlight io %}
speak := method(text, text println)
phrase := "Hello, world!"
speak phrase   // Hello, world!
{% endhighlight %}

Method calls look similar to most languages I'm used to: 
`method param1, param2, ...`. However, I wonder if the Io way of looking at it is that the 
speak method is an object and the phrase parameter is the message? 

Finally, here's an example that shows objects and prototypal inheritance: 

{% highlight io %}
Animal := Object clone do(
  speak := method(phrase println)
  description := "A living creature"
)
 
Dog := Animal clone do (
  phrase := "Woof!"
)
 
Cat := Animal clone do (
  phrase := "Meow"
  description := "I can haz Io?"
)
 
myDog := Dog clone
myCat := Cat clone
 
myDog speak                // Woof!
myDog description println  // A living creature
myCat speak                // Meow
myCat description println  // I can haz Io?
{% endhighlight %}

In prototype-based languages, the distinction is blurred between a 
"class"&mdash;that is, some sort of template defining an object and its 
behavior&mdash;and an "instance" of that class. In Io, they are pretty much one 
and the same: you just clone an existing object to create a new one, whether 
you intend them as instances or templates. 

The one place where "instances" do differ from "classes", however, is by 
convention: the class-like objects are usually named with an upper case first 
letter (`Dog`, `Cat`) while the instance-like objects are named with a lower case 
first letter (`myDog`, `myCat`). I suppose this sort of design greatly simplifies 
the language, as there's no need for special syntax, constructs, or rules for 
"classes". 

## Io, Day 1: Problems 

The day 1 problems in this book are always very basic. I skipped a few of the 
really simple ones as they are not too interesting. 

### Io typing 

Evaluate `1 + 1` and then `1 + "1"`. Is Io weakly or strongly typed? 

{% highlight io %}
1 + 1   // 2
 
1 + "1" // Exception: argument 0 to method '+' must be a Number, not a 'Sequence'
{% endhighlight %}

As you can see above, Io is a strongly typed language. 

### Dynamic code slot 

Execute the code in a slot given its name. 

{% highlight io %}
TestObject := Object clone do(
  foo := method("you called foo" println)
  bar := method("you called bar" println)
  baz := method("you called baz" println)
)
 
TestObject getSlot(System args at(1)) call
 
/*
 
> io DynamicCodeSlot.io foo
you called foo
> io DynamicCodeSlot.io bar
you called bar
> io DynamicCodeSlot.io baz
you called baz

*/
{% endhighlight %}

Explanation: the `System` object contains various system properties and 
methods. I pass the `args` parameter to it to get the command line parameters. 
I then use the `at` method to access the parameter at a given index: in Io, 
index 0 has the name of the app (`DynamicCodeSlot.io`) and index 1 is the first 
argument (`foo` or `bar`). 

By calling the `getSlot` method, I get back the object stored at the slot 
named as a command line argument. Finally, the `call` method does what you'd 
expect: it calls that slot. 

## Io, Continued 

Continue on to [Io, Day 
2](https://www.ybrikman.com/writing/2012/02/04/seven-languages-in-seven-weeks-io-day-2/). 