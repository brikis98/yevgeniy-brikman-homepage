---
layout: post
title: 'Seven Languages in Seven Weeks: Scala, Day 1'
date: '2012-03-18T00:50:00.000-07:00'
author: Yevgeniy Brikman
tags:
- Seven Languages in Seven Weeks
- Software Engineering
modified_time: '2012-03-19T00:43:31.993-07:00'
blogger_id: tag:blogger.com,1999:blog-5422014336627804072.post-2014322375568438023
blogger_orig_url: http://brikis98.blogspot.com/2012/03/seven-languages-in-seven-weeks-scala.html
---

It's time for a new chapter in the [Seven Languages in Seven 
Weeks](http://brikis98.blogspot.com/search/label/Seven%20Languages%20in%20Seven%20Weeks) 
series: today, I take a crack at [Scala](http://www.scala-lang.org/). 

<span style="font-size: x-large;">**Scala, Day 1: Thoughts** 

After using Java for years, I was curious to try out Scala, which has often 
been described as the next step in the evolution of Java. Scala's feature list 
is impressive: object oriented, functional, type inferencing, traits/mixins, 
currying, pattern matching, concise syntax, interoperability with Java code, 
an active community, and so on. My previous experiences with Scala had been 
very shallow/short, so I was excited to take a slightly deeper dive. 

The first chapter introduced the imperative and object-oriented features of 
Scala and walked through the basic syntax. On the surface, the language looks 
like Java and uses many of the same keywords, so I was able to jump right in. 
However, I was quickly slowed down by some unexpected differences, including 
types specified *after* the variable name instead of before, "static" methods 
and fields separated into "companion classes" (confusingly named "objects"), 
and methods definitions sometimes including or omitting an equals sign and or 
parentheses depending on whether they return values or take parameters as 
inputs. 

I slowed down even more once I started looking at the functional programming 
concepts and, worst of all,  trying to make sense of the [API 
docs](http://www.scala-lang.org/api/current/index.html#package). Although they 
look thorough, the docs are astonishingly bad when you actually try to use 
them. For example, here is all the documentation provided for the "reduce" 
method of Scala's 
[List](http://www.scala-lang.org/api/current/scala/collection/immutable/List.html): 

<script 
src="https://gist.github.com/2069380.js?file=ScalaReduceDocumentation.txt"></script> 
If you're new to Scala's syntax, functional programming, or just a hacker 
trying to get something done, this sort of documentation is almost useless. 
Plain, human English or an example would be an order of magnitude more useful. 
The reduce concept isn't actually that hard to understand, but parsing the 
dense syntax of the method signature and phrases like "associative binary 
operator" makes it seem like a PhD is necessary to use this language. Compare 
this to the reduce documentation for 
[Ruby](http://www.ruby-doc.org/core-1.9.3/Enumerable.html#method-i-reduce) and 
[underscore.js](http://documentcloud.github.com/underscore/#reduce) to see a 
world of a difference. 

The type hierarchy also proved tough to navigate. For example, how do I find 
the closest common ancestor between 
[List](http://www.scala-lang.org/api/current/scala/collection/immutable/List.html) 
and 
[MutableList](http://www.scala-lang.org/api/current/scala/collection/mutable/MutableList.html)? 
I thought it might be LinearSeq, but there seem to be separate mutable and 
immutable versions of it. Other classes/traits further up the hierarchy 
overlap, but are missing common methods I need, such as "collect" or 
"foldLeft". Overall, this basic search was much harder than, for example, 
finding the common ancestor between Java libraries like 
[ArrayList](http://docs.oracle.com/javase/6/docs/api/java/util/ArrayList.html) 
and [Vector](http://docs.oracle.com/javase/6/docs/api/java/util/Vector.html): 
a glance at the top of the API doc and you're done. 

I also ran into difficulties with type inferencing. It definitely saved me 
some typing and looked beautiful for simple cases and closure parameters. 
However, type inference couldn't handle many cases that seemed obvious. This 
was compounded by the sub-par IDE support, at least from IntelliJ 11, which 
took a while to get working in the first place. I routinely found code that 
IntelliJ accepted wouldn't actually compile. Oh, and the compiler is *slow*. 
Ridiculously slow, given the tiny snippets of code I was testing. 

Having said that, I'm still a newbie to the language, and shouldn't complain 
too much. I'm sure I'll get used to the code, API, and Scala idioms. Still, 
there is value in being "hacker friendly": one of the reasons Ruby, PHP, and 
JavaScript have such huge user bases is because you can get started with them 
in *minutes*. And there's also something to say about complexity: Scala has *a 
lot* of features, syntax, and complicated concepts. I hope that these make the 
language more powerful and expressive rather than bloated and 
incomprehensible. 

## <span style="font-size: x-large;">Scala, Day 1: Problems 

## Build a two player Tic Tac Toe Game 

The code: 

<script 
src="https://gist.github.com/2069380.js?file=TicTacToe.scala"></script> 
Sample output: 

<script 
src="https://gist.github.com/2069380.js?file=TicTacToeOutput.txt"></script> 
I tried to keep the code fairly generic, so it should work for any NxN tic tac 
toe board. I also used this as an opportunity to play with some functional 
programming, so I intentionally stuffed everything into a List (albeit a 
mutable one), avoided for loops, too many objects, and so on. To be honest, 
I'm not thrilled with the result. 

I was able to use lots of one-liners, but many are hard to read. I got 
familiar with the fold, map, and filter methods, but in some cases, a for-loop 
would've been much cleaner (and faster). Overall, I just get the feeling that 
the code doesn't communicate its intent very well. I'd love some feedback from 
how a more seasoned Scala user would've tackled this problem. Would pattern 
matching be useful? Recursive calls on the head/tail of the List? Or is the 
imperative style with loops and a 2D array the best way to go? 

## <span style="font-size: x-large;">On to day 2 

Continue on to [Scala, Day 
2](http://brikis98.blogspot.com/2012/03/seven-languages-in-seven-weeks-scala_19.html). 