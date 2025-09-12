---
layout: post
title: "Review: Systems Performance: Enterprise and the Cloud by Brendan Gregg"
tags: ["Review: Nonfiction", "3 Stars", "Programming"]
thumbnail_path: "reviews/systems-performance-enterprise-and-the-cloud.jpg"
header_image: "reviews/systems-performance-enterprise-and-the-cloud.jpg"
header_image_url: "https://www.amazon.com/dp/0136820158?tag=brikis98-20&linkCode=osi&th=1&psc=1"
header_image_caption: "'Systems Performance: Enterprise and the Cloud' by Brendan Gregg"
date: "2017-01-10"
---

This isn't a book, so much as it is a reference manual or an appendix. It's nearly 800 pages of dense, low-level discussions of performance issues related to the CPU, memory, hard drive, OS, and so on. The writing is very structured, repetitive, and dry and resembles a list of facts more than prose. If you have a specific performance issue and need to know how to, say, use DTrace to diagnose an issue with a memory leak, this book is perfect. If you're looking for something you can read cover to cover to generally improve your understanding of system performance, this book probably isn't it.  
  
If you are going to read this, I recommend reading the first few sections of each chapter, which typically have a nice introduction to the architecture of the CPU, memory, etc. They are also full of handy tables, such as typical, real-world latencies and typical performance trade-offs to consider (e.g. cpu vs memory, small vs large record sizes). The remainder of each chapter is a deep-dive into specific performance tools you can use, which is handy as a reference, but does not make for interesting reading otherwise, as there is no way you can retain so much detailed info. I'd also mention that since the author is a Solaris expert and creator of DTrace, you will see a lot of information about both in every single chapter.  
  
The final chapter of the book is great: it walks through a real-world case study and shows how to use various techniques to analyze it and the thought process that goes into tracking down performance bottlenecks. Seeing such a case study gives you a much better sense for the context in which the various performance tools should be used and some awareness of whether the data returned by those tools is normal or not. This would have been a much better book if every chapter had been primarily focused on such case studies, with all the other nitty gritty details tacked on solely as supporting information (perhaps in an appendix!).

**Rating**: 3 stars

