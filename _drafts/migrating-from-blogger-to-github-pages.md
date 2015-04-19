---
layout: post
title: "Redesigning my home page and migrating from Blogger to GitHub Pages"
tags:
- Writing
thumbnail_path: blog/github-pages/github-pages.png
---  

Around 2007, I created my home page on a free PHP host and a blog on Blogger. 
The two websites have served me well for nearly 8 years, but it was long past
time for a change. This past week, I finally sat down and redesigned my home
page, merged my blog into it, and launched the new 
[ybrikman.com]({{ site.url }}):

{% include figure.html path="screenshots/ybrikman-homepage-screenshot-small.png" alt=site.url url=site.url %}



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