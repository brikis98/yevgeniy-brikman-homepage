---
layout: post
title: 'Seven Languages in Seven Weeks&#58; Erlang, Day 1'
date: '2012-11-04T18:53:00.000-08:00'
author: Yevgeniy Brikman
tags:
- Seven Languages in Seven Weeks
modified_time: '2012-11-04T20:32:00.538-08:00'
blogger_id: tag:blogger.com,1999:blog-5422014336627804072.post-6609694641897550632
blogger_orig_url: http://brikis98.blogspot.com/2012/11/seven-languages-in-seven-weeks-erlang.html
thumbnail_path: blog/seven-languages/book-cover.jpg
---

After a long hiatus, I'm finally back to working my way through [Seven 
Languages in Seven 
Weeks](http://pragprog.com/book/btlang/seven-languages-in-seven-weeks). After 
finishing up 
[Scala](https://www.ybrikman.com/writing/2012/03/18/seven-languages-in-seven-weeks-scala/), 
I'm now on the 5th language, Erlang, though it has taken me quite a bit longer 
than 5 weeks to get here. 

## Erlang, Day 1: Thoughts 

The first Erlang chapter is just a gentle introduction to the language, so I 
haven't formed much of an impression of it yet. So far, it looks like a 
dynamically typed functional programming language with Prolog syntax and 
pattern matching. Of course, I mostly know of Erlang for its concurrency 
story, so I'm excited to experiment with that in later chapters. 

## Erlang, Day 1: Problems 

### Write a function that uses recursion to return the number of words in a string 

{% highlight erlang %}
-module(word_count).
-export([word_count/1]).
 
word_count([]) -> 0;
word_count(Sentence) -> count(Sentence, 1).
 
count([], Count) -> Count;
count([32|Tail], Count) -> count(Tail, Count + 1);
count([_|Tail], Count) -> count(Tail, Count).
{% endhighlight %}

### Write a function that uses recursion to count to ten

{% highlight erlang %}
-module(count_to_ten).
-export([count_to_ten/0]).
 
count_to_ten() -> do_count(0).
 
do_count(10) -> 10;
do_count(Value) -> do_count(Value + 1).
{% endhighlight %}

### Write a function that uses matching to selectively print "success" or "error: message" given input of the form {error, Message} or success

{% highlight erlang %}
-module(error_or_success).
-export([print/1]).
 
print(success) -> "success";
print({error, Message}) -> "error: " ++ Message.
{% endhighlight %}

## On to day 2 

Check out [Erlang, Day 
2](https://www.ybrikman.com/writing/2012/11/04/seven-languages-in-seven-weeks-erlang_4/), 
for more functional programming goodness. 