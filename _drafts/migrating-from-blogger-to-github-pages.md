---
layout: post
title: "Migrating from Blogger to GitHub Pages and launching the new ybrikman.com"
tags:
- Writing
thumbnail_path: blog/github-pages/github-pages.png
---  

Around 2007, I created my home page on a free PHP host and a blog on Blogger. 
The two websites have served me well for nearly 8 years, but they were long past
due for an update. Last week, I finally sat down and rebuilt my home page on
top of [Jekyll](http://jekyllrb.com/), [GitHub Pages](https://pages.github.com/), 
and [Basscss](http://www.basscss.com/), merged my blog into it, and launched 
the new [ybrikman.com]({{ site.url }}):

{% include figure.html path="screenshots/ybrikman-homepage-screenshot-small.png" alt=site.url url=site.url %}

I wish I could say it was a quick and painless process, but it wasn't. Coming 
up with a design was easy, but making it work on IE and mobile was painful. 
Learning Jekyll and GitHub Pages was easy, but the fact that GitHub Pages only 
supports a few Jekyll plugins was painful. Learning Basscss was easy, but 
filling in the basic UI elements it's missing was painful. And importing my 
posts from Blogger to Jekyll was easy, but making them look nice, and 
redirecting from Blogger to GitHub pages without losing SEO rank was painful. 
In short, just like every
[ground-up rewrite](http://onstartups.com/tabid/3339/bid/97052/How-To-Survive-a-Ground-Up-Rewrite-Without-Losing-Your-Sanity.aspx),
it took much longer than I expected.

<blockquote>
  <p>
    Hofstadter's Law: It always takes longer than you expect, even when you 
    take into account Hofstadter's Law.
  </p>
  <cite>
     Douglas Hofstadter, 
     <a href="http://www.amazon.com/dp/0465026567?ref=hello-startup-20">Gödel, Escher, Bach</a>
  </cite>
</blockquote>

As documentation for myself in the future, and as a guide for anyone else 
thinking of doing a similar migration, I've written this blog post to capture 
the key steps involved:

1. Design
1. Code
1. Migrate

## Design

In the spirit of [dogfooding](http://en.wikipedia.org/wiki/Eating_your_own_dog_food),
I followed the design chapter in my own [book]({{ site.hello_startup_url }}?ref=migrate-blogger-github)
to see if it would lead me to a nice design. One of the key lessons there is
*design re-use*. Just as a programmer should prefer building on top of existing, 
battle-tested, and preferably open source libraries instead of reinventing the 
wheel, a designer should prefer using existing, battle-tested, and preferably 
open source designs instead of coming up with something from scratch. I browsed 
through my list of [design resources]({{ site.hello_startup_url }}/resources/design/?ref=migrate-blogger-github),
and found two free, open source templates to use as a starting point:

1. [Kasper](https://github.com/rosario/kasper)
1. [Pixyll](https://github.com/johnotander/pixyll)

I then added a menu based on the 
[Freelancer Bootstrap Template](http://startbootstrap.com/template-overviews/freelancer/),
a comments and footer section inspired by [Medium](https://medium.com/), and the
simplest favicon I could think of (my initials) generated using
[favicon-generator.org](http://www.favicon-generator.org/). Copy and paste may 
strike some people as an uninspiring way to come up with a design, but the 
truth is that copy, transform, and combine are the basis of *all* creative work, 
as beautifully captured in the 
[Everything is a Remix](http://everythingisaremix.info/watch-the-series/) video
series:

{% include iframe-figure.html url="https://player.vimeo.com/video/14912890" caption="Everything is a Remix" link="http://everythingisaremix.info/watch-the-series/" %}

## Code

## Migrate


{% comment %}
  Code
    Very quick to learn
    Smooth to deploy, set up CNAME
    Interesting idea of generating a static site, but with vars/functions/etc
    Wish GitHub Pages supported more plugins
    Tags pages
    RSS
    Basscss
    Responsive-nav
    Hover.css
    Lazy loading
    Comments   
  Migrate   
    Import posts
    Convert to markdown
    Add thumbnails
    Redirect saga:
      Try old blogger stuff... Didn't work. Error page and no explanation.
      Try new blogger stuff. Can't find useful docs. Can't figure out a way to do
      string manipulation.
      Generate if statements using ruby script.
{% endcomment %}