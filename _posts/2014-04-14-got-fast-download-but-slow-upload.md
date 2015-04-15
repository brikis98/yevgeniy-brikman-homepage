---
layout: post
title: Got fast download but slow upload speeds? Here's a fix.
date: '2014-04-14T17:49:00.000-07:00'
author: Yevgeniy Brikman
tags:
- HowTo
modified_time: '2014-05-17T14:37:09.649-07:00'
thumbnail: http://2.bp.blogspot.com/-fGCZOHOsQ0w/U0x5MQNDImI/AAAAAAAAQs4/0YJJnL9Accs/s72-c/slowest-upload.png
blogger_id: tag:blogger.com,1999:blog-5422014336627804072.post-4644415599488705436
blogger_orig_url: http://brikis98.blogspot.com/2014/04/got-fast-download-but-slow-upload.html
---

If you've found that your download speed is great, but your upload speed is 
*abysmal*, I've got a possible solution for you. I struggled with this issue 
for a while and decided to write down my findings in a blog post in case I, or 
anyone else, runs into this in the future. 

In fact, this is the *second* such blog post I'm writing: a couple years ago, 
I hit the the inverse issue and documented the solution in a blog post called 
[Got slow download but fast upload speeds over wireless? Here's a 
fix.](http://brikis98.blogspot.com/2012/02/got-slow-download-but-fast-upload.html) 
That post has had several hundred thousand views and helped many people (check 
out the comments - I even got a marriage proposal), so I'm hoping this post 
will be useful too! 

Here's your tldr: upgrade your router's firmware. 

## <span style="font-size: x-large;">Symptoms 

I noticed that on all my devices - a Macbook Pro, iPhone, Windows desktop - 
webpages were sometimes taking a long time to load; it was a bit intermittent, 
but everything from google maps to gmail suddenly got very sluggish. I have 
one of their higher tier Internet plans from Comcast, so this was pretty 
disappointing. 

I ran a bandwidth test on 
[http://www.speedtest.net/](http://www.speedtest.net/) and the results were 
roughly the same across all of my devices: 

<div class="separator" style="clear: both; text-align: center;">[<img 
border="0" 
src="http://2.bp.blogspot.com/-fGCZOHOsQ0w/U0x5MQNDImI/AAAAAAAAQs4/0YJJnL9Accs/s1600/slowest-upload.png" 
/>](http://2.bp.blogspot.com/-fGCZOHOsQ0w/U0x5MQNDImI/AAAAAAAAQs4/0YJJnL9Accs/s1600/slowest-upload.png) 
At 57 Mb/s, the download speed was great; however, the upload speed was a mere 
0.17 Mb/s, which is pretty much unusable. In fact, I had to re-run the test 
several times, as occasionally, the upload portion of the test would get stuck 
and never complete. 

## <span style="font-size: x-large;">The solution 

I tried rebooting the router, the cable modem, tweaking a bunch of settings, 
but nothing helped. I also checked with Comcast to ensure there were no issues 
our outages in my area, and of course, everything was fine. 

Finally, I stumbled upon the solution: a firmware upgrade. My router, a 
Cisco/Linksys E1200, was using firmware version 2.0.02. I went over to 
[Linksys' support 
page](http://support.linksys.com/en-us/support?icid=global-header-support-link), 
found my router, and saw that a newer version, 2.0.06, was available. Here's a 
snippet from the release notes: 

<script src="https://gist.github.com/brikis98/10692239.js"></script>The notes 
for version 2.0.04 are especially interesting, as they fix bugs with WMM 
([which was the cause of problems in my previous blog 
post](http://brikis98.blogspot.com/2012/02/got-slow-download-but-fast-upload.html)), 
QoS, and more. 

I figured it was worth a shot, downloaded the 2.0.06 firmware, and installed 
it through my router's admin UI. The instructions for upgrading the firmware 
will not be the same for all routers, but here's roughly what you need to do: 
1. Go to [http://192.168.1.1](http://192.168.1.1/) and login to your router. 
If you've never done this, look for instructions that came with your router or 
do a google search to find the default username and password. 
1. Click on "administration". 
1. Click on "firmware upgrade". 
1. You should see a page like this:  <div class="separator" style="clear: 
both; text-align: center;">[<img border="0" 
src="http://3.bp.blogspot.com/-r27az1Fk87Y/U0x-NRUzVnI/AAAAAAAAQtE/UKUYCEBr9Pk/s1600/upgrade-firmware.png" 
height="277" width="400" 
/>](http://3.bp.blogspot.com/-r27az1Fk87Y/U0x-NRUzVnI/AAAAAAAAQtE/UKUYCEBr9Pk/s1600/upgrade-firmware.png)<div> 
1. Click "Choose File" and select the firmware file you downloaded. 
1. Click "Start Upgrade". DO NOT unplug your router or click anything else in 
the meantime; let the upgrade complete! 
1. Wait a minute or so for your router to reboot. 
<div>**<span style="font-size: x-large;">The results**<div> 
<div>After the router restarted, I re-ran my speed test, and the results were 
much nicer:<div> 
<div class="separator" style="clear: both; text-align: center;">[<img 
border="0" 
src="http://1.bp.blogspot.com/-rSjZIWcJ9Ss/U0x_Aia6r3I/AAAAAAAAQtM/qtDTZSYxeoc/s1600/fast-upload.png" 
/>](http://1.bp.blogspot.com/-rSjZIWcJ9Ss/U0x_Aia6r3I/AAAAAAAAQtM/qtDTZSYxeoc/s1600/fast-upload.png)<div> 
<div>The download speed is still a zippy 57 Mb/s, but now the upload speed is 
fast too, at 11 Mb/s, or **nearly 70x faster than what it was before**. 
Woohoo!<div> 
<div>I hope you found the post helpful. If your router has a different 
firmware upgrade process, leave a comment with the steps you followed so 
others can find it. Happy web browsing! 