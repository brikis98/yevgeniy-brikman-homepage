---
layout: post
title: "Review: Growing Object by Steve Freeman and Nat Pryce"
tags: ["Review: Nonfiction", "5 Stars", "Programming"]
thumbnail_path: "reviews/growing-object.jpg"
header_image: "reviews/growing-object.jpg"
header_image_url: "https://www.amazon.com/dp/0321503627?tag=brikis98-20&linkCode=osi&th=1&psc=1"
header_image_caption: "'Growing Object' by Steve Freeman and Nat Pryce"
date: "2014-11-02"
---

A great read for anyone interested in automated testing and TDD.   
  
## Pros  
  
* Makes a strong case for testing: better design, faster feedback, user experience first, regression, and most importantly, the confidence to make changes quickly.   
* Includes a nice walk through of an iterative, test driven development process of a small app.   
* Lots of great examples of how "listening" to tests leads to better design (ie, what the "driven" really means in TDD).   
* I learned a lot from the discussion of how to make tests readable and maintainable.   
  
## Cons  
  
* The book is 100% Java. How do these lessons apply to other OO languages?  
* The authors spend too much time selling the jMock framework  
* The app they develop iteratively is a Java swing app full of distracting details like the way Swing manages threads. It was a bit boring at times and the code was verbose, so it was easy to lose focus.   
  
## Fun quotes  
  
What if software wasn't "made," like we make a paper airplane—finish folding it and fly it away? What if, instead, we treated software more like a valuable, productive plant, to be nurtured, pruned, harvested, fertilized, and watered? Traditional farmers know how to keep plants productive for decades or even centuries. How would software development be different if we treated our programs the same way?  
  
As John Gall wrote in [Gall03], "A complex system that works is invariably found to have evolved from a simple system that works."  
  
In our work, we apply feedback cycles at every level of development, organizing projects as a system of nested loops ranging from seconds to months, such as: pair programming, unit tests, acceptance tests, daily meetings, iterations, releases, and so on. Each loop exposes the team's output to empirical feedback so that the team can discover and correct any errors or misconceptions.  
  
One lesson that we've learned repeatedly is that nothing forces us to understand a process better than trying to automate it.   
  
Our experience is that, when code is difficult to test, the most likely cause is that our design needs improving. The same structure that makes the code difficult to test now will make it difficult to change in the future.  
  
When composing objects into a new type, we want the new type to exhibit simpler behavior than all of its component parts considered together. The composite object's API must hide the existence of its component parts and the interactions between them, and expose a simpler abstraction to its peers.  
  
In most systems we build, we end up writing a runtime exception called something like Defect (or perhaps StupidProgrammerMistakeException). We throw this when the code reaches a condition that could only be caused by a programming error, rather than a failure in the runtime environment.  
  
By repeatedly fixing local problems in the code, we find we can explore the design safely, never straying more than a few minutes from working code. Usually this is enough to lead us towards a better design, and we can always backtrack and take another path if it doesn't work out. One way to think of this is the rock climbing rule of "three-point contact." Trained climbers only move one limb at a time (a hand or a foot), to minimize the risk of falling off. Each move is minimal and safe, but combining enough of them will get you to the top of the route.

## Rating

5 stars

