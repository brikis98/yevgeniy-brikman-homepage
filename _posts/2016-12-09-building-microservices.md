---
layout: post
title: "Review: Building Microservices by Sam Newman"
tags: ["Review: Nonfiction", "3 Stars", "Programming"]
thumbnail_path: "reviews/building-microservices.jpg"
header_image_url: "https://www.amazon.com/dp/1492034029?tag=brikis98-20&linkCode=osi&th=1&psc=1"
date: "2016-12-09"
---

If you're new to microservices, this book is a decent intro, covering most of the major topics you need to be aware of. It only covers the topics at a surface level (to be fair, it would've been a very long book if it went in-depth on each one), which is just enough to show you what questions you should be asking. Of course, you'll have to seek elsewhere to find those answers, but at least now you'll know what to look for.  
  
However, the biggest weakness of the book is that it makes microservices seem like a good idea for just about everyone. Obviously, the author has a vested interest in this perception, since he wants to sell more books, but the reality is that microservices are NOT a good choice for many use cases. They make perfect sense at the scale of a company like Google or Facebook, but most companies do not face that kind of scale, and, even more importantly, most companies do not have the resources of a Google or Facebook to invest in making microservices usable.  
  
Running microservices requires a massive investment in terms of orchestration, configuration management, automated deployment, build tooling, monitoring, alerting, feature toggles, service discovery, service APIs, I/O management, and versioning. Breaking up a monolith or any sort of large rewrite is also a MAJOR undertaking—and a major risk for a company. The author doesn't hide these drawbacks, but in my opinion, he massively understates them. Microservices are not for everyone (just like NoSQL and distributed systems aren't for everyone!), and it's a disservice to the industry to tell people otherwise.

