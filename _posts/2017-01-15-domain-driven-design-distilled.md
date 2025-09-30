---
layout: post
title: "Review: Domain-Driven Design Distilled by Vaughn Vernon"
tags: ["Review: Nonfiction", "1 Stars", "Programming"]
thumbnail_path: "reviews/domain-driven-design-distilled.jpg"
header_image: "reviews/domain-driven-design-distilled.jpg"
header_image_url: "https://www.amazon.com/dp/0134434420?tag=brikis98-20&linkCode=osi&th=1&psc=1"
header_image_caption: "'Domain-Driven Design Distilled' by Vaughn Vernon"
date: "2017-01-15"
---

I have not read other DDD books, so I grabbed this one as a quick intro to decide if I wanted to dive deeper. My conclusion: either DDD is a useless pile of nonsense, or this book, much like homeopathy, has distilled the original material to such an extent that there is nothing left of value.  
  
The book provides no context around DDD. What motivated the creation of DDD? What problems does DDD solve? Who should use it? At what stage of a project should you use it? What are the alternatives? What are the drawbacks? Instead of answering these questions, the book just claims "DDD is great!", talks about how the author of this book is also the author of another best-selling book on DDD, and then jumps into defining a bunch of DDD terms (e.g. Bounded Contexts, Ubiquitous Language, Domain, Context Map, Aggregate, Value Object, and Event Storming). The definitions for these terms are, to put it kindly, vague and circular. Here's a typical example:  
  
> A Bounded Context is a semantic contextual boundary. This means that within the boundary each component of the software model has a specific meaning and does specific things. The components inside a Bounded Context are context specific and semantically motivated.  
  
A bounded context is a contextual boundary? Your software components do specific things? No way!  
  
What makes this worse is that there are no real-world examples or case studies. Most of that content is the same kind of high-level drivel as above (note: every one of the DDD terms is italicized every single time its used), and the rare low-level detail often feels utterly irrelevant, such as what color sticky notes you must buy (apparently, light orange, purple, and green are a must for Event Storming). The only somewhat concrete example in the book is how to use DDD to model all the buzzwords of Scrum (sprint, retrospective, backlog, etc.), but such an example is confusing on multiple levels. First, it's not clear why you would use DDD to model a methodology as opposed to a concrete piece of software. Second, to understand scrum, you have to introduce all sorts of new buzzwords, which distracts you from whatever DDD buzzword you're actually trying to understand. And third, the book recommends using DDD as part of scrum, so then you get a confusing overlap between the process you are using to model things and the actual thing you are modeling.   
  
Occasionally, an interesting or nuanced detail would come up, and the author would immediately tell you to go look at another book to learn more. In fact, I think the real goal of this book is not to teach you anything useful, but to get you interested enough to buy the author's other books. Obviously, not every book can cover every topic, so recommending other books is a perfectly reasonably thing to do, so long as you provide *some* value of your own. This book, does not.  
  
So, here is the distilled version of this book:   
  
Draw bubble charts of your architecture. Group related bubbles together. Congratulations, you may now join the ranks of UML-obsessed whiteboard architects.

## Rating

{% include star-rating.html rating=1 %}

