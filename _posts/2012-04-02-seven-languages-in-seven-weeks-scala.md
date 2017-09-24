---
layout: post
title: 'Seven Languages in Seven Weeks&#58; Scala, Day 3'
date: '2012-04-02T00:33:00.000-07:00'
author: Yevgeniy Brikman
tags:
- Seven Languages in Seven Weeks
modified_time: '2012-11-04T18:58:24.492-08:00'
thumbnail: http://3.bp.blogspot.com/-bxGA8Izcc9k/T3lPptpD7HI/AAAAAAAAKmI/HGYWUo1piv4/s72-c/googleproduct.jpg
blogger_id: tag:blogger.com,1999:blog-5422014336627804072.post-3718526112325970709
blogger_orig_url: http://brikis98.blogspot.com/2012/04/seven-languages-in-seven-weeks-scala.html
thumbnail_path: blog/seven-languages/book-cover.jpg
---

After some functional programming on [day 
two](https://www.ybrikman.com/writing/2012/03/19/seven-languages-in-seven-weeks-scala_19/), 
it's time for the third and final day of Scala in [Seven Languages in Seven 
Weeks](https://www.ybrikman.com/writing/tags/#Seven%20Languages%20in%20Seven%20Weeks). 

## Scala, Day 3: Thoughts 

After two lengthy chapters on the object oriented and functional programming 
syntax/options in Scala, the third day rushes through some of the most 
intriguing features, including pattern matching and concurrency via actors. I 
would have preferred to spend a bit more time on these complicated topics. 

In fact, I had the same complaint on [Day 3 of 
IO](https://www.ybrikman.com/writing/2012/02/07/seven-languages-in-seven-weeks-io-day-3/), 
where we also blasted through a discussion of concurrency in just a few pages. 
I respect the difficulties of plowing through seven different languages in a 
single book and don't expect deep discussions of any one of them, but I think 
the book would've been stronger if it had a greater bias towards the more 
advanced "day 3" topics of each language instead of basic syntax discussions 
in day 1 or 2. 

## Scala, Day 3: Problems 

### Extend the "sizer" application to count and size links 

Take the sizer application 
([code](https://gist.github.com/2278236#file_sizer.scala), 
[output](https://gist.github.com/2278236#file_sizer_output.txt)) and add a 
message to count the number of links on a page. Follow these links and 
calculate their size as well, so you get the total size for each page. 

The code: 

{% highlight scala %}
import io.Source
import scala.actors.Actor._
 
// Regex to pick up external links; very simplified, so it'll miss some
val linkRegex = "(?i)<a.+?href=\"(http.+?)\".*?>(.+?)</a>".r
 
object PageLoader {
  def load(url: String) = {
    try {
      Source.fromURL(url).mkString
    } catch {
      case e: Exception => System.err.println(e)
      ""
    }
  }
 
  def getPageSize(url: String) = load(url).length
 
  def getPageSizeAndLinks(url: String) = {
    val content = load(url)
    val links = linkRegex.findAllIn(content).matchData.toList.map(_.group(1))
    (content.length, links)
  }
}
 
val urls = List("http://duckduckgo.com/",
                "http://www.bing.com",
                "http://www.google.com",
                "http://www.wolframalpha.com/")
 
 
def timeMethod(method: () => Unit) {
  val start = System.nanoTime
  method()
  val end = System.nanoTime
  println("Method took " + (end - start)/1000000000.0 + " seconds.")
}
 
def sequential() {
  for (url <- urls) {
    val (size, links) = PageLoader.getPageSizeAndLinks(url)
    val totalSize = crawlLinks(size, links)
    printOutput(url, size, links, totalSize)
  }
}
 
def crawlLinks(size: Int, links: List[String]): Int = links match {
  case Nil => size
  case head :: tail => crawlLinks(size + PageLoader.getPageSize(head), tail)  
} 
 
def printOutput(url: String, size: Int, links: List[String], totalSize: Int) {
  println(url + ": size = " + size + ", links = " + links.length + ", total size = " + totalSize)
}
 
def concurrent() {
  val caller = self
 
  urls.foreach { url =>
    actor {
      val (size, links) = PageLoader.getPageSizeAndLinks(url)
      val linkCollectorActor = self
 
      links.foreach(link => actor { linkCollectorActor ! PageLoader.getPageSize(link) })
 
      var totalSize = size
      for (i <- 1 to links.length) {
        receive { case linkSize: Int => totalSize += linkSize }
      }
      
      caller ! (url,  size, links, totalSize)
    }
  }  
  
  for (i <- 1 to urls.length) {    
    receive {
      case (url: String, size: Int, links: List[String], totalSize: Int) => printOutput(url, size, links, totalSize)
    }
  }
}
 
println("Sequential run:")
timeMethod(sequential)
 
println("Concurrent run:")
timeMethod(concurrent)
{% endhighlight %}


The output: 

{% highlight text %}
Sequential run:
http://duckduckgo.com/: size = 4547, links = 1, total size = 22326
http://www.bing.com: size = 31932, links = 15, total size = 746931
http://www.google.com: size = 11358, links = 10, total size = 1153942
http://www.wolframalpha.com/: size = 22476, links = 7, total size = 202468
Method took 19.802951 seconds.
Concurrent run:
http://www.google.com: size = 11370, links = 10, total size = 1152555
http://duckduckgo.com/: size = 4547, links = 1, total size = 22326
http://www.bing.com: size = 31932, links = 15, total size = 746230
http://www.wolframalpha.com/: size = 22454, links = 7, total size = 202446
Method took 2.745976 seconds.
{% endhighlight %}

This problem was a great way to experiment with actors in Scala. The 
sequential solution is self explanatory, so here's an outline of the 
concurrent one: 

1. The `caller` creates `B` `Base Actors`, one for each of the `B` base URLs. 
1. The `caller` then calls `receive` to await a message from each `Base 
Actor`. 
1. Each `Base Actor` concurrently loads its base URL, finds the links on the 
page, and creates `L` `Link Actors`, one for each of the `L` links on the page. 
1. The `Base Actor` then calls `receive` to await a message from each of its 
`Link Actors`. 
1. Each `Link Actor` concurrently loads the page for its given link and sends 
a message to its parent `Base Actor` with the size of that page. 
1. When the `Base Actor` has received a message form each of his `Link 
Actors`, it sends a message to the `caller` with the total size. 
1. When the `caller` has received `B` messages from the `Base Actors`, we are 
done. 

The sequential code takes nearly 20 seconds to run while the concurrent code 
takes less than 3 seconds, a 7x improvement. The concurrent code is definitely 
more complicated, but not unreasonably so. Even though it was my first time 
using Scala actors, the code took less than 30 minutes to get working, much of 
it spent learning about the *self* keyword. In fact, I find it very easy to 
reason about Scala's actors, which is not something I can say for Java's 
`synchronized` keyword, `Executors`, `Runnable`, and various other concurrency 
constructs. 

## Wrapping up Scala

I'm a bit torn when it comes to Scala. Most of the time, I saw it as a 
vastly improved version of Java. The support for closures, functional 
programming, pattern matching, and actors all seem like genuinely useful tools 
that would *dramatically* improve productivity, code readability, correctness, 
and expressiveness. I've already used Scala in a few of my projects to build 
some features that would've been nearly impossible or incredibly ugly in Java. 
 
However, even in my limited exposure to Scala, I've already come across a 
number of hiccups. As I mentioned on [day 
1](https://www.ybrikman.com/writing/2012/03/18/seven-languages-in-seven-weeks-scala/), 
the API docs are not helpful and look like they are written for academics. The 
IDE support is vastly inferior compared to Java. I've now tried both Eclipse 
and IntelliJ, and each one has significant problems: e.g. missing compile 
errors on some code; finding errors on other code that's actually valid; 
broken/missing auto complete; issues with the refactor/rename functionality; 
poor support for running scripts. The compiler is slow. The type hierarchies 
are complicated. Type inference doesn't always work as well as you'd hope.  
 
However, there is one issue that worries me above all else: feature 
overload. It seems like Scala is trying to be all things to all people. It's 
object oriented; it's functional; it has type inference; it has lots of 
syntactic sugar; it has actors; it's compatible with Java; it has first class 
support for XML; they are even trying to add 
[macros](http://scalamacros.org/). While all of these features could lead to 
an incredibly powerful language, they could also lead to one that's incredibly 
complicated and difficult to use.

{% include figure.html path="blog/seven-languages/product-complexity.jpg" alt="Product complexity" %}

User experience counts. Not only for products, but for programming languages 
too. 

How many features can you pile into one language before it becomes too 
cumbersome? How much [syntax 
sugar](http://stackoverflow.com/questions/2662984/what-are-all-the-instances-of-syntactic-sugar-in-scala) 
do you need to understand to be able to read or write code? How many paradigms 
and mental models do I need to juggle to follow along? Do so many options make 
a language more flexible or less? Will there be such a thing as "idiomatic 
Scala" or will it be a free-for-all? Is it better to have a dozen ways to do 
something or one "proper" and well known way? 

I don't know the answers to these questions, but I suspect they'll have a 
large impact on Scala's adoption. In the meantime, I'll keep hacking away at 
it to see what I can learn. 

## On to Erlang 

Read on to learn about the next language in the book, 
[Erlang](https://www.ybrikman.com/writing/2012/11/04/seven-languages-in-seven-weeks-erlang/). 