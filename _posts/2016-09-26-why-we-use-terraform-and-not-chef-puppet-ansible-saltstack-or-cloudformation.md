---
layout: post
title: "Why we use Terraform and not Chef, Puppet, Ansible, SaltStack, or CloudFormation"
tags:
- External Writing
- Gruntwork
- DevOps
- Terraform
thumbnail_path: blog/gruntwork/terraform-vs-chef-puppet-ansible-salt-cloudformation.png
external_url: "https://blog.gruntwork.io/why-we-use-terraform-and-not-chef-puppet-ansible-saltstack-or-cloudformation-7989dad2865c"
---

*Update: I took this blog post series, expanded it, and turned it into a book called 
[Terraform: Up & Running]({{ site.terraform_up_and_running_url }}?ref=ybrikman-blog-comprehensive-series)!*

If you search the Internet for "infrastructure-as-code" (IAC), it’s pretty easy to come up with a list of the most
popular tools: Chef, Puppet, Ansible, SaltStack, CloudFormation, and Terraform. What’s not easy is figuring out which
one of these you should use. In this post, we’re going to dive into some very specific reasons for why we picked
Terraform over the other IAC tools:
[{{ page.title }}]({{ page.external_url }})

{% include figure.html path=page.thumbnail_path caption=page.title url=page.external_url %}
