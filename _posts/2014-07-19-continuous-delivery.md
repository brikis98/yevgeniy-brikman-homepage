---
layout: post
title: "Review: Continuous delivery by Jez Humble and David Farley"
tags: ["Review: Nonfiction", "3 Stars", "DevOps", "Software Delivery"]
thumbnail_path: "reviews/continuous-delivery.jpg"
header_image: "reviews/continuous-delivery.jpg"
header_image_url: "https://www.amazon.com/dp/0321601912?tag=brikis98-20&linkCode=osi&th=1&psc=1"
header_image_caption: "'Continuous delivery' by Jez Humble"
date: "2014-07-19"
---

I'm a bit torn on this book: on the one hand, it is a very thorough look at a number of important, but often overlooked topics; on the other hand, the book is not a very effective teacher of this important material. The biggest problem is the lack of real world examples. Chapters are mostly huge blocks of advice: the advice is good, but not memorable or actionable in the way it is presented. There need to be far more examples of real world systems with both good approaches and bad approaches discussed and compared in detail.   
  
Moreover, the book is very very repetitive. Perhaps it's from an attempt to make each chapter standalone, but while trying to find the new and interesting info in a new chapter, you have to wade through tons of info you read many times in earlier chapters (or even earlier paragraphs). There are many sentences, paragraphs, and even pages that can be skipped because they are obvious or just a rehash of something earlier (or both).   
  
In short, this is a VERY important - perhaps even required - read for anyone working on medium and large software projects, but this book desperately needs a tldr companion with lots of examples.   
  
A few good quotes from the book:   
  
If It Hurts, Do It More Frequently, and Bring the Pain Forward  
  
Done Means Released  
  
In our experience, it is an enduring myth that configuration information is somehow less risky to change than source code.  
  
Without continuous integration, your software is broken until somebody proves it works, usually during a testing or integration stage. With continuous integration, your software is proven to work (assuming a sufficiently comprehensive set of automated tests) with every new change‚Äîand you know the moment it breaks and can fix it immediately.  
  
For the software delivery process, the most important global metric is cycle time. This is the time between deciding that a feature needs to be implemented and having that feature released to users. As Mary Poppendieck asks, ‚ÄúHow long would it take your organization to deploy a change that involves just one single line of code? Do you do this on a repeatable, reliable basis?‚Äù  
  
Errors are easiest to fix if they are detected early, close to the point where they were introduced.   
  
To paraphrase, performance is a measure of the time taken to process a single transaction, and can be measured either in isolation or under load. Throughput is the number of transactions a system can process in a given timespan. It is always limited by some bottleneck in the system. The maximum throughput a system can sustain, for a given workload, while maintaining an acceptable response time for each individual request, is its capacity. Customers are usually interested in throughput or capacity.  
  
When we talk about components, we mean a reasonably large-scale code structure within an application, with a well-defined API, that could potentially be swapped out for another implementation. A component-based software system is distinguished by the fact that the codebase is divided into discrete pieces that provide behavior through well-defined, limited interactions with other components.

**Rating**: 3 stars

