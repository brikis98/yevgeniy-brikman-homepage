---
layout: post
title: "An Introduction to Terraform"
tags:
- External Writing
- Gruntwork
- DevOps
- Terraform
thumbnail_path: blog/gruntwork/terraform-logo.png
external_url: "https://blog.gruntwork.io/an-introduction-to-terraform-f17df9c6d180"
---

*Update: I took this blog post series, expanded it, and turned it into a book called 
[Terraform: Up & Running]({{ site.terraform_up_and_running_url }}?ref=ybrikman-blog-comprehensive-series)!*

In Part 1 of the [Comprehensive Guide to
Terraform](https://blog.gruntwork.io/a-comprehensive-guide-to-terraform-b3d32832baca?source=latest) series, we
explained [why we picked Terraform as our IAC tool of choice and not Chef, Puppet, Ansible, SaltStack, or
CloudFormation](https://blog.gruntwork.io/why-we-use-terraform-and-not-chef-puppet-ansible-saltstack-or-cloudformation-7989dad2865c?source=latest).
Today, we are releasing Part 2 of the series, where we introduce the basics of Terraform in a step-by-step tutorial
that shows you how to deploy a cluster of web servers and a load balancer on AWS:
[{{ page.title }}]({{ page.external_url }})

{% include figure.html path=page.thumbnail_path caption=page.title url=page.external_url %}

The tutorial is designed for AWS and Terraform newbies, so if you've been looking for a way to get started with either
technology, take a look!
