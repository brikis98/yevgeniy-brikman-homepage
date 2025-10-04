---
layout: post
title: "Review: Designing Data-Intensive Applications by Martin Kleppmann"
tags: ["Review: Nonfiction", "5 Stars", "Programming"]
thumbnail_path: "reviews/designing-data-intensive-applications.jpg"
header_image: "reviews/designing-data-intensive-applications.jpg"
header_image_url: "https://www.amazon.com/dp/1449373321?tag=brikis98-20&linkCode=osi&th=1&psc=1"
header_image_caption: "'Designing Data-Intensive Applications' by Martin Kleppmann"
date: "2017-07-20"
---

A must-read for every programmer. This is the best overview of data storage and distributed systems—two key concepts for building almost any piece of software today—that I've seen anywhere. Martin does a wonderful job of taking a massive body of research and distilling complicated concepts and difficult trade-offs down to a level where anyone can understand it.   
  
I learned a lot about replication, partitioning, linearizability, locking, write skew, phantoms, transactions, event logs, and more. I'm also a big fan of the final chapter, The Future of Data Systems, which covers ideas such as "unbundling the database" (i.e., using an event log as the primary data store, and handling all other aspects of the "database", such as secondary indexes, materialized views, and replication, in separate "derived" data systems), end-to-end event streams, and an important discussion on ethics in programming and data systems.  
  
The only thing missing is a set of summary tables. I'd love to see a list of all common data systems and how they fair across many dimensions: e.g., support for locking, replication, transaction, consistency levels, and so on. This would be very handy for deciding what system to pick for my next project.  



## Quotes

As always, I've saved a few of my favorite quotes from the book:  
  
> Document databases are sometimes called schemaless, but that's misleading, as the code that reads the data usually assumes some kind of structure—i.e., there is an implicit schema, but it is not enforced by the database. A more accurate term is schema-on-read (the structure of the data is implicit, and only interpreted when the data is read), in contrast with schema-on-write (the traditional approach of relational databases, where the schema is explicit and the database ensures all written data conforms to it). Schema-on-read is similar to dynamic (runtime) type checking in programming languages, whereas schema-on-write is similar to static (compile-time) type checking.

> For defining concurrency, exact time doesn't matter: we simply call two operations concurrent if they are both unaware of each other, regardless of the physical time at which they occurred. People sometimes make a connection between this principle and the special theory of relativity in physics, which introduced the idea that information cannot travel faster than the speed of light. Consequently, two events that occur some distance apart cannot possibly affect each other if the time between the events is shorter than the time it takes light to travel the distance between them.

> A node in the network cannot know anything for sure—it can only make guesses based on the messages it receives (or doesn't receive) via the network.

> The best way of building fault-tolerant systems is to find some general-purpose abstractions with useful guarantees, implement them once, and then let applications rely on those guarantees.

> CAP is sometimes presented as Consistency, Availability, Partition tolerance: pick 2 out of 3. Unfortunately, putting it this way is misleading because network partitions are a kind of fault, so they aren't something about which you have a choice: they will happen whether you like it or not. At times when the network is working correctly, a system can provide both consistency (linearizability) and total availability. When a network fault occurs, you have to choose between either linearizability or total availability. Thus, a better way of phrasing CAP would be either Consistent or Available when Partitioned.

> The traditional approach to database and schema design is based on the fallacy that data must be written in the same form as it will be queried. Debates about normalization and denormalization (see"Many-to-One and Many-to-Many Relationships") become largely irrelevant if you can translate data from a write-optimized event log to read-optimized application state: it is entirely reasonable to denormalize data in the read-optimized views, as the translation process gives you a mechanism for keeping it consistent with the event log.

> As algorithmic decision-making becomes more widespread, someone who has (accurately or falsely) been labeled as risky by some algorithm may suffer a large number of those "no" decisions. Systematically being excluded from jobs, air travel, insurance coverage, property rental, financial services, and other key aspects of society is such a large constraint of the individual's freedom that it has been called "algorithmic prison". In countries that respect human rights, the criminal justice system presumes innocence until proven guilty; on the other hand, automated systems can systematically and arbitrarily exclude a person from participating in society without any proof of guilt, and with little chance of appeal.

> Predictive analytics systems merely extrapolate from the past; if the past is discriminatory, they codify that discrimination. If we want the future to be better than the past, moral imagination is required, and that's something only humans can provide.

