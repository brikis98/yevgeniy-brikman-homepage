---
layout: post
title: Got slow download but fast upload speeds over wireless? Here's a fix.
date: '2012-02-19T00:30:00.000-08:00'
author: Yevgeniy Brikman
tags:
- HowTo
modified_time: '2014-09-03T08:02:36.239-07:00'
blogger_id: tag:blogger.com,1999:blog-5422014336627804072.post-8838225224224309852
blogger_orig_url: http://brikis98.blogspot.com/2012/02/got-slow-download-but-fast-upload.html
thumbnail_path: blog/bandwidth/slowest-upload.png
add_to_popular_list: true
---

If you find that your wireless download speeds are *abysmal* while your 
uploads speeds are pretty solid, especially with Apple devices, I've got a 
possible solution for you. I struggled with this issue for a while and decided 
to write down my findings in a blog post in case I, or anyone else, runs into 
this in the future. 

**tldr**: disable WMM QoS in your router settings. 

## Symptoms 

At home, I have the following setup: 

1. [Linksys E1200 Wireless-N 
Router](http://home.cisco.com/en-apac/products/routers/E1200) 
1. [Macbook Air](http://www.apple.com/macbookair/): OS X 10.7.1, Intel Core i7 
1.8Ghz, 4GB RAM 
1. [iPhone 4S](http://www.apple.com/iphone/): iOS 5.0 
1. Custom desktop: Windows 7, Intel Core 2 Duo E8400 3.0Ghz, 2GB RAM 
1. ISP: Comcast xfinity 

Whenever I used my laptop or phone, the Wi-Fi connection felt incredibly 
slow. Youtube videos took forever to load, Google Maps tiles filled in slowly, 
and even gmail felt unresponsive. On the other hand, my desktop, which was 
connected to the router via an ethernet cable, worked just fine.  

## Numbers

To confirm my observations, I decided to take some bandwidth measurements 
using [bandwidthplace.com](http://www.bandwidthplace.com/), 
[speakeasy.net](http://www.speakeasy.net/speedtest/), and 
[speedtest.net](http://www.speedtest.net/) for the laptop and the [Speed 
Test](http://itunes.apple.com/us/app/speedtest.net-mobile-speed/id300704847?mt=8) 
app for the iPhone. The results were pretty consistent across all app and 
device pairs and looked something like this: 

### Desktop

1. Download: 24 Mbps 
1. Upload: 4.5 Mbps 

### Laptop

1. Download: 0.65 Mbps 
1. Upload: 4.5 Mbps 

### iPhone

1. Download: 0.58 Mbps 
1. Upload: 4.4 Mbps 

 
Yikes! My laptop and iPhone download speed were more than 30 times 
slower than my desktop's download speed! On the other hand, the upload speed 
was roughly the same on all devices. What the hell was going on? 

## Failed attempts

After googling for solutions, I tried a number of tweaks commonly 
suggested around the web:

1. Change DNS hosts 
1. Change wireless channel 
1. Change the wireless channel width 
1. Use a different security mode (WPA2 personal) 
1. Shut off firewalls 
1. Enable or disable IPv6 settings 
1. Reboot the router 

None of these worked.  

## The solution

Out of desperation, I started tweaking random settings on my router and 
stumbled across one that *finally* worked. The directions for other routers 
may be a little different, but here's what I did:

1. Go to [http://192.168.1.1](http://192.168.1.1/) and login to your router. If you've 
never done this, look for instructions that came with your router or do a 
google search to find the default username and password. 
1. Find a page that has **QoS** settings. For the E1200, you need to click on 
"Applications &amp; Gaming" and select the "QoS" sub-menu. 
1. **Disable WMM Support**. 
1. Click save. 

That's it. The second I disabled WMM support, the download speeds for my 
laptop and iPhone both jumped to 24 Mbps, perfectly matching my desktop.  

## What the hell is WMM?

[WMM](http://blogs.msdn.com/b/wndp/archive/2006/06/28/650363.aspx) is 
apparently an 802.11e feature that provides higher priority for 
"time-dependent" traffic, such as video or voice. In theory, this should make 
things like VoIP calls and video chat (e.g. Skype) perform better. In 
practice, having it enabled destroyed my Wi-Fi download speeds. Since I 
disabled it, my Wi-Fi is blazing fast and I've seen no negative 
side-effects. 

If anyone has more information as to why this would be the case, please 
share it here. 

## Update (April, 2014): firmware upgrades 

A couple years after writing this blog post, I hit the inverse of the original 
problem: I suddenly had fast download but slow upload speeds. While looking 
for a fix, I found out that the WMM/QoS issue mentioned above may have been 
fixed in newer firmware versions for my router! I once again wrote a blog post 
to capture all the details: [Got fast download but slow upload speeds? Here's 
a 
fix.](https://www.ybrikman.com/writing/2014/04/14/got-fast-download-but-slow-upload/) 

### Update (Sept, 2013): some nitty-gritty details 

In the last year, this post has had over 100k views and helped many people fix 
their download speeds. I'm happy I was able to help people. Other folks have 
been eager to share advice too: I got an email from a Russ Washington in 
Atlanta who did some impressive investigative work to uncover a potential 
underlying cause. In case it helps others, here is his email: 

<blockquote>
  <p>
    Yevgeniy: I ran into your blog post "Got slow download but fast 
    upload speeds over wireless? Here's a fix." I have some info you may find 
    useful.
  </p>
  <p>
    This happened to me too when I moved to 
    Comcast - but I had DSL running in parallel. The Comcast traffic had this 
    problem but the DSL did not. Also, it affected my Linksys router when it had 
    stock firmware *and* after switching to DD-WRT. Clearly the traffic itself was 
    at issue, so I broke out the packet sniffer. 
  </p>
  <p>
    *All* inbound Comcast traffic (Internet --&gt; client) was tagged with a DSCP value 
    of 8 (Class Selector 1). The DSL traffic had a DSCP value of 0. So Comcast is 
    tagging all traffic to be treated a certain way by QoS: "Priority," which 
    sounds good but is actually the second-*lowest* possible.
  </p> 
  <p>
    WMM, itself a QoS technique, apparently 
    de-prioritizes (drops?) based on the Comcast-supplied value. Turning off WMM 
    worked around it - but since WMM is part of the 802.11n spec, I wanted root 
    cause. Judiciously replacing that set-by-Comcast DSCP value does the trick.
  </p>
  <p>
    So between my Linksys router and both ISPs, I had a 
    Netscreen firewall. It lets me set DSCP values by policy - so I told it to 
    match the DSL (DSCP 0). This yielded great improvement. However, I was still 
    not getting full speed so even a zero value was not the best for &gt; DSL 
    rates. I set the DSCP value to 46 (Expedited Forwarding) and bingo, up to 
    20Mbps, almost full provisioned speed (25Mbps).
  </p>
  <p>
    Why only download issues? Because the only Comcast-tagged packets are the inbound 
    ones: Internet --&gt; you, including those big data packets. When uploading, 
    yes, you get sent ACK packets and such - but they are tiny connection-control 
    packets. I imagine WWM weirds out on them too, but you (usually) wouldn't 
    notice when doing multi-Mbps speed tests.
  </p>
  <p>
    I am still trying to udnerstand WMM, but this was a big find, and I was lucky to have a 
    firewall that let me packet-tweak. Hope you find the info useful. 
  </p>
  <cite>
    Russ Washington, Atlanta, GA
  </cite>
</blockquote> 

## Update (Sept, 2014): more nitty-gritty details 

Russ has found even more info about this issue: it turns out it's not just a 
Comcast DSCP bug, but also poor handling of this bug by the firmware of many 
routers. More details here: [Critical DSCP bug Affecting WiFi Download Speeds 
on Comcast](http://www.dd-wrt.com/phpBB2/viewtopic.php?t=176395&amp;postdays=0&amp;postorder=asc&amp;start=0). 