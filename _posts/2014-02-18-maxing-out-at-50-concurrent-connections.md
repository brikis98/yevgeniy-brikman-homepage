---
layout: post
title: Maxing out at 50 concurrent connections with Play or Netty on OS X? Here's
  a fix.
date: '2014-02-18T18:07:00.000-08:00'
author: Yevgeniy Brikman
tags:
- HowTo
- Play
modified_time: '2014-02-18T18:09:23.869-08:00'
blogger_id: tag:blogger.com,1999:blog-5422014336627804072.post-2521038555779866353
blogger_orig_url: http://brikis98.blogspot.com/2014/02/maxing-out-at-50-concurrent-connections.html
---

I recently ran across a strange problem with the [Play 
Framework](http://www.playframework.com/) and [Netty](http://netty.io/): on 
Linux, my Play app could easily handle thousands of concurrent connections; on 
OS X, the same app maxed out at around 50 concurrent connections. It took a 
while to figure out the problem, so in this post, I'm documenting the solution 
in case other folks run into the same issue in the future. Note: if you're 
using raw Netty, the fix is very straightforward; if you're using Play, it's 
much trickier, and I hope it will be fixed in Play itself in the near future. 

**tldr**: set the backlog option on Netty's Bootstrap object to a higher value 
([example](http://stackoverflow.com/a/8455894/483528)). 

## Symptoms 

On OS X, your Play or Netty app cannot handle more than ~50 concurrent 
connections. A simple way to test this is to use [Apache 
Bench](http://httpd.apache.org/docs/2.2/programs/ab.html): 

{% highlight text %}
> ab -n 100 -c 51 http://localhost:9000/
 
This is ApacheBench, Version 2.3
 
Benchmarking localhost (be patient)...
apr_socket_recv: Connection reset by peer (54)
{% endhighlight %}

As soon as you set the concurrency level (the `-c` parameter) above 50, you'll 
get the error `"apr_socket_recv: Connection reset by peer (54)"`. Moreover, your 
Play or Netty app will never actually see the request and nothing will show up 
in the logs. 

However, if you run the same experiment against the same app running on Linux, 
even with the concurrency level set to several hundred or several thousand, 
all requests will complete successfully, without errors. Therefore, there must 
be something OS specific causing this problem. 

To be fair, it's rare to use OS X in any production or high traffic 
capacity&mdash;for example, at LinkedIn, we use OS X in dev, but Linux in 
prod&mdash;so the concurrency limitation is rarely a problem. However, we had a few use cases 
where, even in dev mode, we had to make many concurrent calls to the same app, 
so we had to find a solution. 

## The Cause 

It turns out that "50" is the default size for the `"backlog"` parameter in 
Java's 
[ServerSocket](http://grepcode.com/file/repository.grepcode.com/java/root/jdk/openjdk/6-b27/java/net/ServerSocket.java#199). 
It is even explained in the 
[JavaDoc](http://docs.oracle.com/javase/7/docs/api/java/net/ServerSocket.html#ServerSocket(int)): 

> The maximum queue length for incoming connection indications (a request to 
> connect) is set to 50. If a connection indication arrives when the queue is 
> full, the connection is refused.

Therefore, whatever code 
manages sockets in Netty must use different configurations for the backlog 
parameter on Linux and OS X. This code is likely tied to the selector 
implementation for the OS: I'm guessing the Linux version uses epoll, while OS 
X uses kqueue. The former probably sets backlog to some reasonable value 
(perhaps from OS settings) while the latter just uses the default (which is 
50). 

## The Solution (pure Netty) 

After some more digging, this [StackOverflow 
thread](http://stackoverflow.com/questions/8442166/how-to-allow-more-concurrent-client-connections-with-netty) 
reveals that the Netty 
[ServerBootstrap](http://netty.io/4.0/api/io/netty/bootstrap/ServerBootstrap.html) 
class lets you set an option to override the backlog: 

{% highlight scala %}
val bootstrap = new ServerBootstrap(...);
bootstrap.setOption("backlog", 1024);
{% endhighlight %}

If you're using pure netty, just use the code above and the 50 concurrent connections 
limit will vanish immediately! 

Also worth noting: this issue exists in Netty 3.x, but apparently Netty 4.x 
sets a better default than 50 on all OS's, so upgrading Netty versions may be 
another solution. 

## The Solution (Play) 

Play instantiates the ServerBootstrap class inside of 
[NettyServer.scala](https://github.com/playframework/playframework/blob/eb9a3e8f919c36a41f5cdbc553a0590317983c34/framework/src/play/src/main/scala/play/core/server/NettyServer.scala). 
Unfortunately, neither the class nor the boostrap instance inside of it are 
accessible to app code. This should be easy to fix via a pull request, but 
until that happens, and until a new version is available, here is a two part 
workaround to get moving. 

**Note**: this is an *ugly* hack with lots of copy/paste from the original Play 
source code and is only meant as a temporary workaround. It has been tested 
with [Play 
2.2.1](https://github.com/playframework/playframework/releases/tag/2.2.1); 
figure out which version of Play you're on and be sure to use code from that 
[release](https://github.com/playframework/playframework/releases)! 

### Step 1: make a local copy of NettyServer.scala called TempNettyServer.scala 

You'll want to put `TempNettyServer.scala` in a different SBT project than your 
normal app code&mdash;that is, don't just put it in the app folder. See [SBT 
Multi-Project 
Builds](http://www.scala-sbt.org/release/docs/Getting-Started/Multi-Project) 
for more info. 

The folder structure looks something like this: my-app is my original Play app 
and monkey-patch is a new SBT project for `TempNettyServer.scala`: 

{% highlight text %}
my-project
  └ my-app
    └ app
    └ conf
    └ public
    └ test
  └ monkey-patch
    └ src
      └ main
        └ scala
          └ play
            └ core
              └ server
                └ TempNettyServer.scala
{% endhighlight %}

Copy the contents of the original 
[NettyServer.scala](https://github.com/playframework/playframework/blob/eb9a3e8f919c36a41f5cdbc553a0590317983c34/framework/src/play/src/main/scala/play/core/server/NettyServer.scala) 
into `TempNettyServer.scala`, with two changes: 

1. Replace all `NettyServer` references to `TempNettyServer` 
1. In the `newBootstrap` method, make the change below to allow configuring the 
`backlog` option 

{% highlight scala %}
private def newBootstrap = {
  val bootstrap = new ServerBootstrap(new NioServerSocketChannelFactory(
    Executors.newCachedThreadPool(NamedThreadFactory("netty-boss")),
    Executors.newCachedThreadPool(NamedThreadFactory("netty-worker"))))
 
  /////// TEMPORARY WORKAROUND: expose the backlog setting ///////
 
  val backlog = 
    Option(System.getProperty("http.netty.backlog"))
    .map(Integer.parseInt)
    .getOrElse(1024)
  println(s"Monkey patch: setting backlog to $backlog")
  bootstrap.setOption("backlog", backlog)
 
  /////// END TEMPORARY WORKAROUND ///////
 
  bootstrap
}
{% endhighlight %}

Now, configure this new SBT project in project/Build.scala: 


{% highlight scala %}
// Note the "with play.PlayInternalKeys"
object ApplicationBuild extends Build with play.PlayInternalKeys {
 
  // Project with NettyServer monkey patch
  val monkeyPatch = Project("monkey-patch", file("monkey-patch"))
    .settings(libraryDependencies += 
      "com.typesafe.play" % "play_2.10" % "2.2.1")
 
  // Actual Play app
  val myApp = play.Project("my-app", path = file("my-app"))
    .dependsOn(monkeyPatch)
    .settings(
      // Add to playDependencyClasspath so it is accessible in 
      // the classloader used for the "run" and "start" commands
      playDependencyClasspath += 
        (classDirectory in Compile in monkeyPatch).value
    )
}
{% endhighlight %}

## Step 2: override the run and start commands to use TempNettyServer 

Ready for more copy/paste? 

Grab 
[PlayRun.scala](https://github.com/playframework/playframework/blob/eb9a3e8f919c36a41f5cdbc553a0590317983c34/framework/src/sbt-plugin/src/main/scala/PlayRun.scala) 
and copy it into the project folder under some other name, such as 
`TempPlayRun.scala` and make two changes: 

1. Replace all `PlayRun` references with `TempPlayRun`: there should only be one, 
which is the class name. 
1. Replace all `NettyServer` references with `TempNettyServer`: there should be 
two, both in String literals, used in the `run` and `start` commands to fire up 
the app. 

Now, update the settings in `project/Build.scala` to use your versions of the 
`run` and `start` commands: 

{% highlight scala %}
// Note the "with play.PlayInternalKeys"
object ApplicationBuild extends Build with play.PlayInternalKeys {
 
  // Project with NettyServer monkey patch
  val monkeyPatch = Project("monkey-patch", file("monkey-patch"))
    .settings(libraryDependencies += 
      "com.typesafe.play" % "play_2.10" % "2.2.1")
 
  // Actual Play app
  val myApp = play.Project("my-app", path = file("my-app"))
    .dependsOn(monkeyPatch)
    .settings(
      // Add to playDependencyClasspath so it is accessible in 
      // the classloader used for the "run" and "start" commands
      playDependencyClasspath += 
        (classDirectory in Compile in monkeyPatch).value,
      
      // Replace the "run" and "start" commands with the monkey 
      // patched versions in TempPlayRun
      run in Compile <<= TempPlayRun.playRunSetting,
      commands += TempPlayRun.playStartCommand      
    )
}
{% endhighlight %}

## A note on OS limits 

After making the changes above, you should be able to handle more than 50 
concurrent connections. However, depending on how your OS is configured, you 
might still hit a limit at 128 or so. This is probably due to the kernel 
config 
[kern.ipc.somaxconn](http://www5.us.freebsd.org/doc/handbook/configtuning-kernel-limits.html#idp75584176), 
which controls "the size of the listen queue for accepting new TCP 
connections" and has a default of 128. 

To tweak this limit, you can run the following command: 

{% highlight text %}
sysctl -w kern.ipc.somaxconn=1024
{% endhighlight %}

Your Netty or Play app should now be able to handle over 1000 concurrent 
connections (or more, depending on what limits you set above). 