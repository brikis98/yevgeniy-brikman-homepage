---
layout: post
title: Hello, Startup
date: '2015-02-11T11:41:00.000-08:00'
author: Yevgeniy Brikman
tags:
- Startups
- Writing
modified_time: '2015-02-15T12:42:04.977-08:00'
thumbnail_path: blog/hello-startup/hello-startup.jpg
blogger_id: tag:blogger.com,1999:blog-5422014336627804072.post-3271843985604725456
blogger_orig_url: http://brikis98.blogspot.com/2015/02/hello-startup.html
book_base_url: "https://www.hello-startup.net/"
book_title_full: "Hello, Startup: A Programmer's Guide to Building Products, Technologies, and Teams"
book_title_short: "Hello, Startup"
add_to_popular_list: true
---

*Update: The book is now published! Get yourself a copy at
[hello-startup.net](https://www.hello-startup.net/?ref=ybrikman-post-update-note)!*

Today, I'm excited to announce the early release of my book,
[{{ page.book_title_full }}]({{ page.book_base_url }}?ref=ybrikman-post).

{% capture book_image_url %}{{ page.book_base_url }}?ref=ybrikman-post-image{% endcapture %}
{% include figure.html path="blog/hello-startup/hello-startup.jpg" caption="www.hello-startup.net" url=book_image_url %}

This is the book that I wish I had when I was in college. By the time I
graduated, I had a BS, a Masters, a bunch of internships&mdash;and absolutely
no idea what I was doing.

I remember one of the first big projects I built by myself was a desktop
application for performance testing at Thomson Financial. I had no idea how to
create a user interface, so I randomly sprinkled text fields, menus, and
buttons across the screen. I had no idea how to reason about performance, so I
randomly sprinkled caches and thread pools across the code. And I had no idea
how to think about code maintenance, so I didn't bother with tests, comments,
or documentation, but I did manage to cram several thousand lines of
multi-threaded Java code into one gigantic class.

I remember my first project at TripAdvisor was to add new sort options to the
webpage that listed all the hotels in a city. It was a quick task, just enough
to become familiar with the code base, and I was able to get it done and pushed
to production in my first week. Shortly after, I was in my manager's office for
our first one-on-one meeting, and I watched as he clicked on the hotel listings
for Paris, selected the new sort option, and then waited. And waited. And
waited. It took nearly *two hours* for the page to load. Well, it was probably
closer to two minutes, but I'm pretty sure there is a law of special relativity
that causes time to dilate when you're sweating that profusely and just hoping
you can melt through the floor and disappear. Later that night&mdash;much
later&mdash;I figured out that my fancy new code was making two database calls
every time it compared hotels during the sorting process. It takes on the order
of `n log n` comparisons to sort `n` items, so for Paris, which has roughly
`n = 2,000` hotels, that works out to roughly 40,000 database calls for a
single page load. I may not have melted that day, but our database server
nearly did.

I remember lots of other nasty bugs, ugly code, uglier user interfaces, site
outages, and late nights. But mostly, I remember having tons of questions, and
no easy way to find an answer. What technologies should I learn and use? Why
should I bother with automated tests? How do I build a product that doesn't
look terrible? How do I get people to use my product? How do I negotiate a job
offer? Should I negotiate for more salary or more equity? What is equity,
anyway? Should I work at a large company or join a startup?

I learned the answers to these questions, and many others, the hard way. I
tried to capture what I learned, much of it the result of painful trial and
error, in blog posts and talks, but after realizing that thousands of other
developers were going through the same trial and error process, making the same
mistakes, and still having nowhere to turn with the same questions, I decided
it was time to do something more substantial. This book is the result. Of
course, some lessons you can only learn by making your own mistakes, but for
the rest, I hope *Hello, Startup* will save you a lot of pain by letting you
learn from the mistakes of others.

My goal with the book was to create a practical, actionable, how-to
guide&mdash;a "Hello, World" tutorial, so to speak&mdash;for building products,
technologies, and teams in a startup environment. The material is based on my
own experiences, as well as interviews with programmers from some of the most
successful startups of the last decade, including Google, Facebook, LinkedIn,
Twitter, GitHub, Stripe, Instagram, AdMob, Pinterest, and many others.

If you're at all interested in startups&mdash;whether you're a programmer at
the beginning of your career, a seasoned developer bored with the politics of
large companies, a manager trying to figure out how to motivate your engineers,
or just someone trying to figure out what this startup thing is all
about&mdash;this book is for you.

Learn more about *Hello, Startup* and get yourself a copy of the
book at [hello-startup.net](https://www.hello-startup.net/?ref=ybrikman-post-bottom-link).




