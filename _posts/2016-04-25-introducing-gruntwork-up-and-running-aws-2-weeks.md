---
layout: post
title: "Introducing Gruntwork&#58; get up and running on AWS with DevOps best practices and world-class infrastructure in about 2 weeks"
tags:
- Gruntwork
- Atomic Squirrel
- Startups
- DevOps
thumbnail_path: "blog/gruntwork/gruntwork-bg-center.png"
gruntwork_url: "https://www.gruntwork.io/?ref=ybrikman-gruntwork-intro"
---

Building infrastructure for a software company is much harder than it should be. There are so many moving parts and so
many concepts to learn. How do I build my code? How do I deploy it? Should I use Docker? How do I deploy a Docker
container? Where should I store database passwords? How do I manage SSH keys? What do I do when a server goes down?
How can I be sure I don’t lose data? How do I even know that a server is down? It seems like there is never enough time
to get all of these right and many companies end up scraping their infrastructure together using duct tape and glue.

This was the problem I set out to solve when I launched [Atomic
Squirrel](https://www.atomic-squirrel.net/?ref=ybrikman-gruntwork-announce) last year. Along the way, I met Josh
Padnick, who was trying to solve the same problem at his company, [Phoenix DevOps](http://www.phoenixdevops.com). Our
companies began working together and after many months and many happy clients, I’m happy to announce that we are now
officially joining forces at a single new company called [Gruntwork]({{ page.gruntwork_url }}).

{% include figure.html path=page.thumbnail_path caption="www.gruntwork.io" url=page.gruntwork_url %}

Gruntwork’s mission is to make it an order of magnitude easier to understand, develop, and deploy software. We've taken
the thousands of hours we spent building infrastructure on AWS at Atomic Squirrel and Phoenix DevOps and condensed all
that experience and code into pre-built packages that are:

* **Proven.** Take a look at the list of [companies using Gruntwork packages in production](https://www.gruntwork.io/?ref=ybrikman-gruntwork-intro#our-clients).
* **Tested.** Each package goes through a series of automated tests.
* **Documented.** Each package is thoroughly documented. We also offer DevOps training.
* **Customizable.** We work with your company to adapt each package to your needs.
* **Supported.** Get package updates and access to new packages via our subscription.
* **Yours.** The packages live in your codebase, so you can modify them any way you want.

Some of the most popular packages that we offer are:

* **Continuous integration**. Automated pipeline to build, test, and package your code.
* **Automated deployment**. Zero-downtime, immutable deployment, with auto rollback.
* **Network security**. Secure VPC setup with isolated subnet tiers, NAT, bastion host.
* **Secrets management**. Set up Vault or KMS for managing secrets and credentials.
* **Monitoring**. Log aggregation, metrics, and alerting.
* **Availability & scalability**. Auto scaling, load balancing, CDN, disaster recovery.
* **Configuration**. Terraform, Docker, Packer, Consul.

Using these packages, we can get your company up and running on AWS with DevOps best and world-class infrastructure
practices in about 2 weeks. That’s a fraction of the time—and a fraction of the cost—it would take you to do it from
scratch. This way, you can focus on your product, and we can take care of the grunt work.

For more info, and to get in touch, check out [www.gruntwork.io]({{ page.gruntwork_url }}) and follow us on
[Twitter](https://twitter.com/gruntwork_io), [Facebook](https://www.facebook.com/gruntworkio),
[LinkedIn](https://www.linkedin.com/company/gruntwork), [Google](https://plus.google.com/110908043390336994091), and
[GitHub](https://github.com/gruntwork-io/).
