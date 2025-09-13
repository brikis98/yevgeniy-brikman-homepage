---
layout: post
title: "Review: Infrastructure as Code by Kief Morris"
tags: ["Review: Nonfiction", "5 Stars", "DevOps", "Software Delivery"]
thumbnail_path: "reviews/infrastructure-as-code.jpg"
header_image: "reviews/infrastructure-as-code.jpg"
header_image_url: "https://www.amazon.com/dp/109815035X?tag=brikis98-20&linkCode=osi&th=1&psc=1"
header_image_caption: "'Infrastructure as Code' by Kief Morris"
date: "2016-11-09"
---

This is a great read for anyone in Ops, DevOps, or any other discipline that involves to running & maintaining software. The book covers a lot of ground, both in the infrastructure as code space, and in DevOps generally, and is full of wonderful insights. The drawback to this broad scope is that there aren't many examples of real code, and the examples that are there tend to be superficial and simple. There are some subtle concepts that could have been demonstrated by showing real code, but that's probably hard to do in a book that covers so many different topics.  
  
Here are some of the key idea in the book:  
  
\* We've moved from the "Iron Age" of metal servers to the "Cloud Age" of virtual servers.   
\* Core principles of infrastructure as code: Systems can easily be reproduced; Systems are disposable; Systems are consistent; Processes are repeatable; Design is always changing.  
\* Core practices of infrastructure as code: Use definition files; Self documented systems and processes; Version all the things; Continuously test systems and processes; Small changes rather than batches; Keep services available continuously.  
\* Go further than just preventing a system from breaking; try to build systems that are "antifragile". That is, systems that get stronger when under stress. Just as a muscle gets stronger from frequent exercise, a DevOps team gets strong by frequent deployments.   
\* Go further than just automating a system; make it "autonomic". Just as you have autonomic systems in your body (e.g. heart rate, breathing) that run and react completely by themselves, while still allowing conscious input, you should have autonomic systems in your software.  
\* An interesting thought exercise on disaster recovery: what would happen to your company if one of the vendors you used was entirely wiped out? What if AWS shut down or raised prices by 100x? What about GitHub? What if they got hacked? Would your business survive?  
\* Successfully using infrastructure as code and adopting DevOps requires a shift in mindset. The Ops team should no longer act like a gatekeeper or babysitter for production. Instead, the Ops team is responsible for being experts, setting standards, build tools that others can use to implement those standards, and educating other teams on these standards and tools. Those other teams are the ones responsible for deploying their code--and, just as importantly, keeping it up and running. This is obvious in other disciplines. For example, a security team can't effectively secure your code for you. You have to do it yourself. All the security team can do is create tools, teach you to use them, and provide review, auditing, and testing. Although not as obvious, the same is true with Ops: they can't effectively run your code for you.   
  
  
Some of my favorite quotes from the book:  
  
"Infrastructure as code is an approach to infrastructure automation based on practices from software development. It emphasizes consistent, repeatable routines for provisioning and changing systems and their configuration. Changes are made to definitions and then rolled out to systems through unattended processes that include thorough validation."  
  
"An operations team should be able to confidently and quickly rebuild any server in their infrastructure. If any server doesn't meet this requirement, constructing a new, reproducible process that can build a server to take its place should be a leading priority for the team."  
  
"A fundamental difference between the iron age and cloud age is the move from unreliable software, which depends on the hardware to be very reliable, to software that runs reliably on unreliable hardware."  
  
"The hallmark of an infrastructure team's effectiveness is how well it handles changing requirements."  
  
"A team's ability to work with configuration that's managed internally by a tool is limited to interactions that the tool supports. Configuration externalized as text files, on the other hand, can be accessed and manipulated by any off-the-shelf tool. You can edit them with whatever text editor you prefer, manipulate them with common command-line tools, and write your own scripts to manage them. The ability to use this vast ecosystem of text file–friendly tools to bear on infrastructure configuration gives a team far more control than it can have with a proprietary tool."  
  
"You know your infrastructure definition is becoming monolithic when people become afraid to make a change. When you find yourself considering adding organizational processes to coordinate and schedule changes, stop! There are ways to organize your infrastructure to make it easier and safer to make changes. Rather than adding organizational and process complexity to manage complex infrastructure designs, redesign the infrastructure to eliminate unnecessary complexity."  
  
"The enabling idea of Infrastructure as Code is that the systems and devices used to run software can be treated as if they, themselves, are software. This makes it possible to use tools and working practices that have been proven in the software development world."  
  
"The great thing about CD is that the decision to go live becomes a business decision, not a technical one. The technical validation has already been done: it happens on every commit."  
  
""DevOops"; the ability to automatically configure many machines at once gives us the ability to automatically break many machines at once."  
  
"The big shift is away from working directly on servers and infrastructures, to working on them indirectly. An infrastructure engineer can no longer just log onto a server to make a change. Instead, they make changes to the tools and definitions, and then allow the change management pipeline to roll the changes out to the server. This can be frustrating at first. It feels like a slower, more complicated way to do something simple."  
  
"The aim is to have infrastructure management systems that work autonomically. In physiology, autonomic functions happen without conscious effort (e.g., breathing or heart rate). You might be able to override some of these (e.g., by holding your breath). But you don't normally need to think about doing it. Autonomic automation is the secret to making infrastructure as code work reliably. When the team finds a new web server configuration option that improves security, they embed that into their automation tooling. They know that it will be applied to all relevant servers, current and future, without anyone having to think about it again."  
  
"When a team adopts infrastructure as code, its members should find themselves spending less time carrying out routine activities, and more time improving the system itself."  
  
"An interesting thing about a dynamic infrastructure platform is that it looks a lot like unreliable infrastructure. Servers routinely disappear and are replaced. This happens when resources are automatically scaled up and down, and may even happen as a byproduct of the mechanism for making routine changes, deploying software, and running tests."  
  
"Ideally, IT systems would be like a consumer automobile. You buy a new car off the assembly line, and periodically pay to keep it fueled and maintained, occasionally replacing parts as they wear out or fail. You don't need to keep the engineers who designed and assembled the car on staff. In practice, modern IT systems are more like a Formula One race car. Each one is custom-built, even if they use standard parts and follow common patterns. It takes continuous work to keep it running well, patched and secure. And the needs that IT systems must satisfy are constantly changing, as the way technology is used by consumers and businesses is constantly changing. This in turn means that an organization's IT systems must constantly change."

**Rating**: 5 stars

