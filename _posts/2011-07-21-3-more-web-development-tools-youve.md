---
layout: post
title: 3 more web development tools you've probably never heard of
date: '2011-07-21T01:46:00.001-07:00'
author: Yevgeniy Brikman
tags:
- Web Dev
modified_time: '2011-08-06T14:40:42.674-07:00'
thumbnail: http://3.bp.blogspot.com/-yxgxcsKzUCM/TifhixgU32I/AAAAAAAAJsY/_CW1iBsZokM/s72-c/visual-event.png
blogger_id: tag:blogger.com,1999:blog-5422014336627804072.post-2365679101985725940
blogger_orig_url: http://brikis98.blogspot.com/2011/07/3-more-web-development-tools-youve.html
thumbnail_path: blog/web-dev-tools/visual-event.png
---

A few days ago, I wrote a blog post about [3 web development tools you've 
probably never heard 
of](https://www.ybrikman.com/writing/2011/07/16/3-web-development-tools-youve-probably/) 
and, lo and behold, I was told by many people that, in fact, they had never 
heard of them. So today, I figured I'd share the wealth and let you know about 
three more. You're welcome. 

## 1. Visual Event 

{% include figure.html path="blog/web-dev-tools/visual-event.png" caption="Visual Event" url="https://sprymedia.co.uk/article/Visual+Event+2" %}

This is a handy bookmarklet that creates a visual overlay on the current webpage 
indicating which DOM elements have events bound to them. This is abolutely 
clutch for cutting your way through the jungle of events handlers that often 
pollute a complicated page. In a single glance, you can figure out if the 
button that's misbehaving has a click handler, or if it's the div above it, or 
the body tag all the way at the top. 

## 2. lorempixum

{% include figure.html path="blog/web-dev-tools/lorem-pixum.png" caption="lorempixum" url="http://lorempixum.com/" %}

Building a prototype of a website and need a placeholder image? Look no further than this awesome 
service. Just include a standard `img src` tag in your page and specify the 
dimensions, colors and even category of the image in the URL, and you're done. 

For example: 

{% highlight html %}
<img src="http://lorempixum.com/400/200/sports">
{% endhighlight %}

Produces the following image (and you'll get a different one each time you 
refresh the page): 

<img src="http://lorempixum.com/400/200/sports"> 

Of course, an honorable and adorable mention must go out to 
[http://placekitten.com/](http://placekitten.com/), a service which offers 
roughly the same functionality, except all the images are of kittens: 

<img src="http://placekitten.com/g/200/300"> 

## 3. loads.in

{% include figure.html path="blog/web-dev-tools/loads-in.png" caption="loads.in" url="http://loads.in/" %}

Test your webpage's load time from various locations and web browsers all over 
the world. Just plug in the 
URL, click start, and you get back the load time, screenshots of the page 
loading at various stages, a waterfall chart and even the ability to download 
the [HAR](http://www.stevesouders.com/blog/2010/05/01/har-to-page-speed/) 
file. 