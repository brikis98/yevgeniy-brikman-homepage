---
layout: post
title: "Ping-Play: Big Pipe Streaming for the Play Framework"
tags:
- Play
- Open Source
thumbnail_path: blog/big-pipe/play-logo.png
repo_url: https://github.com/brikis98/ping-play
---  

I've just open sourced a library called [ping-play]({{ page.repo_url }})
which brings [BigPipe](https://www.facebook.com/note.php?note_id=389414033919)
streaming to the [Play Framework](http://playframework.com/). It includes tools 
for a) splitting your pages up into small "pagelets", which makes it easier to 
maintain large websites, and b) streaming those pagelets down to the browser as 
soon as they are ready, which can significantly reduce page load time.

<p class="center"><strong><a href="{{ page.repo_url }}">Check out ping-play on GitHub now!</a></strong></p>

In this blog post, I'll describe what BigPipe streaming is all about, how to 
add BigPipe streaming to your Play apps, and where to get more info. 

## What is BigPipe?

In a typical web app, before you can render a page, you have to make requests 
to multiple remote backend services to fetch data (e.g. RESTful HTTP calls to 
a profile service, a search service, an ads service, etc). You then have to 
wait for *all* of these remote calls to come back before you can send *any* 
data back to the browser. For example, the following screen capture shows a 
page that makes 6 remote service calls, most of which complete in few hundred 
milliseconds, but one takes over 5 seconds. As a result, the time to first byte 
is 5 seconds, during which the user sees a completely blank page:

{% include figure.html path="blog/big-pipe/without-big-pipe.gif" caption="A page without BigPipe. It takes a long time before the user sees anything." %}

With BigPipe, you can start streaming data back to the browser without waiting 
for the backends at all, and fill in the page incrementally as each backend 
responds. For example, the following screen capture shows the same page making 
the same 6 remote service calls, but this time rendered using BigPipe. The 
header and much of the markup is sent back instantly, so time to first byte is 
10 milliseconds (instead of 5 seconds), static content (i.e. CSS, JS, images) 
can start loading right away, and then, as each backend service responds, the 
corresponding part of the page (i.e. the pagelet) is sent to the browser and 
rendered on the screen:

{% include figure.html path="blog/big-pipe/with-big-pipe.gif" caption="A page with BigPipe. The user sees the page instantly." %}

## How to use ping-play

To understand how to transform your Play app to use BigPipe, it's helpful to 
first see an example that does *not* use BigPipe. Here is the controller code 
for the example mentioned above: 

{% highlight scala %}
class WithoutBigPipe(client: FakeServiceClient) extends Controller {
  def index = Action.async { implicit request =>
    // Make several fake service calls in parallel to represent 
    // fetching data from remote backends. Some of the calls will 
    // be fast, some medium, and some slow.
    val profileFuture = client.fakeRemoteCallMedium("profile")
    val graphFuture = client.fakeRemoteCallMedium("graph")
    val feedFuture = client.fakeRemoteCallSlow("feed")
    val inboxFuture = client.fakeRemoteCallSlow("inbox")
    val adsFuture = client.fakeRemoteCallFast("ads")
    val searchFuture = client.fakeRemoteCallFast("search")

    // Wait for all the remote calls to complete
    for {
      profile <- profileFuture
      graph <- graphFuture
      feed <- feedFuture
      inbox <- inboxFuture
      ads <- adsFuture
      search <- searchFuture
    } yield {
      // Render the template once all the data is available
      Ok(views.html.withoutBigPipe(
        profile, graph, feed, inbox, ads, search))
    }
  }
}
{% endhighlight %}

This controller makes 6 remote service calls, gets back 6 `Future` objects, and 
when they have all redeemed, it uses them to render the following template:

{% highlight html %}
@(profile: data.Response, graph: data.Response, feed: data.Response, 
  inbox: data.Response, ads: data.Response, search: data.Response)

<html>
  <head>
    <link rel="stylesheet" href="/assets/stylesheets/main.css">
  </head>
  <body>
    <h1>Without Big Pipe</h1>
    <table class="wrapper">
      <tr>
        <td><div id="profile">@views.html.helpers.module(profile)</div></td>
        <td><div id="ads">@views.html.helpers.module(ads)</div></td>
        <td><div id="feed">@views.html.helpers.module(feed)</div></td>
      </tr>
      <tr>
        <td><div id="search">@views.html.helpers.module(search)</div></td>
        <td><div id="inbox">@views.html.helpers.module(inbox)</div></td>
        <td><div id="graph">@views.html.helpers.module(graph)</div></td>
      </tr>
    </table>
  </body>
</html>
{% endhighlight %}

When you load this page, nothing will show up on the screen until all of the 
backend calls complete, which will take about 5 seconds.

To transform this page to use BigPipe, you first add the big-pipe dependency to 
your build (note, ping-play requires Play 2.4, Scala 2.11.6, SBT 0.13.8, and 
Java 8):

{% highlight scala %}
libraryDependencies += "com.ybrikman.ping" %% "big-pipe" % "0.0.11"
{% endhighlight %}

Next, add support for the `.scala.stream` template type and some imports for it 
to your build:

{% highlight scala %}
TwirlKeys.templateFormats ++= 
  Map("stream" -> "com.ybrikman.ping.scalaapi.bigpipe.HtmlStreamFormat"),
TwirlKeys.templateImports ++= 
  Vector("com.ybrikman.ping.scalaapi.bigpipe.HtmlStream")
{% endhighlight %}

Now you can create streaming templates. These templates can mix normal HTML 
markup, which will be streamed to the browser immediately, with the `HtmlStream` 
class, which is a wrapper for an `Enumerator[Html]` that will be streamed to the 
browser whenever the `Enumerator` has data. Here is is the streaming version of 
the template above:

{% highlight html %}
@(body: HtmlStream)

<html>
  <head>
    <link rel="stylesheet" href="/assets/stylesheets/main.css">
    <!-- Include the BigPipe JavaScript at the top of the page -->
    <script src="/assets/com/ybrikman/ping/big-pipe.js"></script>
  </head>
  <body>
    <h1>With Big Pipe</h1>
    <!-- 
     These divs are placeholders that will be filled in 
     incrementally as the data becomes available 
    -->
    <table class="wrapper">
      <tr>
        <td><div id="profile"></div></td>
        <td><div id="ads"></div></td>
        <td><div id="feed"></div></td>
      </tr>
      <tr>
        <td><div id="search"></div></td>
        <td><div id="inbox"></div></td>
        <td><div id="graph"></div></td>
      </tr>
    </table>

    @body
  </body>
</html>
{% endhighlight %}

The key changes to notice from the original template are:

1. The `div` elements for each piece of data are just empty placeholders. They 
   will be filled in incrementally by pagelets as they arrive from the server.
2. The template takes an `HtmlStream` called `body` as a parameter and inserts 
   it at the bottom of the page. This is where all the pagelets will actually 
   stream in.
3. The `big-pipe.js` JavaScript file is included in the `head`. `big-pipe.js` 
   takes care of rendering each pagelet when it arrives in the browser.

Now, let's look at the controller you can use with this template:

{% highlight scala %}
class WithBigPipe(client: FakeServiceClient) extends Controller {
  def index = Action {
    // Make several fake service calls in parallel to represent 
    // fetching data from remote backends. Some of the calls will 
    // be fast, some medium, and some slow.
    val profileFuture = client.fakeRemoteCallMedium("profile")
    val graphFuture = client.fakeRemoteCallMedium("graph")
    val feedFuture = client.fakeRemoteCallSlow("feed")
    val inboxFuture = client.fakeRemoteCallSlow("inbox")
    val adsFuture = client.fakeRemoteCallFast("ads")
    val searchFuture = client.fakeRemoteCallFast("search")

    // Convert each Future into a Pagelet
    val profile = pagelet(profileFuture, "profile")
    val graph = pagelet(graphFuture, "graph")
    val feed = pagelet(feedFuture, "feed")
    val inbox = pagelet(inboxFuture, "inbox")
    val ads = pagelet(adsFuture, "ads")
    val search = pagelet(searchFuture, "search")

    // Compose all the pagelets into an HtmlStream
    val body = HtmlStream.fromInterleavedPagelets(
      profile, graph, feed, inbox, ads, search)

    // Render the streaming template immediately
    Ok.chunked(views.stream.withBigPipe(body))
  }

  // Render the data in the Future using the "module" template and 
  // wrap it in a Pagelet
  private def pagelet(f: Future[Response], id: String): Pagelet = {
    Pagelet.fromHtmlFuture(
      f.map(views.html.helpers.module.apply), id)
  }
}
{% endhighlight %}

The key changes to notice from the original controller are:

1. Instead of waiting for *all* of the service calls to redeem, you render each 
   one individually into `Html` as soon as the data is available, giving you a 
   `Future[Html]`.
2. Each `Future[Html]`, plus the DOM id of the placeholder where it should be 
   inserted, is wrapped in a `Pagelet` object.  
3. The `Pagelet` objects are interleaved into an `HtmlStream` so that they can 
   be sent down to the browser in whatever order they redeem.

When you load this page, you will see the outline of the page almost 
immediately, and each pagelet will fill in this outline as soon as the 
corresponding remote service responds.

## More info

The ping-play project started as the sample app for one of my talks (you can 
find the [slides here](http://www.slideshare.net/brikis98/composable-and-streamable-play-apps)): 

{% include iframe.html url="//www.youtube.com/embed/4b1XLka0UIw" %}

I only recently had a chance to turn the code in the sample app into a reusable
library, complete with tests and documentation. It's still in the alpha stage,
but I'd love to get your feedback, bug reports, and pull requests in the
[ping-play GitHub repo]({{ page.repo_url }}). And if you end up using ping-play in
production, I'd love to hear about your experiences, so send me an 
[email]({{ site.contact_urls.email.url }})!




