---
layout: post
title: "Terraform tips & tricks&#58; loops, if-statements, and gotchas"
tags:
- External Writing
- Gruntwork
- DevOps
- Terraform
thumbnail_path: blog/gruntwork/toolbox.jpeg
external_url: "https://blog.gruntwork.io/terraform-tips-tricks-loops-if-statements-and-gotchas-f739bbae55f9"
---

*Update: I took this blog post series, expanded it, and turned it into a book called 
[Terraform: Up & Running]({{ site.terraform_up_and_running_url }}?ref=ybrikman-blog-comprehensive-series)!*

In the previous parts of the [Comprehensive Guide to
Terraform](https://blog.gruntwork.io/a-comprehensive-guide-to-terraform-b3d32832baca?source=latest) series, we
explained [why we picked
Terraform](https://blog.gruntwork.io/why-we-use-terraform-and-not-chef-puppet-ansible-saltstack-or-cloudformation-7989dad2865c),
[introduced the basic syntax and features of
Terraform](https://blog.gruntwork.io/an-introduction-to-terraform-f17df9c6d180), discussed [how to manage
Terraform state](https://blog.gruntwork.io/how-to-manage-terraform-state-28f5697e68fa), and showed [how to create
reusable infrastructure modules with
Terraform](https://blog.gruntwork.io/how-to-create-reusable-infrastructure-with-terraform-modules-25526d65f73d). Today,
we are releasing the fifth part of the series: [{{ page.title | downcase }}]({{ page.external_url }}).

{% include figure.html path=page.thumbnail_path caption=page.title url=page.external_url %}

In this part, we are going to expand your Terraform toolbox with some more advanced tips & tricks, such as how to do
loops and if-statements. We’ll also discuss some of Terraform’s weaknesses so you can avoid the most common gotchas.
