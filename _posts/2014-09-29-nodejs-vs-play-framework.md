---
layout: post
title: Node.js vs Play Framework
date: '2014-09-29T10:38:00.002-07:00'
author: Yevgeniy Brikman
tags:
- Web Dev
- Play
modified_time: '2014-09-29T11:55:42.266-07:00'
thumbnail_path: blog/nodejs-vs-play/nodejs-vs-play.png
blogger_id: tag:blogger.com,1999:blog-5422014336627804072.post-3085822923925409041
blogger_orig_url: http://brikis98.blogspot.com/2014/09/nodejs-vs-play-framework.html
---

Here's the showdown you've been waiting for: [Node.js](http://nodejs.org/)
vs [Play Framework](https://playframework.com/). Both are popular open
source web frameworks that are built for developer productivity, asynchronous I/O,
and the real time web. But which one is easier to learn, test, deploy, debug,
and scale? Should you pick Javascript or Scala? The Google v8 engine or the
JVM? NPM or Ivy? Grunt or SBT?

Two frameworks enter, one framework leaves.

{% include iframe.html url="//www.youtube.com/embed/b6yLwvNSDck" %}
{% include iframe.html url="//www.slideshare.net/slideshow/embed_code/38723787" %}

This was my presentation from the [2014 Scala Matsuri Conference](http://scalamatsuri.org/)
in Japan. My hope is that the talk is useful not
only as a comparison between these two specific frameworks, but also as a model
for how to evaluate other web frameworks in the future:

1. **Learn**: getting started, ramp up, overall learning curve.
1. **Develop**: routing, templates, i18n, forms, json, xml, data store access, real time web.
1. **Test**: unit tests, functional tests, integration tests, test coverage.
1. **Secure**: CSRF, XSS, code injection, headers, authentication, security advisories.
1. **Build**: compile, run tests, preprocess static content (sass/less/CoffeScript), package.
1. **Deploy**: hosting, monitoring, configuration.
1. **Debug**: step by step debugger, profilers, logging,&nbsp;
1. **Scale**: throughput, latency, concurrency.
1. **Maintain**: code reuse, stability, maturity, type safety, IDEs.
1. **Share**: open source activity, mailing lists, popularity, plugins, commercial support, jobs.

The next time a hot new framework pops up on Hacker News or Reddit, before
betting your company's future on it, use this checklist to see how it stacks
up against the more mature (and
[boring](http://zef.me/4235/pick-your-battles/)) options. Also, if
you've got a Node.js or Play Framework story to share, leave a comment!

([Discussion on HN](https://news.ycombinator.com/item?id=8384011))



