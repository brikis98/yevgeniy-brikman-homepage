---
layout: post
title: 'Seven Languages in Seven Weeks&#58; Prolog, Day 2'
date: '2012-02-11T19:44:00.000-08:00'
author: Yevgeniy Brikman
tags:
- Seven Languages in Seven Weeks
modified_time: '2012-02-16T13:14:07.950-08:00'
blogger_id: tag:blogger.com,1999:blog-5422014336627804072.post-1941102923960559811
blogger_orig_url: http://brikis98.blogspot.com/2012/02/seven-languages-in-seven-weeks-prolog_11.html
thumbnail_path: blog/seven-languages/book-cover.jpg
---

Today is the second day of Prolog in the [Seven Languages in Seven 
Weeks](https://www.ybrikman.com/writing/tags/#Seven%20Languages%20in%20Seven%20Weeks) 
series of blog posts. You can find the [first day of Prolog 
here](https://www.ybrikman.com/writing/2012/02/09/seven-languages-in-seven-weeks-prolog/). 

## Prolog, Day 2: Thoughts 

Today, Prolog broke my brain. The chapter started with recursion, lists, 
tuples, and pattern matching, all of which were tolerable if you've had prior 
exposure to functional programming. However, after that, we moved onto using 
unification as the primary construct for problem solving, and the gears in my 
head began to grind. 

It took me a while to wrap my head around using unification, but once it 
clicked, I was both elated and disappointed. I was elated because (a) I often 
get that way when I learn something new and (b) the book was clearly getting 
me to think about programming in a totally new manner. However, I was 
disappointed because even accomplishing something as trivial as adding all the 
values in a list required a recursive solution that seemed unnecessarily 
complicated: 

{% highlight prolog %}
sum(0, []).
sum(Total, [Head | Tail]) :- sum(Sum, Tail), Total is Head + Sum.
{% endhighlight %}

The algorithm starts with a base case: the sum of an empty list is 0. We then 
add a recursive case: the sum of a non-empty list is the head of the list plus 
the sum of the tail. This isn't too bad once you get used to it, but I find 
that this sort of code does *not* communicate its intent well at all. That is, 
I'm a believer that "programs must be written for people to read, and only 
incidentally for machines to execute" ([Structure and Interpretation of 
Computer 
Programs](http://www.amazon.com/Structure-Interpretation-Computer-Programs-Engineering/dp/0262011530/)) 
and this prolog code seems to be the exact opposite. Even for something as 
trivial as adding the values in a list, I find myself distracted by the need 
to do pattern matching on the list, recursive calls, and base cases. 

In fact, while I have no doubt that the declarative approach is very powerful 
for certain types of problems, it's not exactly what I expected when I first 
heard of declarative programming. Conceptually, I thought declarative 
programming would be all about *describing what the solution looks like*. From 
the Prolog I've seen so far, which is admittedly very little, I feel like what 
we're actually doing is setting up elaborate "traps" to force the unification 
engine to fill in the proper values for our variables. 

As a counter-example, here's how an "ideal" declarative programming might let 
me define the sum of a list: 

{% highlight text %}
sum([a1, a2, a3, ..., an]) = a1 + a2 + a3 + ... + an
{% endhighlight %}

To me, the "code" above *screams* it's intent far more clearly than the 
[recursive prolog 
solution](https://gist.github.com/1805899#file_sum_list.prolog). An even 
clearer example comes later in this blog post, where [I sort a list using 
Prolog](https://gist.github.com/1805899#file_sort_list.prolog). While writing 
this sorting code, I felt like I was playing a game of "how do I setup my 
rules and atoms to arm twist unification into sorting?" If I had designed 
Prolog using a [coding 
backwards](http://www.jeffknupp.com/blog/2012/02/07/coding-backwards/) 
approach, I would've strived to let the user define a sorted list in a much 
more natural manner: 

{% highlight text %}
sort(list) = 
  for i in [0..list.length]
    list[i] <= list[i + 1]  
{% endhighlight %}

**Update**: turns out it is possible to do something close to this. See the 
end of the post.

However, I admit freely that I'm no expert on compilers or language design, so 
perhaps I'm being naive. Maybe there's no way to define a syntax or compiler 
that can handle such simple looking definitions in the general case. Perhaps 
the unification approach in Prolog is as close as we can get and I just need 
time until my brain gets used to it more. 

## Prolog, Day 2: Problems 

### Reverse the elements of a list 

{% highlight prolog %}
reverse_list([], []).
reverse_list([Head | Tail], Out) :- reverse_list(Tail, TailReversed), append(TailReversed, [Head], Out).
{% endhighlight %}

### Find the smallest element of a list 

{% highlight prolog %}
min([Head | []], Head).
min([Head | Tail], TailMin) :- min(Tail, TailMin), TailMin =< Head.
min([Head | Tail], Head) :- min(Tail, TailMin), TailMin > Head.
{% endhighlight %}

A pretty simple problem, except that there doesn't seem to be a way to do an 
`if/else` statement in Prolog. Instead, to handle the possible outcomes of 
`TailMin =< Head` and `TailMin > Head`, I had to use pattern matching and a 
bit of copy &amp; paste. If anyone knows a more DRY way to do this, please 
let me know. 

### Sort the elements of a list 

{% highlight prolog %}
sort_list([], []).
sort_list([Head], [Head]).
sort_list([First, Second | Tail], Sorted) :-
  divide([First, Second | Tail], Left, Right),
  sort_list(Left, LeftSorted),
  sort_list(Right, RightSorted),
  merge(LeftSorted, RightSorted, Sorted).
 
merge(LeftList, [], LeftList).
merge([], RightList, RightList).
merge([LeftHead | LeftTail], [RightHead | RightTail], [LeftHead | Merged]) :- 
  LeftHead =< RightHead,
  merge(LeftTail, [RightHead | RightTail], Merged).
merge([LeftHead | LeftTail], [RightHead | RightTail], [RightHead | Merged]) :- 
  LeftHead > RightHead, 
  merge([LeftHead | LeftTail], RightTail, Merged).  
  
divide([], [], []).
divide([Head], [Head], []).
divide([First, Second | Tail], [First | Left], [Second | Right]) :-
  divide(Tail, Left, Right).
{% endhighlight %}
 
I implemented merge sort. In retrospect, this seems to somewhat defeat the 
purpose of declarative programming. That is, instead of describing the 
solution&mdash;that is, what a sorted list looks like&mdash;I'm effectively describing 
the individual steps it takes to sort a list. In other words, this is awfully 
close to imperative programming. 

Unfortunately, I couldn't think of a more "declarative" way of solving this. I 
initially wrote something similar to a selection sort: it recursively called 
`sort_list` on the tail until we got down to one item. At that point, it would 
use the `merge` method to arrange the head and tail in the proper order. As we 
went back up the recursion stack, the `merge` method would insert the head in 
the proper spot in the partial sublist. This was obviously less efficient, but 
at least the `sort_list` method looked declarative. If only there was a way to 
define it without a merge step, I'd be in business. 

### Fibonacci series 

{% highlight prolog %}
fib(1, 1).
fib(2, 1).
fib(N, Out) :- N > 2, N1 is N - 1, N2 is N - 2, fib(N1, Prev), fib(N2, PrevPrev), Out is Prev + PrevPrev.
{% endhighlight %}

I ran into two gotchas writing a fibonacci function: first, I had to remember 
that the recursive calls to `fib` are not really function calls and you can't 
just directly pass `N - 1` or `N - 2` as parameters. However, when defining `N1` 
and `N2`, I ran into a second gotcha: you need to use the `is` keyword instead 
of the equals (`=`) sign. 

### Factorial 

{% highlight prolog %}
fact(0, 1).
fact(N, Out) :- N > 0, N1 is N - 1, fact(N1, Prev), Out is N * Prev.
{% endhighlight %}

### UPDATE: eating humble pie 

Ok, I was wrong. It turns out you can write Prolog code that looks much more 
declarative and much less imperative. After reading through Day 3 of Prolog, I 
was a bit wiser, and was able to write the following code for sorting: 

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

I'm sure it's not as fast as the [merge 
sort](https://gist.github.com/1805899#file_sort_list.prolog) I wrote on my 
first attempt, but the intent is *much* clearer: I'm quite obviously 
describing what a sorted list should look like instead of walking through the 
steps of how to build one. The recursion and various language quirks of Prolog 
still take some getting used to, but from a readability perspective, I'm much 
happier with what I've been seeing since reading Day 3. 

## Moving right along 

Check out [Prolog: Day 
3](https://www.ybrikman.com/writing/2012/02/16/seven-languages-in-seven-weeks-prolog_16/) 
for some more declarative goodness, including an elegant Sudoku solver. 