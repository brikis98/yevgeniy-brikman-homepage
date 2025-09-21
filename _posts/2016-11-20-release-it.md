---
layout: post
title: "Review: Release It! by Michael T. Nygard"
tags: ["Review: Nonfiction", "4 Stars", "Programming", "Software Delivery"]
thumbnail_path: "reviews/release-it.jpg"
header_image: "reviews/release-it.jpg"
header_image_url: "https://www.amazon.com/dp/B0DGX43D9B?tag=brikis98-20&linkCode=osi&th=1&psc=1"
header_image_caption: "'Release It!' by Michael T. Nygard"
date: "2016-11-20"
---

Once you read this book, you realize that most programming books are about how to write code that works in the dev environment. "Release It!" is about how to write code that works well in the production environment. This includes thinking about what are typically considered "operational concerns", such as failure modes, stability, scalability, monitoring, and deployment. But as the book argues, you can't add operational concerns later; they have to be built into your code. Therefore, this is an essential read for all software engineers.  
  
The downside to the book is that it's a bit dated. It came out in 2007, which means it predates several trends that have had a profound impact on modern day operations. This includes the ubiquity & power of the cloud (being able to instantaneously provision servers changes everything), the DevOps movement (including practices like infrastructure as code, ops teams embedded with dev teams, trunk-based dev, feature toggles, etc), non-blocking I/O as an alternative to blocking threads, infrastructure as code tools such as Chef/Puppet/Ansible/Terraform, and the fact that hardware costs have dropped by another several orders of magnitude (which changes the tradeoff between "spend more programmer time on it" vs "throw more hardware at it"). Also, the book has a fairly strong bias towards Java and Oracle, which may be off-putting for some readers.  
  
Despite that, the book is well written (the analogies are great), includes several real-world case studies to make the concepts concrete, and much of the content is timeless, so it will apply to software projects for years to come. Here are some of my favorite insights:  
  
* Over the long term, most software system cost more to operate (what we inaccurately call "maintenance") than to build. Typically, 50 - 90% of the costs come after v1.0 comes out. Therefore, taking shortcuts in the operational aspects of your code is often a bad trade-off, as cutting something from the (relatively short) build phase is not worth it if it add costs to the (comparatively much longer) maintenance phase. For the most part, I agree with this, but there is an alternative angle to consider: many products fail (e.g. they don't gain traction in the market) and therefore, never reach the maintenance phase. For these projects, over-investing early is a huge waste. Therefore, with software, you're straddling a tricky line: invest too much up front, and it's wasteful if the project fails; invest too little up front, and it's wasteful if the project succeeds.  
  
* Common failure modes: fragile integration points, chain reactions, cascading failures, strange user behavior, blocked threads, self-denial, scaling effects, unbalanced capacities, slow responses, SLA inversion, and unbounded result sets.  
  
* Key stability patterns: timeouts; circuit breaker; bulkheads; steady state; fail fast; handshaking; test harness; decoupling middleware;  
  
* Zero-downtime deployment patterns: first, expansion, which includes deploying new static content (with versioned URLs), creating new service pools, and adding things to the DB (e.g. new tables, new columns, but typically NOT constraints, since the old code won't be able to handle them). Next, rollout, which involves redeploying each server with the new code. Finally, cleanup, which includes adding DB constraints, and removing things from the DB (e.g. tables and columns that are no longer used).   
  
  
Some of my favorite quotes from the book:  
  
"You want to own a car designed for the real world. You want a car designed by somebody who knows that oil changes are always 3,000 miles late; that the tires must work just as well on the last sixteenth of an inch of tread as on the first; and that you will certainly, at some point, stomp on the brakes while you're holding an Egg McMuffin in one hand and a cell phone in the other."  
  
"Systems spend much more of their life in operation than in development—at least, the ones that don't get canceled or scrapped do. Avoiding a one-time cost by incurring a recurring operational cost makes no sense. In fact, the opposite decision makes much more financial sense. If you can spend $5,000 on an automated build and release system that avoids downtime during releases, the company will avoid $200,000."  
  
"Staying up is more than half the battle. Consider the odds against your system. Approximately half of all projects are canceled in development. Of the survivors, another half are late, overbudget, and do not meet requirements. Of the remainder (less than 25% of all projects) that make it to production, the majority incur major costs through downtime, lost revenue, and maintenance costs. You've already stepped over the decaying carcasses of other systems on your way to production. Be proud!"  
  
"In The Evolution of Useful Things [Pet92], Henry Petroski[111] argues that the old dictum "form follows function" is false. In its place, he offers the rule of design evolution, "form follows failure." That is, changes in the design of such commonplace things as forks and paper clips are motivated more by the things early designs do poorly than those things they do well. Not even the humble paper clip sprang into existence in its present form. Each new attempt differs from its predecessor mainly in its attempts to correct flaws."

## Rating

4 stars

