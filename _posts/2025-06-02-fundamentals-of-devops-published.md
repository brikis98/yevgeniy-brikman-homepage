---
layout: post
title: "Fundamentals of DevOps and Software Delivery has been published!"
tags:
- DevOps
- Software Delivery
- Writing
- AWS
- Kubernetes
- Popular
thumbnail_path: "blog/fundamentals-of-devops/fundamentals-of-devops-cover-2d-color-medium.png"
header_image: "blog/fundamentals-of-devops/fundamentals-of-devops-cover-2d-color-medium.png"
external_url: "https://www.fundamentals-of-devops.com/?ref=ybrikman-fdsd-published-blog-post"
header_image_url: "https://www.fundamentals-of-devops.com/?ref=ybrikman-fdsd-published-blog-post"
---

Today, I'm happy to announce that my new book, _[Fundamentals of DevOps and Software
Delivery]({{ page.external_url }})_, has been published!

Whereas most books and talks on DevOps focus on culture, values, and organizational structure, I've found that when 
most people talk about DevOps, what they are really interested in is the mechanics of effective software delivery. 
That's what this book is all about. It's a hands-on guide that includes dozens of step-by-step examples
of how to run production systems. You'll start with the basics—an app running on a single server—and work your way up 
to microservices in a Kubernetes cluster with a service mesh, automated deployment pipeline, end-to-end encryption, and 
more. 

I wrote this book because I've been fortunate enough to see the impact world-class software delivery can have on a 
company. If you're one of the many developers who hasn't had a chance to experience this firsthand, you'll be 
astonished by the gap between companies with world-class software delivery processes and everyone else. 

The following table shows the difference between elite performers and low performers in the four key 
[_DevOps Research and Assessment (DORA) metrics_](https://dora.dev/guides/dora-metrics-four-keys/), which are a quick 
way to assess the performance of a software development team (these numbers are from the [2024 State of DevOps
Report](https://cloud.google.com/blog/products/devops-sre/announcing-the-2024-dora-report)):

<style>
table {
  margin-bottom: 20px;
  font-size: 14px;
  line-height: 20px;
  border-collapse: collapse;
}

th, td {
  padding: 10px;
  border: 1px solid #ccc;
}
</style>

| Metric               | Description                                                          | Elite vs. low performers |
|----------------------|----------------------------------------------------------------------|--------------------------|
| Deployment frequency | How often you deploy to production                                   | 182× more often          |
| Lead time            | How long it takes a change to go from committed to deployed          | 127× faster              |
| Change failure rate  | How often deployments cause failures that need immediate remediation | 8× lower                 |
| Recovery time        | How long it takes to recover from a failed deployment                | 2,293× faster            |

To put these _staggering_ differences into perspective, consider these examples:

* Deploying once per month versus many times per day
* Deployment processes that take 36 hours versus 5 minutes
* Two out of three deployments causing problems versus one out of twenty
* Outages that last 24 hours versus 2 minutes

It's almost a meme that developers who leave companies with world-class software delivery processes, such as Google, 
Meta, or Amazon, complain bitterly about how much they miss the infrastructure and tooling. That's because they are used 
to a world that looks like this:

* They can deploy anytime they want, even _thousands of times per day_.
* Deployments can happen in _minutes_, and they are 100% automated.
* Problems can be detected in _seconds_, often before any user-visible impact.
* Outages can be resolved in _minutes_, often automatically.

What do the equivalent numbers look like at your organization? 

If you're not even in the ballpark, don't fret. It's possible to achieve these results, even if you're not a 
multibillion-dollar company. _Fundamentals of DevOps and Software Delivery_ will show you how. After all, it's not
magic. It's a combination of knowing the principles, techniques, and tools—and a lot of practice. 

Why practice? A book on weight lifting can teach you principles, routines, and exercises, but you have to spend hours 
in the gym practicing, sweating, and applying what you learned to be able to lift serious weight. Likewise, a book on 
DevOps and software delivery can teach you principles, techniques, and tools, but you have to spend hours writing
code, debugging systems, and applying what you learned to be able to achieve serious results.

That's what the [code examples]({{ page.external_url }}#hands-on) in this book are for. Instead of only reading, you 
get to _learn by doing_. As you go through the book, you'll try out dozens of examples, including:   

* Deploying VMs (EC2), containers (Kubernetes), and serverless (Lambda)
* Managing your infrastructure as code via OpenTofu, Packer, and Ansible
* Automating your builds, tests, and deployments in a CI/CD pipeline
* Configuring networking, including VPCs, VPNs, DNS, and service meshes
* Splitting your code into multiple environments, libraries, & microservices
* Managing secrets and encrypting data in transit (TLS) and at rest (AES)
* Storing data in relational databases, NoSQL databases, and file stores
* Setting up monitoring, including metrics, logs, events, and alerts
* And much more!

Get your copy of _[Fundamentals of DevOps and Software Delivery]({{ page.external_url }}#buy-now)_ now, and start 
practicing!

