---
layout: post
title: I finally understand open source software
date: '2011-04-14T01:57:00.000-07:00'
author: Yevgeniy Brikman
tags:
- Open Source
- Software Engineering
modified_time: '2011-10-17T10:26:33.731-07:00'
blogger_id: tag:blogger.com,1999:blog-5422014336627804072.post-7845517068355703366
blogger_orig_url: http://brikis98.blogspot.com/2011/04/open-source.html
thumbnail_path: blog/understand-open-source/linux-logo.jpg
---

What does Google stand to gain from having so many [open source
projects](http://code.google.com/opensource/projects.html)? What about
[Twitter](http://twitter.com/about/opensource) or
[Facebook](http://developers.facebook.com/opensource/)? Why would companies
freely give away software that cost them time, money and may help their
competitors? Why is [Github](https://github.com/) growing at an absurd rate,
with over 2 *million* repositories? Why are developers world-wide giving their
time and work away for free?

{% include image.html path="blog/understand-open-source/linux-logo.jpg" alt="Linux logo" %}

I've used a TON of open source software (e.g. see the "what technologies were
used section" of the [Resume
Builder](http://resume.linkedinlabs.com/home/faq)) and am a very strong
believer in using open libraries and standards whenever possible. However,
until just recently, the full motivation behind open source software - why so
many individuals and companies contribute - never really clicked in my head.
As soon as it did, I created my first open source [Github
project](https://github.com/brikis98/lilac).

I realized that open source isn't about doing the world a favor, sharing, or
acting charitable. It's not about freedom, choice, human rights,
standardization, or any of that. Sure, all of these play a role, but none of
them are enough to explain how the open source movement got to where it is
today. What I think really drives open source are three major benefits to the
project creator: free labor, cleaner code and portfolios.

## Free labor

The benefits of open source software to an end-user are obvious: you get to
use amazing libraries, operating systems, standards, and tools, for free. You
can take advantage of projects that have been built and tested by hundreds or
thousands of developers, learn from the source code, customize it for your
needs and build bigger, better things in less time. You get to stand on the
shoulders of giants.

What wasn't as obvious to me was just how much the project owner benefited
from me using it. Every time I ran the code, found a bug, or tried out a
benchmark, I was performing QA and performance testing - for free. Every time
I asked questions online or posted a tutorial, I was writing documentation -
for free. Every time I used the project in my codebase and told others about
it, I was advertising the project - for free. If I created a patch, or added a
new feature, or made suggestions for improvements, I was helping to design and
develop the project - all for free.

In other words, the open source community using your projects is, quite
literary, a totally free and incredibly effective workforce. Google open
sourcing [snappy](http://code.google.com/p/snappy/) may help everyone in the
community do fast compression, but if they can get enough people interested in
the project, it helps Google even more when that community finds bugs, fixes
them, builds new features and contributes it all back to snappy. The cost of
hiring a few hundred developers and QA to work on a project like snappy would
be prohibitively high, even for a big company; for a lone developer, totally
impossible. But open source it, and you get a huge pool of labor for free.

## Cleaner code

It turns out that knowing that other people will scrutinize your code, tear
apart your design, and use it in ways that you didn't expect is a superb
motivation to keep things clean. The very act of taking some code and making
it a "project" will encourage you to make things more modular and reusable,
write documentation, use source control, track bugs, all the good stuff. It's
just human nature to clean the apartment more for guests than yourself; as
such, open source projects tend to be cleaner than proprietary ones.

## Portfolios

Open source projects are the best portfolio a software developer or company
can have. It's hard to learn much from just seeing the end product (if it's
even publicly visible); interviews are sadly not too revealing either (a topic
for another blog post); resumes and "about me" pages are all but useless. But
when I can see every line of code, the design decisions, and the technologies
involved, I can get a very good idea of the type of person or company I'm
dealing with. It's the ultimate branding play: show, don't tell.

<blockquote>
  <p>When it comes to hiring, I'll take a Github commit log over a resume any day.</p>
  <cite><a href="https://twitter.com/#%21/jeresig/status/33968704983138304">John Resig</a></cite>
</blockquote>

## I'm a believer

{% include image.html path="blog/understand-open-source/firefox-logo.png" alt="Firefox logo" %}

I've been an open source end user for a long time. It's about time I actively start
contributing. Not because it's good for the world or because I want to better
humanity - it is, and I do, but that hasn't been enough motivation before. No,
I'm going to contribute to open source because I finally see how it'll
directly benefit me. No reason I can't be selfish and save the world at the
same time.

