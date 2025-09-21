---
layout: post
title: "Review: Implementing Lean Software Development by Mary Poppendieck and Tom Poppendieck"
tags: ["Review: Nonfiction", "5 Stars", "Programming"]
thumbnail_path: "reviews/implementing-lean-software-development.jpg"
header_image: "reviews/implementing-lean-software-development.jpg"
header_image_url: "https://www.amazon.com/dp/0321437381?tag=brikis98-20&linkCode=osi&th=1&psc=1"
header_image_caption: "'Implementing Lean Software Development' by Mary Poppendieck and Tom Poppendieck"
date: "2016-12-20"
---

This book does a great job of covering most of the critical concepts of lean/agile development. The organization of the book is a bit random and the writing can occasionally be dry (especially the intro chapter), but the book is packed so full of useful insights that it's worth reading anyway.   
  
Some of my favorite non-obvious ideas from this book:  
  
* Smaller batches have less variation. The variation in a 60 minute task is typically going to be measured in minutes; the variation in a 60 day task is typically going to be measured in weeks. By doing work in small batches, you can reduce variation, which makes it easier to predict and optimize your schedule.  
  
* A CPU becomes less efficient above a certain utilization percentage; for example, above ~80% utilization, the CPU may start thrashing and spending much of it's time on overhead (e.g. context switching). It turns out the same is true of people. As you fill someone's schedule more and more, initially their efficiency goes up, but above a threshold of roughly 80% utilization, the efficiency actually goes back down (i.e. cycle time goes up, sharply). Leaving some slack in the system is essential for efficiency. This may have been one of the biggest benefits of programs like Google's 20% time: these programs not only allow for trying out new ideas, but also ensure there is enough slack in the system to avoid thrashing.  
  
* Optimizing local metrics does not necessarily optimize global metrics; in fact, once a system passes some base level of efficiency, optimizing a local metric often comes at the cost of a global metric. Therefore, always focus on big-picture, global metrics, such as cycle time and customer satisfaction.  
  
* If you want to work quickly and efficiently, especially in a large team, you'll find that a centralized point of management and dispatch is simply too slow and inefficient. The only way to get things done fast is to make sure everyone can self-direct their work.   
  
* Make decisions as late as possible (but no later!), as that's the point when you'll have the most knowledge about the situation. This means you should not do a huge, up-front planning process and come up with massive, immutable specs, as in the early stages, you lack the information you need to make good decisions. Instead, set high level goals, make everyone aware of them, and let teams incrementally ("just in time") discover the best way to move you towards those goals.  
  
* Automation is generally good, but there is a danger to completely removing people from the equation: an automated process typically cannot change, adapt, or improve.   
  
  
  
As always, I've jotted down some of my favorite quotes from the book:  
  
  
  
"Almost everything we know about good software architecture has to do with making software easy to change. And that's not a surprise because well over half of all software is developed after first release to production."  
  
"Far and away the biggest source of waste in software development is extra features. Only about 20 percent of the features and functions in typical custom software are used regularly. Something like two-thirds of the features and functions in typical custom software are rarely used."  
  
"Any company that expects to maintain a competitive advantage in a specific area must develop and nurture technical expertise in that area. Companies that buy all the expertise they need will find that their competitors can buy it also."   
  
"The cost of complexity is not linear, it is exponential, and the cost of complexity eventually comes to dominate all other costs in most software systems. Complex code is brittle and breaks easily, making it almost impossible to change safely. Wise software development organizations place top priority on keeping the code base simple, clean, and small."  
  
"Requirements churn is a symptom of writing requirements too early. Requirements should be done in smaller chunks, much closer to the time they will be converted to code, preferably in the form of executable tests."  
  
"Centuries ago, the critical constraining resource was land. Those who controlled the land controlled everything. At some point, the constraint became skills, and guilds and merchants created more wealth than did landowners. Later, the industrial revolution moved the constraint to capital, and power became financially driven. Today, the constraint is knowledge: technical knowledge, management knowledge, process knowledge, and market knowledge. Much of this knowledge is being expressed as software."  
  
"There are two kinds of software—change tolerant software and legacy software. Some software systems are relatively easy to adapt to business and technology changes, and some software systems are difficult to change. These difficult-to-change systems have been labeled "legacy" systems in the software development world. Change tolerant software is characterized by limited dependencies and a comprehensive test harness that flags unintended consequences of change. So we can define legacy systems as systems that are not protected with a suite of tests. A corollary to this is that you are building legacy code every time you build software without associated tests."  
  
"Repetitive tasks are not only error prone; they send the message that it's OK to treat people like robots."  
  
"Eliminate barriers that rob people of their right to pride in workmanship. Artificial deadlines, managers with no idea about what good code really is, sloppy code bases and coding practices, no way to see if new code works, no idea what the users really want, individual rewards for team contributions—all of these rob every member of the development team of pride in workmanship."  
  
"We propose that instead of proliferating measurements, it is best to reduce the number of measurements and find system-level measurements that drive the right behavior at the subsystem level. In lean organizations, it is well known what these measurements are: cycle time, financial results, and customer satisfaction."

## Rating

5 stars

