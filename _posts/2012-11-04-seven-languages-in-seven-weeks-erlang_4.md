---
layout: post
title: 'Seven Languages in Seven Weeks&#58; Erlang, Day 2'
date: '2012-11-04T20:29:00.002-08:00'
author: Yevgeniy Brikman
tags:
- Seven Languages in Seven Weeks
modified_time: '2012-11-04T20:29:36.156-08:00'
blogger_id: tag:blogger.com,1999:blog-5422014336627804072.post-5833130757249896035
blogger_orig_url: http://brikis98.blogspot.com/2012/11/seven-languages-in-seven-weeks-erlang_4.html
thumbnail_path: blog/seven-languages/book-cover.jpg
---

After learning some basic Erlang syntax on [Day 
1](https://www.ybrikman.com/writing/2012/11/04/seven-languages-in-seven-weeks-erlang/), 
I take on the second Erlang chapter, which introduces some more interesting 
concepts. 

## Erlang, Day 2: Thoughts 

I'm finding it very easy to dive into Erlang. After going through the Prolog 
and Scala chapters of this book, as well as making heavy use of Scala at work, 
the functional constructs used in Erlang feel natural. I've grown very fond of 
pattern matching in the last few months and have found it to be a very 
powerful tool for expressing complex concepts in a very concise and readable 
manner. Erlang's heavy reliance on pattern matching makes me happy. 

However, the syntax does feel slightly clunky: I constantly forget to end 
lines with dots and separating clauses of control structures with semi-colons 
gets annoying. I suspect this is something you get used to. Moreover, the end 
result, at least in the dead-simple code snippets I've looked at so far, is 
pleasantly readable. 

## Erlang, Day 2: Problems 

### List lookup 

Consider a list of keyword-value tuples, such as 
`[{erlang, "a functional language"}, {ruby, "an OO language"}]`. Write a 
function that accepts the list and a keyword and returns the associated value 
for the keyword. 

My implementation: 

{% highlight erlang %}
-module(list_lookup).
-export([lookup/2]).
 
lookup(List, Keyword) -> do_lookup(List, Keyword).
 
do_lookup([{Keyword, Value}|_], Keyword) -> Value;
do_lookup([_|Tail], Keyword) -> do_lookup(Tail, Keyword).
{% endhighlight %}

### Shopping list price 

Consider a shopping list that looks like 
`[{item, quantity, price}, ...]`. Write a list comprehension that builds a 
list of items of the form `[{item, total_price}, ...]` where total_price is 
quantity times the price. 

My implementation: 

{% highlight erlang %}
-module(shopping_list_price).
-export([total_price/1]).

total_price(ShoppingList) -> [{Item, Quantity * Price} || {Item, Quantity, Price} <- ShoppingList].
{% endhighlight %}

Sample usage: 

{% highlight text %}
35> shopping_list_price:total_price([{"Cheese", 7.99, 100}, {"Bread", 1.99, 500}]).
[{"Cheese",799.0},{"Bread",995.0}]
{% endhighlight %}

### Tic-tac-toe 
 
Write a program that reads a tic-tac-toe board presented as a list or a 
tuple of size nine. Return the winner (x or o) if a winner has been 
determined, cat if there are no more possible moves, or no_winner if no player 
has won yet. 

My implementation: 

{% highlight erlang %}
-module(tic_tac_toe).
-export([game_state/1]).
 
game_state(GameState) -> 
  case GameState of 
    [X, X, X, 
     _, _, _, 
     _, _, _] -> X;
   
    [_, _, _, 
     X, X, X, 
     _, _, _] -> X;
   
    [_, _, _, 
     _, _, _, 
     X, X, X] -> X;
   
    [X, _, _, 
     X, _, _, 
     X, _, _] -> X;
   
    [_, X, _, 
     _, X, _, 
     _, X, _] -> X;
   
    [_, _, X, 
     _, _, X, 
     _, _, X] -> X;
   
    [X, _, _, 
     _, X, _, 
     _, _, X] -> X;
   
    [_, _, X, 
     _, X, _, 
     X, _, _] -> X;
   
    _ -> 
      case lists:any(fun(X) -> X == "_" end, GameState) of
        true -> cat;
        _ -> no_winner
      end
  end.
{% endhighlight %}

Sample usage: 

{% highlight erlang %}
27> tic_tac_toe:game_state(
["X", "X", "O", 
 "X", "O", "O", 
 "X", "O", "X"]).
 
"X"
 
29> tic_tac_toe:game_state(
["X", "X", "O", 
 "X", "O", "O", 
 "O", "X", "O"]).
 
"O"
 
 
31> tic_tac_toe:game_state(
["X", "O", "X", 
 "X", "O", "O", 
 "O", "X", "X"]).
 
no_winner
 
32> tic_tac_toe:game_state(
["X", "O", "X", 
 "X", "O", "O", 
 "O", "X", "_"]).
 
cat
{% endhighlight %}

My first tic-tac-toe solution was a bit more complex, using recursion to scan 
all rows, columns and diagonals. However, I found that for a 3x3 board, the 
simple pattern matching approach, while somewhat verbose, was much easier to 
read. 
