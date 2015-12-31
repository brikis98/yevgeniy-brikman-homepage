---
layout: post
title: "A Look Back at 2015"
tags:
- Goals
thumbnail_path: blog/look-back-2015/google-self-driving-car.jpg
---

To paraphrase Bill Gates, most people overestimate what they can do in a day
and underestimate what they can do in a year. I definitely underestimated my
2015 and found it rewarding to go back and realize just how much happened. I
published a [book](http://www.hello-startup.net/). I moved to
[Italy](http://www.ybrikman.com/writing/2015/07/08/from-california-to-italy/).
I started a [company](http://www.atomic-squirrel.net/). I did a lot of
[traveling](http://www.ybrikman.com/photos/). And a whole lot more:

* [Most Popular Blog Posts](#most-popular-blog-posts)
* [New Projects](#new-projects)
* [Travel and Other Activities](#travel-and-other-activities)

## Most Popular Blog Posts

First up, for the followers of my blog, here are my most popular blog posts
from 2015:

<div class="container">
  {% for post in site.posts %}
    {% if site.data.yir_2015["popular_blog_posts"] contains post.id %}
      {% include post-outline.html post=post post_title_element="h4" exclude_divider="true" %}
    {% endif %}
  {% endfor %}
</div>

<br><br>

## New Projects

Next, here are the new projects I launched in 2015:

<div class="container">
  {% for project in site.data.projects %}
    {% if site.data.yir_2015["new_projects"] contains project.name %}
      {% include project-outline.html project=project project_title_element="h4" exclude_divider="true" %}
    {% endif %}
  {% endfor %}
</div>

<br><br>

## Travel and Other Activities

And finally, here are some of my trips and adventures from 2015:

<div class="container">
  {% for adventure in site.data.yir_2015["adventures"] %}
    {% include figure.html path=adventure.image caption=adventure.description url=adventure.url %}
  {% endfor %}
</div>
