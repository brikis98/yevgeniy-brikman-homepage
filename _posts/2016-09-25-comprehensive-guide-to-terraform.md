---
layout: post
title: "A Comprehensive Guide to Terraform"
tags:
- External Writing
- Gruntwork
- DevOps
- Terraform
thumbnail_path: blog/gruntwork/terraform-logo.png
external_url: "https://blog.gruntwork.io/a-comprehensive-guide-to-terraform-b3d32832baca"
---

*Update: I took this blog post series, expanded it, and turned it into a book called 
[Terraform: Up & Running]({{ site.terraform_up_and_running_url }}?ref=ybrikman-blog-comprehensive-series)!*

Today, we are kicking off a series of blog posts on how to define and manage infrastructure-as-code in the real world
using Terraform. If you haven’t used it before, Terraform is an open source tool that allows you to define
infrastructure for a variety of cloud providers (e.g. AWS, Azure, Google Cloud, DigitalOcean, etc) using a simple,
declarative programming language and to deploy and manage that infrastructure using a few CLI commands:
[{{ page.title }}]({{ page.external_url }})

{% include figure.html path=page.thumbnail_path caption=page.title url=page.external_url %}

In this intro post, we’ll discuss why we believe every software company should be using infrastructure-as-code. In the
rest of this series, we will cover topics such as why we use Terraform and not Chef, Puppet, Ansible, SaltStack, or
CloudFormation, an introduction to Terraform, how to manage Terraform state, how to create reusable infrastructure with
Terraform modules, Terraform tips & tricks such as loops, if-statements, and pitfalls, and how to use Terraform as a
team.