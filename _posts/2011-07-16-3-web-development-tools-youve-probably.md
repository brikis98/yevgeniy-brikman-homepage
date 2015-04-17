---
layout: post
title: 3 web development tools you've probably never heard of
date: '2011-07-16T02:49:00.000-07:00'
author: Yevgeniy Brikman
tags:
- Web Dev
modified_time: '2013-07-21T10:03:31.436-07:00'
thumbnail: http://1.bp.blogspot.com/-E3LFjTLwX8E/UewUWa2404I/AAAAAAAANB8/R5b-mudwwVY/s72-c/jquery-logo1.png
blogger_id: tag:blogger.com,1999:blog-5422014336627804072.post-3164184604792424465
blogger_orig_url: http://brikis98.blogspot.com/2011/07/3-web-development-tools-youve-probably.html
thumbnail_path: blog/web-dev-tools/local-tunnel.png
---

I got the chance to hang out with the fine folks at 
[Twilio](http://www.twilio.com/) today and build a hackday project with their 
awesome [API's](http://www.twilio.com/docs/index). Hackdays are all about 
getting things done quickly and as this is my ~14th hackday project, I've come 
to rely on a set of high productivity tools. Depending on the project, there 
are a whole bunch I may use, so for this post, I'll just focus on 3 that most 
people are not aware of. 

## 1. jQuerify Bookmarklet 

{% include figure.html path="blog/web-dev-tools/jquery-logo.png" caption="jQuerify Bookmarklet" url="http://www.learningjquery.com/2009/04/better-stronger-safer-jquerify-bookmarklet" %}

Add [jQuery](http://jquery.com/) to any page with this handy bookmarklet. Very 
useful if you want to mess around or experiment on a page using jQuery and 
[Firebug](http://getfirebug.com/), but the page doesn't have jQuery already. 

## 2. jsFiddle 

{% include figure.html path="blog/web-dev-tools/js-fiddle.png" caption="jsFiddle" url="http://jsfiddle.net/" %}

The perfect tool when you want to quickly test something out with HTML, CSS 
and/or JavaScript. Open [jsFiddle](http://jsfiddle.net/) in your browser, 
enter HTML in the top left, CSS in the top right, JavaScript in the bottom 
left and hit "run" to instantly see the result. Pull in popular JavaScript 
frameworks (e.g. jQuery, Mootools) by picking them in a drop down on the left. 
Finally, save and share your "fiddles" with others. 

## 3. localtunnel 

{% include figure.html path="blog/web-dev-tools/local-tunnel.png" caption="localtunnel" url="http://localtunnel.me/" %}

Provide a publicly accessible URL for any server running on localhost. 
Incredibly useful so you don't have to find hosting for a project while you're 
just hacking/testing. For example, if you have 
[Rails](http://rubyonrails.org/) server running at `http://localhost:3000`, all 
you have to do is run `localtunnel 3000` in your terminal and you'll get a URL 
(e.g. `http://8bv2.localtunnel.com`) that routes to your Rails 
app and can be accessed by anyone on the web. A big thanks to [Jeff 
Lindsay](http://www.linkedin.com/in/progrium) for building localtunnel, 
[Twilio](http://www.twilio.com/) for sponsoring it and [Evan 
Cummack](http://www.linkedin.com/in/cummack) for telling me about it. 

