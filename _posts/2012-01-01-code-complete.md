---
layout: post
title: "Review: Code Complete by Steve McConnell"
tags: ["Review: Nonfiction", "5 Stars", "Programming"]
thumbnail_path: "reviews/code-complete.jpg"
header_image: "reviews/code-complete.jpg"
header_image_url: "https://www.amazon.com/dp/0735619670?tag=brikis98-20&linkCode=osi&th=1&psc=1"
header_image_caption: "'Code Complete' by Steve McConnell"
date: "2012-01-01"
---

A must-read for any programmer. Although I don't agree with everything in the book and a few parts feel out of date, it provides an excellent framework for how to think about programming and software engineering. It can help programmers of all experience levels to focus on the right things: that code is harder to read than to write, that managing complexity is the main goal of programming, and so on.  
  
The book is filled with nuggets of wisdom. Some of my favorite quotes, some from McConnell, some from other writers that he includes in the book:

> Managing complexity is the most important technical topic in software development. In my view, it's so important that Software's Primary Technical Imperative has to be _managing complexity_.

  

> A "wicked" problem is one that can be clearly defined only by solving it.

  

> It's OK to figure out murder mysteries, but you shouldn't need to figure out code. You should be able to read it.

  

> Eighty percent of the errors are found in 20 percent of a project's classes or routines.

  

> Don't document bad code - rewrite it.

  

> Jackson's Rules of Optimization: Rule 1. Don't do it. Rule 2 (for experts only). Don't do it yet - that is, not until you have a perfectly clear and unoptimized solution.

  

> No programmer has _ever_ been able to predict or analyze where performance bottlenecks are _without data_. No matter where you think it's going, you will be surprised to discover that it is going somewhere else.

  

> The Fundamental Theorem of Formatting says that good visual layout shows the logical structure of a program. Making the code look pretty is worth something, but it's worth less than showing the code's structure.

  

> Build one to throw away; you will, anyhow.

  
  
One downside to the book is that it seems to largely focus on OO languages (C++, Java) and even older imperative ones (C, Ada, etc). There is virtually no consideration given to functional programming. This is a shame, as immutable variables, pure functions, and lack of side effects inherently solve or mitigate MANY of the code complexity and readability problems he discusses in the book. I chuckled at a line in the book where he says "Recursion isn't useful often...", which is true in the languages he used, which don't support tail call optimization.  
  
The book also pre-dates the open source explosion, github, cheap/free access to amazing tools and cloud services, and the growth of continuous integration/deployment. These have had some pretty profound impact on software development that are not taken into account in the book.

## Rating

5 stars

