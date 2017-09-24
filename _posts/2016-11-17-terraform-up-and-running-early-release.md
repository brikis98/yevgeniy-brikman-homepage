---
layout: post
title: "Terraform&#58; Up & Running is now available as an early release"
tags:
- Terraform
- Writing
- DevOps
thumbnail_path: "blog/thumbs/terraform-up-and-running-cover-early-release.jpg"
book_store_url: "http://shop.oreilly.com/product/0636920061939.do"
---

A funny thing happened last week. I wrote another book! It's called 
[Terraform: Up & Running]({{ site.terraform_up_and_running_url }}?ref=ybrikman-blog-early-release) 
and it's now available as an early release in the [O'Reilly Store]({{ page.book_store_url }})!

{% capture url_with_ref %}{{ site.terraform_up_and_running_url }}?ref=ybrikman-blog-early-release }}{% endcapture %}
{% include figure.html path=page.thumbnail_path caption="Terraform: Up & Running" url=url_with_ref %}

[Terraform](https://www.terraform.io/) is an open source tool that allows you to define your infrastructure as code 
using a simple, declarative programming language, and to deploy and manage that infrastructure across a variety of cloud
providers (including Amazon Web Services, Azure, Google Cloud, DigitalOcean, and many others) using a few commands.
For example, instead of manually clicking around a webpage or running dozens of commands, here is all the code it takes
to configure a server on AWS:

{% highlight hcl %}
resource "aws_instance" "example" {
  ami = "ami-40d28157"
  instance_type = "t2.micro"
}
{% endhighlight %}

And to deploy it, you just run one command:

{% highlight text %}
terraform apply
{% endhighlight %}

Thanks to its simplicity and power, Terraform is rapidly emerging as a dominant player in the DevOps world. It's 
replacing not only manual sysadmin work, but also many older infrastructure as code tools such as Chef, Puppet, 
Ansible, SaltStack, and CloudFormation. I've used Terraform extensively for the last few years, and it has become one 
of the foundational technologies at my company, [Gruntwork](https://www.gruntwork.io/?ref=ybrikman-blog-early-release), 
where we have used it to get many companies up and running on AWS with DevOps best practices and world-class 
infrastructure in just 1-2 weeks. And now, all of this experience is available in a book. 

[This book]({{ site.terraform_up_and_running_url }}?ref=ybrikman-blog-early-release) is the fastest way to get up and 
running with Terraform.

You'll go from deploying the most basic "Hello, World" Terraform example all the way up to running a full tech stack 
(server cluster, load balancer, database) capable of supporting a large amount of traffic and a large team of 
developers&mdash;all in the span of just a few chapters. The book is a hands-on-tutorial that not only teaches you 
DevOps and infrastructure as code principles, but also walks you through dozens of code examples that you can try at 
home (you can find all the code examples in the [Terraform: Up & Running
GitHub repo]({{ site.terraform_up_and_running_code_url }})).

By the time you're done, you'll be ready to use Terraform in the real world.

Grab a copy of the early release of the [book in the O'Reilly store]({{ page.book_store_url }}) today! You'll receive 
new chapters and updates as they are written, plus the final ebook bundle when the book is released. This is your 
chance to be one of the first to master Terraform, to own this book, and to help make it better. What did you like? 
What did you hate? What's missing? [Grab a copy]({{ page.book_store_url }}) and send your feedback to 
[{{ site.contact_urls.email.value }}]({{ site.contact_urls.email.url }}).