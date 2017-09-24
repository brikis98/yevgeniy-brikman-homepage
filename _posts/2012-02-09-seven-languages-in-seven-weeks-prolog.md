---
layout: post
title: 'Seven Languages in Seven Weeks&#58; Prolog, Day 1'
date: '2012-02-09T14:21:00.000-08:00'
author: Yevgeniy Brikman
tags:
- Seven Languages in Seven Weeks
modified_time: '2012-02-11T19:47:00.415-08:00'
blogger_id: tag:blogger.com,1999:blog-5422014336627804072.post-1892100088835483576
blogger_orig_url: http://brikis98.blogspot.com/2012/02/seven-languages-in-seven-weeks-prolog.html
thumbnail_path: blog/seven-languages/book-cover.jpg
---

After finishing up [Io](http://en.wikipedia.org/wiki/Prolog), it's time to 
shift gears yet again in my [Seven Languages in Seven 
Weeks](https://www.ybrikman.com/writing/tags/#Seven%20Languages%20in%20Seven%20Weeks) 
series of blog posts. This time, it's time for something radically different: 
[Prolog](http://en.wikipedia.org/wiki/Prolog). 

## Prolog, Day 1: Thoughts 

The main goals of [Seven Languages in Seven 
Weeks](http://pragprog.com/book/btlang/seven-languages-in-seven-weeks) is not 
actually to teach you seven new *languages*, but to teach you seven new ways 
of *thinking*. In fact, the languages in the book are deliberately chosen so 
as to represent a wide spectrum of approaches to programming problems. 

While the first two languages, 
[Ruby](https://www.ybrikman.com/writing/2012/02/03/seven-languages-in-seven-weeks-io-day-1/) 
and 
[Io](https://www.ybrikman.com/writing/2012/01/29/seven-languages-in-seven-weeks-ruby-day/), 
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
1. Each value at position `i` in the output list is less than or equal to the 
value at position `i + 1`.

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

## Prolog, Day 1: Problems 

### Books and authors 

Make a simple knowledge base representing some of your favorite books and 
authors. Find all books in your knowledge base written by one author. 

Knowledge base: 

{% highlight prolog %}
book(a_game_of_thrones).
book(a_clash_of_kings).
book(the_road).
book(flatland).
book(the_adventures_of_sherlock_holmes).
book(one_flew_over_the_cuckoos_nest).
book(the_hitchhikers_guide_to_the_galaxy).
book(the_restaurant_at_the_end_of_the_universe).
book(life_the_universe_and_everything).
 
author(george_rr_martin).
author(cormac_mccarthy).
author(edwin_abbott).
author(aurthur_conan_doyle).
author(ken_kesey).
author(douglas_adams).
 
wrote(george_rr_martin, a_game_of_thrones).
wrote(george_rr_martin, a_clash_of_kings).
wrote(cormac_mccarthy, the_road).
wrote(edwin_abbott, flatland).
wrote(aurthur_conan_doyle, the_adventures_of_sherlock_holmes).
wrote(ken_kesey, one_flew_over_the_cuckoos_nest).
wrote(douglas_adams, the_hitchhikers_guide_to_the_galaxy).
wrote(douglas_adams, the_restaurant_at_the_end_of_the_universe).
wrote(douglas_adams, life_the_universe_and_everything).
{% endhighlight %}

Queries: 

{% highlight text %}
| ?- wrote(george_rr_martin, What).
 
What = a_game_of_thrones ? a
 
What = a_clash_of_kings
 
?- wrote(douglas_adams, What).
 
What = the_hitchhikers_guide_to_the_galaxy ? a
 
What = the_restaurant_at_the_end_of_the_universe
 
What = life_the_universe_and_everything
{% endhighlight %}

### Music and instruments 

Make a knowledge base representing musicians and instruments. Also represent 
musicians and their genre of music. Find all musicians who play the guitar. 

Knowledge base: 

{% highlight prolog %}
musician_plays(eric_clapton, guitar).
musician_plays(yo_yo_ma, cello).
musician_plays(jim_brickman, piano).
musician_plays(paul_mccartney, piano).
musician_plays(paul_mccartney, guitar).
musician_plays(jimi_hendrix, guitar).
musician_plays(slash, guitar).
musician_plays(ringo_starr, drums).
 
musician_genre(eric_clapton, rock).
musician_genre(eric_clapton, blues).
musician_genre(yo_yo_ma, classical).
musician_genre(jim_brickman, contemporary).
musician_genre(paul_mccartney, rock).
musician_genre(paul_mccartney, pop).
musician_genre(jimi_hendrix, rock).
musician_genre(jimi_hendrix, hard_rock).
musician_genre(slash, hard_rock).
musician_genre(ringo_starr, rock).
musician_genre(ringo_starr, pop).
{% endhighlight %}

Queries: 

{% highlight text %}
| ?- musician_plays(Who, guitar).
 
Who = eric_clapton ? a
 
Who = paul_mccartney
 
Who = jimi_hendrix
 
Who = slash
{% endhighlight %}

## Normalization?

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

## Day 2 

For more Prolog goodness, continue on to [Prolog, Day 
2](https://www.ybrikman.com/writing/2012/02/11/seven-languages-in-seven-weeks-prolog_11/). 