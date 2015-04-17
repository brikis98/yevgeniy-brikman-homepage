---
layout: post
title: 'Play, Scala, and Iteratees vs. Node.js, JavaScript, and Socket.io '
date: '2013-11-24T16:16:00.000-08:00'
author: Yevgeniy Brikman
tags:
- Web Dev
- Play
modified_time: '2013-11-24T16:16:06.233-08:00'
thumbnail_path: blog/play-vs-node/play-vs-node.png
blogger_id: tag:blogger.com,1999:blog-5422014336627804072.post-649422990633123038
blogger_orig_url: http://brikis98.blogspot.com/2013/11/play-scala-and-iteratees-vs-nodejs.html
excerpt: |
  The Play Framework takes a functional programming approach to stream 
  processing (e.g. Comet, chunked responses, WebSockets) by using abstractions 
  called Iteratees, Enumerators, and Enumeratees. When I originally tried to 
  wrap my head around Iteratees, I found that the existing documentation and 
  sample apps were fairly confusing and ineffective for getting started. Since 
  teaching is often the best way to learn, I decided to write a blog post as a 
  way to become more comfortable with functional I/O.
---

{% include figure.html path="blog/play-vs-node/play-vs-node.png" alt="Play vs Node" %}

The [Play Framework](http://www.playframework.com/) takes a functional programming 
approach to stream processing (e.g. 
[Comet](http://www.playframework.com/documentation/2.2.x/ScalaComet), [chunked 
responses](http://www.playframework.com/documentation/2.2.x/ScalaStream), 
[WebSockets](http://www.playframework.com/documentation/2.2.x/ScalaWebSockets)) 
by using abstractions called `Iteratees`, `Enumerators`, and `Enumeratees`. When I 
originally tried to wrap my head around Iteratees, I found that the [existing 
documentation](http://www.playframework.com/documentation/2.2.x/Iteratees) and 
[sample 
apps](https://github.com/playframework/playframework/tree/master/samples/scala) 
were fairly confusing and ineffective for getting started. Since teaching is 
often the best way to learn, I decided to write a blog post as a way to become 
more comfortable with functional I/O. 

On the JavaScript side of the world, [node.js](http://nodejs.org/) and 
[socket.io](http://socket.io/) take an imperative programming approach for 
stream processing by using the 
[EventEmitter](http://nodejs.org/api/events.html) API. I've found this 
imperative approach easy to learn, so for this blog post, I'll show a side by 
side comparison of the imperative and functional techniques for each example. 
The focus of the post will be on WebSockets, including a basic "hello world" 
example, an echo server, and a simple chat application. 

Note: I'll only implement server-side code in this post. You can test your 
server without writing any client-side code by using the [WebSocket echo 
client on websocket.org](http://www.websocket.org/echo.html) and giving it a 
URL like `ws://localhost:9000/some-path`. 

## Producer, consumer, adapter

Terms like `Iteratee`, `Enumerator`, and `Enumeratee` can be confusing, so let's 
start by trying to define them using normal human terms: 

1. **Enumerator**: every time you hear `Enumerator`, think "producer". This is 
the thing that pumps out chunks of data. 
1. **Iteratee**: every time you hear `Iteratee`, think "consumer". They are the 
inverse of the [Java 
Iterator](http://docs.oracle.com/javase/7/docs/api/java/util/Iterator.html): 
in an `Iterator`, you call `next` to *request* a chunk of data; in an `Iteratee`, 
you define a `fold` method that *reacts* to each chunk of data (inversion of 
control). 
1. **Enumeratee**: every time you hear `Enumeratee`, think "adapter". 
`Enumeratees` can be attached in front of `Iteratees` to modify the data streaming 
through them. 

{% include figure.html path="blog/play-vs-node/iteratees-diagram.png" alt="Iteratee analogy" %}

## A "hello world" example 

Let's start with a simple "hello world" WebSocket example. The first step is 
accepting a WebSocket connection. 

In socket.io, you do this by listening for a connection event with 
`io.sockets.on`: 

{% highlight javascript %}
var io = require('socket.io').listen(80);
 
io.sockets.on('connection', function (socket) {
  console.log("Someone just connected!");
});
{% endhighlight %}

In Play, you create a `WebSocket Action` and return an `Enumerator` that is used 
to send messages to the client and `Iteratee` that is used to react to messages 
from the client. For this first version, we'll just use an `Enumerator` and 
`Iteratee` that do nothing. 

{% highlight scala %}
object Socket extends Controller {
 
  def connect = WebSocket.using[String] { request =>
    Logger.info("Someone just connected!")
    
    // For this first example, we return an Iteratee and 
    // Enumerator that do nothing
    (Iteratee.ignore, Enumerator.empty)
  }
}
{% endhighlight %}

You'll need to expose this WebSocket endpoint in your `routes` file: 

{% highlight text %}
GET    /connect    controllers.Socket.connect
{% endhighlight %}

You can now use the URL `ws://localhost:9000/connect` in the [WebSocket echo client on 
websocket.org](http://www.websocket.org/echo.html). You should be able to 
connect, though you won't see anything interesting quite yet. 

Next, let's see how we could send a message to the client. In socket.io, the 
socket object has an `emit` method: 

{% highlight javascript %}
var io = require('socket.io').listen(80);
 
io.sockets.on('connection', function (socket) {
  console.log("Someone just connected!");
  
  // Send a message to the client
  socket.emit('message', "Hello!");
});
{% endhighlight %}

To send a message to a client in Play, we'll replace the empty `Enumerator` 
from the first example with an `Enumerator` that contains our message. 
Remember, the `Enumerator` is the "producer", so it's responsible for pumping 
down any data we want to send to the client. 

The `Enumerator` companion object has handy methods to create an `Enumerator` from 
a `File`, `InputStream`, `OutputStream`, a `Future`, and, as we'll use in this case, 
an `apply` method to create an `Enumerator` from a fixed set of data: 

{% highlight scala %}
object Socket extends Controller {
 
  def connect = WebSocket.using[String] { request =>
    Logger.info("Someone just connected!")
    
    // Create an Enumerator that sends a message to the 
    // client
    val enumerator = Enumerator("Hello!")
    
    (Iteratee.ignore, enumerator)
  }
}
{% endhighlight %}

Finally, let's log any messages we get from the client. In socket.io, we can do 
this by listening for messages with the `socket.on` method: 

{% highlight javascript %}
var io = require('socket.io').listen(80);
 
io.sockets.on('connection', function (socket) {
  console.log("Someone just connected!");
  
  // Send a message to the client
  socket.emit('message', "Hello!");
  
  // Listen for messages from the client
  socket.on('message', function (message) {
    console.log("Got message: " + message);
  });  
});
{% endhighlight %}
 
In Play, the `Iteratee` we return in the `WebSocket Action` is the "consumer", so 
it's responsible for reacting to any messages from the client. You can 
implement an `Iteratee` from scratch, but the `Iteratee` companion object has many 
methods that simplify the common cases, including `consume` (which consumes 
and concatenates all the data), `head` (consume just the first chunk of data), 
and `foreach`, which fires a provided callback for each chunk of data. In this 
case, we'll use `foreach` and pass it a function that logs each message: 

{% highlight scala %}
object Socket extends Controller {
 
  def connect = WebSocket.using[String] { request =>
    Logger.info("Someone just connected!")
    
    // Create an Enumerator that sends a message to the 
    // client
    val enumerator = Enumerator("Hello!")
    
    // Create an Iteratee that listens for messages from
    // the client
    val iteratee = Iteratee.foreach[String] { msg =>
      Logger.info(s"Got message $msg")
    }
    
    (iteratee, enumerator)
  }
}
{% endhighlight %}

If you reconnect to your WebSocket using the websocket.org test tool, you 
should now see the message "Hello!". If you send some messages from the 
webpage, they should show up in your Play console. 

Not bad, right? The main take aways are: 

1. Use the `WebSocket.using` method to define an `Action` that can accept 
WebSocket connections 
1. Return an `Iteratee` that knows how to consume messages from the client 
1. Return an `Enumerator` that knows how to produce messages for the client 

## An echo server with some filtering

Let's go a tiny bit further and create an echo server: that is, a server 
that echoes back any messages it gets from the client. 

This is easy to do in socket.io by combining `socket.on` and `socket.emit`: 

{% highlight javascript %}
var io = require('socket.io').listen(80);
 
io.sockets.on('connection', function (socket) {
  console.log("Someone just connected!");
  
  // Echo back messages from the client
  socket.on('message', function (message) {
    console.log("Got message: " + message);
    socket.emit('message', message);
  });  
});
{% endhighlight %}

Creating an `Enumerator` and `Iteratee` that are "joined" is [strangely 
complicated](http://jazzy.id.au/default/2013/06/12/call_response_websockets_in_play_framework.html) 
to do from scratch in Play. Fortunately, Play has an object called `Concurrent` 
that contains several methods to create `Enumerators` and `Iteratees` that are 
connected in various ways. For example, the `Concurrent.joined` function gives 
us an echo WebSocket in one line: 

{% highlight scala %}
object Socket extends Controller {
 
  def connect = WebSocket.using[String] { request =>
    Logger.info("Someone just connected!")
    Concurrent.joined[String]
  }
}
{% endhighlight %}

Try it out in the browser by reconnecting from websocket.org. Any message you 
send should be echoed back and show up in the log on the webpage. 

Let's make this example a little more interesting and filter the data we echo 
back. First, let's just modify each message by adding some text to it before 
echoing it back. 

The imperative approach used in socket.io means you have to modify the actual 
listener function (the callback for socket.on) to accomplish this: 

{% highlight javascript %}
var io = require('socket.io').listen(80);
 
io.sockets.on('connection', function (socket) {
  console.log("Someone just connected!");
  
  // Echo back messages from the client
  socket.on('message', function (message) {
    console.log("Got message: " + message);
    socket.emit('message', formatMessage(message));
  });  
});
 
function formatMessage(message) {
  return "[echo] " + message;
}
{% endhighlight %}

n Play, we can accomplish the same thing without having to modify the internals of the 
`Concurrent.joined` code. Since we have an actual value (the `Iteratee`) instead 
of just some side-effect function (the callback passed to socket.on), we can 
use functional composition to modify the `Iteratee` before returning it. To do 
that, we'll create an `Enumeratee`, which, as you may remember from above, is an 
adapter: we'll attach it in front of our `Iteratee` to modify the data before 
the `Iteratee` consumes it. 

The `Enumeratee` companion object has several convenience methods for creating 
`Enumeratees`: we'll first use `Enumeratee.map`, which let's you transform each 
chunk of data: 

{% highlight scala %}
object Socket extends Controller {
 
  // Generic, reusable adapter code that adds a prefix
  // to each message
  val formatMessage = Enumeratee.map[String] { msg =>
    s"[echo]: $msg"
  } 
 
  def connect = WebSocket.using[String] { request =>
    Logger.info("Someone just connected!")
    
    val (iteratee, enumerator) = Concurrent.joined[String]
    
    // Apply the formatMessage adapter to the iteratee
    (formatMessage.apply(iteratee), enumerator)
  }
}
{% endhighlight %}

The advantage of composition becomes even more apparent if we want to do some 
fancier filtering. For example, let's only echo back messages that aren't 
empty and contain non-whitespace characters. 

With socket.io, we have to make an even larger modification to the contents of 
the socket.on callback function. This is easy to do in single, simple example, 
but this would get more complicated across many examples in a large 
application. 

{% highlight javascript %}
var io = require('socket.io').listen(80);
 
io.sockets.on('connection', function (socket) {
  console.log("Someone just connected!");
  
  // Echo back messages from the client
  socket.on('message', function (message) {
    console.log("Got message: " + message);
    
    if (isValidMessage(message)) {
      socket.emit('message', formatMessage(message));
    }
  });  
});
 
function formatMessage(message) {
  return "[echo] " + message;
}
 
function isValidMessage(message) {
  return message.trim().length > 0;
}
{% endhighlight %}

In Play, we can simply add another `Enumeratee` to validate the content and compose it 
with the previous one. We'll create this `Enumeratee` using the `collect` 
method, which only allows data to pass through it if it matches one of the 
cases for the `PartialFunction` you pass in: 

{% highlight scala %}
object Socket extends Controller {
 
  // Generic, reusable adapter code that adds a prefix
  // to each message
  val formatMessage = Enumeratee.map[String] { msg =>
    s"[echo]: $msg"
  } 
  
  // Use Enumeratee.collect to only pass through messages that
  // are not empty and contain non-whitespace characters
  val validateMessage = Enumeratee.collect[String] {
    case valid if !valid.trim.isEmpty => valid
  }
  
  // We can compose multiple Enumeratees together into a single
  // Enumeratee
  val filters = formatMessage.compose(validateMessage)
 
  def connect = WebSocket.using[String] { request =>
    Logger.info("Someone just connected!")
    
    val (iteratee, enumerator) = Concurrent.joined[String]
    
    // Apply the filters to the iteratee
    (filters.apply(iteratee), enumerator)
  }
}
{% endhighlight %}

You'll often run across `Enumeratee` code that uses operators instead of the function 
names. The `><>` operator (fish?) composes two `Enumeratees` and the 
`&>` applies an `Enumeratee` to an `Iteratee`: 

{% highlight scala %}
val e1: Enumeratee[String, String] = ...
val e2: Enumeratee[String, String] = ...
val e3: Enumeratee[String, String] = ...
 
val iteratee: Iteratee[String, String] = ...
 
// Compose the 3 Enumeratees together and apply the result to
// the Iteratee to get a new Iteratee
 
val filteredIteratee = e1 ><> e2 ><> e3 &> iteratee
{% endhighlight %}

The operators do allow you to drop lots of parens in your code, but personally, I 
find the operators hard to remember and impossible to google. Therefore, I 
believe that in this case, they lead to code that is optimized for writing 
instead of reading, which is a bad trade off. I recommend sticking with the 
full function names. 

Main take aways from this section: 

1. Use the methods in the `Concurrent` object to create `Iteratees` and 
`Enumerators` that are connected. We'll see another example of this in the next 
section. 
1. Create and compose `Enumeratees` when you need to modify the stream of data 
going into your `Iteratees`. 

## A chat server 

As a final example, let's put together a simple WebSocket chat server that 
just handles a few basic tasks: 

1. Send a message to all clients when a user connects or disconnects 
1. Each time a message is received from a client, send it out to all other 
clients 

Here is the socket.io version: 

{% highlight javascript %}
var io = require('socket.io').listen(80);
 
var usersId = 0
 
io.sockets.on('connection', function (socket) {
 
  userId++;
  var username = "user" + userId;
  
  broadcastMessage("system", username + " just connected!");
  
  socket.on('message', function (message) {
    broadcastMessage(username, message);
  });  
  
  socket.on('disconnect', function () {
    broadcastMessage("system", username + " disconnected");
  });  
});
 
// Send a message to every connected client
function broadcastMessage(username, message) {
  io.sockets.emit('message', "[" + username + "]: " + message);
}
{% endhighlight %}

And here is the Play version: 

{% highlight scala %}
object Socket extends Controller {
 
  // Concurrent.broadcast creates an Enumerator and Channel that
  // let us imperatively push messages to many Iteratees
  lazy val (enumerator, channel) = Concurrent.broadcast[String]
 
  val userId = new AtomicLong(0) 
 
  def connect = WebSocket.using[String] { request =>
    val username = s"user${userId.incrementAndGet()}"
    
    broadcastMessage("system", s"$username connected!")
    
    val iteratee = 
      Iteratee
        .foreach[String](msg => broadcastMessage(username, msg)
        .map(_ => broadcastMessage("system", s"$username disconnected"))
    
    (iteratee, enumerator)
  }
  
  def broadcastMessage(username: String, message: String): Unit = {
    channel.push(s"[$username]: $message")
  }
}
{% endhighlight %}


There are two new things to learn from this code: 

1. We are using `Concurrent.broadcast` to create an `Enumerator` and `Channel` that 
can be shared across all WebSocket connections. `Channel` is a new class 
specifically built to push messages to multiple `Iteratees` (ie, multiple 
clients). Interestingly, it is an imperative abstraction, where you just call 
a `push` method for its side-effect. 
1. The `map` method on the `Iteratee` will fire when the `Iteratee` is done; for 
WebSockets, this happens when the client disconnects, an event we capture and 
broadcast to all clients. 

If you open the websocket.org echo page in two separate tabs and start sending 
messages, you should see the messages showing up in the log in both tabs, 
prefixed with `[user1]: ` or `[user2]: `. You should also see messages when a 
client connects or disconnects. 

## Final thoughts 

I'm still learning my way around `Iteratees`, so I welcome any corrections, 
suggestions, or other feedback. If you've come across other good tutorials and 
examples, please share them! 

I must admit that I have some lingering doubts about `Iteratees` as the primary 
means of working with streams of data in Play. They seem to be a powerful 
abstraction&mdash;interleaving and modifying streams on the fly is especially 
cool&mdash;but the degree of complexity is very high; the sparse documentation and 
large vocabulary of strange method names (`unfoldM`, `fromCallback1`, `joinConcatI`, 
`><>`) only make it worse. 

Just about anyone can get rolling with socket.io in a matter of *minutes*, 
whereas most people take several tries across several *days* to grok 
`Iteratees`. Functional programming often offers a high cost to high reward 
trade-off, but the ratio with `Iteratees` is extreme. Moreover, it seems like 
you end up with an imperative approach for many use cases anyway, such as the 
`Channel` object returned by `Concurrent.broadcast`. 

I'd also argue that the vocabulary of `Iteratees` does not clearly convey the 
intent of the code. Look at the two chat server examples above: which one 
reads more clearly? In my opinion, `socket.on` and `socket.emit` make it crystal 
clear what the code is trying to do. On the other hand, `Iteratee.foreach` and 
`Iteratee.map` do not. The latter feels more like I'm trying to make the tools 
do what I want, whereas in the former, I'm clearly dealing with the actual 
problem space. 

`Iteratees` are a fairly general tool, so perhaps they should be reserved for 
low-level, advanced functionality, while some simpler, use-case specific 
abstractions are available for most common use cases?  For example, maybe we 
just need a good socket.io equivalent for Play built on top of `Iteratees`? I've 
seen [socket.io.play](https://github.com/milliondreams/socket.io.play) and 
[atmosphere-play](https://github.com/Atmosphere/atmosphere-play), but I'm not 
sure if they are stable, maintained, tested, documented, or high quality. If 
anyone has experience with these libraries, let me know! 