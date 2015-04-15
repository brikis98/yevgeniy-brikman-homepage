---
layout: post
title: 'Seven Languages in Seven Weeks: Prolog, Day 1'
date: '2012-02-09T14:21:00.000-08:00'
author: Yevgeniy Brikman
tags:
- Seven Languages in Seven Weeks
- Software Engineering
modified_time: '2012-02-11T19:47:00.415-08:00'
blogger_id: tag:blogger.com,1999:blog-5422014336627804072.post-1892100088835483576
blogger_orig_url: http://brikis98.blogspot.com/2012/02/seven-languages-in-seven-weeks-prolog.html
thumbnail_path: blog/seven-languages/book-cover.jpg
---

After finishing up [Io](http://en.wikipedia.org/wiki/Prolog), it's time to 
shift gears yet again in my [Seven Languages in Seven 
Weeks](http://brikis98.blogspot.com/search/label/Seven%20Languages%20in%20Seven%20Weeks) 
series of blog posts. This time, it's time for something radically different: 
[Prolog](http://en.wikipedia.org/wiki/Prolog). 

## <span style="font-size: x-large;">Prolog, Day 1: Thoughts 

The main goals of [Seven Languages in Seven 
Weeks](http://pragprog.com/book/btlang/seven-languages-in-seven-weeks) is not 
actually to teach you seven new *languages*, but to teach you seven new ways 
of *thinking*. In fact, the languages in the book are deliberately chosen so 
as to represent a wide spectrum of approaches to programming problems. 

While the first two languages, 
[Ruby](http://brikis98.blogspot.com/2012/02/seven-languages-in-seven-weeks-io-day-1.html) 
and 
[Io](http://brikis98.blogspot.com/2012/01/seven-languages-in-seven-weeks-ruby-day.html), 
felt pretty familiar, the third one is a totally different kind of beast. 
[Prolog](http://en.wikipedia.org/wiki/Prolog) is my first exposure to 
[declarative 
programming](http://en.wikipedia.org/wiki/Declarative_programming) and 
definitely a new way of thinking. All the previous languages followed an 
imperative model: you write code to tell the compiler what to do one step at a 
time to arrive at some result. In declarative programming, you actually start 
by describing the result you want and the compiler figures out the steps to 
get you there. 

As an example, consider sorting a collection of integers. In an imperative 
language, you would describe all the steps of a sorting algorithm: 
1. Divide the collection into sublists of size 1. 
1. Merge pairs of sublists together into a new sublist, keeping the values in 
sorted order. 
1. Continue merging the larger sublists together until there is only 1 list 
remaining. 
With declarative programming, you would instead describe what the output list 
should look like: 
1. It has every element in the original list. 
1. Each value at position *i* in the output list is less than or equal to the 
value at position *i + 1.* 
And that's it. The prolog compiler would take this description and figure out 
how to assemble a list that matches your description. 

Well, that's the theory any way. After the first chapter, I've only gotten a 
small taste of this model of programming, so I'm still finding it hard to 
understand (a) how hard it would be to describe something more complicated 
than sorting and (b) if the compiler could come up with efficient solutions. 

Nevertheless, many of us have been using a (limited, non-turing complete) form 
of declarative programming for years: HTML. Instead of writing procedural code 
that instructs the browser how to render the page pixel by pixel, HTML lets 
you describe what the result should look like and the browser figures out how 
to render it for you. 

## <span style="font-size: x-large;">Prolog, Day 1: Problems 

## Books and authors 

Make a simple knowledge base representing some of your favorite books and 
authors. Find all books in your knowledge base written by one author. 

Knowledge base: 

<script src="https://gist.github.com/1778586.js?file=books.prolog"></script> 
Queries: 

<script 
src="https://gist.github.com/1778586.js?file=books_queries.txt"></script> 
## Music and instruments 

Make a knowledge base representing musicians and instruments. Also represent 
musicians and their genre of music. Find all musicians who play the guitar. 

Knowledge base: 

<script src="https://gist.github.com/1778586.js?file=music.prolog"></script> 
Queries: 

<script 
src="https://gist.github.com/1778586.js?file=music_queries.txt"></script> 
<span style="font-size: x-large;">**Normalization****<span style="font-size: 
x-large;">? ** 

For the [books knowledge 
base](https://gist.github.com/1778586#file_books.prolog), I defined the rules 
in a "[normalized](http://en.wikipedia.org/wiki/Database_normalization)" style 
as I might use for a SQL database. Looking back at it now, I'm not sure this 
is the best way to do it. It doesn't seem like I can do anything meaningful 
with the "normalized" rules other than, perhaps, checking if a given atom is 
valid. 

For the [music knowledge 
base](https://gist.github.com/1778586#file_music.prolog), I only defined the 
relationships and not any individual atoms. This seems closer to the style in 
the book and can field the same queries, but with less code. I would hazard a 
guess that this is the proper way to do it, but I'd love to hear back from 
anyone who has had more than 1 day of exposure to Prolog. 

## <span style="font-size: x-large;">Day 2 

For more Prolog goodness, continue on to [Prolog, Day 
2](http://brikis98.blogspot.com/2012/02/seven-languages-in-seven-weeks-prolog_11.html). 