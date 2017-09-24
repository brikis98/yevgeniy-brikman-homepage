---
layout: post
title: 'Seven Languages in Seven Weeks&#58; Scala, Day 1'
date: '2012-03-18T00:50:00.000-07:00'
author: Yevgeniy Brikman
tags:
- Seven Languages in Seven Weeks
modified_time: '2012-03-19T00:43:31.993-07:00'
blogger_id: tag:blogger.com,1999:blog-5422014336627804072.post-2014322375568438023
blogger_orig_url: http://brikis98.blogspot.com/2012/03/seven-languages-in-seven-weeks-scala.html
thumbnail_path: blog/seven-languages/book-cover.jpg
---

It's time for a new chapter in the [Seven Languages in Seven 
Weeks](https://www.ybrikman.com/writing/tags/#Seven%20Languages%20in%20Seven%20Weeks) 
series: today, I take a crack at [Scala](http://www.scala-lang.org/). 

## Scala, Day 1: Thoughts

After using Java for years, I was curious to try out Scala, which has often 
been described as the next step in the evolution of Java. Scala's feature list 
is impressive: object oriented, functional, type inferencing, traits/mixins, 
currying, pattern matching, concise syntax, interoperability with Java code, 
an active community, and so on. My previous experiences with Scala had been 
very shallow/short, so I was excited to take a slightly deeper dive. 

The first chapter introduced the imperative and object-oriented features of 
Scala and walked through the basic syntax. On the surface, the language looks 
like Java and uses many of the same keywords, so I was able to jump right in. 
However, I was quickly slowed down by some unexpected differences, including 
types specified *after* the variable name instead of before, "static" methods 
and fields separated into "companion classes" (confusingly named "objects"), 
and methods definitions sometimes including or omitting an equals sign and or 
parentheses depending on whether they return values or take parameters as 
inputs. 

I slowed down even more once I started looking at the functional programming 
concepts and, worst of all,  trying to make sense of the [API 
docs](http://www.scala-lang.org/api/current/index.html#package). Although they 
look thorough, the docs are astonishingly bad when you actually try to use 
them. For example, here is all the documentation provided for the "reduce" 
method of Scala's 
[List](http://www.scala-lang.org/api/current/scala/collection/immutable/List.html): 

{% highlight text %}
def reduce [A1 >: A] (op: (A1, A1) ⇒ A1): A1

Reduces the elements of this sequence using the specified associative binary 
operator.

The order in which operations are performed on elements is unspecified and may 
be nondeterministic.

Note this method has a different signature than the reduceLeft and reduceRight 
methods of the trait Traversable. The result of reducing may only be a 
supertype of this parallel collection's type parameter T.
{% endhighlight %}

If you're new to Scala's syntax, functional programming, or just a hacker 
trying to get something done, this sort of documentation is almost useless. 
Plain, human English or an example would be an order of magnitude more useful. 
The reduce concept isn't actually that hard to understand, but parsing the 
dense syntax of the method signature and phrases like "associative binary 
operator" makes it seem like a PhD is necessary to use this language. Compare 
this to the reduce documentation for 
[Ruby](http://www.ruby-doc.org/core-1.9.3/Enumerable.html#method-i-reduce) and 
[underscore.js](http://documentcloud.github.com/underscore/#reduce) to see a 
world of a difference. 

The type hierarchy also proved tough to navigate. For example, how do I find 
the closest common ancestor between 
[List](http://www.scala-lang.org/api/current/scala/collection/immutable/List.html) 
and 
[MutableList](http://www.scala-lang.org/api/current/scala/collection/mutable/MutableList.html)? 
I thought it might be LinearSeq, but there seem to be separate mutable and 
immutable versions of it. Other classes/traits further up the hierarchy 
overlap, but are missing common methods I need, such as "collect" or 
"foldLeft". Overall, this basic search was much harder than, for example, 
finding the common ancestor between Java libraries like 
[ArrayList](http://docs.oracle.com/javase/6/docs/api/java/util/ArrayList.html) 
and [Vector](http://docs.oracle.com/javase/6/docs/api/java/util/Vector.html): 
a glance at the top of the API doc and you're done. 

I also ran into difficulties with type inferencing. It definitely saved me 
some typing and looked beautiful for simple cases and closure parameters. 
However, type inference couldn't handle many cases that seemed obvious. This 
was compounded by the sub-par IDE support, at least from IntelliJ 11, which 
took a while to get working in the first place. I routinely found code that 
IntelliJ accepted wouldn't actually compile. Oh, and the compiler is *slow*. 
Ridiculously slow, given the tiny snippets of code I was testing. 

Having said that, I'm still a newbie to the language, and shouldn't complain 
too much. I'm sure I'll get used to the code, API, and Scala idioms. Still, 
there is value in being "hacker friendly": one of the reasons Ruby, PHP, and 
JavaScript have such huge user bases is because you can get started with them 
in *minutes*. And there's also something to say about complexity: Scala has *a 
lot* of features, syntax, and complicated concepts. I hope that these make the 
language more powerful and expressive rather than bloated and 
incomprehensible. 

## Scala, Day 1: Problems 

### Build a two player Tic Tac Toe Game 

The code: 

{% highlight scala %}
import collection.mutable.MutableList
 
object Marker extends Enumeration {
  type Marker = Value
  val EMPTY = Value("_")
  val X = Value("x")
  val O = Value("o")
}
 
import Marker._
 
class Board(boardSize: Int) {
 
  val board = MutableList.fill(boardSize * boardSize)(EMPTY)
 
  def spacer(value: String) = " " * (boardSize.toString.length() - value.length() + 2)
 
  override def toString = printBoard ((marker, index) => marker.toString)
 
  def printMoves() = printBoard ((marker, index) => if (marker == EMPTY) index.toString else EMPTY.toString)
 
  def printBoard(printMarker: (Marker, Int) => String): String = board.zipWithIndex.foldLeft(""){(acc, marker) =>
    val printedMarker = printMarker(marker._1, marker._2) 
    acc + (if (marker._2 > 0 && marker._2 % boardSize == 0) "\n" else "") + printedMarker + spacer(printedMarker)
  }
 
  def placeMarker(index: Int, marker: Marker): Boolean = {
    if (index >= 0 && index < board.length && board(index) == EMPTY) {
      board(index) = marker
      return true
    }
    
    false
  }
 
  def allEqual(elements: MutableList[Marker]) = !elements.contains(EMPTY) && elements.distinct.size == 1
 
  def anyListAllEqual(lists: TraversableOnce[MutableList[Marker]]): Boolean = lists.foldLeft(false)(_ || allEqual(_))
 
  def anyListAllEqual(lists: MutableList[MutableList[Marker]]): Boolean = anyListAllEqual(lists.toIterator)
 
  def rows() = board.grouped(boardSize)
 
  def cols() = board.zipWithIndex.groupBy(_._2 % boardSize).map(_._2.map(_._1))
 
  def diags() = MutableList(
    board.zipWithIndex.filter(_._2 % (boardSize + 1) == 0).map(_._1),
    board.zipWithIndex.filter(value => (value._2 % (boardSize - 1) == 0) && (value._2 > 0) && (value._2 < board.length - 1)).map(_._1)
  )
 
  def boardWon() = anyListAllEqual(rows()) || anyListAllEqual(cols()) || anyListAllEqual(diags())
  
  def boardFull() = board.count(_ == EMPTY) == 0
}
 
val board = new Board(3)
var currentMove = O
while (!board.boardFull() && !board.boardWon()) {
  currentMove = if (currentMove == X) O else X  
  println("\nThe board:\n")
  println(board)
  println("\nAvailable locations on the board:\n")
  println(board.printMoves())
  print("\nIt's " + currentMove + "'s turn! Enter a location: ")
 
  val index = Console.readInt()
  if (!board.placeMarker(index, currentMove)) {
    println("Invalid location!")    
  }
}
 
println()
 
if (board.boardWon()) {
  println("Player " + currentMove + " wins!")
} else {
  println("It's a draw!")
}
 
println()
println(board)
{% endhighlight %}

Sample output: 

{% highlight text %}
The board:
 
_  _  _  
_  _  _  
_  _  _  
 
Available locations on the board:
 
0  1  2  
3  4  5  
6  7  8  
 
It's x's turn! Enter a location: 4
 
The board:
 
_  _  _  
_  x  _  
_  _  _  
 
Available locations on the board:
 
0  1  2  
3  _  5  
6  7  8  
 
It's o's turn! Enter a location: 0
 
The board:
 
o  _  _  
_  x  _  
_  _  _  
 
Available locations on the board:
 
_  1  2  
3  _  5  
6  7  8  
 
It's x's turn! Enter a location: 6
 
The board:
 
o  _  _  
_  x  _  
x  _  _  
 
Available locations on the board:
 
_  1  2  
3  _  5  
_  7  8  
 
It's o's turn! Enter a location: 2
 
The board:
 
o  _  o  
_  x  _  
x  _  _  
 
Available locations on the board:
 
_  1  _  
3  _  5  
_  7  8  
 
It's x's turn! Enter a location: 1
 
The board:
 
o  x  o  
_  x  _  
x  _  _  
 
Available locations on the board:
 
_  _  _  
3  _  5  
_  7  8  
 
It's o's turn! Enter a location: 8
 
The board:
 
o  x  o  
_  x  _  
x  _  o  
 
Available locations on the board:
 
_  _  _  
3  _  5  
_  7  _  
 
It's x's turn! Enter a location: 5
 
The board:
 
o  x  o  
_  x  x  
x  _  o  
 
Available locations on the board:
 
_  _  _  
3  _  _  
_  7  _  
 
It's o's turn! Enter a location: 3
 
The board:
 
o  x  o  
o  x  x  
x  _  o  
 
Available locations on the board:
 
_  _  _  
_  _  _  
_  7  _  
 
It's x's turn! Enter a location: 7
 
Player x wins!
 
o  x  o  
o  x  x  
x  x  o 
{% endhighlight %}


I tried to keep the code fairly generic, so it should work for any NxN tic tac 
toe board. I also used this as an opportunity to play with some functional 
programming, so I intentionally stuffed everything into a List (albeit a 
mutable one), avoided for loops, too many objects, and so on. To be honest, 
I'm not thrilled with the result. 

I was able to use lots of one-liners, but many are hard to read. I got 
familiar with the fold, map, and filter methods, but in some cases, a for-loop 
would've been much cleaner (and faster). Overall, I just get the feeling that 
the code doesn't communicate its intent very well. I'd love some feedback from 
how a more seasoned Scala user would've tackled this problem. Would pattern 
matching be useful? Recursive calls on the head/tail of the List? Or is the 
imperative style with loops and a 2D array the best way to go? 

## On to day 2 

Continue on to [Scala, Day 
2](https://www.ybrikman.com/writing/2012/03/19/seven-languages-in-seven-weeks-scala_19/). 