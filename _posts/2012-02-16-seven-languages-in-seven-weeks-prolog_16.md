---
layout: post
title: 'Seven Languages in Seven Weeks: Prolog, Day 3'
date: '2012-02-16T13:12:00.000-08:00'
author: Yevgeniy Brikman
tags:
- Seven Languages in Seven Weeks
- Software Engineering
modified_time: '2012-03-18T00:52:20.478-07:00'
blogger_id: tag:blogger.com,1999:blog-5422014336627804072.post-3928701231743809829
blogger_orig_url: http://brikis98.blogspot.com/2012/02/seven-languages-in-seven-weeks-prolog_16.html
---

After a rocky [day 2 of 
Prolog](http://brikis98.blogspot.com/2012/02/seven-languages-in-seven-weeks-prolog_11.html), 
I'm back for a 3rd day in my [Seven Languages in Seven 
Weeks](http://brikis98.blogspot.com/search/label/Seven%20Languages%20in%20Seven%20Weeks) 
series of blog posts. 

## <span style="font-size: x-large;">Prolog, Day 3: Thoughts 

Today, I got to see Prolog flex its muscles. After just 2 days of using the 
language, we were already able to use it to solve two relatively complicated 
puzzles: [Sudoku](http://en.wikipedia.org/wiki/Sudoku) and [eight 
queens](http://en.wikipedia.org/wiki/Eight_queens_puzzle). Even more 
impressively, the Prolog solutions were remarkably elegant and concise. 

I had complained on the [previous 
day](http://brikis98.blogspot.com/2012/02/seven-languages-in-seven-weeks-prolog_11.html) 
that, for simple problems, the Prolog approach did not communicate its intent 
particularly well. Day 3 turns that completely around. For example, let's 
check out the 4x4 Sudoku solver in the book. Here's how you run it: 

<script 
src="https://gist.github.com/1834944.js?file=sudoku4_output.txt"></script> 
And here is the code: 

<script src="https://gist.github.com/1834944.js?file=sudoku4.prolog"></script> 
Even if you don't know Prolog, the code is so eminently declarative and 
visual, that you can still get an idea of what's going on. We break the 4x4 
puzzle down into individual elements, rows, columns, and squares. After that, 
we just apply some constraints to them: all elements must have a value between 
1 and 4 (*fd_domain*) and the values in each row, column, and square must be 
different (*fd_all_different*). 

And that's it. 

A few lines of code and the Prolog compiler figures out values that satisfy 
these criteria to get you a solution. Although not an entirely even 
comparison, take a look at Sudoku solvers I found online in 
[Ruby](https://github.com/h00s/Ruby-Sudoku-Solver/blob/master/sudoku_solver.rb), 
[Java](http://www.colloquial.com/games/sudoku/Sudoku.java), and 
[C++](http://snipplr.com/view/49254/). I'm sure each of these imperative 
solutions could be made prettier; perhaps they are faster; but none of them 
comes close to the declarative solution in terms of communicating the code's 
intent. 

## 6x6 Sudoku 

Modify the Sudoku solver to work on six-by-six puzzles, where squares are 3x2. 
Also, make the solver print prettier solutions. 

The code: 

<script src="https://gist.github.com/1834944.js?file=sudoku6.prolog"></script> 
The output: 

<script 
src="https://gist.github.com/1834944.js?file=sudoku6_output.txt"></script> 
I took the easy way out on this problem, just extending the 4x4 solver to 
handle 6x6 puzzles with some copy and paste. 

## 9x9 Sudoku 

Modify the Sudoku solver to work on nine-by-nine puzzles. 

The code: 

<script src="https://gist.github.com/1834944.js?file=sudoku.prolog"></script> 
The output: 

<script 
src="https://gist.github.com/1834944.js?file=sudoku_output.txt"></script> 
With an even bigger puzzle, I finally decided to avoid copy and paste and 
build something more generic. The code above should be able to solve any NxN 
puzzle, where N is a perfect square (4x4, 9x9, 16x16, etc). 

The approach is the same as before: ensure the values are all in the range 
1..N, carve them into rows, columns, and squares, and check that no value in 
each row, column, or square repeats. 

The bulk of the work is done by a rule called *slice*: 

<script src="https://gist.github.com/1834944.js?file=slice.prolog"></script> 
The goal of *slice *is to chop the *Puzzle *into a list of N sublists. Each 
sublist represents a row, column, or square (depending on the variable *Type*) 
in *Puzzle*. The *slice* rule takes one element at a time from *Puzzle* and 
uses one of the *slice_position* methods to put this element into the proper 
spot in its sublist. For example, here is *slice_position* for rows: 

<script 
src="https://gist.github.com/1834944.js?file=slice_position_row.prolog"></script> 
For each element *I* of *Puzzle*, we first figure out which row (sublist) it 
lives in: *X = I // Size*. The *//* in prolog is a shortcut for integer 
division. We then figure out where in that sublist the element belongs: *Y = I 
mod Size*. Pretty simple. Squares, however, are a lot more complicated: 

<script 
src="https://gist.github.com/1834944.js?file=slice_position_square.prolog"></script> 
To get the math right on this one, I got some help from 
[Hristo](http://www.linkedin.com/in/hristooskov). He even posted his reasoning 
on the [Math 
StackExchange](http://math.stackexchange.com/questions/109712/closed-form-equation-to-figure-out-sudoku-square-from-given-index) 
to see if anyone could come up with a formal proof for his formula. Once that 
piece was in place, the Sudoku solver was pumping out solutions to 9x9 puzzles 
in no time. 

## <span style="font-size: x-large;">Wrapping up Prolog 

Prolog is a fascinating language. If you've done imperative programming your 
whole life, you really owe it to yourself to try it out. It's a refreshingly 
different approach to problem solving that will definitely impact the way you 
think. 

I found it particularly bizarre to be manipulating the *solution or output* to 
some programming puzzle, even though the solution wasn't yet known! Of course, 
in Prolog, you're not actually *manipulating *the solution, you're merely 
describing and defining it. Sometimes it was easy to invert my thinking this 
way; at other times, it was brutally difficult, like trying to mentally 
reverse the direction of the [spinning girl 
illusion](http://flavor8.com/index.php/2007/06/26/spinning-woman-optical-illusion/). 

Unfortunately, much like 
[Io](http://brikis98.blogspot.com/2012/02/seven-languages-in-seven-weeks-io-day-1.html) 
before it, Prolog suffers from the lack of an active online community. You can 
find *some* information via Google and StackOverflow, but it's often sparse 
and incomplete. The documentation is a bit scattered, seems to be written in a 
very academic language, and is often more confusing than helpful. Worst of 
all, there are several flavors/dialects of Prolog and the code from one often 
doesn't work in another. 

Having said all that, I have a suspicion that declarative programming is going 
to grow in popularity in the future (10+ years). Being able to just tell the 
computer *what *you want instead of *how* to get it could provide enormous 
leverage for programmer productivity and creativity. Of course, I think we'll 
need a language more intuitive and expressive than Prolog, as well as a smart 
enough compiler to understand it, but the declarative approach to coding seems 
like a much bigger leap forward than, say, the whole object oriented vs. 
functional programming debate. 

## <span style="font-size: x-large;">Onto the next chapter! 

Changing gears one more time, head over to [Scala, Day 
1](http://brikis98.blogspot.com/2012/03/seven-languages-in-seven-weeks-scala.html) 
to learn about a language that mixes OO and functional programming. 