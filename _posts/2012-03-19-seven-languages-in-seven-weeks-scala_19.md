---
layout: post
title: 'Seven Languages in Seven Weeks: Scala, Day 2'
date: '2012-03-19T00:40:00.003-07:00'
author: Yevgeniy Brikman
tags:
- Seven Languages in Seven Weeks
- Software Engineering
modified_time: '2012-04-02T00:35:44.935-07:00'
blogger_id: tag:blogger.com,1999:blog-5422014336627804072.post-5121284092427066113
blogger_orig_url: http://brikis98.blogspot.com/2012/03/seven-languages-in-seven-weeks-scala_19.html
thumbnail_path: blog/seven-languages/book-cover.jpg
---

After a bumpy start with [Scala on Day 
1](http://brikis98.blogspot.com/2012/03/seven-languages-in-seven-weeks-scala.html), 
I've moved onto the second day of Scala in [Seven Languages in Seven 
Weeks](http://brikis98.blogspot.com/search/label/Seven%20Languages%20in%20Seven%20Weeks). 

## <span style="font-size: x-large;">Scala, Day 2: Thoughts 

The second Scala chapter shifts gears to functional programming. 
Unfortunately, I was impatient on Day 1 and had already looked up all of these 
concepts (and some more) to build a [Tic Tac Toe 
game](https://gist.github.com/2069380#file_tic_tac_toe.scala). As a result, I 
breezed through the chapter. 

On a side note, I was using Scala on a personal project and rewrote some Java 
code using Scala. As much as I complained yesterday about Scala's complexity, 
the slow compiler, and poor IDE support, I must admit one thing: the resulting 
code was *noticeably* cleaner, shorter, and easier to read. 

The language is certainly not perfect, but I need to make sure I'm not missing 
the forrest for the trees: it's still likely a vastly superior alternative to 
Java. 

## <span style="font-size: x-large;">Scala, Day 2: Problems 

The functional programming problems in this chapter were extremely simple. I 
burned through them in a few minutes and present the code without further 
comment: 

## String foldLeft 

Use *foldLeft *to compute the total size of a List of Strings. 

<script 
src="https://gist.github.com/2099982.js?file=SumStrings.scala"></script> 
## Censorship 

Write a *Censor* trait with a method that will replace "curse" words with 
"clean" alternatives. Read the curse words and alternatives from a file and 
store them in a Map. 

<script src="https://gist.github.com/2099982.js?file=Censor.scala"></script> 
<script src="https://gist.github.com/2099982.js?file=censor.txt"></script> 
## <span style="font-size: x-large;">On to day 3 

Learn about pattern matching and actors in [Scala, Day 
3](http://brikis98.blogspot.com/2012/04/seven-languages-in-seven-weeks-scala.html). 