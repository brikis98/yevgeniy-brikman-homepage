---
layout: post
title: 'Seven Languages in Seven Weeks: Io, Day 2'
date: '2012-02-04T14:07:00.000-08:00'
author: Yevgeniy Brikman
tags:
- Seven Languages in Seven Weeks
- Software Engineering
modified_time: '2012-02-11T19:47:00.433-08:00'
blogger_id: tag:blogger.com,1999:blog-5422014336627804072.post-6838053320631947816
blogger_orig_url: http://brikis98.blogspot.com/2012/02/seven-languages-in-seven-weeks-io-day-2.html
---

Today is Day 2 of [Io](http://iolanguage.com/) in my [Seven Languages in Seven 
Weeks](http://brikis98.blogspot.com/search/label/Seven%20Languages%20in%20Seven%20Weeks) 
series of blog posts. You can check out [Day 1 of IO 
here](http://brikis98.blogspot.com/2012/02/seven-languages-in-seven-weeks-io-day-1.html). 
<div> 
<div>**<span style="font-size: x-large;">Io, Day 2: Thoughts**<div> 
<div>Day 2 made some huge leaps and bounds over the basic syntax introduced in 
Day 1. The key learning from this day is that in Io, just about everything is 
a message sent to an object. There aren't separate semantics for calling 
functions, using control structures, or defining objects: those are all just 
objects reacting to some sort of message.<div> 
<div>One of the most startling examples of this is the realization that even 
the basic operators in Io, such as +, -, and *, are actually messages. That 
is, the code "2 + 5" is actually understood as the message "+" being sent to 
the object 2 with 5 as a parameter. In other words, it could be re-written as 
"2 +(5)". The "+", then, is just a method defined on the number object that 
takes another number as a parameter.<div> 
<div>This makes supporting operators on custom objects simple: all I have to 
do is define a "slot" with the operator's name. For example, here's an object 
for complex numbers that can be used with the "+" operator: 

<script 
src="https://gist.github.com/1736622.js?file=ComplexNumbers.io"></script> 
<div>I found this fairly eye opening. As I think of the syntaxes of other 
languages I'm used to, such as Java, there are "special cases" all over the 
place. For example, the "+" operator has special code to handle addition for 
numbers and String concatenation and nothing else; for loops, while loops, if 
statements, defining classes, and so on are all special syntax features. In 
Io, they are all just objects responding to messages. 

## <span style="font-size: x-large;">Io, Day 2: Problems 

## Fibonacci 

Write a program to find the nth [Fibonacci 
number](http://en.wikipedia.org/wiki/Fibonacci_number). Both the recursive and 
iterative solutions are included: 


<script src="https://gist.github.com/1736622.js?file=Fibonacci.io"></script> 
## Safe division 

How would you change the "/" operator to return 0 if the denominator is zero? 

<script 
src="https://gist.github.com/1736622.js?file=SafeDivision.io"></script> 
## 2d add 

Write a program to add up all the values in a 2-dimensional array. 

<script src="https://gist.github.com/1736622.js?file=Sum2dArray.io"></script> 
## myAverage 

Add a slot called "myAverage" to a list that computes the average of all the 
numbers in a list. Bonus: raise an exception if any item in the list is not a 
number. 

<script src="https://gist.github.com/1736622.js?file=myAverage.io"></script> 
## Two Dimensional List 

Write a prototype for a two-dimensional list. The dim(x, y) method should 
allocate a list of y lists that are x elements long. set(x, y, value) should 
set a value and get(x, y) should return that value. Write a transpose method 
so that new_matrix get(y, x) == original_matrix get(x, y). Write the matrix to 
a file and read the matrix from a file. 

<script 
src="https://gist.github.com/1736622.js?file=TwoDimensionalArray.io"></script> 
## Guess Number 

Write a program that gives you ten tries to guess a random number from 1-100. 
Give a hint of "hotter" or "colder" for each guess after the first one. 

<script src="https://gist.github.com/1736622.js?file=GuessNumber.io"></script> 
## <span style="font-size: x-large;">On to day 3! 

Continue on to [day 3 of Io 
here](http://brikis98.blogspot.com/2012/02/seven-languages-in-seven-weeks-io-day-3.html). 