---
layout: post
title: "A productive development environment with Docker on OS X"
tags:
- Software Engineering
- Open Source
thumbnail_path: blog/docker/docker-logo.png
project_url: https://github.com/brikis98/docker-osx-dev
---  

You're a programmer and you're excited to start a new project. Maybe you just 
joined a new company or maybe you found a new open source library that you want 
to use. You `git clone` the code, open up the README, and start following the 
install instructions. You find out the project uses some shell scripts, but they 
rely on commands or flags that are only available on Linux and you're on OS X, 
or you're on Linux, but a different flavor of it. You manage to work past that, 
only to find that the code assumes you have all sorts of libraries installed, 
like a particular version of OS X, or some newer version of XCode (why do I 
need XCode and why is it so freaking huge?), or, worst of all, a specific 
version of Ruby. Then you spend hours reading about RVM and RBEnv, fighting 
with strange errors with C header files, and wondering what the F#@K is Nokogiri 
and why does it *never* install correctly? 

You quickly find yourself in an infinite loop of 1) try to run the
code, 2) get an obscure error message, 3) Google it, 4) try random suggestions
you find on StackOverflow, 5) go back to step 1. The last straw is when you 
find out you have to deal with Satan himself in the form of software from 
Oracle. Seriously, have you ever installed Oracle DB? It's a multi-day process 
that involves formatting half your hard drive, a drug induced trip into the 
Himalayas to find a rare blue Orchid, and a two day session where Oracle's 
lawyers beat you with reams of legal documents. And why the F#$@K does the Java 
updater try to install the MOTHERF&#$@NG Ask Toolbar?

{% include figure.html path="blog/docker/fuck-this-shit.png" alt="Looks like it's fuck this shit o'clock" %}

In this post, I'm going to walk you through a better way to install, configure,
and manage software by introducing you to Docker. After that, I'm going to talk
about how you can use Docker in your development environment to be much more
productive when building software. Finally, I'll talk about a small open source
project I created called [docker-osx-dev]({{ page.project_url }}) to make it 
much easier to use Docker on OS X.

# Introduction to Docker

Installing and configuring software is the ultimate form of [Yak 
Shaving](http://sethgodin.typepad.com/seths_blog/2005/03/dont_shave_that.html).
I suspect that the complexity of getting software running is responsible for 
driving a huge percentage of people away from programming. You have to be some 
sort of masochist to deal with a user experience as awful as archaic 
software error messages. It's also responsible for a huge percentage of bugs.
Not only do you  have to go through this awful installation process in your
development environment, but every other developer on your team does too. And 
then you have to shave the Yak's cousin by repeating all these steps again in 
the testing and production environments. The probability of missing a step or 
something going out of sync is incredibly high.

{% include figure.html path="blog/docker/say-works-on-my-machine.jpg" alt="Say 'works on my machine' one more time. I dare you." %}

There have been many attempts to automate this process in the past, but all the 
ones I tried had major drawbacks. For example, you could write custom shell 
scripts and maintain lots of documentation for how to setup your code, but this
was always a nightmare to maintain, update, and test. You could use 
Configuration Management (CM) software, such as 
[Chef](https://www.chef.io/chef/), [Puppet](https://puppetlabs.com/), and 
[Ansible](http://www.ansible.com/home), which make it easier to automate your
testing and production environments, but CM tools are fairly useless for setting 
up a development environment, and incur too much overhead and cost to use for a
small open source or side project. Finally, you could package your code into 
Virtual Machine (VM) images to guarantee consistency across all environments, 
and even define your VM images in code with tools like 
[Vagrant](https://www.vagrantup.com/), but VM images are large, slow to start, 
and incur a lot of performance overhead, so they were a terrible user experience
in the development environment.

This is where [Docker](https://www.docker.com/) comes in. Docker runs your code
in a *container*, which is like a lightweight VM. A full VM virtualizes all the 
hardware and operating system, which provides isolation and consistency, but 
incurs a lot of overhead. A container runs your code directly on the host 
operating system and hardware, but in an isolated userspace, so there is 
little-to-no overhead, but you still get all the benefits of isolation and 
consistency. Not all operating systems support isolated userspaces. Docker, in 
particular, relies on the Linux kernel and the [Linux 
Containers](https://linuxcontainers.org/) (LXC) project. If you run your code
on top of Linux in production, you should definitely take the time to 
understand how it works.

The easiest way to understand Docker is to walk through an example. If you have
Docker installed, the first thing you need to do is to `pull` a `Docker image`:

{% highlight text %}
> docker pull ubuntu
{% endhighlight %}

A Docker image defines a set of files and some instructions for running them, a
little bit like a VM image. In this case, the image we are using is of the 
[Ubuntu operating system](http://www.ubuntu.com/) (yes, an operating system is
just a set of files and some way to run them). The `pull` command will download
this image (which is about 188MB) from the [Docker Hub 
Registry](https://registry.hub.docker.com/). Docker Hub is a bit like GitHub: 
it's a collection of open source Docker images (such as Ubuntu) that anyone can
download using `docker pull` (like `git pull`) and anyone can contribute to 
using `docker push` (like `git push`). 

Now that you have the image on your computer, you can use `docker run` to run
the image in a container:

{% highlight text %}
> docker run ubuntu echo "Hello, World"
Hello, World
{% endhighlight %}

What just happened? Well, the `run` command fired up the ubuntu image and told
it to execute the command `echo "Hello, World"`. That's right, I just ran
the entire Ubuntu operating system just to print "Hello, World" to the 
terminal. How long does it take? Let's use the `time` command to find out:

{% highlight text %}
> time docker run ubuntu echo "Hello, World"
Hello, World

real  0m0.183s
user  0m0.009s
sys 0m0.014s
{% endhighlight %}

0.183 seconds! That's right, on my Apple laptop running OS X, I am able to fire
up Ubuntu in one tenth of a second. Whereas starting up an operating system in
a full VM is a big operation that can take minutes, in Docker, it's a throwaway
operation that takes a fraction of a second. There is no trick here. It's the
real Ubuntu OS and it is completely isolated from my host OS:

{% include iframe.html url="https://asciinema.org/api/asciicasts/20260?autoplay=true&amp;loop=true" wrapper_class="screencast-wrapper" %}

What is so powerful about this concept is that this Ubuntu image will run 
exactly the same way no matter where you run it. So if you can create a Docker
image that has your dev environment in it, you can ship that image to any other
computer and you'll know it'll work the exact same way when it gets there. 

One of the easiest and most effective ways to create a Docker image is to write
a [Dockerfile](https://docs.docker.com/reference/builder/). For example, here 
is a `Dockerfile` that defines a Ruby on Rails stack:

{% highlight docker %}
FROM ubuntu:14.04

# Install Ruby and Rails dependencies
RUN apt-get update && apt-get install -y \
  ruby \
  ruby-dev \
  build-essential \   
  libxml2-dev \       
  libxslt1-dev \      
  zlib1g-dev \        
  libsqlite3-dev \
  nodejs

# Install Rails
RUN gem install rails

# Create a new Rails app under /src/my-app
RUN mkdir -p /src && cd /src && rails new my-app
WORKDIR /src/my-app

# Default command when you run this image is to run a rails server on port 3000
CMD ["rails", "server", "--binding", "0.0.0.0", "--port", "3000"]
EXPOSE 3000
{% endhighlight %}

Let's go through this file line by line. The `FROM ubuntu:14.04` command says
that this image will run on top of Ubuntu version 14.04. Next, there are several
`RUN` commands which will execute code in this image to configure all of our
software. The first `RUN` command uses `apt-get`, the Ubuntu package manager, to 
install Ruby and a bunch of dependencies for Rails (notice how many dependencies
there are just for a vanilla Rails app!). The next `RUN` command uses
`gem`, the Ruby package manager, to install Rails itself. After that, I create a 
folder `/src`, run `rails new` to create a new Rails app called `my-app` in it,
and set `/src/my-app` as the working directory. Finally, I set the default 
command for this image to be `rails server` running on IP 0.0.0.0 and port 3000
(in the Docker container) and expose port 3000 so we can access it outside of
the container.

Here is how you turn this `Dockerfile` into a Docker image:

{% highlight text %}   
> docker build -t brikis98/my-rails-app .
{% endhighlight %}

This creates a new Docker image called `my-rails-app` for user `brikis98`. I 
can use the `docker run` command you saw earlier to test this image:

{% include iframe.html url="https://asciinema.org/api/asciicasts/20263?autoplay=true&amp;loop=true" wrapper_class="screencast-wrapper" %}

I use the `-p` flag to map the port the container exposes (3000) to the same
port on my own computer. I can now test my Rails app by visiting 
`http://localhost:3000` (on OS X, you'll need to use a different IP than 
localhost, something I'll discuss later).

Now that my Rails app is working, I can share it with others. I can run
`docker push` to send the `brikis98/my-rails-app` image to the public Docker 
registry or to a private registry within my company. Or better yet, I can check 
in my `Dockerfile` and let my continuous integration environment build, test, 
and push the images for me. Once the image is published, I can use the 
`docker run brikis98/my-rails-app` command to run the Rails app on any 
computer&mdash;such as another developer's workstation or in test or in
production&mdash;and you can be sure that app will work exactly the same way 
everywhere without anyone having to fuss around with dependencies or 
configuration.

Once you start using Docker, it's addictive. It's incredibly liberating to be
able to mess around with different Linux flavors, dependencies, libraries, and 
configurations, all without leaving your developer workstation in a messy state.
You can quickly and easily switch from one Docker image to another, throw an
image away if it isn't working, or use multiple images together (e.g. one image 
with a Rails app, one with a database) using [Docker 
Compose](https://docs.docker.com/compose/). And you can leverage the thousands 
of open source images in the Docker Public Registry. For example, instead of 
building the `my-ruby-app` image from scratch and trying to figure out exactly 
which combination of libraries make Rails happy, I could have used the pre-built 
[rails image](https://registry.hub.docker.com/u/library/rails/) which is 
maintained and tested by the Docker community. 

And best of all is that once I've put in the work to get something to work 
locally in a Docker image, I know it'll work just as well in the testing and
production environments. In fact, many hosting providers have first class 
support for Docker, such as [Amazon's EC2 Container 
Service](https://aws.amazon.com/blogs/aws/cloud-container-management/) and
[DigitalOcean's Docker support](https://www.digitalocean.com/community/tutorials/how-to-use-the-digitalocean-docker-application).

# Docker on OS X

If you're already using Linux as your desktop operating system, Docker is a 
no-brainer. Unfortunately, there are [many, many 
reasons](http://linuxfonts.narod.ru/why.linux.is.not.ready.for.the.desktop.current.html)
you might not want to use Linux on the desktop, and you might prefer OS X 
instead. If so, there are a couple problems to work around.

The problems stem from the fact that OS X is built on top of Unix and not Linux,
so you can run Docker on it directly. Instead, you have to run Linux in a VM. 
But wasn't the whole point of Docker to avoid heavyweight VMs? This in and of
itself isn't actually as big of a problem as it sounds for three reasons:

1. You only need to run a *single* VM no matter how many Docker containers you
   want to run on top of it. You pay the penalty of starting this VM just once
   and then you leave it running in the background. You can then run as many 
   docker containers as you want on top of this VM, with each one starting and 
   stopping in a fraction of a second. 
2. You only need the VM in development, so the performance overhead is not as 
   big of a concern.
3. Thanks to the [Boot2Docker](http://boot2docker.io/) project, you can run a
   stripped down version of Linux in the VM which runs completely in RAM, 
   takes up only 27MB, and boots up in about 5 seconds. 

Secondly, the Linux VM you're running doesn't



Docker is great for testing


