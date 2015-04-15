---
layout: post
title: Are static typing and functional programming winning?
date: '2015-02-06T10:15:00.000-08:00'
author: Yevgeniy Brikman
tags:
- Software Engineering
modified_time: '2015-02-06T18:45:04.121-08:00'
thumbnail_path: blog/static-typing-functional-programming/haskell-logo.jpg
blogger_id: tag:blogger.com,1999:blog-5422014336627804072.post-6495406018713584930
blogger_orig_url: http://brikis98.blogspot.com/2015/02/are-static-typing-and-functional.html
---

Inspired by a [reddit discussion](https://www.reddit.com/r/programming/comments/2uul7o/consider_static_typing/), 
I decided to create short blog post to ask two questions:

1. Is static typing winning?
2. Is functional programming winning?

In other words, are we at a turning point where most modern languages are 
moving towards static typing and functional programming? Let's consider the 
evidence.

## Static typing

Some of the most popular dynamic languages are considering some form of static 
typing:

1. **Ruby**: Matz announced that [Ruby 3.0 may have type annotations](https://www.omniref.com/blog/blog/2014/11/17/matz-at-rubyconf-2014-will-ruby-3-dot-0-be-statically-typed/).
1. **Python**: Guido van Rossum sent out a [proposal to add type annotations to Python](http://www.infoq.com/news/2014/08/python-type-annotation-proposal).
1. **PHP**: Facebook has released [Hack](http://hacklang.org/), which supports type annotations on top of the PHP syntax. Moreover, PHP itself already has [Type Hinting](http://php.net/manual/en/language.oop5.typehinting.php) and may add [return type declarations](https://wiki.php.net/rfc/return_types).
1. **JavaScript**: Facebook has released [Flow](http://flowtype.org/), Microsoft has released [TypeScript](http://www.typescriptlang.org/), Google has released [Dart](https://www.dartlang.org/) and [AtScript](https://docs.google.com/document/d/11YUzC-1d0V1-Q3V0fQ7KSit97HnZoKVygDxpWzEYW0U/edit), and there are many statically typed languages that compile to JavaScript, including [GWT](http://www.gwtproject.org/) (Java to JavaScript), [Scala.js](http://www.scala-js.org/) (Scala to JavaScript), [Haste](http://haste-lang.org/) (Haskell to JavaScript), and [purescript](https://github.com/purescript/purescript) (Haskell-ish to JavaScript).

Of course, most of these type systems are not as strict as, say, Haskell, but 
whether you call it static typing, gradual typing, type hinting, type inference, 
or type annotations, the goal everywhere seems to be the same: try to catch more 
errors at *compile time* instead of *run time*. 

## Functional programming

Similarly, some of the most popular imperative languages are adding features 
from functional programming:

1. **Java**: [version 8](http://www.oracle.com/technetwork/java/javase/8-whats-new-2157071.html) added lambdas, functional interfaces (i.e. functions, almost), method references (i.e. first class functions, almost), and the stream API.
1. **C++**: [version 11](http://blog.madhukaraphatak.com/functional-programming-in-c++/) and [version 14](http://www.slideshare.net/SumantTambe/fun-with-lambdas-c14-style) added support for functional programming features.
1. **C#**: there is a [book](http://www.amazon.com/Functional-Programming-Classic-Techniques-Projects/dp/0470744588) and [several](https://msdn.microsoft.com/en-us/magazine/ee309512.aspx) [guides](http://www.codeproject.com/Articles/375166/Functional-programming-in-Csharp#Curry) on functional programming in C#.
1. **Swift**: Apple's new language for iOS and OS X has many [functional programming features](http://www.objc.io/books/).
1. **JavaScript**: I'm seeing more and more [functional JavaScript](http://shop.oreilly.com/product/0636920028857.do) these days thanks to things like [underscore.js](http://underscorejs.org/), [promises](https://www.promisejs.org/) (ie, monads), [react.js](http://facebook.github.io/react/), [bacon.js](https://baconjs.github.io/), and compile-to-JS languages like [ClojureScript](https://github.com/clojure/clojurescript).

Of course, tossing in a few functional features does [not a functional 
programming language make](http://fsharpforfunandprofit.com/posts/is-your-language-unreasonable/), 
but still, the trend is encouraging. Moreover, languages that are functional at 
their core seem to be growing in popularity too: 

1. **Haskell**: [Facebook](https://www.reddit.com/r/haskell/comments/2useoq/haskell_opportunities_at_facebook/), [Bump, Google, Microsoft, NY Times](https://wiki.haskell.org/Haskell_in_industry).
1. **Clojure**: [Amazon, Netflix, Groupon, Heroku, and Twitter](http://www.quora.com/Whos-using-Clojure-in-production).
1. **Erlang**: [WhatsApp, Facebook, Amazon, Riak, CouchDB, Yahoo](http://en.wikipedia.org/wiki/Erlang_(programming_language)#Distribution).
1. **Scala**: [LinkedIn, Twitter, Box, Foursquare, Coursera, Nest, Quora, Tumblr, VMWare](http://www.quora.com/What-startups-or-tech-companies-are-using-Scala).

## What's the future?

There is some [research](http://macbeth.cs.ucdavis.edu/lang_study.pdf) that 
shows that static typing and functional programming are *modestly* better than 
dynamic typing and imperative programming, respectively (albeit [it's far from 
air tight](http://danluu.com/empirical-pl/)). That said, I've been hearing this 
sort of hype for a long time, and only in the last year or two do I feel like 
it's finally starting to make a noticeable dent in the industry.

Are you noticing the same trends? Do you like seeing more static typing and 
functional programming? Will we all be Haskell programmers soon?

*Leave your thoughts as a comment or discuss this post on 
[reddit](https://www.reddit.com/r/programming/comments/2v1dkg/are_static_typing_and_functional_programming/) 
and [Hacker News](https://news.ycombinator.com/item?id=9010998).*



