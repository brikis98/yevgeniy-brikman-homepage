---
layout: post
title: 'Seven Languages in Seven Weeks: Io, Day 1'
date: '2012-02-03T11:14:00.000-08:00'
author: Yevgeniy Brikman
tags:
- Seven Languages in Seven Weeks
- Software Engineering
modified_time: '2012-02-11T19:47:00.441-08:00'
blogger_id: tag:blogger.com,1999:blog-5422014336627804072.post-815047107515517475
blogger_orig_url: http://brikis98.blogspot.com/2012/02/seven-languages-in-seven-weeks-io-day-1.html
thumbnail_path: blog/seven-languages/book-cover.jpg
---

Welcome to the first day of [Io](http://iolanguage.com/) in my [Seven 
Languages in Seven 
Weeks](http://brikis98.blogspot.com/search/label/Seven%20Languages%20in%20Seven%20Weeks) 
series of blog posts. After spending a few days playing around with 
[Ruby](http://brikis98.blogspot.com/2012/01/seven-languages-in-seven-weeks-ruby-day.html), 
Io is definitely a change of pace. 

## <span style="font-size: x-large;">Io, Day 1: Thoughts 

From what I've seen so far, Io is a prototype-based language (similar to 
JavaScript), with extremely minimal syntax (none of Ruby's syntax sugar), 
objects are just a collection of "slots" that contain either data or methods, 
and you interact with objects by passing them messages. To give you a taste, 
here are some snippets: 

We'll start with the classic Hello World: 

<script src="https://gist.github.com/1729120.js?file=HelloWorld.io"></script> 
The way to think about this in Io terms is that you are passing the "println" 
message to the "Hello, World!" String object. I must note that having a space 
between object and message makes the code noticeably harder for my mind to 
parse. If the code had used a dot instead - "Hello, World!".println - I 
would've found it much easier! As it is, perhaps because I'm not used to it, 
my comprehension is slowed and my aesthetic sense is tingling. 

Here's a simple example of defining variables and methods: 

<script 
src="https://gist.github.com/1729120.js?file=VariablesAndMethods.io"></script> 
Method calls look similar to most languages I'm used to: "method param1, 
param2, ..." However, I wonder if the Io way of looking at it is that the 
speak method is an object and the phrase parameter is the message? 

Finally, here's an example that shows objects and prototypal inheritance: 

<script 
src="https://gist.github.com/1729120.js?file=PrototypesAndObjects.io"></script> 
In prototype-based languages, the distinction is blurred between a "class" - 
that is, some sort of template defining an object and its behavior - and an 
"instance" of that class. In Io, they are pretty much one and the same: you 
just clone an existing object to create a new one, whether you intend them as 
instances or templates. 

The one place where "instances" do differ from "classes", however, is by 
convention: the class-like objects are usually named with an upper case first 
letter (Dog, Cat) while the instance-like objects are named with a lower case 
first letter (myDog, myCat). I suppose this sort of design greatly simplifies 
the language, as there's no need for special syntax, constructs, or rules for 
"classes". 

## <span style="font-size: x-large;">Io, Day 1: Problems 

The day 1 problems in this book are always very basic. I skipped a few of the 
really simple ones as they are not too interesting. 

## Io typing 

Evaluate 1 + 1 and then 1 + "1". Is Io weakly or strongly typed? 

<script 
src="https://gist.github.com/1729120.js?file=StronglyTyped.io"></script> 
As you can see above, Io is a strongly typed language. 

## Dynamic code slot 

Execute the code in a slot given its name. 

<script 
src="https://gist.github.com/1729120.js?file=DynamicCodeSlot.io"></script> 
Explanation: the "System" object contains various system properties and 
methods. I pass the "args" parameter to it to get the command line parameters. 
I then use the "at" method to access the parameter at a given index: in Io, 
index 0 has the name of the app (DynamicCodeSlot.io) and index 1 is the first 
argument (foo or bar). 

By calling the "getSlot" method, I get back the object stored at the slot 
named as a command line argument. Finally, the "call" method does what you'd 
expect: it calls that slot. 

## <span style="font-size: x-large;">Io, Continued 

Continue on to [Io, Day 
2](http://brikis98.blogspot.com/2012/02/seven-languages-in-seven-weeks-io-day-2.html). 