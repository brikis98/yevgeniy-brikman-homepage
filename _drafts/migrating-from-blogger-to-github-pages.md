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

1. Come up with a new design
1. Deploy on GitHub Pages
1. Figure out styling and behavior
1. Migrate your old content

## Come up with a new design

## Deploy on GitHub Pages

## Figure out styling and behavior

## Migrate your old content


{% comment %}
  Design
    Kasper, Pixyll, Medium
    My design chapter
    Hello, Startup Design Resources
    Generate favicon
  GitHub Pages and Jekyll  
    Very quick to learn
    Smooth to deploy, set up CNAME
    Interesting idea of generating a static site, but with vars/functions/etc
    Wish GitHub Pages supported more plugins
    Tags pages
    RSS
  JS/CSS
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