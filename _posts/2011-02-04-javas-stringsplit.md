---
layout: post
title: Java's String.split()
date: '2011-02-04T14:08:00.000-08:00'
author: Yevgeniy Brikman
tags:
- Software Engineering
modified_time: '2011-08-06T14:47:14.969-07:00'
blogger_id: tag:blogger.com,1999:blog-5422014336627804072.post-3048285064623487762
blogger_orig_url: http://brikis98.blogspot.com/2011/02/javas-stringsplit.html
thumbnail_path: blog/thumbs/java-logo.png
---

Just ran into a "gotcha" in Java that had me scratching my head. I had a 
string of the form `"abc.def.ghi"` and I wanted to split it on the dot (`"."`) 
character. So I had the following code: 

{% highlight java %}
String test = "abc.def.ghi"; 
String[] parts = test.split(".");
{% endhighlight %}

Pop quiz: what does the *parts* array contain? 

1. Did you say `{"abc", "def", "ghi"}`? Sorry, no. 
1. Maybe `{"abc.def.ghi"}`? Nope. 
1. "Oh, I got it!" you think, and happily announce the solution is `{"a", "b", "c", "d", "e", "f", "g", "h", "i"}`. 
Bad news, friend: you are still wrong. 

The real solution? `parts = {}`. That's right, `parts` is an empty array.

Huh?

Let's start by looking at the [API Docs for String's split 
function](http://download.oracle.com/javase/6/docs/api/java/lang/String.html#split(java.lang.String)). 
The first thing to realize is that the parameter it takes is a *regular 
expression*, and in regex syntax, the dot matches any non-whitespace 
character. So instead of matching the dots like I wanted, I was matching 
everything in the string. To actually match a dot character, I needed to 
escape it with backslashes: `test.split("\\.")`.

That's a simple enough error, but why would it result in an empty array? 
If the dot matches every character, shouldn't I have gotten an array where 
each character is a separate entry? That certainly *feels* like the right 
answer for anyone used to matching things with regex, but we have to remember 
the regex plays a slightly different role in the split function: it's the 
*delimiter*. It's the value on which to split the String and is NOT included 
in the resulting array.

So my delightful code snippet ended up matching every character in the 
input ... and then throwing it away. A fun example of simple code that looks 
right, but isn't. 