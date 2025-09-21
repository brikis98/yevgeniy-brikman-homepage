---
layout: post
title: "Review: Site Reliability Engineering by Betsy Beyer, Chris Jones, Jennifer Petoff, et al"
tags: ["Review: Nonfiction", "4 Stars", "DevOps", "Software Delivery"]
thumbnail_path: "reviews/site-reliability-engineering.jpg"
header_image: "reviews/site-reliability-engineering.jpg"
header_image_url: "https://www.amazon.com/dp/149192912X?tag=brikis98-20&linkCode=osi&th=1&psc=1"
header_image_caption: "'Site Reliability Engineering' by Betsy Beyer, Chris Jones, Jennifer Petoff, et al"
date: "2016-08-16"
---

This is an amazing branding and marketing piece for Google. It's also, for the most part, an interesting read that's worthwhile for anyone in the DevOps space.  
  
Pros:  
  
+ Fascinating to hear about the epic scale of Google's systems. It's like they are working day and night to keep a massive, complicated organism alive. The load balancing chapter is a great example of this. The things they have to consider probably never occurred to you as you've simply never faced that kind of scale.   
  
+ The book does a great job of laying out the mindset and basic philosophy behind SRE (and how it differs from pure OPs or sysadmin): error budgets, Service Level Objectives (SLOs), toil, monitoring, post-mortems, capacity planning, and on-call duty.  
  
+ The load balancing, cascading failure, distributed consensus, and cron chapters are excellent. Lots of detail and good discussions of trade offs, designs, and best practices. These chapters give you the proper mindset and vocabulary for thinking about these systems.   
  
+ Most of the writing is clear.  
  
Cons:  
  
- Most companies are several orders of magnitude away from Google's scale. Following some of this advice at a 5 person startup, or even a 500 person company, is just not appropriate.  
  
- Google uses a lot of proprietary technologies, and while the authors try to suggest similar open source alternatives, you spend a lot of time reading about systems you'll never have access to.  
  
- Lots of different authors means the quality of the material is uneven. While most chapters are detailed and easy to apply to your own use cases, some chapters are too high level and abstract to be useful (e.g. the chapter on simplicity), some feel like Google's legal team got their hands on the writing and removed all the interesting details (e.g. the incident/alert/troubleshooting chapter), and some feel like an inept HR department wrote them and stuffed them full of self-congratulatory platitudes and corporate-speak.  
  
- Lots of info on how to run an SRE team, but not much info on how to build reliable software. That is, no architecture patterns, replicas, partitioning, etc. You understand the psychology and "API" of SRE, but not the implementation.   


## Quotes

Some of my favorite quotes:  
  
  
> Software engineering has this in common with having children: the labor before the birth is painful and difficult, but the labor after the birth is where you actually spend most of your effort. Yet software engineering as a discipline spends much more time talking about the first period as opposed to the second, despite estimates that 40–90% of the total costs of a system are incurred after birth.

> "Hope is not a strategy."—Traditional SRE saying  
  
> Traditional operations teams and their counterparts in product development thus often end up in conflict, most visibly over how quickly software can be released to production. At their core, the development teams want to launch new features and see them adopted by users. At their core, the ops teams want to make sure the service doesn't break while they are holding the pager. Because most outages are caused by some kind of change—a new configuration, a new feature launch, or a new type of user traffic—the two teams' goals are fundamentally in tension.

> Google places a 50% cap on the aggregate "ops" work for all SREs—tickets, on-call, manual tasks, etc. This cap ensures that the SRE team has enough time in their schedule to make the service stable and operable.

> 100% is the wrong reliability target for basically everything

> Put simply, a user on a 99% reliable smartphone cannot tell the difference between 99.99% and 99.999% service reliability!

> The use of an error budget resolves the structural conflict of incentives between development and SRE. SRE's goal is no longer "zero outages"; rather, SREs and product developers aim to spend the error budget getting maximum feature velocity. This change makes all the difference. An outage is no longer a "bad" thing—it is an expected part of the process of innovation, and an occurrence that both development and SRE teams manage rather than fear.

> If we are engineering processes and solutions that are not automatable, we continue having to staff humans to maintain the system. If we have to staff humans to do the work, we are feeding the machines with the blood, sweat, and tears of human beings. Think The Matrix with less special effects and more pissed off System Administrators.

> "If at first you don't succeed, back off exponentially."—Dan Sandler, Google Software Engineer  
  
> Viewing an engineer as an interruptible unit of work, whose context switches are free, is suboptimal if you want people to be happy and productive.

## Rating

{% include star-rating.html rating=4 %}

