---
layout: post
title: "How to create reusable infrastructure with Terraform modules"
tags:
- External Writing
- Gruntwork
- DevOps
- Terraform
thumbnail_path: blog/gruntwork/rocket.jpeg
external_url: "https://blog.gruntwork.io/how-to-create-reusable-infrastructure-with-terraform-modules-25526d65f73d"
---

*Update: I took this blog post series, expanded it, and turned it into a book called 
[Terraform: Up & Running]({{ site.terraform_up_and_running_url }}?ref=ybrikman-blog-comprehensive-series)!*

In Part 1 of the [Comprehensive Guide to
Terraform](https://blog.gruntwork.io/a-comprehensive-guide-to-terraform-b3d32832baca?source=latest) series, we
explained [why we picked Terraform as our IAC tool of choice and not Chef, Puppet, Ansible, SaltStack, or
CloudFormation](https://blog.gruntwork.io/why-we-use-terraform-and-not-chef-puppet-ansible-saltstack-or-cloudformation-7989dad2865c?source=latest).
In Part 2 of the series, we [introduced the basics of
Terraform](https://blog.gruntwork.io/an-introduction-to-terraform-f17df9c6d180) in a step-by-step tutorial
that showed how to deploy a cluster of web servers and a load balancer on AWS. In Part 3, we discussed [how to manage
Terraform state, file layout, isolation, and
locking](https://blog.gruntwork.io/how-to-manage-terraform-state-28f5697e68fa). In this post, we discuss
[{{ page.title | downcase }}]({{ page.external_url }}):

{% include figure.html path=page.thumbnail_path caption=page.title url=page.external_url %}

Terraform modules allow you to package a piece of infrastructure (e.g. a Docker cluster or a distributed cache) in a
way that makes it easy reuse it in multiple places in your code base.
