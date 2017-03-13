---
layout: post
title: 'Proposal&#58; extend Markdown syntax to support form elements'
date: '2011-07-26T01:03:00.000-07:00'
author: Yevgeniy Brikman
tags:
- Ideas
- Web Dev
- Open Source
modified_time: '2011-09-07T15:06:53.212-07:00'
thumbnail: http://1.bp.blogspot.com/-PpvqqnAwsxY/Ti5yfzvx0II/AAAAAAAAJtg/6Q7gYkBV8aY/s72-c/markdown.png
blogger_id: tag:blogger.com,1999:blog-5422014336627804072.post-2818022916028139401
blogger_orig_url: http://brikis98.blogspot.com/2011/07/proposal-extend-markdown-syntax-to.html
thumbnail_path: blog/markdown/markdown.png
---

[Markdown](http://daringfireball.net/projects/markdown/) is a lightweight 
markup language that can be converted into HTML. The main inspiration behind 
its syntax is to copy what most people have used for years to decorate plain 
text emails. For example, if you emphasize a word by surrounding it with 
`*asterisks*`, you get `<em>asterisks</em>`. If you try to put in a 
page divider with a bunch of dashes `---------------`, you get `<hr/>`. 
The syntax *visually represents* the type of HTML output you desire; in a way, 
Markdown is the onomatopoeia of markup languages. 

{% include figure.html path="blog/markdown/markdown.png" alt="Markdown" %}

Markdown was created by [John 
Gruber](http://daringfireball.net/) and [Aaron 
Swartz](http://www.aaronsw.com/) 
Markdown is very easy to read and write, so it's a great choice for 
[CMS](http://en.wikipedia.org/wiki/Content_management_system), 
[wiki](http://en.wikipedia.org/wiki/Wiki) and 
[WYSIWYG](http://en.wikipedia.org/wiki/WYSIWYG) use cases. 
[GitHub](http://www.github.com/) and 
[StackOverflow](http://www.stackoverflow.com/) both make heavy use of Markdown 
and have created their own Markdown extensions and implementations: [GitHub 
flavored Markdown](http://github.github.com/github-flavored-markdown/) and 
[MarkdownSharp](http://code.google.com/p/markdownsharp/). I too am a fan of 
Markdown: I think it's perfect for formatting answers on StackOverflow, it's a 
slick way to support rich text formatting in [Resume 
Builder](http://resume.linkedinlabs.com/), and in my [open source 
projects](https://github.com/brikis98), it's an elegant solution for readme 
files that are perfectly readable with or without a Markdown interpreter. 

## Proposal

In this blog post, I'm going to propose a small extension to the Markdown 
syntax: support for forms. There are a number of CMS and wiki use cases where 
I've wanted to allow users to create a custom form (e.g. a simple poll or 
event RSVP) without having to write out the full HTML for it. I even created a 
[github project](https://github.com/brikis98/wmd) (forked from 
[wmd](https://github.com/ChiperSoft/wmd)) to try to implement this extension, 
though I've been too damn busy to get to it. Perhaps someone will be inspired 
by this post and help me get this thing rolling :) 

### Text fields 

{% highlight text %}
name = ________
{% endhighlight %}

{% highlight html %}
<label for="name">Name:</label> 
<input type="text" id="name" name="name"/>
{% endhighlight %}

### Radio buttons 

{% highlight text %}
sex = (x) male () female
{% endhighlight %}

{% highlight html %}
<label>Sex:</label> 
<input type="radio" name="sex" id="male" value="male" checked="checked"/><label for="male">Male</label>
<input type="radio" name="sex" id="female" value="female"/><label for="female">Female</label>  
{% endhighlight %}

### Check boxes 

{% highlight text %}
phones = [] Android [x] iPhone [x] Blackberry
{% endhighlight %}

{% highlight html %}
<label>Phones:</label> 
<input type="checkbox" name="phones" id="Android" value="Android"/><label for="Android">Android</label>
<input type="checkbox" name="phones" id="iPhone" value="iPhone" checked="checked"/><label for="iPhone">iPhone</label>
<input type="checkbox" name="phones" id="Blackberry" value="Blackberry" checked="checked"/><label for="Blackberry">Blackberry</label>
{% endhighlight %}

### Drop down 

{% highlight text %}
city = {BOS, SFO, (NYC)}
{% endhighlight %}

{% highlight html %}
<label for="city">City:</label>
<select id="city" name="city">
  <option value="BOS">BOS</option>
  <option value="SFO">SFO</option>
  <option value="NYC" selected="selected">NYC</option>
</select>
{% endhighlight %}

### Required fields 

{% highlight text %}
zip code* = ________
{% endhighlight %}

{% highlight html %}
<label for="zip-code" class="required-label">Zip code*:</label>
<input type="text" name="zip-code" id="zip-code" class="required-input"/>
{% endhighlight %}

## Feedback

Hopefully, merely looking at the examples above makes my proposal clear. If 
not, I've clearly failed, as Markdown's central goal is readability. Either 
way, let me know what you think in the comments. Also, feel free to fork my 
[github project](https://github.com/brikis98/wmd) for this proposal and start 
hacking away! 

**Update**: [Geoff](https://github.com/maleldil) saw this post, forked my 
project, and [implemented the proposal](https://github.com/maleldil/wmd)! 
Awesome work Geoff! 
