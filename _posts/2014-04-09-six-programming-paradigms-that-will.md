---
layout: post
title: Six programming paradigms that will change how you think about coding
date: '2014-04-09T11:58:00.000-07:00'
author: Yevgeniy Brikman
tags:
- Software Engineering
modified_time: '2014-05-17T14:37:36.165-07:00'
thumbnail_path: blog/programming-paradigms/idris.png
blogger_id: tag:blogger.com,1999:blog-5422014336627804072.post-2823320023562008049
blogger_orig_url: http://brikis98.blogspot.com/2014/04/six-programming-paradigms-that-will.html
add_to_popular_list: true
---

*Update #1: this post hit the front page of 
[r/programming](http://www.reddit.com/r/programming/comments/22nhb2/six_programming_paradigms_that_will_change_how/) 
and [HN](https://news.ycombinator.com/item?id=7565153). Thank you for the 
great feedback! I've added some corrections below.* 

*Update #2: this blog post has been translated into [Japanese](http://postd.cc/six-programming-paradigms-that-will/)!*

Every now and then, I stumble across a programming language that does 
something so different that it changes how I think about coding. In this post, 
I want to share some of my favorite finds. 

This is not your grandma's "functional programming will change the world!" 
blog post: this list is much more esoteric. I'd wager most readers haven't 
heard of the majority of the languages and paradigms below, so I hope you have 
as much fun learning about these new concepts as I did. 

Note: I have only minimal experience with most of the languages below: I find 
the ideas behind them fascinating, but claim no expertise in them, so please 
point out any corrections and errors. Also, if you've found any new paradigms 
and ideas not covered here, please share them! 

## Concurrent by default

{% include figure.html path="blog/programming-paradigms/anic.jpg" caption="Anic" url="https://code.google.com/p/anic/" %}

Example languages: [ANI](https://code.google.com/p/anic/), [Plaid](http://www.cs.cmu.edu/~aldrich/plaid/) 

Let's kick things off with a real mind bender: there are programming languages 
out there that are concurrent by default. That is, every line of code is 
executed in parallel! 

For example, imagine you wrote three lines of code, A, B, and C: 

{% highlight text %}
A;
B;
C;
{% endhighlight %}

In most programming languages, A would execute first, then B, and then C. In a 
language like [ANI](https://code.google.com/p/anic/), A, B, and C would all 
execute at the same time! 

Control flow or ordering between lines of code in 
[ANI](https://code.google.com/p/anic/) is merely a side effect of explicit 
dependencies between lines of code. For example, if B had a reference to a 
variable defined in A, then A and C would execute at the same time, and B 
would execute only after A finished. 

Let's look at an example in ANI. As described in the 
[tutorial](https://code.google.com/p/anic/wiki/Tutorial), ANI programs 
consists of "pipes" and "latches" that are used to manipulate streams and data 
flows. The unusual syntax is tough to parse, and the language seems dead, but 
the concepts are pretty interesting. 

Here's a "Hello World" example in ANI: 

{% highlight text %}
"Hello, World!" ->std.out
{% endhighlight %}

In ANI terminology, we are sending the `"Hello, World!"` object (a string) 
to the `std.out` stream. What happens if we send another string to 
`std.out`? 

{% highlight text %}
"Hello, World!" ->std.out
"Goodbye, World!" ->std.out
{% endhighlight %}

Both of these lines of code execute in parallel, so they could end up in any order in 
the console. Now, look what happens when we introduce a variable on one line 
and reference it later: 

{% highlight text %}
s = [string\];
"Hello, World!" ->s;
\s ->std.out;
{% endhighlight %}

The first line declares a "latch" (latches are a bit like variables) called 
`s` that contains a string; the second line sends the text 
`"Hello, World!"` to `s`; the third line "unlatches" 
`s` and sends the contents to `std.out`. Here, you can 
see ANI's implicit program sequencing: since each line depends on the previous 
one, this code will execute in the order it is written. 

The [Plaid language](http://www.cs.cmu.edu/~aldrich/plaid/) also claims to 
support concurrency by default, but uses a permissions model, as described in 
[this 
paper](http://www.cs.cmu.edu/~aldrich/papers/onward2009-concurrency.pdf), to 
setup control flow. Plaid also explores other interesting concepts, such as 
[Typestate-Oriented 
Programming](http://www.cs.cmu.edu/~aldrich/papers/onward2009-state.pdf), 
where state changes become a first class citizen of the language: you define 
objects not as classes, but as a series of states and transitions that can be 
checked by the compiler. This seems like an interesting take on exposing 
*time* as a first class language construct as discussed in Rich Hickey's [Are 
we there yet](http://www.infoq.com/presentations/Are-We-There-Yet-Rich-Hickey) 
talk. 

Multicore is on the rise and concurrency is still harder than it should be in 
most languages. ANI and Plaid offer a fresh take on this problem that 
could lead to amazing performance gains; the question is whether "parallel by 
default" makes concurrency easier or harder to manage. 

*Update: the description above captures the basic essence of ANI and Plaid, 
but I used the terms "concurrent" and "parallel" interchangeably, even though 
they have different meanings. See [Concurrency Is Not 
Parallelism](http://vimeo.com/49718712) for more info.* 

## Dependent types 

{% include figure.html path="blog/programming-paradigms/idris.png" caption="Idris" url="http://www.idris-lang.org/" %}

Example languages: [Idris](http://www.idris-lang.org/), 
[Agda](http://wiki.portal.chalmers.se/agda/pmwiki.php), 
[Coq](http://en.wikipedia.org/wiki/Coq) 

You're probably used to type systems in languages like C and Java, where the 
compiler can check that a variable is an integer, list, or string. But what if 
your compiler could check that a variable is "a positive integer", "a list of 
length 2", or "a string that is a palindrome"? 

This is the idea behind languages that support [dependent 
types](http://en.wikipedia.org/wiki/Dependent_type): you can specify *types* 
that can check the *value* of your variables at *compile time*. The [shapeless 
library](https://github.com/milessabin/shapeless) for Scala adds partial, 
experimental support (read: probably not ready for primetime) for dependent 
types to Scala and offers an easy way to see some examples. 

Here is how you can declare a `Vector` that contains the values 1, 
2, 3 with the shapeless library: 

{% highlight scala %}
val l1 = 1 :#: 2 :#: 3 :#: VNil
{% endhighlight %}

This creates a variable `l1` who's type signature specifies not only 
that it's a `Vector` that contains `Ints`, but also that 
it is a `Vector` of length 3. The compiler can use this information 
to catch errors. Let's use the `vAdd` method in `Vector` to perform a pairwise 
addition between two `Vectors`: 

{% highlight scala %}
val l1 = 1 :#: 2 :#: 3 :#: VNil
val l2 = 1 :#: 2 :#: 3 :#: VNil
 
val l3 = l1 vAdd l2
 
// Result: l3 = 2 :#: 4 :#: 6 :#: VNil
{% endhighlight %}

The example above works fine because the type system knows both 
`Vectors` have length 3. However, if we tried to `vAdd` 
two `Vectors` of different lengths, we'd get an error at *compile 
time* instead of having to wait until run time! 

{% highlight scala %}
val l1 = 1 :#: 2 :#: 3 :#: VNil
val l2 = 1 :#: 2 :#: VNil
 
val l3 = l1 vAdd l2
 
// Result: a *compile* error because you can't pairwise add vectors 
// of different lengths!
{% endhighlight %}

Shapeless is an amazing library, but from what I've seen, it's still a bit rough, only 
supports a subset of dependent typing, and leads to fairly verbose code and 
type signatures. [Idris](http://www.idris-lang.org/), on the other hand, makes 
types a first class member of the programming language, so the dependent type 
system seems much more powerful and clean. For a comparison, check out the 
[Scala vs Idris: Dependent Types, Now and in the 
Future](http://www.infoq.com/presentations/scala-idris) talk. 

[Formal verification methods](http://en.wikipedia.org/wiki/Formal_verification) have been around 
for a long type, but were often too cumbersome to be usable for general 
purpose programming. Dependent types in languages like Idris, and perhaps even 
Scala in the future, may offer lighter-weight and more practical alternatives 
that still dramatically increase the power of the type system in catching 
errors. Of course, no dependent type system can catch all errors due to to 
ineherent limitations from the halting problem, but if done well, dependent 
types may be the next big leap for static type systems. 

## Concatenative languages 

{% include figure.html path="blog/programming-paradigms/cat.jpg" caption="Cat" url="http://www.cat-language.com/index.html" %}

Example languages: [Forth](http://www.forth.com/forth/), 
[cat](http://www.cat-language.com/), [joy](http://c2.com/cgi/wiki?JoyLanguage) 

Ever wonder what it would be like to program without variables and function 
application? No? Me neither. But apparently some folks did, and they came up 
with [concatenative 
programming](http://en.wikipedia.org/wiki/Concatenative_programming_language). 
The idea is that everything in the language is a function that pushes data 
onto a stack or pops data off the stack; programs are built up almost 
exclusively through functional composition ([concatenation is 
composition](http://concatenative.org/wiki/view/Concatenative%20language/Concatenation%20is%20composition)). 

This sounds pretty abstract, so let's look at a simple example in 
[cat](http://www.cat-language.com/): 

{% highlight text %}
2 3 +
{% endhighlight %}

Here, we push two numbers onto the stack and then call the `+` function, 
which pops both numbers off the stack and pushes the result of adding them 
back onto the stack: the output of the code is 5. Here's a slightly more 
interesting example: 

{% highlight text %}
def foo {
  10 <
  [ 0 ]
  [ 42 ]
  if
}
 
20
foo
{% endhighlight %}

Let's walk through this line by line: 

1. First, we declare a function `foo`. Note that functions in cat 
specify no input parameters: all parameters are implicitly read from the 
stack. 
1. `foo` calls the `<` function, which pops the first 
item on the stack, compares it to 10, and pushes either `True` or 
`False` back onto the stack. 
1. Next, we push the values 0 and 42 onto the stack: we wrap them in brackets 
to ensure they get pushed onto the stack unevaluated. This is because they 
will be used as the "then" and "else" branches (respectively) for the call to 
the `if` function on the next line. 
1. The `if` function pops 3 items off the stack: the boolean 
condition, the "then" branch, and the "else" branch. Depending on the value of 
the boolean condition, it'll push the result of either the "then" or "else" 
branch back onto the stack. 
1. Finally, we push 20 onto the stack and call the `foo` function. 
1. When all is said and done, we'll end up with the number 42. 

For a much more detailed introduction, check out [The Joy of Concatenative 
Languages](http://www.codecommit.com/blog/cat/the-joy-of-concatenative-languages-part-1). 

This style of programming has some interesting properties: programs can be 
split and concatenated in countless ways to create new programs; remarkably 
minimal syntax (even more minimal than LISP) that leads to very concise 
programs; strong meta programming support. I found concatenative programming 
to be an eye opening thought experiment, but I'm not sold on its practicality. 
It seems like you have to remember or imagine the current state of the stack 
instead of being able to read it from the variable names in the code, which 
can make it hard to reason about the code. 

## Declarative programming 

{% include figure.html path="blog/programming-paradigms/prolog.png" caption="GNU Prolog" url="http://gprolog.univ-paris1.fr/" %}

Example languages: [Prolog](http://en.wikipedia.org/wiki/Prolog), 
[SQL](http://en.wikipedia.org/wiki/SQL) 

[Declarative 
programming](http://en.wikipedia.org/wiki/Declarative_programming) has been 
around for many years, but most programmers are still unaware of it as a 
concept. Here's the gist: in most mainstream languages, you describe *how* to 
solve a particular problem; in declarative languages, you merely describe *the 
result you want*, and the language itself figures out how to get there. 

For example, if you're writing a sorting algorithm from scratch in C, you 
might write the instructions for merge sort, which describes, step by step, 
how to recursively split the data set in half and merge it back together in 
sorted order: [here's an 
example](http://www.cs.cityu.edu.hk/~lwang/ccs4335/mergesort.c). If you were 
sorting numbers in a declarative language like 
[Prolog](http://en.wikipedia.org/wiki/Prolog), you'd instead describe the 
output you want: "I want the same list of values, but each item at index 
`i` should be less than or equal to the item at index `i + 1`". Compare the 
previous C solution to this Prolog code: 

{% highlight prolog %}
sort_list(Input, Output) :-
  permutation(Input, Output),
  check_order(Output).
  
check_order([]).
check_order([Head]).
check_order([First, Second | Tail]) :-
  First =< Second,
  check_order([Second | Tail]).
{% endhighlight %}

If you've used SQL, you've done a form of declarative programming and may not have 
realized it: when you issue a query like `select X from Y where Z`, 
you are describing the data set you'd like to get back; it's the database 
engine that actually figures out *how* to execute the query. You can use the 
explain command in most databases to see the execution plan and figure out 
what happened under the hood. 

The beauty of declarative languages is that they allow you to work at a much 
higher level of abstraction: your job is just to describe the specification 
for the output you want. For example, the code for a simple [sudoku solver in 
prolog](https://www.ybrikman.com/writing/2012/02/16/seven-languages-in-seven-weeks-prolog_16/) 
just lists out what each row, column, and diagonal of a solved sudoku puzzle 
should look like: 

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

Here is how you would run the sudoku solver above: 

{% highlight text %}
| ?- sudoku([_, _, 2, 3,
             _, _, _, _,
             _, _, _, _,
             3, 4, _, _],
             Solution).
 
 
S = [4,1,2,3,2,3,4,1,1,2,3,4,3,4,1,2]
{% endhighlight %}

The downside, unfortunately, is that declarative programming languages can easily 
hit performance bottlenecks. The naive sorting algorithm above is likely 
`O(n!)`; the sudoku solver above does a brute force search; and 
most developers have had to provide database hints and extra indices to avoid 
expensive and inefficient plans when executing SQL queries. 

## Symbolic programming 

{% include figure.html path="blog/programming-paradigms/aurora.png" caption="Aurora" url="https://www.youtube.com/watch?v=L6iUm_Cqx2s" %}

Example languages: [Aurora](https://www.youtube.com/watch?v=L6iUm_Cqx2s) 

The [Aurora](https://www.youtube.com/watch?v=L6iUm_Cqx2s) language is an 
example of [symbolic 
programming](http://en.wikipedia.org/wiki/Symbolic_programming): the "code" 
you write in these languages can include not only plain text, but also images, 
math equations, graphs, charts, and more. This allows you to manipulate and 
describe a large variety of data in the format native to that data, instead of 
describing it all in text. Aurora is also completely interactive, showing you 
the results from each line of code instantly, like a REPL on steroids. 

{% include iframe.html url="//www.youtube.com/embed/L6iUm_Cqx2s" %}

The Aurora language was created by [Chris 
Granger](http://www.chris-granger.com/), who also built the [Light Table 
IDE](http://www.lighttable.com/). Chris outlines the motivation for Aurora in 
his post [Toward a better 
programming](http://www.chris-granger.com/2014/03/27/toward-a-better-programming/): 
some of the goals are to make programming more observable, direct, and reduce 
incidental complexity. For more info, be sure to see [Bret 
Victor's](http://worrydream.com/) incredible talks: [Inventing on 
Principle](http://vimeo.com/36579366), [Media for Thinking the 
Unthinkable](http://vimeo.com/67076984), and [Learnable 
Programming](http://worrydream.com/#!/LearnableProgramming). 

*Update: "symbolic programming" is probably not the right term to use for 
Aurora. See the [Symbolic 
programming](http://en.wikipedia.org/wiki/Symbolic_programming) wiki for more 
info.* 

## Knowledge-based programming 

{% include figure.html path="blog/programming-paradigms/wolfram.png" caption="Wolfram Language" url="https://www.wolfram.com/language/" %}

Examples: [Wolfram Language](https://www.wolfram.com/language/) 

Much like the Aurora language mentioned above, The [Wolfram 
Language](https://www.wolfram.com/language/) is also based on symbolic 
programming. However, the symbolic layer is merely a way to provide a 
consistent interface to the core of the Wolfram Language, which is 
knowledge-based programming: built into the language is a *vast* array of 
libraries, algorithms, and data. This makes it easy to do everything from 
graphing your Facebook connections, to manipulating images, to looking up the 
weather, processing natural language queries, plotting directions on a map, 
solving mathematical equations, and much more. 

{% include iframe.html url="//www.youtube.com/embed/_P9HqHVPeik" %}
 
I suspect the Wolfram Languages has the largest "standard library" and data 
set of any language in existence. I'm also excited by the idea that Internet 
connectivity is an inherent part of *writing* the code: it's almost like an 
IDE where the auto-complete function does a google search. It'll be very 
interesting to see if the symbolic programming model is as flexible as Wolfram 
claims and can truly take advantage of all of this data. 

*Update: although Wolfram claims the Wolfram Language supports "symbolic 
programming" and "knowledge programming", these terms have slightly different 
definitions. See the [Knowledge 
level](http://en.wikipedia.org/wiki/Knowledge_level) and [Symbolic 
Programming](http://en.wikipedia.org/wiki/Symbolic_programming) wikis for more 
info.* 