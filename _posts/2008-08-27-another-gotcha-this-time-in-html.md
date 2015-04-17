---
layout: post
title: Another "Gotcha", this time in HTML
date: '2008-08-27T14:48:00.000-07:00'
author: Yevgeniy Brikman
tags:
- Web Dev
- Software Engineering
modified_time: '2011-08-06T14:49:41.868-07:00'
blogger_id: tag:blogger.com,1999:blog-5422014336627804072.post-2721024772389340548
blogger_orig_url: http://brikis98.blogspot.com/2008/08/another-gotcha-this-time-in-html.html
thumbnail_path: blog/thumbs/html-logo.png
---

I couldn't resist another dorky software engineering post. Non dorks may stop 
reading here. 

At work the other day, while debugging my code, I noticed that one of my 
servlets was getting called twice for each page load. What was even more 
mysterious was that the second call would happen as the page was partially 
loaded. I scoured my code for iframes, accidental use of the servlet, rouge 
AJAX calls and so on, but couldn't find a thing. I resorted to just commenting 
out huge chunks of the page at a time to see which parts were causing the 
second page load. After a while, I narrowed it down to this: 

{% highlight html %}
<img src="$imgUrl" /> 
{% endhighlight %}

Where `$imgUrl` is a variable who's value is filled in at runtime. So, you might 
be wondering how the heck an `img` tag can cause the entire page to reload? 
Well, it turns out (at least in Firefox 3) that if you have an `img` tag with a 
blank `src` attribute, the browser tries to load an image at your base 
URL&mdash;that is, the URL of the page you're on. Therefore, every time 
`$imgUrl` turned out to be blank, my browser would re-request the page I was 
on. This, of course, caused a bad performance hit, was screwing up statistics 
and so on. 

Moral of the story: make sure that your `img` tags never have an empty `src` 
attribute. 