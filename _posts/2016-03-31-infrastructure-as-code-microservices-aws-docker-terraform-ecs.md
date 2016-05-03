---
layout: post
title: "Infrastructure as code: running microservices on AWS using Docker, Terraform, and ECS"
tags:
- Startups
- DevOps
- Software Engineering
thumbnail_path: blog/thumbs/infrastructure-as-code-screenshot-thumb.png
---

Docker and Amazon ECS are a powerful combination. In previous posts, I showed [how to use Docker to package your
code](http://www.ybrikman.com/writing/2015/05/19/docker-osx-dev/) and how to manually [deploy Docker containers on
Amazon ECS](http://www.ybrikman.com/writing/2015/11/11/running-docker-aws-ground-up/). In this post, I'm sharing the
[slides](http://www.slideshare.net/brikis98/infrastructure-as-code-running-microservices-on-aws-using-docker-terraform-and-ecs)
and [code](https://github.com/brikis98/infrastructure-as-code-talk) from my [DevOps Italia
2016](http://www.incontrodevops.it/) talk, where I show how to automate the deployment by defining your
infrastructure-as-code using Docker and the new kid on the block, [Terraform](https://www.terraform.io/).

You can find the code for the talk at [https://github.com/brikis98/infrastructure-as-code-talk]().

{% include iframe-figure.html url="//www.slideshare.net/slideshow/embed_code/key/23pR8vDf9nt3pz" link="http://www.slideshare.net/brikis98/infrastructure-as-code-running-microservices-on-aws-using-docker-terraform-and-ecs" caption="Infrastructure as code: running microservices on AWS using Docker, Terraform, and ECS (Slides)" %}

For more info, check out my book,
*[Hello, Startup](http://www.hello-startup.net/?ref=ybrikman-infrastructure-as-code)*. If you need help with Docker,
Terraform, AWS, infrastructure-as-code, or any other DevOps practices, reach out to me at
[Gruntwork]({{ site.gruntwork_url }}/?ref=ybrikman-infrastructure-as-code).