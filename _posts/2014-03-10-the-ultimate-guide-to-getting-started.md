---
layout: post
title: The Ultimate Guide to Getting Started with the Play Framework
date: '2014-03-10T10:30:00.002-07:00'
author: Yevgeniy Brikman
tags:
- HowTo
- Play
modified_time: '2014-07-22T00:39:00.040-07:00'
thumbnail_path: blog/get-started-play/play-logo.png
blogger_id: tag:blogger.com,1999:blog-5422014336627804072.post-6504347063002989303
blogger_orig_url: http://brikis98.blogspot.com/2014/03/the-ultimate-guide-to-getting-started.html
excerpt: |
  Are you trying to get started with the Play Framework? Struggling to wrap
  your head around Futures, SBT, Scala, Functional Programming, or Iteratees?
  Then you've come to the right place.
---

{% include figure.html path="blog/get-started-play/play-logo.png" url="https://www.playframework.com/" %}

Are you trying to get started with the [Play
Framework](http://www.playframework.com/)? Struggling to wrap your head around
Futures, SBT, Scala, Functional Programming, or Iteratees? Then you've come to
the right place.

This post is a collection of the best resources I've found for getting started
with Play. I've broken it down by category to make it easier to browse and
jump to the topic you're most interested in.

The list below is not meant to be comprehensive documentation, but rather, a
collection of resources that cover the main areas where new Play users tend to
get stuck. If you've got any great resources that are missing from the list
below, leave a comment!

## Introduction to Play

{% include iframe.html url="//www.youtube.com/embed/8z3h4Uv9YbE" %}

1. [Introduction to Play Framework for Java
Developers](http://vimeo.com/58969923): official video intro to building apps
with Play.
1. [Play Framework
Documentation](http://www.playframework.com/documentation/2.2.x/Home): the
official docs are a must read to get a solid starting point.
1. [The Play Framework at LinkedIn: Performance and Productivity at
Scale](http://www.youtube.com/watch?v=8z3h4Uv9YbE): video intro to Play and
why LinkedIn uses it. See the accompanying
[slides](http://www.slideshare.net/brikis98/the-play-framework-at-linkedin)
and [blog post](http://engineering.linkedin.com/play/play-framework-linkedin).
1. [Typesafe Activator](https://typesafe.com/activator): very easy way to get
started with Play. A simple script you run to generate Play app skeletons from
the many available [templates](https://typesafe.com/activator/templates)&mdash;including [Hello Play
(Scala)](https://typesafe.com/activator/template/hello-play-scala), [Hello
Play (Java)](https://typesafe.com/activator/template/hello-play-java),
[Realtime and Reactive Play
apps](https://typesafe.com/activator/template/reactive-stocks), [Play with
Slick](https://typesafe.com/activator/template/hello-slick), [Play with
AngularJS](https://typesafe.com/activator/template/angular-seed-play)&mdash;and an
in-browser UI that interactively walks you through changing, running, and
testing those apps.

## Scala and Functional Programming

{% include figure.html path="blog/get-started-play/functional-programming-scala.png" url="https://www.coursera.org/course/progfun" %}

1. [Scala Documentation](http://www.scala-lang.org/documentation/): lots of good
resources for learning Scala.
1. [Scala API docs](http://www.scala-lang.org/api/2.10.3/#package): expect to
spend a lot of time reading these.
1. [Functional Programming Principles in
Scala](https://www.coursera.org/course/progfun): terrific Coursera course on
functional programming basics with Scala, taught by Scala creator Martin
Odersky.
1. [Scala Programming Introduction](http://www.whoishostingthis.com/resources/scala/): nice list of links to tutorials,
books, and videos on Scala.
1. [http://scalatutorials.com](http://scalatutorials.com/): another in-browser
introduction to Scala.
1. [Twitter Scala School](http://twitter.github.io/scala_school/): great
series of language guides and best practices.
1. [10 recipes for turning imperative Java code into functional Scala
code](https://www.ybrikman.com/writing/2013/05/31/10-recipes-for-turning-imperative-java/):
a mini guide for translating your Java code into equivalent idiomatic Scala
code.
1. [Play Framework: Democratizing Functional Programming for modern Web
Programmers](http://engineering.linkedin.com/play/play-framework-democratizing-functional-programming-modern-web-programmers):
functional programming and the motivation behind Play 2.0.
1. [Macros for the Rest of
Us](http://www.parleys.com/play/53a7d2c4e4b0543940d9e542/chapter161/about):
the best intro to Scala macros that I've found.

## Non-blocking I/O, concurrency

{% include iframe.html url="//www.slideshare.net/slideshow/embed_code/24116986" %}

1. [Play Framework: async I/O with Java and
Scala](http://www.slideshare.net/brikis98/play-framework-async-io-with-java-and-scala):
a guide to writing async code with Play, with examples in both Java and Scala.
1. [Play Framework: async I/O without the thread pool and callback
hell](http://engineering.linkedin.com/play/play-framework-async-io-without-thread-pool-and-callback-hell):
an overview of why Play uses non-blocking I/O and how to manage non-blocking
code without callbacks.
1. [Play is for Performance](http://www.ustream.tv/recorded/42801712): a great
talk about Play performance; remember kids, async isn't faster, but it can be
more efficient with resources.
1. [Scala Futures](http://docs.scala-lang.org/overviews/core/futures.html):
official docs on Scala Futures.
1. [Akka documentation](http://akka.io/): Play is built on top of Akka, which
provides abstractions for managing concurrency, many of which Play uses under
the hood and you can use in your own apps.

## Real time web, streaming, Iteratees

{% include iframe.html url="//www.ustream.tv/embed/recorded/44303071?v=3&amp;autoplay=false&amp;wmode=direct" %}

1. [Play, Scala, and Iteratees vs. Node.js, JavaScript, and
Socket.io](https://www.ybrikman.com/writing/2013/11/24/play-scala-and-iteratees-vs-nodejs/):
a side by side comparison of building the same websockets app with
Play/Iteratees on one side and Node.js/Socket.io on the other.
1. [Composable and Streamable Play
apps](http://www.ustream.tv/recorded/44303071): video intro to how to break
Play apps down into composable pieces and significantly reduce page load time
by using BigPipe style streaming with Enumerators. See the accompanying
[slides](http://www.slideshare.net/brikis98/composable-and-streamable-play-apps)
and [code](https://github.com/brikis98/ping-play).
1. [Functional I/O with Play
Iteratees](http://www.ustream.tv/recorded/40753280): video intro on how
Iteratees work.
1. [Non-blocking, composable and reactive realtime
web](http://www.youtube.com/watch?v=pGZkmL_v1Ns): a video with lots of
examples of how to build realtime web apps on top of Play.
1. [Understanding Play2 Iteratees for Normal
Humans](http://mandubian.com/2012/08/27/understanding-play2-iteratees-for-normal-humans/):
an intro to Iteratees that's more human-friendly than the [official Play
Iteratee docs](http://www.playframework.com/documentation/2.2.x/Iteratees).

## Build system, SBT, and deployment

{% include iframe.html url="//www.ustream.tv/embed/recorded/45081014?v=3autoplay=false&amp;wmode=direct" %}

1. [SBT in Action](http://www.ustream.tv/recorded/45081014): the best intro to SBT I've
seen. Must watch if you're getting started (video).
1. [SBT documentation](http://www.scala-sbt.org/): the official documentation
is dense, but important. The [Getting Started
Guide](http://www.scala-sbt.org/release/docs/Getting-Started/index.html) is
required reading, or you will be very confused.
1. [SBT
keys](https://github.com/sbt/sbt/blob/0.13/main/src/main/scala/sbt/Keys.scala):
the list of all settings and tasks built into SBT. Very useful for figuring
out what you can tweak and what hooks are available.
1. [SBT
Defaults](https://github.com/sbt/sbt/blob/0.13/main/src/main/scala/sbt/Defaults.scala):
the default values for all the settings and tasks built into SBT.
1. [Play
Keys](https://github.com/playframework/playframework/blob/master/framework/src/sbt-plugin/src/main/scala/PlayKeys.scala):
the list of all custom settings and tasks that Play adds on top of SBT's
defaults.
1. [Play
Settings](https://github.com/playframework/playframework/blob/master/framework/src/sbt-plugin/src/main/scala/PlaySettings.scala):
the default values for the custom settings and tasks Play adds to SBT.
1. [Hooking in to Play! Framework's sbt plugin
lifecycle](http://eng.42go.com/hooking-in-to-play-frameworks-sbt-plugin-lifecycle/):
nice guide on a few SBT hooks provided by Play.
1. [Separate multi-project deployment packages in Play!
Framework](http://eng.42go.com/multi-project-deployment-in-play-framework/):
how to break a Play app into multiple SBT projects.
1. [Deploying Play apps at Coursera](http://www.ustream.tv/recorded/37901943):
how SBT deploys its Play apps to Amazon EC2 (video).
1. [Creating a standalone version of your
application](http://www.playframework.com/documentation/2.2.x/ProductionDist):
official documentation on how to turn your Play app into a standalone package.

## App structure, injection, plugins

{% include iframe.html url="//www.ustream.tv/embed/recorded/42775808?v=3autoplay=false&amp;wmode=direct" %}

1. [Structure your Play app with the Cake Pattern](http://www.ustream.tv/recorded/42775808):
a step by step introduction of using Scala's Cake Pattern to inject
dependencies in your Play apps without any extra libraries.
1. [Using Guice with Play! Framework 2.1 for easy Dependency
Injection](http://eng.42go.com/play-framework-dependency-injection-guice/): an
intro to using [Guice](https://code.google.com/p/google-guice/) to inject
dependencies into your Play app.
1. [Play Framework
Modules](http://www.playframework.com/documentation/2.2.x/Modules): a list of
open source modules for Play.
1. [Writing modules for Play 2](http://www.objectify.be/wordpress/?p=363): a
guide to creating new modules for Play.
1. [Writing a Play 2.0
Module](http://developer.vz.net/2012/03/16/writing-a-play-2-0-module/): a
guide to creating Play plugins.

## Database access

{% include figure.html path="blog/get-started-play/slick-logo.png" url="http://slick.typesafe.com/" %}

1. [Slick documentation](http://slick.typesafe.com/docs/): the official docs for
[Slick](http://slick.typesafe.com/), which is the recommended DB library for
Scala.
1. [Managing database
evolutions](http://www.playframework.com/documentation/2.2.x/Evolutions):
official docs on how Play manages DB schemas.
1. [Using Scala Slick at
FortyTwo](http://eng.42go.com/using-scala-slick-at-fortytwo/): how FortyTwo
uses Slick in their Play apps.
1. [Configuring Play's thread
pools](http://www.playframework.com/documentation/2.2.x/ThreadPools): Play is
built for non-blocking I/O, but all JDBC libraries are blocking, so this guide
is a must-read on how to configure your Play app if you're doing blocking DB
queries.

## Where to get more info

{% include figure.html path="blog/get-started-play/stackoverflow.png" url="http://stackoverflow.com/questions/tagged/playframework" %}

1. [Play Framework mailing
list](https://groups.google.com/forum/#!forum/play-framework): very active
google group plus mailing list that is great for discussions.
1. [StackOverflow](http://stackoverflow.com/questions/tagged/playframework):
ask and answer all your Play related questions.
1. [Play Framework source
code](https://github.com/playframework/playframework): use Play's github repo
to browse the source code, file bugs, and submit pull requests.
1. [Commercial support from Typesafe](http://typesafe.com/how): the folks at
Typesafe provide terrific Play expertise.