---
layout: post
title: 'MySQL error&#58; last packet sent to the server was XXX ms ago'
date: '2013-01-19T22:26:00.001-08:00'
author: Yevgeniy Brikman
tags:
- HowTo
- Software Engineering
modified_time: '2013-01-20T12:14:34.727-08:00'
blogger_id: tag:blogger.com,1999:blog-5422014336627804072.post-5423786048310633287
blogger_orig_url: http://brikis98.blogspot.com/2013/01/mysql-error-last-packet-sent-to-server.html
thumbnail_path: blog/mysql/mysql-logo.jpg
---

I just spent a few weeks battling a strange, infrequent, hard-to-reproduce 
error when using JDBC to talk to MySQL. After about a dozen experiments, I 
think I've finally found a solution and I've decided to capture the details 
here, since my online searches didn't turn up this particular answer anywhere 
else. 

**tldr**: If you see a "last packet sent to the server was XXX ms ago" error, 
you may want to upgrade your version of the mysql-connector-java library. 

## The Symptoms

I had a simple Java app in production that was using JDBC to talk to a MySQL 
DB. Everything was running great: DB calls were taking 2 ms on average and 8 
ms in the 99th percentile. However, once every 4-8 hours, a strange error 
would pop up that looked something like this: 

{% highlight text %}
Last packet sent to the server was 28800126 ms ago.

Caused by: com.mysql.jdbc.CommunicationsException: Communications link failure due to underlying exception: 

java.io.EOFException
  at com.mysql.jdbc.MysqlIO.readFully(MysqlIO.java:1905)
  at com.mysql.jdbc.MysqlIO.readPacket(MysqlIO.java:483)
  at com.mysql.jdbc.MysqlIO.readAllResults(MysqlIO.java:1411)
  at com.mysql.jdbc.ServerPreparedStatement.serverExecute(ServerPreparedStatement.java:1142)
  at com.mysql.jdbc.ServerPreparedStatement.executeInternal(ServerPreparedStatement.java:676)
  at com.mysql.jdbc.PreparedStatement.executeQuery(PreparedStatement.java:1030)
{% endhighlight %}

I can understand the occasionally slow query, but 28800126 ms? EOFException? 
What's going on here? 

## Lots of ineffective options

As usual, I turned to a programmer's two best friends: Google and 
StackOverflow. I quickly found my way to the [MySQL 
docs](http://dev.mysql.com/doc/refman/5.6/en/connector-j-usagenotes-troubleshooting.html#qandaitem-22-3-15-1-12) 
and found out that MySQL has two timeout settings that will close a connection 
if it is idle for too long: 
[interactive_timeout](http://dev.mysql.com/doc/refman/5.0/en/server-system-variables.html#sysvar_interactive_timeout) 
and 
[wait_timeout](http://dev.mysql.com/doc/refman/5.0/en/server-system-variables.html#sysvar_wait_timeout). 
The default value for these two settings is 28800000 ms or 8 hours. 

The general advice online was to make sure that your connection management 
library was sending periodic "keep-alive" queries to prevent connections from 
going idle. I was using [BoneCP](https://github.com/wwadge/bonecp), so I tried 
everything I could to make it behave properly, including a few [configuration 
tweaks](http://stackoverflow.com/questions/11945833/java-bonecp-mysql-connection-timing-out) 
as well as workarounds for a [connection leak 
bug](https://bugs.launchpad.net/bonecp/+bug/999114) and a 
[releaseHelperThreads 
bug](http://jolbox.com/forum/viewtopic.php?f=3&amp;t=387). Nothing worked. 

Eventually, I swapped out BoneCP entirely for a different connection 
management library. Nevertheless, after a few hours, the dreaded "last packet 
sent to the server was XXX ms ago" error would pop up on the production box. 

## The solution at last 

For a while, I was at a loss. I couldn't see how two entirely different DB 
connection management libraries could have the same bug. I began digging for 
what the two had in common and realized that, under the hood, both would be 
using the same JDBC driver. For MySQL, this is 
[Connector/J](http://dev.mysql.com/downloads/connector/j/). 

It's at this point that I noticed that I was, for some reason, using 
Connector/J version 3.1.12, which is quite old. In fact, it is officially 
[obsolete](http://dev.mysql.com/doc/refman/5.0/en/connector-j-versions.html) 
and only compatible with MySQL 5.0 and below. This is unfortunate, as I was 
using MySQL 5.5 in production. 

I figured it was a long shot that this was the cause of the errors I was 
seeing, but I figured that using the "recommended" connector version was a 
good idea anyway. I updated from mysql-connector-java version 3.1.12 to 
version 5.1.22. 

And just like that, all the errors were gone. 

## The final word 

So, there you have it.  If you see a "last packet sent to the server was XXX 
ms ago", it's likely one of two things: 

1. Your DB connection management library is leaving idle connections open too 
long 
1. You're hitting an incompatibility bug between the Connector/J version and 
the MySQL DB version 