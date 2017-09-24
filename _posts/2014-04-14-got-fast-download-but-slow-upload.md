---
layout: post
title: Got fast download but slow upload speeds? Here's a fix.
date: '2014-04-14T17:49:00.000-07:00'
author: Yevgeniy Brikman
tags:
- HowTo
modified_time: '2014-05-17T14:37:09.649-07:00'
thumbnail_path: blog/bandwidth/slowest-upload.png
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
fix.](https://www.ybrikman.com/writing/2012/02/19/got-slow-download-but-fast-upload/) 
That post has had several hundred thousand views and helped many people (check 
out the comments&mdash;I even got a marriage proposal), so I'm hoping this post 
will be useful too! 

Here's your tldr: upgrade your router's firmware. 

## Symptoms 

I noticed that on all my devices - a Macbook Pro, iPhone, Windows desktop - 
webpages were sometimes taking a long time to load; it was a bit intermittent, 
but everything from google maps to gmail suddenly got very sluggish. I have 
one of their higher tier Internet plans from Comcast, so this was pretty 
disappointing. 

I ran a bandwidth test on 
[http://www.speedtest.net/](http://www.speedtest.net/) and the results were 
roughly the same across all of my devices: 

{% include figure.html path="blog/bandwidth/slowest-upload.png" alt="Slow upload speed" %}

At 57 Mb/s, the download speed was great; however, the upload speed was a mere 
0.17 Mb/s, which is pretty much unusable. In fact, I had to re-run the test 
several times, as occasionally, the upload portion of the test would get stuck 
and never complete. 

## The solution 

I tried rebooting the router, the cable modem, tweaking a bunch of settings, 
but nothing helped. I also checked with Comcast to ensure there were no issues 
our outages in my area, and of course, everything was fine. 

Finally, I stumbled upon the solution: a firmware upgrade. My router, a 
Cisco/Linksys E1200, was using firmware version 2.0.02. I went over to 
[Linksys' support 
page](http://support.linksys.com/en-us/support?icid=global-header-support-link), 
found my router, and saw that a newer version, 2.0.06, was available. Here's a 
snippet from the release notes: 

{% highlight text %}
Product:          Linksys E1200, Wireless-N Router
Classification:   Firmware Release History
____________________________________________________________________
 
Firmware 2.0.06 (build 6)
- Minor cosmetic browser-based GUI update.
- Various minor bug fixes.
 
Firmware 2.0.05 (build 2)
- Enhanced WAN-to-LAN performance when Internet connection type is set to PPPoE.
 
Firmware 2.0.04 (build 1)
- Resolved issue with decrease in download speed when WMM is enabled.
- Resolved issue with decrease in upload speed when QoS is enabled.
- Increase throughput performance when parental control is not enabled.
- Resolved issue with incorrectly handle RTSP under certain circumstances.
- Resolved PPPoE connection issue with a few ISPs.
 
Firmware 2.0.03 (build 10)
- Added dual-stack lite (DS-lite) support.
- Allow native IPv6 and 6rd support to be enabled simultaneously.
- Implemented Wi-Fi Protected Setup lock-down mechanism to prevent brute force attack.
- Resolved issue with not being able to access the browser-based GUI via HTTPS when newer versions of Internet Explorer or Firefox is used.
- Added Danish support in the browser-based GUI.
{% endhighlight %}

The notes for version 2.0.04 are especially interesting, as they fix bugs with WMM 
([which was the cause of problems in my previous blog 
post](https://www.ybrikman.com/writing/2012/02/19/got-slow-download-but-fast-upload/)), 
QoS, and more. 

I figured it was worth a shot, downloaded the 2.0.06 firmware, and installed 
it through my router's admin UI. The instructions for upgrading the firmware 
will not be the same for all routers, but here's roughly what you need to do: 

<ol>
  <li>
    Go to [http://192.168.1.1](http://192.168.1.1/) and login to your router. 
    If you've never done this, look for instructions that came with your router or 
    do a google search to find the default username and password. 
  </li>
  <li>
    Click on "administration".
  </li>
  <li>
    Click on "firmware upgrade".
  </li>
  <li>
    You should see a page like this:
    {% include figure.html path="blog/bandwidth/upgrade-firmware.png" alt="Upgrade firmware page" %}
  </li>
  <li>
    Click "Choose File" and select the firmware file you downloaded.
  </li>
  <li>
    Click "Start Upgrade". DO NOT unplug your router or click anything else in 
    the meantime; let the upgrade complete! 
  </li>
  <li>
    Wait a minute or so for your router to reboot. 
  </li>
</ol>

## The results

After the router restarted, I re-ran my speed test, and the results were 
much nicer:

{% include figure.html path="blog/bandwidth/fast-upload.png" alt="Fast upload speed" %}

The download speed is still a zippy 57 Mb/s, but now the upload speed is 
fast too, at 11 Mb/s, or **nearly 70x faster than what it was before**. 
Woohoo!

I hope you found the post helpful. If your router has a different 
firmware upgrade process, leave a comment with the steps you followed so 
others can find it. Happy web browsing! 