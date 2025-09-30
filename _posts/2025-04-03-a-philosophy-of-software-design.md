---
layout: post
title: "Review: A Philosophy of Software Design by John Ousterhout"
tags: ["Review: Nonfiction", "4 Stars", "Programming", "Detailed Notes"]
thumbnail_path: "reviews/a-philosophy-of-software-design.jpg"
header_image: "reviews/a-philosophy-of-software-design.jpg"
header_image_url: "https://www.amazon.com/dp/173210221X?tag=brikis98-20&linkCode=osi&th=1&psc=1"
header_image_caption: "'A Philosophy of Software Design' by John Ousterhout"
date: "2025-04-03"
---

A solid read that I'd recommend to most programmers, and especially anyone at the start of their career. Even if you're later in your career, you'll still find some new insights in this book. There was much in this book I had seen before, and I don't agree with all the suggestions, but on the whole, I appreciated the author's thought process, and the way he presented his ideas.   
  
I think the biggest weakness of the book is that the author seems entirely focused on C++, Java, and similar OO languages. These are 30-40 year old languages, and while they have evolved a lot over this time, they are missing many of the improved practices we've seen in more modern languages. As a result, this book entirely omits many important lessons from functional programming and powerful type systems.   
  
So it's worth reading, but not in isolation. I'd recommend reading this book side-by-side with books such as _Clean Code_ (which also focuses on Java and OO, but disagrees on some points), _Learn You a Haskell For Great Good_ (for FP), _Structure and Interpretation of Computer Programs_ (for Lisp and FP), _Seven Languages in Seven Weeks_ (for a comparison of many programming paradigms), and so on. All these books agree on some points and disagree on others; seeing the different opinions debated is more useful than accepting any one of them as gospel.   
  
Here are some of my key takeaways from this book:  
  
## 1. Defining complexity

Perhaps the biggest new thing I found in this book is an attempt to _systematically_ identify the causes of complexity in software design. Like _Code Complete_, this book focuses on complexity as _the_ central topic in software engineering. However, while many other books on programming solely contain lists of recommended practices, this book starts by defining a few basic causes of complexity, and then goes through a list of practices that are meant to address those specific causes.   
  
The book defines complexity as follows:  
  
"Complexity is anything related to the structure of a software system that makes it hard to understand and modify the system."  
  
Two notes about this definition:  
  
1. Complexity is mostly determined by the readers of the code, not the writers. If other developers think your code is complex, then it is.   
  
2. The Complexity of a system is relative to two things: the complexity of each part and how much time developers have to spend in that part. If you can isolate complexity to a part of the code you almost never have to touch, then that's almost as good as eliminating that complexity entirely.  
  
## 2. The impact of complexity

Complexity has three core effects:  
  
1. _Change amplification_: What seems like a small change actually requires making changes in many different places.  
  
2. _Cognitive load_: To complete a task, a developer has to spend tons of time learning every single detail of the system, and there is a high risk of bugs from overlooking even the smallest detail.  
  
3. _Unknown unknowns_: Even worse than (2) is when you don't know what information you need to learn to complete a task, there's no easy way to figure it out, and you might not even realize you missed something until bugs show up.  
  
## 3. Causes of complexity

The book defines two high-level causes of complexity:  
  
1. _Dependencies_: You can't modify one piece of code without understanding and/or modifying another piece of code. Dependencies always exist, and the goal isn't to eliminate them, but to reduce the number of them, and make them as simple and obvious as possible.  
  
2. _Obscurity_: You can't modify a piece of code without some important information, but that information is not obvious or easy to discover.  
  
The book also contains a nice list of more low-level "red flags," which are things you can learn to recognize that usually increase complexity: e.g., vague variable names.   
  
## 4. Information hiding

One of the main ways the book recommends to fight complexity is information hiding, which has two benefits:  
  
1. It allows you to work with a simpler interface, rather than the full complexity of the implementation.  
2. It reduces dependencies, as you can't build dependencies on things that are hidden from you.  
  
Hiding information, and creating simpler abstractions, is the core of managing complexity. In fact, consider the opposite:  
  
"If users must read the code of a method in order to use it, then there is no abstraction: all of the complexity of the method is exposed."  
  
## 5. Handling errors

Errors and exceptions make code complicated.   
  
"Classes with lots of exceptions have complex interfaces, and they are shallower than classes with fewer exceptions."  
  
One great idea in this book is to "define errors out of existence." One example in the book is an 'unset(xxx)' function in TCL, which unsets the variable xxx. The original function throws an exception if xxx wasn't set in the first place, which forces callers to deal with errors; a cleaner design would be to define the function as "results in xxx not being set," as this way, if xxx wasn't set to begin with, there's nothing to do, and no exception to throw. By changing the definition of the interface, you eliminate an entire set of possible errors, reducing complexity for everyone.  
  
This is a terrific idea. A very closely related idea that this book misses is to "make illegal states unrepresentable." This is one of the places the book's focus on C++/Java, with their relatively weak type systems, misses some of the more modern practices. See [this blog post](https://blog.janestreet.com/effective-ml-revisited/) and [this one](https://fsharpforfunandprofit.com/posts/designing-with-types-making-illegal-states-unrepresentable/) for details.  
  
## 6. Conventions

The book argues that consistency is a powerful tool for managing complexity:  
  
"If a system is consistent, it means similar things are done in similar ways and dissimilar things are done in different ways. Consistency creates cognitive leverage: once you have learned how something is done in one place, you can use that knowledge to immediately understand other places that use the same approach. If a system is not implemented in a consistent fashion, developers must learn about each situation separately. This will take more time."  
  
Also, I found myself nodding vigorously at this part:  
  
"Don't change existing conventions. Resist the urge to 'improve' on existing conventions. Having a 'better idea' is not a sufficient excuse to introduce inconsistencies. Your new idea may indeed be better, but the value of consistency over inconsistency is almost always greater than the value of one approach over another."  
  
## 6. Some items I don't agree with

For the record, there are some suggestions in this book that I don't entirely buy into:  
  
1. _Think strategically vs tactically._ The book argues you should always think strategically (e.g., invest ~20% of your time in improving the design of the code for the long term) and not tactically (e.g., just try to ship the next feature). In many cases, this is the right thing to do, but the book doesn't seem to acknowledge there are contexts when tactics are a better option. One example is in a startup looking for product/market fit. If you're rapidly iterating and trying many experiments to see what'll work, investing in the long-term design of your code may not pay off, as much of your code is likely to be thrown away every few weeks or months as you move on to a new experiment.   
  
2. _Longer methods._ One of the reasons this book is popular is that it argues against the advice of _Clean Code_ in creating shorter methods, as shorter methods are "shallow" and create lots of interfaces to learn, with little value. I think the shorter method thing can be taken too far, but breaking long methods into several shorter ones have several key benefits. First, each of the shorter methods can have a clear name, so instead of having to parse through dozens and dozens of lines of code in a long method, you can read a handful of method names, which makes the code easier to understand. Second, if most of your methods are pure (in an FP sense), then based on the inputs and outputs of those methods, you know exactly what parts of your data/system each method can affect, which allows you to easily ignore large parts of the code. Third, you can add unit tests for smaller methods easier than giant ones.   
  
3. _Trends._ One of the chapters towards the end of the book looks at "trends" in software development which include automated tests, agile, and object-oriented programming. These may have been trends 25 years ago; now they are all pretty standard. Since this is a recent book, I found this a bit weird.

## Rating

{% include star-rating.html rating=4 %}

