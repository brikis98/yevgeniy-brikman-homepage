---
layout: post
title: "A productive development environment with Docker on OS X"
tags:
- DevOps
- Software Engineering
- Open Source
thumbnail_path: blog/docker/docker-logo.png
project_url: https://github.com/brikis98/docker-osx-dev
excerpt: |
  In this post, I'm going to explain why the way most programmers install,
  configure, and manage software in development, testing, and production
  environments is a complete nightmare. After that, I'm going to show you a
  better way to do it using Docker. Finally, I'll introduce a small open source
  project I created called docker-osx-dev which aims to make it easy to setup
  a productive development environment with Docker on OS X.
add_to_popular_list: true
---

{% include figure.html path=page.thumbnail_path alt="Docker" %}

In this post, I'm going to explain why installing, configuring, and maintaining
software in development, testing, and production environments can be a complete
nightmare. After that, I'm going to show you a better way to do it using
[Docker](https://www.docker.com/). Finally, I'll introduce a small open source
project I created called [docker-osx-dev]({{ page.project_url }}), which makes
it easier to setup a productive development environment with Docker on OS X.

## Motivation

Let's say you just started at a new company or you discovered a handy new open
source library and you're excited to get things running. You `git clone` the
code, search for install instructions, and come up empty. You ask your
co-workers where you can find
[documentation](https://www.ybrikman.com/writing/2014/05/05/you-are-what-you-document/),
and they laugh. "We're agile, we don't waste time on documentation." Everyone
remembers that setting things up the first time was painful&mdash;a hazing
ritual for new hires&mdash;but no one really remembers all the steps, and
besides, the code has changed and the process is probably different now anyway.

Even if you do find documentation, it's inaccurate, out of date, and incomplete.
You copy some files here and there. You install a programming language or two.
You run a random shell script. You fiddle with environment variables. Eventually,
you figure out that you need a specific version of some library installed, and
so off you go to upgrade OS X, or to figure out how to run Python 2 side-by-side
with Python 3, or to add symlinks to ensure you're using the proper version of
Java, or to download the multi-gigabyte XCode installer (seriously, why is it so
freaking huge?). And, of course, some of the requirements from one project
conflict with the requirements of another project. Before you know it, you're
spending hours reading about RVM and RBEnv so you can run multiple versions of
Ruby, you're fighting with strange errors with C header files, and you're
wondering what the F#@K is Nokogiri and why does it *never* install correctly?

Eventually, you find yourself in an infinite loop of 1) try to run the
code, 2) get an obscure error message, 3) Google it, 4) try random suggestions
you find on StackOverflow, 5) go back to step 1. The last straw is when you
find out you have to deal with Satan himself in the form of software from
Oracle. Seriously, have you ever installed Oracle DB? It's a multi-day process
that involves formatting half your hard drive, a drug induced trip into the
Himalayas to find a rare blue Orchid, and a two day session where Oracle's
lawyers beat you with reams of legal documents. And why the F#$@K does the
Oracle Java updater try to install the MOTHERF&#$@NG Ask Toolbar?

Installing and configuring software is the ultimate form of [Yak
Shaving](http://sethgodin.typepad.com/seths_blog/2005/03/dont_shave_that.html).
The complexity of getting software running is responsible for:

1. Driving many people away from programming. Most people are not masochistic
   enough to deal with a user experience that is equal parts out-of-date
   documentation, XML configuration files, arcane error messages, and frantic,
   rage-driven Google searches.
2. Wasting a huge amount of time. Not only do you have to go through this awful
   installation process in your development environment, but every other
   developer on your team does too.
3. A huge percentage of bugs. Even if you get the software running in your
   development environment, getting it to work the same way in the testing and
   production environments is the same nightmare all over again. The probability
   of missing a step or something going out of sync is approximately 100%.

{% include figure.html path="blog/docker/say-works-on-my-machine.jpg" alt="Say 'works on my machine' one more time. I dare you." %}

There have been many attempts to automate this process, but they all have major
drawbacks. For example, you could create custom shell scripts and lots
of documentation for how to setup your code, but this is always a nightmare to
maintain, update, and test. You could use Configuration Management (CM)
software, such as [Chef](https://www.chef.io/chef/), [Puppet](https://puppetlabs.com/),
and [Ansible](http://www.ansible.com/home), which make it easier to automate your
testing and production environments, but they are fairly useless for setting
up a development environment, and incur too much overhead and cost to use for a
small open source or side project. Finally, you could package your code into
Virtual Machine (VM) images, which will run the same way everywhere, but VM
images incur a lot of performance overhead, which causes problems in the
production environment, and they use a lot of resources and are slow to start,
which causes problems in the development environment.

## Introducing Docker

This is where [Docker](https://www.docker.com/) comes in. Docker runs your code
in a *container*, which is like a lightweight VM. Whereas a full VM virtualizes
all the hardware and the operating system, a container runs your code directly
on the host operating system and hardware, but in an isolated userspace. This
way, you get all the isolation and consistency benefits of a VM, but with very
little overhead. Not all operating systems support isolated userspaces. Docker,
in particular, relies on the Linux kernel and the [Linux
Containers](https://linuxcontainers.org/) (LXC) project. If you run your code
on top of Linux in production, then Docker is for you.

The easiest way to understand Docker is to walk through an example. If you have
Docker installed, the first thing you need to do is to `pull` a Docker *image*:

{% highlight text %}
> docker pull ubuntu
{% endhighlight %}

A Docker image defines a set of files and some instructions for running them.
In this case, the image we are using is of the [Ubuntu operating
system](http://www.ubuntu.com/). The `pull` command will download this image
(which is about 188MB) and cache it on your computer so you won't have to
download it again. Public images are stored in the [Docker Hub
Registry](https://registry.hub.docker.com/), which is a bit like GitHub:
it's a collection of open source Docker images (such as Ubuntu) that anyone can
download using `docker pull` (like `git pull`) and anyone can contribute to
using `docker push` (like `git push`).

Now that you have the image on your computer, you can use `docker run` to run
it:

{% highlight text %}
> docker run ubuntu echo "Hello, World"
Hello, World
{% endhighlight %}

What just happened? Well, the `run` command fired up the ubuntu image and told
it to execute the command `echo "Hello, World"`. That's right, you're firing up
the entire Ubuntu operating system just to print "Hello, World" to the
terminal. How long does it take? You can use the `time` command to find out:

{% highlight text %}
> time docker run ubuntu echo "Hello, World"
Hello, World

real  0m0.183s
user  0m0.009s
sys 0m0.014s
{% endhighlight %}

0.183 seconds! This is on my Apple laptop, which runs OS X. On a high powered
Linux desktop, it would be even faster. Whereas starting up an operating system
in a VM is a big operation that can take minutes, in Docker, it's a trivial
operation that takes a fraction of a second. There is no trick here. It's the
real Ubuntu OS and it is completely isolated from my host OS. For example, here
is a quick screencast of firing up `bash` in an Ubuntu container and running a
few commands:

{% include iframe.html url="https://asciinema.org/api/asciicasts/20260?autoplay=true&amp;loop=true" wrapper_class="screencast-wrapper" %}

Docker containers start and stop so quickly, and are so lightweight, that you
could easily run a dozen of them on your developer work station (e.g. one for a
front-end service, one for a back-end service, one for a database, and so on).
But what makes Docker even more powerful is that a Docker image will run
*exactly* the same way no matter where you run it. So once you've put in the
time to make your code work in a Docker image on your local computer, you can
ship that image to any other computer and you can be confident that your code
will still work when it gets there.

One of the easiest and most effective ways to create a Docker image is to write
a [Dockerfile](https://docs.docker.com/reference/builder/). Instead of
configuring your tech stack through manual steps and documentation, a
`Dockerfile` allows you to define your [infrastructure as
code](http://www.thoughtworks.com/insights/blog/infrastructure-code-reason-smile).
For example, here is a `Dockerfile` that defines a Ruby on Rails stack:

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

# Default command is to run a rails server on port 3000
CMD ["rails", "server", "--binding", "0.0.0.0", "--port", "3000"]
EXPOSE 3000
{% endhighlight %}

Let's go through this file line by line. The `FROM ubuntu:14.04` command says
that this image will run on top of Ubuntu version 14.04. Next, there are several
`RUN` commands which will execute code in this image. The first `RUN` command
uses `apt-get`, the Ubuntu package manager, to install Ruby and a bunch of
dependencies for Rails (notice how many dependencies there are just for a
vanilla Rails app!). The next `RUN` command uses `gem`, the Ruby package
manager, to install Rails itself. After that, a `RUN` command creates a `/src`
folder, another one uses `rails new` to create a new Rails app called `my-app`,
and the `WORKDIR` command sets `/src/my-app` as the working directory.
Finally, the `CMD` command will execute `rails server` when you use `docker run`
on this image and the `EXPOSE` command makes port 3000 visible to the host OS.

You can use the `docker build` command to turn this `Dockerfile` into a Docker
image:

{% highlight text %}
> docker build -t brikis98/my-rails-app .
{% endhighlight %}

Once the image is created, you can use the `docker images` command to see all
the images on your computer:

{% highlight text %}
> docker images
REPOSITORY              TAG        IMAGE ID         CREATED       VIRTUAL SIZE
ubuntu                  14.04      07f8e8c5e660     2 weeks ago   188.3 MB
brikis98/my-rails-app   latest     2ac5d95f10cc     4 hours ago   529.4 MB
{% endhighlight %}

You can see the ubuntu image from earlier, as well as the new `my-rails-app`
image from running `docker build`. You can use the `docker run` command to test
this new image and you'll see that it starts up the Rails server on port 3000:

{% include iframe.html url="https://asciinema.org/api/asciicasts/20263?autoplay=true&amp;loop=true" wrapper_class="screencast-wrapper" wrapper_style="padding-bottom: 535px" %}

You can now test your Rails app by visiting `http://localhost:3000` (note: on
OS X, the URL for testing will be different, as I'll discuss later). One
important thing to note is that the code for this Rails app, which was generated
by the `rails new` command, is inside of the Docker container and therefore not
visible on the host OS. But what if you wanted to checkout and edit the code in
the host OS (e.g. OS X) while still being able to run the code inside the
Docker container? To do that, you can *mount* a folder using the `-v` flag in
`docker run`:

{% highlight text %}
> docker run -v /foo:/bar brikis98/my-rails-app
{% endhighlight %}

The command above will take the `/foo` folder in the host OS and make it
available in the Docker container at `/bar`. This way, you can use all the text
editors, IDEs, and other tools you already have installed to make changes in
`/foo` and you'll see them reflected immediately in the Docker container in
`/bar`.

Once you get your Docker image working locally, you can share it with others.
You can run `docker push` to publish your Docker images to the public Docker
registry or to a private registry within your company. Or better yet, you can
check your `Dockerfile` into source control and let your continuous integration
environment build, test, and push the images automatically. Once the image is
published, you can use the `docker run` command to run that image on *any*
computer&mdash;such as another developer's workstation or in test or in
production&mdash;and you can be sure that app will work exactly the same way
everywhere without anyone having to fuss around with dependencies or
configuration. Many hosting providers have first class support for Docker, such
as [Amazon's EC2 Container Service](https://aws.amazon.com/blogs/aws/cloud-container-management/)
and [DigitalOcean's Docker support](https://www.digitalocean.com/community/tutorials/how-to-use-the-digitalocean-docker-application).

Once you start using Docker, it's addictive. It's liberating to be
able to mess around with different Linux flavors, dependencies, libraries, and
configurations, all without leaving your developer workstation in a messy state.
You can quickly and easily switch from one Docker image to another (e.g. when
switching from one project to another), throw an image away if it isn't working,
or use [Docker Compose](https://docs.docker.com/compose/) to work with multiple
images at the same time (e.g. connect an image that contains a Rails app to
another image that contains a MySQL database). And you can leverage the
thousands of open source images in the Docker Public Registry. For example,
instead of building the `my-ruby-app` image from scratch and trying to figure
out exactly which combination of libraries make Rails happy, you could use
the pre-built [rails image](https://registry.hub.docker.com/u/library/rails/)
which is maintained and tested by the Docker community.

## Docker on OS X

If you're already using Linux as your desktop operating system, Docker is a
no-brainer. Unfortunately, there are [many, many
reasons](http://linuxfonts.narod.ru/why.linux.is.not.ready.for.the.desktop.current.html)
you might not want to use Linux on the desktop, and prefer OS X
instead. If so, there is a problem: OS X is built on top of Unix, not Linux,
so you can't run Docker on it directly. Instead, you have to run Linux in a VM
(which is why on OS X, instead of using `localhost` in your URLs, you need to
use the IP of the VM). But wasn't the whole point of Docker to avoid heavyweight
VMs? This in and of itself isn't actually as big of a problem as it sounds for
three reasons:

1. You only need the VM in the development environment, so the performance
   overhead does not affect production.
2. You only need to run a *single* VM no matter how many Docker containers you
   want to run on top of it. You pay the penalty of starting this VM just once
   and you leave it running in the background. You can then run as many
   docker containers as you want on top of this VM, with each container starting
   and stopping in a fraction of a second.
3. Thanks to the [Boot2Docker](http://boot2docker.io/) project, you can use a
   stripped down version of Linux specially tailored for Docker as your VM. It
   runs completely in RAM, takes up only 27MB, and boots up in about 5 seconds!

In other words, Boot2Docker provides a *great* experience for using Docker on
OS X. Except for one thing: mounted folders. By default, the Boot2Docker VM
image runs inside of [VirtualBox](https://www.virtualbox.org/), a free and open
source hypervisor. VirtualBox is great, but the system it uses to mount folders,
called vboxsf, is agonizingly slow. For example, here is how long it takes
Jekyll to compile [my homepage
code](https://github.com/brikis98/yevgeniy-brikman-homepage) if I don't use
any mounted folders and just include the code directly inside the Docker image
itself:

{% highlight text %}
> docker run -it brikis98/yevgeniy-brikman-homepage bash

root@7aaea30d98a1:/src# time bundle exec jekyll build

[...]

real    0m7.879s
user    0m7.360s
sys     0m0.600s
{% endhighlight %}

And here is the exact same Docker image, but this time, I mount the source code
from OS X:

{% highlight text %}
> docker run -it -v $(pwd):/src brikis98/yevgeniy-brikman-homepage bash

root@1521b0b4ce6a:/src# time bundle exec jekyll build

[...]

real    1m14.701s
user    0m9.450s
sys     0m3.410s
{% endhighlight %}

7 seconds versus 74 seconds! And that's on a small, simple Jekyll
project. With more complicated projects, using vboxsf leads to a **10-20x
slowdown** in compilation speed, server startup time, and just about everything
else.

Another major problem with vboxsf is that it breaks file watchers. Build systems
like Jekyll, SBT, Grunt, and many others listen for file changes using
OS-specific technologies such as inotify on Linux and FSEvents on OS X. That
way, when you change a file, those build systems get a notification about the
change immediately, and can recompile it quickly so you can rapidly iterate on
your code using a make-a-change-and-refresh development cycle. Unfortunately,
vboxsf breaks inotify and FSEvents, so those build systems never get
notifications about file changes. Your only option is to enable polling, forcing
the build systems to linearly scan through all files, which consumes a lot of
resources and takes a lot longer to spot a change and recompile the code. In
short, **vboxsf is completely unusable for active development**.

I spent a few days looking for a solution. I tried to follow advice in random
[Boot2Docker bug discussions](https://github.com/boot2docker/boot2docker/issues/64)
and [GitHub Gists](https://gist.github.com/neilbartley/73f2eb334f04bf95a906).
I tried many different technologies, including Vagrant, NFS, Unison, and Samba.
I made a [StackOverflow thread](http://stackoverflow.com/questions/30090007/whats-the-right-way-to-setup-a-development-environment-on-os-x-with-docker)
to ask for help. After lots of trial and error, I finally found something that
works great on OSX and I've packaged it up as a small open source project called
[docker-osx-dev]({{ page.project_url }}).

## docker-osx-dev

The best alternative I found to using vboxsf was to use
[rsync](http://en.wikipedia.org/wiki/Rsync), a common Unix utility that can can
sync files quickly. With rsync, I found that build performance in my Docker
containers with mounted folders was on par with running the build without
mounted folders, and file watch mechanisms based on inotify all work correctly.
I've been using [docker-osx-dev]({{ page.project_url }}) for a couple weeks and
have been very productive as I switch between three different projects with
three totally different tech stacks.

To use docker-osx-dev, you must first install [HomeBrew](http://brew.sh/). After
that, just download the `docker-osx-dev` script and run the `install` command:

{% highlight text %}
curl -o /usr/local/bin/docker-osx-dev https://raw.githubusercontent.com/brikis98/docker-osx-dev/master/src/docker-osx-dev
chmod +x /usr/local/bin/docker-osx-dev
docker-osx-dev install
{% endhighlight %}

This will setup your entire Docker development environment, including
Boot2Docker, so the only thing left to do is to kick off file syncing and start
running your Docker containers:

{% highlight text %}
> cd /foo/bar
> docker-osx-dev
[INFO] Performing initial sync of paths: /foo/bar
[INFO] Watching: /foo/bar
{% endhighlight %}

By default, `docker-osx-dev` will sync the current folder (`/foo/bar` in the
example above) to the Boot2Docker VM. Alternatively, you can use the `-s` flag
to specify which folders to sync:

{% highlight text %}
> docker-osx-dev -s /other/path
[INFO] Performing initial sync of paths: /other/path
[INFO] Watching: /other/path
{% endhighlight %}

If you are using [Docker Compose](https://docs.docker.com/compose/), the
`docker-osx-dev` script will automatically sync any folders marked as
[volumes](https://docs.docker.com/compose/yml/#volumes) in your
`docker-compose.yml` file:

{% highlight text %}
> docker-osx-dev
[INFO] Using sync paths from Docker Compose file at docker-compose.yml
[INFO] Performing initial sync of paths: /foo/bar
[INFO] Watching: /foo/bar
{% endhighlight %}

Now, in a separate tab, you can start and stop as many docker containers as you
want and mount the `/foo/bar` folder in them. This will happen automatically
when you run `docker-compose up`. Alternatively, you can specify folders to
mount manually using the `-v` flag of `docker run`:

{% highlight text %}
> docker run -v /foo/bar:/src -p 3000:3000 brikis98/my-rails-app
{% endhighlight %}

You can test this Rails app by going to `http://dockerhost:3000` in your browser,
as docker-osx-dev automatically configures `dockerhost` as a URL for your
docker VM. Also, with docker-osx-dev running, you can edit any of the files in
mounted folders using the tools you're used to in OS X, and the changes
should propagate instantly into the Docker container using rsync. Moreover,
your builds should be fast and all file watchers should work normally.

## Conclusion

I hope that in the future, more and more companies will package their tech
stacks as Docker images so that the on-boarding process for new-hires will be
reduced to a single `docker run` or `docker-compose up` command. Similarly, I
hope that more and more open source projects will be packaged as Docker images
so instead of a long series of install instructions in the README, you just use
`docker run`, and have the code working in minutes. As an experiment,
I've created Docker images for a few of my open source projects, including
[ping-play](https://github.com/brikis98/ping-play),
[hello-startup](https://github.com/brikis98/hello-startup-site), and [my
homepage](https://github.com/brikis98/yevgeniy-brikman-homepage), which you're
reading now.

I also hope that some day, the issues with vboxsf will be fixed, but in the
meantime, I'll be using [docker-osx-dev]({{ page.project_url }}) for all of my
coding and encourage you to give it a try. The code is new and fairly rough, so
feel free to give me feedback, file bugs, and send pull requests.

Finally, if you want to learn how to take your Docker containers and run them
in production, check out my follow-up blog posts,
[Running Docker on AWS from the ground up](https://www.ybrikman.com/writing/2015/11/11/running-docker-aws-ground-up/) and
[Infrastructure as code: running microservices on AWS using Docker, Terraform, and
ECS](https://www.ybrikman.com/writing/2016/03/31/infrastructure-as-code-microservices-aws-docker-terraform-ecs/).




