---
layout: post
title: "Review: Seven Languages in Seven Weeks by Bruce A. Tate"
tags: ["Review: Nonfiction", "4 Stars", "Programming"]
thumbnail_path: "reviews/seven-languages-in-seven-weeks.jpg"
header_image_url: "https://www.amazon.com/dp/193435659X?tag=brikis98-20&linkCode=osi&th=1&psc=1"
date: "2018-02-04"
---

## The good   
  
* A fantastic way to improve your programming abilities and understanding. Learning a number of different programming languages and paradigms in a short time period is a great way to compare them, see the trade-offs, and expand your thinking.  
  
* Good choice of languages. You'll get to see several different varieties of object oriented programming, functional programming, logic programming, meta programming, concurrency constructs, type systems, and more.  
  
* Great exercises at the end of each chapter to get you to actually try each language out and get first-hand experience with it.  
  
## The not so good  
  
* Some of the explanations of language features are overly shallow, or even outright wrong. The discussion of how STM works in Clojure is missing the absolutely critical idea that the transaction may be retried and therefore, must be side effect free; Erlang actors are introduced, but not how to make them distributed, which is a core use case; the explanation of how monads work is confusing and incomplete. Some of this is due to the need to fit so much content in a single book, but some of it seems like sloppy research and not enough peer reviewers.  
  
* The author is very judgmental and opinionated about the languages. Java is awful, Haskell is too complicated, Clojure's syntax is too painful, yada yada yada. Perhaps this is an attempt to make the book more fun, but if the goal is to encourage programmers to learn new paradigms and languages, spending a considerable amount of time trashing some of those languages and paradigms is very counterproductive. I recommend ignoring the color commentary and forming your own opinions.   
  
## Overall   
  
I would recommend that every programmer (a) reads this book and (b) goes through the exercises. If you do this, I guarantee you'll be a better programmer when you're done.   
  
Note, however, that going through the exercises is ESSENTIAL. To fit seven languages in a single book, the author could only include a short tutorial and a tiny sampling of features from each one. If all you did was read these short summaries, and you didn't actually do the exercises, you will not truly grok what each language is about, and you will get very little out of this book—I'd wager most of the negative reviews on GoodReads are from people who solely skimmed the book.   
  
If you actually go through each of the exercises, which will take a few hours per chapter, you'll get a much deeper understanding, and enjoy the book far more. For context, I started reading this book in 2012 and only finished it in 2018! I'd read it in spurts, doing a few chapters and exercises when I had free time, and then putting it away again for many months or even years (the last pause was for ~4 years until I stumbled across this book and realized I still had two more languages to go!). So instead of seven languages in seven weeks, it took me almost seven years... But YMMV :)

I wrote up blog posts as I went through each chapter and exercise in this book, starting with [Ruby, day 1](https://www.ybrikman.com/blog/2012/01/29/seven-languages-in-seven-weeks-ruby-day/). 

