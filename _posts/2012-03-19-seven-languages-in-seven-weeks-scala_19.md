---
layout: post
title: 'Seven Languages in Seven Weeks&#58; Scala, Day 2'
date: '2012-03-19T00:40:00.003-07:00'
author: Yevgeniy Brikman
tags:
- Seven Languages in Seven Weeks
modified_time: '2012-04-02T00:35:44.935-07:00'
blogger_id: tag:blogger.com,1999:blog-5422014336627804072.post-5121284092427066113
blogger_orig_url: http://brikis98.blogspot.com/2012/03/seven-languages-in-seven-weeks-scala_19.html
thumbnail_path: blog/seven-languages/book-cover.jpg
---

After a bumpy start with [Scala on Day 
1](https://www.ybrikman.com/writing/2012/03/18/seven-languages-in-seven-weeks-scala/), 
I've moved onto the second day of Scala in [Seven Languages in Seven 
Weeks](https://www.ybrikman.com/writing/tags/#Seven%20Languages%20in%20Seven%20Weeks). 

## Scala, Day 2: Thoughts 

The second Scala chapter shifts gears to functional programming. 
Unfortunately, I was impatient on Day 1 and had already looked up all of these 
concepts (and some more) to build a [Tic Tac Toe 
game](https://gist.github.com/2069380#file_tic_tac_toe.scala). As a result, I 
breezed through the chapter. 

On a side note, I was using Scala on a personal project and rewrote some Java 
code using Scala. As much as I complained yesterday about Scala's complexity, 
the slow compiler, and poor IDE support, I must admit one thing: the resulting 
code was *noticeably* cleaner, shorter, and easier to read. 

The language is certainly not perfect, but I need to make sure I'm not missing 
the forrest for the trees: it's still likely a vastly superior alternative to 
Java. 

## Scala, Day 2: Problems 

The functional programming problems in this chapter were extremely simple. I 
burned through them in a few minutes and present the code without further 
comment: 

### String foldLeft 

Use `foldLeft` to compute the total size of a List of Strings. 

{% highlight scala %}
val list = List("foo", "bar", "blah")
val totalLength = list.foldLeft(0)(_ + _.length)
println("The total length of " + list + " is " + totalLength)
{% endhighlight %}

### Censorship 

Write a `Censor` trait with a method that will replace "curse" words with 
"clean" alternatives. Read the curse words and alternatives from a file and 
store them in a Map. 

{% highlight scala %}
import collection.mutable.HashMap
 
trait Censor {
  val curseWords = new HashMap[String, String]()
 
  io.Source.fromFile("censor.txt").getLines().foreach { (line) =>
    val parts = line.split(": ")
    curseWords += parts(0) -> parts(1)
  }
 
  def censor(s: String) = curseWords.foldLeft(s)((prev, curr) => prev.replaceAll(curr._1, curr._2))
}
 
class Text(s: String) extends Censor {
  def value = s
 
  def censoredValue = censor(s)
}
 
val text = new Text("Shoot, I forgot my Darn traits again")
println("Original String: " + text.value)
println("Censored String: " + text.censoredValue)
{% endhighlight %}

Output:

{% highlight text %}
Shoot: Pucky
Darn: Beans
{% endhighlight %}

## On to day 3 

Learn about pattern matching and actors in [Scala, Day 
3](https://www.ybrikman.com/writing/2012/04/02/seven-languages-in-seven-weeks-scala/). 