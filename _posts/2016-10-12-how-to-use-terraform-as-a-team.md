---
layout: post
title: "How to use Terraform as a team"
tags:
- External Writing
- Gruntwork
- DevOps
- Terraform
thumbnail_path: blog/gruntwork/skyscraper.jpeg
external_url: "https://blog.gruntwork.io/how-to-use-terraform-as-a-team-251bc1104973"
---

*Update: I took this blog post series, expanded it, and turned it into a book called 
[Terraform: Up & Running]({{ site.terraform_up_and_running_url }}?ref=ybrikman-blog-comprehensive-series)!*

In the previous parts of the [Comprehensive Guide to
Terraform](https://blog.gruntwork.io/a-comprehensive-guide-to-terraform-b3d32832baca?source=latest) series, we
explained [why we picked
Terraform](https://blog.gruntwork.io/why-we-use-terraform-and-not-chef-puppet-ansible-saltstack-or-cloudformation-7989dad2865c),
[introduced the basic syntax and features of
Terraform](https://blog.gruntwork.io/an-introduction-to-terraform-f17df9c6d180), discussed [how to manage
Terraform state](https://blog.gruntwork.io/how-to-manage-terraform-state-28f5697e68fa), showed [how to create
reusable infrastructure modules with
Terraform](https://blog.gruntwork.io/how-to-create-reusable-infrastructure-with-terraform-modules-25526d65f73d), and
learned some [Terraform tips & tricks such as loops and
if-statements](https://blog.gruntwork.io/terraform-tips-tricks-loops-if-statements-and-gotchas-f739bbae55f9). Today,
we are releasing the sixth and final part of the series: [{{ page.title | downcase }}]({{ page.external_url }}).

{% include figure.html path=page.thumbnail_path caption=page.title url=page.external_url %}

In this part, we discuss collaboration, coding guidelines, and workflow for Terraform projects. By the end of the post,
you'll know how to manage infrastructure-as-code so that multiple people can work on it at the same time successfully.
