---
layout: post
title: A Subtle Java 1.5 "Gotcha"
date: '2008-08-20T10:57:00.000-07:00'
author: Yevgeniy Brikman
tags:
- Software Engineering
modified_time: '2011-08-06T14:49:33.489-07:00'
blogger_id: tag:blogger.com,1999:blog-5422014336627804072.post-5799328508853999825
blogger_orig_url: http://brikis98.blogspot.com/2008/08/two-subtle-java-15-gotchas.html
thumbnail_path: blog/thumbs/java-logo.png
---

I couldn't resist creating this very short, dorky and entirely 
programming-focused entry today. If you are not a software engineer, read no 
further. You have been warned. 

I recently ran across a subtle way a handy Java 1.5 feature can sneak up and 
cause issues. Perhaps if I had spent more time pouring over the specs &amp; 
documentation, it would've been very obvious, but alas, it definitely caught 
me by surprise. The problem was a `NullPointerException` (NPE) which I tracked 
down to the following line of code: 

{% highlight java %}
int id = map.get(key) 
{% endhighlight %}

The obvious culprit was that `HashMap` named map was `null`, but as I stepped 
through the code, I found to my surprise that it wasn't. Neither was key, for 
that matter. So how the hell was I getting an NPE? Take a look at the 
declaration of `map`: 

{% highlight java %}
Map<String, Integer> map = new HashMap<String, Integer>(); 
{% endhighlight %}

Note how the values in map are `Integer` objects, but I'm setting the result of 
the `get` call to a primitive `int`. In Java 1.5, this is allowed as Java will 
automatically unbox the `Integer` into an `int`. But what happens if the value 
returned by `get` is `null`? Well, the auto unboxing can't convert that to any 
`int` value&mdash;returning some default value like 0 or -1 would be very 
deceiving&mdash;so you get a big old NPE. 

Moral of the story: auto boxing and unboxing are very handy features to keep 
your code clean and readable, but keep NPE's in mind every time you use them. 

