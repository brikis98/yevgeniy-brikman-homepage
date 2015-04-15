---
layout: post
title: 10 recipes for turning imperative Java code into functional Scala code
date: '2013-05-31T14:52:00.001-07:00'
author: Yevgeniy Brikman
tags:
- Software Engineering
modified_time: '2013-06-01T18:45:18.524-07:00'
thumbnail_path: blog/scala-recipes/scala-logo.png
blogger_id: tag:blogger.com,1999:blog-5422014336627804072.post-7191719948429771684
blogger_orig_url: http://brikis98.blogspot.com/2013/05/10-recipes-for-turning-imperative-java.html
---

At LinkedIn, [we've started to use the Play 
Framework](http://engineering.linkedin.com/play/play-framework-linkedin), 
which supports not only Java, but also Scala. Many teams have opted to write 
their apps in Scala, so I've spent a fair amount of time helping team members 
learn the language. 

{% include figure.html path="blog/scala-recipes/scala-logo.png" alt="Scala logo" %}

Most LinkedIn engineers are proficient in Java, so their early Scala code 
looks like a literal translation from Java to Scala: lots of for-loops, 
mutable variables, mutable collection classes, null values, and so on. While 
this code *works*, it's not taking advantage of one of Scala's biggest 
strengths: strong support for functional programming. 

In this post, I want to share 10 recipes for how to translate a few of the 
most common imperative Java patterns into functional Scala code. 

## Why functional programming? 

Why would you want to make your code "functional"? This question has been 
asked and answered many times, so rather than recreating the answers myself, 
I'll point you to a couple good starting points: 

1. [Why Functional Programming 
Matters](http://www.cs.kent.ac.uk/people/staff/dat/miranda/whyfp90.pdf) by 
John Hughes 
1. [Functional Programs Rarely 
Rot](http://michaelochurch.wordpress.com/2012/12/06/functional-programs-rarely-rot/) 
by Michael O. Church 

It's worth mentioning that Scala is *not* a pure functional language, but it 
is still worth trying to make as much of your code as possible out of (a) 
small functions that (b) use only immutable state and (c) are side effect 
free. If you do that, I believe your code will generally be easier to read, 
reason about, and test. 

Now, on to the cookbook! 

## Recipe 1: building a list 

Let's start easy: we want to loop over a List of data, process each item in 
some way, and store the results in a new List. Here is the standard way to do 
this in Java: 

{% highlight java %}
List<String> processList(List<String> list) {
  List<String> out = new ArrayList<String>();
  
  for (String item: list) {
    out.add(doSomeProcessing(item));
  }  
  
  return out;
}
{% endhighlight %}

It's possible to translate this verbatim into Scala by using a `mutable.List` and a 
for-loop, but there is no need to use mutable data here. In fact, there is 
*very rarely* a reason to use mutable variables in Scala; think of it as a 
code smell. 

Instead, we can use the `map` method, which creates a new List by taking a 
function as a parameter and calling that function once for each item in the 
original List (see: [map and flatMap in 
Scala](http://www.brunton-spall.co.uk/post/2011/12/02/map-map-and-flatmap-in-scala/) 
for more info): 

{% highlight scala %}
def processList(list: List[String]): List[String] = {
  list.map { item =>
    doSomeProcessing(item)
  }
}
{% endhighlight %}

## Recipe 2: aggregating a list 

Let's make things a little more interesting: we again have a List of data to 
process, but now we need to calculate some stats on each item in the list and 
add them all up. Here is the normal Java approach: 

{% highlight java %}
Integer calculateTotalStats(List<StatsObject> list) {
  int total = 0;
  
  for (StatsObject item: list) {
    total += calculateStats(item);
  }  
  
  return total;
}
{% endhighlight %}

Can this be done without a mutable variable? Yup. All you need to do is use  the 
`foldLeft` method (read more about it 
[here](http://oldfashionedsoftware.com/2009/07/30/lots-and-lots-of-foldleft-examples/)). 
This method has two parameter lists (Scala's version of 
[currying](http://www.scala-lang.org/node/135)): the first takes an `initial` 
value and the second takes a function. `foldLeft` will iterate over the contents 
of your List and call the passed in function with two parameters: the 
accumulated value so far (which will be set to `initial` value on the first 
iteration) and the current item in the List. 

Here is the exact same `calculateTotalStats` written as a pure Scala function 
with only immutable variables: 

{% highlight scala %}
def calculateTotalStats(list: List[StatsObject]): Int = {
  list.foldLeft(0) { (totalSoFar, item) =>
    totalSoFar + calculateStats(item)
  }
}
{% endhighlight %}

## Recipe 3: aggregating multiple items 

OK, perhaps you can do some simple aggregation with only immutable variables, 
but what if you need to calculate multiple items from the List? And what if 
the calculations were conditional? Here is a typical Java solution: 

{% highlight java %}
CalculatedStats calculateStats(List<StatsObject> list) {
  CalculatedStats stats = new CalculatedStats();
  
  for (StatsObject item: list) {
    if (item.id.equals("foo")) {
      stats.statsA.add(calcA(item));
    } else if (item.id.equals("bar")) {
      stats.statsB.add(calcB(item));
    } else if (item.id.equals("baz")) {
      stats.statsC.add(calcC(item));
    }
  }  
  
  return stats;
}
 
class CalculatedStats {
  // In idiomatic Java, these fields would usually 
  // be private and have getters and setters
  List<Integer> statsA = new ArrayList<Integer>();
  List<Integer> statsB = new ArrayList<Integer>();  
  List<Integer> statsC = new ArrayList<Integer>();
}
{% endhighlight %}

Can this be done in an immutable way? Absolutely. We can use `foldLeft` again, 
combined with [pattern matching](http://www.scala-lang.org/node/120) and a [case 
class](http://www.scala-lang.org/node/107) (case classes give you [lots of 
nice freebies](http://www.scala-lang.org/node/258)) to create an elegant, 
safe, and easy to read solution: 

{% highlight scala %}
def calculateStats(list: List[StatsObject]): CalculatedStats = {
  list.foldLeft(CalculatedStats()) { (acc, item) =>
    item match {
      case "foo" => acc.copy(statsA = acc.statsA + calcA(item))
      case "bar" => acc.copy(statsB = acc.statsB + calcB(item))
      case "baz" => acc.copy(statsC = acc.statsC + calcC(item))
      case _ => acc
    }
  }
}
 
case class CalculatedStats(
  statsA: List[Int] = List(), 
  statsB: List[Int] = List(), 
  statsC: List[Int] = List()
)
{% endhighlight %}

## Recipe 4: lazy search 

Imagine you have a List of values and you need to transform each value and 
find the first one that matches some condition. The catch is that transforming 
the data is expensive, so you don't want to transform any more values than you 
have to. Here is the Java way of doing this: 

{% highlight java %}
SomeOtherObject findFirstMatch(List<SomeObject> list) {
  for (SomeObject obj: list) {
    SomeOtherObject transformed = doExpensiveTransformation(obj);
    if (transformed.someCondition()) {
      return transformed;
    }
  }
  
  return null;
}
{% endhighlight %}

The normal Scala pattern for doing this would be to use the `map` method to 
transform the elements of the list and then call the `find` method to find the 
first one that matches the condition. However, the `map` method would transform 
*all* the elements, which would be wasteful if one of the earlier ones is a match. 

Fortunately, Scala supports 
[Views](http://www.scala-lang.org/api/current/index.html#scala.collection.SeqView), 
which are collections that lazily evaluate their contents. That is, none of 
the values or transformations you apply to a `View` actually take place until 
you try to access one of the values within the `View`. Therefore, we can 
convert our List to a `View`, call `map` on it with the transformation, and 
then call `find`. Only as the `find` method accesses each item of the `View` 
will the transformation actually occur, so this is exactly the kind of lazy 
search we want: 

{% highlight scala %} 
def findFirstMatch(list: List[SomeObject]): Option[SomeOtherObject] = {
  val transformed = list.view.map(doExpensiveTransformation)
  transformed.find(_.someCondition())
}
{% endhighlight %}

Note that we return an `Option[SomeOtherObject]` instead of `null`. Take a look 
at Recipe 7 for more info. 

## Recipe 5: lazy values 

What do you do if you want a value to be initialized only when it is first 
accessed? For example, what if you have a singleton that is expensive to 
instantiate, so you only want to do it if someone actually uses it? One way to 
do this in Java is to use `volatile` and `synchronized`: 

{% highlight java %}
class FooSingleton {
 
  private FooSingleton() {
    // Some expensive initialization code
  }
  
  private static volatile FooSingleton instance;
 
  public static Singleton getInstance() {
    if (instance == null) {
      synchronized (Singleton.class) {
        if (instance == null) {
         instance == new Singleton();
        }          
      }
    }
    return instance;
  }
}
{% endhighlight %}

Scala has support for the `lazy` keyword, which will initialize the variable only when 
it is first accessed. Under the hood, it does something similar to 
`synchronized` and `volatile`, but the code written by the developer is easier 
to read: 

{% highlight scala %}
private class FooSingleton {
  // Some expensive initialization code
}
 
object FooSingleton {
  private lazy val instance = new FooSingleton
  
  def getInstance = instance
}
{% endhighlight %}

## Recipe 6: lazy parameters 

If you've ever worked with a logging library like 
[log4j](http://logging.apache.org/log4j/2.x/), you've probably seen Java code 
like this: 

{% highlight java %}
if (logger.isDebugEnabled()) {
  logger.debug("Diagnostics: " + getExpensiveDiagnosticsInfo());
}
{% endhighlight %}

The logging statement is wrapped with an `isDebugEnabled` check to ensure that we 
don't calculate the expensive diagnostics info if the debug logging is 
actually disabled. 

In Scala, you can define lazy function parameters that are only evaluated when 
accessed. For example, the logger debug method could be defined as follows in 
Scala (note the `=>` in the type signature of the `message` parameter): 

{% highlight scala %}
class Logger {
  def debug(message: => String) {
    if (isDebugEnabled) {
      doDebug(message) // message is only evaluated if we get here
    }
  } 
}
{% endhighlight %}

This means the logging statements in my code no longer need to be wrapped in if-checks 
even if the data being logged is costly to calculate, since it'll only be 
calculated if that logging level is actually enabled: 

{% highlight scala %}
logger.debug("Diagnostics: " + getExpensiveDiagnosticsInfo)
{% endhighlight %}

## Recipe 7: null checks 

A common pattern in Java is to check that a variable is not `null` before using 
it: 

{% highlight java %}
String buildSentence(String name) {
  String sentence = "Hello";
  
  if (name != null) {
    sentence += " " + name;
  }
  
  return sentence;
}
{% endhighlight %}

If you're working purely in Scala, and have a variable that might not have a 
value, you should not set it to `null`. In fact, think of `nulls` in Scala as a 
code smell. 

The better way to handle this situation is to specify the type of the object 
as an [Option](http://www.scala-lang.org/api/current/index.html#scala.Option). 
`Option` has two subclasses: 
[Some](http://www.scala-lang.org/api/current/index.html#scala.Some), which 
contains a value, and 
[None](http://www.scala-lang.org/api/current/index.html#scala.None$), which 
does not. This forces the programmer to explicitly acknowledge that the value 
could be `None`, instead of sometimes forgetting to check and stumbling on a 
`NullPointerException`. 

You could use the `isDefined` or `isEmpty` methods with an `Option` class, but 
pattern matching is usually cleaner: 

{% highlight scala %}
def buildSentence(nameOpt: Option[String]): String = {
  val hello = "Hello"
  nameOpt match {
    case Some(name) => hello + " " + name
    case _ => hello
  }
}
{% endhighlight %}

The `Option` class also supports methods like `map`, `flatMap`, and `filter`, 
so you can safely transform the value that may or may not be inside of an 
`Option`. Finally, there is a `getOrElse` method which returns the value 
inside the `Option` if the `Option` is a `Some` and returns the specified 
fallback value if the `Option` is a `None`: 

{% highlight scala %}
def buildSentence(nameOpt: Option[String]): String = {
  val hello = "Hello"
  val sentenceOpt = nameOpt.map(name => hello + " " + name)
  sentenceOpt.getOrElse(hello)
}
{% endhighlight %}

Of course, you rarely live in a nice, walled off, pure-Scala garden - 
especially when working with Java libraries - so sometimes you'll get a 
variable passed to you that isn't an `Option` but could still be `null`. 
Fortunately, it's easy to wrap it in an `Option` and re-use the code above: 

{% highlight scala %}
def buildSentence(maybeName: String): String = {
  val nameOpt = Option(maybeName)
  val hello = "Hello"
  val sentenceOpt = nameOpt.map(name => hello + " " + name)
  sentenceOpt.getOrElse(hello)
}
{% endhighlight %}

## Recipe 8: multiple null checks 

What if you have to walk an object tree and check for null or empty at each 
stage? In Java, this can get pretty messy: 

{% highlight java %}
String getDegree(Profile profile) {
  if (profile != null) {
    List<Education> educations = profile.getEducations();
    if (educations != null && !educations.isEmpty()) {
      Education education = educations.get(0);
      List<Degree> degrees = education.getDegrees();
      if (degrees != null && !degrees.isEmpty()) {
        Degree degree = degrees.get(0);
        if (degree.getName() != null && !degree.isEmpty()) {
          return "Degree: " + degree.getName();
        }
      }
    }
  }
  
  return null;
}
{% endhighlight %}

With Scala, you can take advantage of a [sequence 
comprehension](http://www.scala-lang.org/node/111) and 
[Option](http://www.scala-lang.org/api/current/index.html#scala.Option) to 
accomplish the exact same checks with far less nesting: 

{% highlight scala %}
def getDegree(maybeProfile: Profile): Option[String] = {
  val degreeOpt = for {
    profile <- Option(maybeProfile)
    educations <- Option(profile.getEducations)
    education <- educations.headOption
    degrees <- Option(education.getDegrees)
    degree <- degrees.headOption
    name <- Option(degree) if !name.isEmpty
  } yield {
    "Degree: " + degree
  }
}
{% endhighlight %}

## Recipe 9: instanceof and casting 

In Java, you sometimes need to figure out what kind of class you're dealing 
with. This involves some `instanceof` checks and casting: 

{% highlight java %}
String toPrettyString(Transport transport) {
  if (transport instanceof Car) {
    Car car = (Car) transport;
    return car.make + " " + car.model;
  } else if (transport instanceof Airplane) {
    Airplane airplane = (Airplane) transport;
    return airplane.name + ", speed: " + airplane.speed;
  } else if (transport instanceof Train) {
    Train train = (Train) transport;
    return "A train with " + train.cars + " cars";
  } else {
    return "Unrecgonized type of transport";
  }
}
 
interface Transport {}
 
class Car extends Transport {
  String make;
  String model;
}
 
class Airplane extends Transport {
  String name;
  int speed;
}
 
class Train extends Transport {
  int cars;
}
{% endhighlight %}

We can use [pattern matching](http://www.scala-lang.org/node/120) and [case 
classes](http://www.scala-lang.org/node/107) in Scala to make this code more 
readable, even though it does the same `instanceof` checks and casting under 
the hood: 

{% highlight scala %}
def toPrettyString(transport: Transport): String = {
  transport match {
    case Car(make, model) => make + " " + model
    case Airplane(name, speed) => name + ", speed: " + speed
    case Train(cars) => "A train with " + cars + " cars"
    case _ => "Unrecgonized type of transport"
  }
}
 
trait Transport
case class Car(make: String, model: String) extends Transport
case class Airplane(name: String, speed: Int) extends Transport
case class Train(cars: Int) extends Transport
{% endhighlight %}

## Recipe 10: regular expressions 

Let's say we want to match a String and extract some data from it using one of 
a few regular expressions. Here is the Java code for it: 

{% highlight java %}
Pattern nameTag = Pattern.compile("Hello, my name is (.+)");
Pattern list = Pattern.compile("Last: (.+). First: (.+).");
 
String extractName(String str) {
  Matcher nameTagMatcher = nameTag.matcher(str);
  if (nameTagMatcher.find()) {
    return nameTagMatcher.group(1);
  }
  
  Matcher listMatcher = list.matcher(str);
  if (listMatcher.find()) {
    return listMatcher.group(2) + " " + listMatcher.group(1);
  }
  
  return null;
}
{% endhighlight %}

In Scala, we can take advantage of [extractors](http://www.scala-lang.org/node/112), 
which are automatically created for regular expressions, and pattern matching 
using [partial 
functions](http://blog.bruchez.name/2011/10/scala-partial-functions-without-phd.html), 
to create a much more readable solution: 

{% highlight scala %}
val NameTag = "Hello, my name is (.+)".r
val List = "Last: (.+). First: (.+).".r
 
def extractName(str: String): Option[String] = {
  Option(str).collectFirst {
    case NameTag(name) => name
    case List(lname, fname) => fname + " " + lname
  }
}
{% endhighlight %}

## Got some recipes of your own?

I hope this post has been helpful. It's worth noting that the recipes above 
are only one of many ways to translate the code; for example, many of the List 
examples could have also been done with recursion. 

If you've got suggestions on how to make the examples above even better or 
have some handy recipes of your own, leave a comment! 