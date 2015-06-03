---
layout: post
title: "Moving to Italy: Our Digital Garage Sale"
tags:
- Home
thumbnail_path: blog/garage-sale/garage-sale.png
---  

This summer, my girlfriend and I are moving to Florence, Italy. It's exciting.
It's scary. It's insane. And it's going to take a lot of work.

One of the first things we need to do is sell everything we own here in Menlo
Park, CA. And that means it's time for a garage sale. Of course, I'm a 
programmer, so what that really means is it's time for a **digital garage 
sale**.

{% include figure.html path=page.thumbnail_path alt="Digital Garage Sale" %}

Below is a list of all the items we have for sale. Some of this stuff is 
amazing and we're going to miss it dearly (e.g. the power recliner couch, the 
1080p projector and 92" screen, the Weber BBQ Grill). Some of this stuff is 
crap and we're giving it away dirt cheap. Take a look, click on any item to 
go to the craigslist page will all the details, and if you see something
you like, email me at **[{{ site.contact_urls.email.value }}]({{ site.contact_urls.email.url }})**!

{% for item in site.data.garage-sale %}
  <div class="mt2 mb2">
    {% include figure.html path=item.image caption=item.name url=item.url external=true %}
  </div>
{% endfor %}
