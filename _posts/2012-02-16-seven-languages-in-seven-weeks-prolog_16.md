---
layout: post
title: 'Seven Languages in Seven Weeks&#58; Prolog, Day 3'
date: '2012-02-16T13:12:00.000-08:00'
author: Yevgeniy Brikman
tags:
- Seven Languages in Seven Weeks
modified_time: '2012-03-18T00:52:20.478-07:00'
blogger_id: tag:blogger.com,1999:blog-5422014336627804072.post-3928701231743809829
blogger_orig_url: http://brikis98.blogspot.com/2012/02/seven-languages-in-seven-weeks-prolog_16.html
thumbnail_path: blog/seven-languages/book-cover.jpg
---

After a rocky [day 2 of 
Prolog](https://www.ybrikman.com/writing/2012/02/11/seven-languages-in-seven-weeks-prolog_11/), 
I'm back for a 3rd day in my [Seven Languages in Seven 
Weeks](https://www.ybrikman.com/writing/tags/#Seven%20Languages%20in%20Seven%20Weeks) 
series of blog posts. 

## Prolog, Day 3: Thoughts 

Today, I got to see Prolog flex its muscles. After just 2 days of using the 
language, we were already able to use it to solve two relatively complicated 
puzzles: [Sudoku](http://en.wikipedia.org/wiki/Sudoku) and [eight 
queens](http://en.wikipedia.org/wiki/Eight_queens_puzzle). Even more 
impressively, the Prolog solutions were remarkably elegant and concise. 

I had complained on the [previous 
day](https://www.ybrikman.com/writing/2012/02/11/seven-languages-in-seven-weeks-prolog_11/) 
that, for simple problems, the Prolog approach did not communicate its intent 
particularly well. Day 3 turns that completely around. For example, let's 
check out the 4x4 Sudoku solver in the book. Here's how you run it: 

{% highlight text %}
| ?- sudoku([_, _, 2, 3,
             _, _, _, _,
             _, _, _, _,
             3, 4, _, _],
             Solution).
 
 
S = [4,1,2,3,2,3,4,1,1,2,3,4,3,4,1,2]
{% endhighlight %}

And here is the code: 

{% highlight prolog %}
sudoku(Puzzle, Solution) :-
  Solution = Puzzle,
  
  Puzzle = [S11, S12, S13, S14,
            S21, S22, S23, S24,
            S31, S32, S33, S34,
            S41, S42, S43, S44],
  
  fd_domain(Solution, 1, 4),
  
  Row1 = [S11, S12, S13, S14],
  Row2 = [S21, S22, S23, S24],
  Row3 = [S31, S32, S33, S34],
  Row4 = [S41, S42, S43, S44],      
  
  Col1 = [S11, S21, S31, S41],
  Col2 = [S12, S22, S32, S42],
  Col3 = [S13, S23, S33, S43],
  Col4 = [S14, S24, S34, S44],      
  
  Square1 = [S11, S12, S21, S22],
  Square2 = [S13, S14, S23, S24],
  Square3 = [S31, S32, S41, S42],
  Square4 = [S33, S34, S43, S44],      
  
  valid([Row1, Row2, Row3, Row4,
         Col1, Col2, Col3, Col4,
         Square1, Square2, Square3, Square4]).
 
valid([]).
valid([Head | Tail]) :- fd_all_different(Head), valid(Tail).
{% endhighlight %}

Even if you don't know Prolog, the code is so eminently declarative and 
visual, that you can still get an idea of what's going on. We break the 4x4 
puzzle down into individual elements, rows, columns, and squares. After that, 
we just apply some constraints to them: all elements must have a value between 
1 and 4 (`fd_domain`) and the values in each row, column, and square must be 
different (`fd_all_different`). 

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

{% highlight prolog %}
sudoku6(Puzzle, Solution) :-
  Solution = Puzzle,
  
  Puzzle = [S11, S12, S13, S14, S15, S16,
            S21, S22, S23, S24, S25, S26,
            S31, S32, S33, S34, S35, S36,
            S41, S42, S43, S44, S45, S46,
            S51, S52, S53, S54, S55, S56, 
            S61, S62, S63, S64, S65, S66],
  
  fd_domain(Solution, 1, 6),
  
  Row1 = [S11, S12, S13, S14, S15, S16],
  Row2 = [S21, S22, S23, S24, S25, S26],
  Row3 = [S31, S32, S33, S34, S35, S36],
  Row4 = [S41, S42, S43, S44, S45, S46],      
  Row5 = [S51, S52, S53, S54, S55, S56],
  Row6 = [S61, S62, S63, S64, S65, S66],
  
  Col1 = [S11, S21, S31, S41, S51, S61],
  Col2 = [S12, S22, S32, S42, S52, S62],
  Col3 = [S13, S23, S33, S43, S53, S63],
  Col4 = [S14, S24, S34, S44, S54, S64],      
  Col5 = [S15, S25, S35, S45, S55, S65],      
  Col6 = [S16, S26, S36, S46, S56, S66],          
  
  Square1 = [S11, S12, S13, S21, S22, S23],
  Square2 = [S14, S15, S16, S24, S25, S26],
  Square3 = [S31, S32, S33, S41, S42, S43],
  Square4 = [S34, S35, S36, S44, S45, S46],
  Square5 = [S51, S52, S53, S61, S62, S63],
  Square6 = [S54, S55, S56, S64, S65, S66],
  
  valid([Row1, Row2, Row3, Row4, Row5, Row6, 
         Col1, Col2, Col3, Col4, Col5, Col6,
         Square1, Square2, Square3, Square4, Square5, Square6]),
  
  pretty_print([Row1, Row2, Row3, Row4, Row5, Row6]).
 
valid([]).
valid([Head | Tail]) :- fd_all_different(Head), valid(Tail).
  
pretty_print([Head | Tail]) :-
 print(Head),
 print('\n'),
 pretty_print(Tail).
{% endhighlight %}


The output: 

{% highlight text %}
| ?- sudoku6([1, _, _, _, _, _,
              _, 5, _, 2, _, _,
              _, 1, 6, _, 5, _, 
              _, 3, _, 6, 2, _, 
              _, _, 1, _, 3, _, 
              _, _, _, _, _, 5],
              Solution).
 
[1,2,3,5,4,6]
[6,5,4,2,1,3]
[2,1,6,3,5,4]
[4,3,5,6,2,1]
[5,6,1,4,3,2]
[3,4,2,1,6,5]
{% endhighlight %}

I took the easy way out on this problem, just extending the 4x4 solver to 
handle 6x6 puzzles with some copy and paste. 

## 9x9 Sudoku 

Modify the Sudoku solver to work on nine-by-nine puzzles. 

The code: 

{% highlight prolog %}
sudoku(Puzzle, Solution) :-
  length(Puzzle, L),
  Size is floor(sqrt(L)),
 
  Solution = Puzzle,
  fd_domain(Solution, 1, Size),
    
  slice(Puzzle, Rows, Size, 'row'),
  slice(Puzzle, Cols, Size, 'col'),
  slice(Puzzle, Squares, Size, 'square'),
  
  valid(Rows),
  valid(Cols),
  valid(Squares),
        
  pretty_print(Rows).
 
valid([]).
valid([Head | Tail]) :- fd_all_different(Head), valid(Tail).
 
sublist_length([], _).
sublist_length([Head | Tail], Length) :- length(Head, Length), sublist_length(Tail, Length).
 
nth0(I, List, Out) :- I1 is I + 1, nth(I1, List, Out).
 
insert_into_slice(Item, Values, X, Y) :-
  nth0(X, Values, Bucket),
  nth0(Y, Bucket, Item).
 
slice_position('row', Size, I, X, Y) :-   
  X is I // Size,
  Y is I mod Size.
 
slice_position('col', Size, I, X, Y) :- 
  X is I mod Size,
  Y is I // Size.
  
slice_position('square', Size, I, X, Y) :- 
  Size_Sqrt is floor(sqrt(Size)),
  X is (I mod Size // Size_Sqrt) + (Size_Sqrt * (I // (Size * Size_Sqrt))),
  Y is (I mod Size_Sqrt) + (Size_Sqrt * ((I mod (Size * Size_Sqrt)) // Size)).
 
slice(Puzzle, Slice, Size, Type) :- slice(Puzzle, Slice, Size, Type, 0).
slice(_, Slice, Size, _, I) :- I is Size * Size, length(Slice, Size), sublist_length(Slice, Size).
slice([Head | Tail], Slice, Size, Type, I) :-
  slice_position(Type, Size, I, X, Y), 
  insert_into_slice(Head, Slice, X, Y),
  I1 is I + 1,
  slice(Tail, Slice, Size, Type, I1).
 
pretty_print([Head | Tail]) :-
  print(Head),
  print('\n'),
  pretty_print(Tail).
{% endhighlight %}

The output: 

{% highlight text %}
| ?- sudoku([_, _, 2, 3,
             _, _, _, _,
             _, _, _, _,
             3, 4, _, _],
             Solution).
 
[4,1,2,3]
[2,3,4,1]
[1,2,3,4]
[3,4,1,2]
 
| ?- sudoku([5, 3, _, _, 7, _, _, _, _, 
             6, _, _, 1, 9, 5, _, _, _, 
             _, 9, 8, _, _, _, _, 6, _, 
             8, _, _, _, 6, _, _, _, 3,
             4, _, _, 8, _, 3, _, _, 1,
             7, _, _, _, 2, _, _, _, 6,
             _, 6, _, _, _, _, 2, 8, _,
             _, _, _, 4, 1, 9, _, _, 5,
             _, _, _, _, 8, _, _, 7, 9], 
             Solution).
 
[5,3,4,6,7,8,9,1,2]
[6,7,2,1,9,5,3,4,8]
[1,9,8,3,4,2,5,6,7]
[8,5,9,7,6,1,4,2,3]
[4,2,6,8,5,3,7,9,1]
[7,1,3,9,2,4,8,5,6]
[9,6,1,5,3,7,2,8,4]
[2,8,7,4,1,9,6,3,5]
[3,4,5,2,8,6,1,7,9]
{% endhighlight %}

With an even bigger puzzle, I finally decided to avoid copy and paste and 
build something more generic. The code above should be able to solve any NxN 
puzzle, where N is a perfect square (4x4, 9x9, 16x16, etc). 

The approach is the same as before: ensure the values are all in the range 
1..N, carve them into rows, columns, and squares, and check that no value in 
each row, column, or square repeats. 

The bulk of the work is done by a rule called `slice`: 

{% highlight prolog %}
slice([Head | Tail], Slice, Size, Type, I) :-
  slice_position(Type, Size, I, X, Y), 
  insert_into_slice(Head, Slice, X, Y),
  I1 is I + 1,
  slice(Tail, Slice, Size, Type, I1).
{% endhighlight %}

The goal of `slice` is to chop the `Puzzle` into a list of `N` sublists. Each 
sublist represents a row, column, or square (depending on the variable `Type`) 
in `Puzzle`. The `slice` rule takes one element at a time from `Puzzle` and 
uses one of the `slice_position` methods to put this element into the proper 
spot in its sublist. For example, here is `slice_position` for rows: 

{% highlight prolog %}
slice_position('row', Size, I, X, Y) :-   
  X is I // Size,
  Y is I mod Size.
{% endhighlight %}

For each element `I` of `Puzzle`, we first figure out which row (sublist) it 
lives in: `X = I // Size`. The `//` in prolog is a shortcut for integer 
division. We then figure out where in that sublist the element belongs: 
`Y = I mod Size`. Pretty simple. Squares, however, are a lot more complicated: 

{% highlight prolog %}
slice_position('square', Size, I, X, Y) :- 
  Size_Sqrt is floor(sqrt(Size)),
  X is (I mod Size // Size_Sqrt) + (Size_Sqrt * (I // (Size * Size_Sqrt))),
  Y is (I mod Size_Sqrt) + (Size_Sqrt * ((I mod (Size * Size_Sqrt)) // Size)).
{% endhighlight %}

To get the math right on this one, I got some help from 
[Hristo](http://www.linkedin.com/in/hristooskov). He even posted his reasoning 
on the [Math 
StackExchange](http://math.stackexchange.com/questions/109712/closed-form-equation-to-figure-out-sudoku-square-from-given-index) 
to see if anyone could come up with a formal proof for his formula. Once that 
piece was in place, the Sudoku solver was pumping out solutions to 9x9 puzzles 
in no time. 

## Wrapping up Prolog 

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
[Io](https://www.ybrikman.com/writing/2012/02/03/seven-languages-in-seven-weeks-io-day-1/) 
before it, Prolog suffers from the lack of an active online community. You can 
find *some* information via Google and StackOverflow, but it's often sparse 
and incomplete. The documentation is a bit scattered, seems to be written in a 
very academic language, and is often more confusing than helpful. Worst of 
all, there are several flavors/dialects of Prolog and the code from one often 
doesn't work in another. 

Having said all that, I have a suspicion that declarative programming is going 
to grow in popularity in the future (10+ years). Being able to just tell the 
computer *what* you want instead of *how* to get it could provide enormous 
leverage for programmer productivity and creativity. Of course, I think we'll 
need a language more intuitive and expressive than Prolog, as well as a smart 
enough compiler to understand it, but the declarative approach to coding seems 
like a much bigger leap forward than, say, the whole object oriented vs. 
functional programming debate. 

## Onto the next chapter! 

Changing gears one more time, head over to [Scala, Day 
1](https://www.ybrikman.com/writing/2012/03/18/seven-languages-in-seven-weeks-scala/) 
to learn about a language that mixes OO and functional programming. 