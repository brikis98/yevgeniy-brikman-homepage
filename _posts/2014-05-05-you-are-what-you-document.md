---
layout: post
title: You are what you document
date: '2014-05-05T08:53:00.000-07:00'
author: Yevgeniy Brikman
tags:
- Software Engineering
modified_time: '2014-05-17T14:34:49.495-07:00'
thumbnail: http://3.bp.blogspot.com/-s2zNp8ocKJY/U2QnUdUSzUI/AAAAAAAASA4/EB2BVdNQIjc/s72-c/35788628.jpg
blogger_id: tag:blogger.com,1999:blog-5422014336627804072.post-6152165523247681343
blogger_orig_url: http://brikis98.blogspot.com/2014/05/you-are-what-you-document.html
---

<div class="separator" style="clear: both; text-align: center;">[<img 
border="0" 
src="http://3.bp.blogspot.com/-s2zNp8ocKJY/U2QnUdUSzUI/AAAAAAAASA4/EB2BVdNQIjc/s1600/35788628.jpg" 
height="229" width="320" 
/>](http://3.bp.blogspot.com/-s2zNp8ocKJY/U2QnUdUSzUI/AAAAAAAASA4/EB2BVdNQIjc/s1600/35788628.jpg) 
Hey, grab a seat - we need to talk about documentation. Now, I know what 
you're thinking: documentation is tedious, a chore, an afterthought, a 
redundant source of information given your beautiful, self-documenting code. 
It's just like a good diet and exercise - you'll do it when you have the time! 

Well, this blog post is an intervention. You're hurting others and you're 
hurting yourself. You poured countless hours into a project, but your 
co-workers won't use it. You tried to run it in production, but the OPs team 
won't support it. You put the project on Github, but the fools on Hacker News 
just don't see the brilliance of what you've done. 

[The number one cause of startup failure is not the product, but the 
distribution](http://blakemasters.com/post/22405055017/peter-thiels-cs183-startup-class-9-notes-essay): 
it doesn't matter how good the product is if no one uses it. With software, 
*the documentation is the distribution*: it doesn't matter how good the code 
is if no one uses it. [If it isn't documented, it doesn't 
exist](http://www.mikepope.com/blog/DisplayBlog.aspx?permalink=1680). 

<div class="separator" style="clear: both; text-align: center;">[<img 
border="0" 
src="http://4.bp.blogspot.com/-fEUB5ZWaTj8/U2Qp_9CmMEI/AAAAAAAASBE/MlhBV-uvF_Y/s1600/45420873.jpg" 
/>](http://4.bp.blogspot.com/-fEUB5ZWaTj8/U2Qp_9CmMEI/AAAAAAAASBE/MlhBV-uvF_Y/s1600/45420873.jpg) 
Think of this blog post as documentation for your documentation*.* By 
"documentation", I don't just mean a written manual, but all the pieces that 
go into making your software *learnable*: the coding practices, tutorials, 
white papers, marketing, the community, and the user experience. 

I'll be discussing three types of documentation: 
1. **Written documentation**: READMEs, tutorials, reference guides, white 
papers. 
1. **Code documentation**: API docs, comments, example code, the type system. 
1. **Community documentation**: blog posts, Q&amp;A sites, talks, meetup 
groups. 
Each type of documentation solves a different problem, so most projects should 
include some mix of all three types. I've tried to include links to open 
source projects that best demonstrate each of the different types of 
documentation. If you know of other great examples or other types of 
documentation that I've missed, please leave a comment. 

## <span style="font-size: x-large;">1. Written documentation 

Let's start with what people typically think of when they hear the word 
"documentation": READMEs, tutorials, reference guides, etc. 

## <span style="font-size: large;">1a. The README 

<div class="separator" style="clear: both; text-align: center;">[<img 
border="0" 
src="http://2.bp.blogspot.com/-H-XOTLWa-t4/U2Req8ocNEI/AAAAAAAASBs/ZY5U-hGM5MA/s1600/Screen+Shot+2014-05-02+at+8.12.30+PM.png" 
height="293" width="320" />](https://github.com/twitter/hogan.js)<div 
class="separator" style="clear: both; text-align: center;">Every project 
should have a README: it is the [single most important document in your 
codebase](http://tom.preston-werner.com/2010/08/23/readme-driven-development.html). 
The README is typically your first contact with a new user, so your goal is to 
introduce them to the project as quickly as possible, convince them why it's 
worth learning more, and give them pointers on how to get started and where to 
get more info. 

A typical README should have the following information: 
1. **Description**: short "sales pitch". Tell the reader why they should keep 
reading. 
1. **Quick examples**:** **short code snippets or screenshots to support the 
description. 
1. **Quick start**: how to get going, install instructions, and more examples. 
1. **Further documentation**: links to the full docs and more info. 
1. **Project organization**: who are the authors, how to contribute, how to 
file bugs. 
1. **Legal notices**: license, copyright, and any other legal details. 
Here are some examples of great README's: 
1. [Twitter Bootstrap](https://github.com/twbs/bootstrap) 
1. [guard](https://github.com/guard/guard) 
1. [Ace](https://github.com/ajaxorg/ace) 
1. [jekyll](https://github.com/jekyll/jekyll) 
1. [hogan.js](https://github.com/twitter/hogan.js) 
1. [ember.js](https://github.com/emberjs/ember.js) 
<div>I usually practice [Readme Driven 
Development](http://tom.preston-werner.com/2010/08/23/readme-driven-development.html), 
writing the README before writing any code. This forces me to be clear on 
exactly what I'm trying to build, helps me prioritize the work (anything in 
the "sales pitch" is a must-have), and provides a great sanity check on what 
the basic user experience looks like (the quick example and quick start 
sections are essential). See the original [Readme Driven 
Development](http://tom.preston-werner.com/2010/08/23/readme-driven-development.html) 
post and [The Most Important Code Isn't 
Code](http://zachholman.com/posts/documentation/) for more info.<div> 
## <span style="font-size: large;">1b. Tutorials, walkthroughs, and guides 

<div class="separator" style="clear: both; text-align: center;"><div 
class="separator" style="clear: both; text-align: center;">[<img border="0" 
src="http://2.bp.blogspot.com/-HsyX6KFZ6QI/U2adnkoIbVI/AAAAAAAASF0/taQacf-MOqI/s1600/Screen+Shot+2014-05-04+at+1.05.34+PM.png" 
height="306" width="320" />](http://tour.golang.org/)The README gets the user 
in the door; the tutorial shows them how to walk around. The goal is to guide 
a new user through example use cases that highlight the idiomatic patterns, 
the best practices, and the unique features of the project. Use the tutorial 
to have a dialogue with the user, walking them through the typical development 
flow step by step and introducing the key ideas. You don't have to cover every 
single topic and you don't have to go too in-depth: instead, at each step of 
the tutorial, provide links to where the user can find more info. 

For small, simple projects, you may be able to squeeze a tutorial into the 
README itself, but most projects will want to use a wiki, a blog post, a 
standalone webpage, slide deck, or even a recorded video. Here are some great 
examples: 
1. [Ruby on Rails Guides](http://guides.rubyonrails.org/) 
1. [Django Tutorial](https://docs.djangoproject.com/en/1.3/intro/tutorial01/) 
1. [Dropwizard Getting 
Started](https://dropwizard.github.io/dropwizard/getting-started.html) 
1. [Intro to Play Framework for Java](http://vimeo.com/58969923) 
1. [Twilio quick start tutorials](http://www.twilio.com/docs/quickstart) 
The gold standard, however, is the *interactive* tutorial. Most developers 
learn best by doing, so a step-by-step guide that lets the developer 
participate is the ultimate learning tool. Here are a few great examples: 
1. [A Tour of Go](http://tour.golang.org/#1) 
1. [Scala Tutorials](http://scalatutorials.com/) 
1. [Typesafe Activator](https://typesafe.com/activator) 
1. [Try Redis](http://try.redis.io/) and [Redis 
commands](http://redis.io/commands) 
1. [Try Git](https://try.github.io/) 
1. [Codecademy](http://www.codecademy.com/) 
<div>Creating your own interactive tutorial is not easy, but it dramatically 
lowers the bar for trying and learning about your project. Here are some 
(language/framework specific) tools you may find helpful: 
[io.livecode.ch](http://io.livecode.ch/), [IPython 
Notebook](http://ipython.org/notebook.html), 
[java-repl](https://github.com/albertlatacz/java-repl), 
[Pamflet](http://pamflet.databinder.net/Pamflet.html), [Typesafe 
Activator](https://typesafe.com/activator), 
[repl.it](https://github.com/replit/repl.it), [Ace Editor](http://ace.c9.io/), 
[CodeMirror](http://codemirror.net/), [Cloud9 IDE](https://c9.io/), 
[jsfiddle](http://jsfiddle.net/), 
[Codecademy](http://www.codecademy.com/teach), and 
[codepen](http://codepen.io/).    <div> 
## <span style="font-size: large;">1c. Reference documentation 

<div class="separator" style="clear: both; text-align: center;">[<img 
border="0" 
src="http://3.bp.blogspot.com/-3ZOS9RuU0Og/U2TJPxt5U_I/AAAAAAAASFc/npni9eqhdXQ/s1600/Screen+Shot+2014-05-03+at+3.47.10+AM.png" 
height="264" width="320" />](https://docs.djangoproject.com/en/1.6/)Ok, your 
new user got their foot in the door with the README and they took a few steps 
by following the tutorial; now, the user actually knows enough to start asking 
questions. This is where the reference documentation comes into play: the goal 
is to give users a way to *find* the specific information they need. In this 
part of the documentation, you can cover all the major topics in depth, but 
make sure to organize the information in a way that is easy to search and 
navigate. 

Here are some great examples of reference documentation: 
1. [Stripe docs](https://stripe.com/docs) 
1. [Django documentation](https://docs.djangoproject.com/en/1.3/) 
1. [Dropwizard user 
manual](https://dropwizard.github.io/dropwizard/manual/index.html) 
1. [Codahale metrics](http://metrics.codahale.com/manual/) 
1. [SQLite documents](http://www.sqlite.org/docs.html) 
For large projects, the amount of reference documentation can be pretty large. 
How do you keep it up to date? One technique is to include references to real 
code: that is, instead of typing code snippets directly into your docs, build 
a system to dynamically include them from a real repository. 

For example, consider this entry in the [Play Framework async 
docs](http://playframework.com/documentation/2.2.x/ScalaAsync): 

<div class="separator" style="clear: both; text-align: center;"><div 
class="separator" style="clear: both; text-align: center;">[<img border="0" 
src="http://1.bp.blogspot.com/-2YmoZPa1wWk/U2RocknVfNI/AAAAAAAASCU/Z3XhwRdaVac/s1600/Screen+Shot+2014-05-02+at+8.53.58+PM.png" 
height="160" width="400" 
/>](http://1.bp.blogspot.com/-2YmoZPa1wWk/U2RocknVfNI/AAAAAAAASCU/Z3XhwRdaVac/s1600/Screen+Shot+2014-05-02+at+8.53.58+PM.png) 
<div class="separator" style="clear: both; text-align: center;"><div 
class="separator" style="clear: both; text-align: center;">This documentation 
is generated from markdown files using the 
[play-doc](https://github.com/playframework/play-doc) project. For example, 
here is the Markdown for the ["Returning futures" 
section](https://github.com/playframework/playframework/blob/f10274e261329a72112b4a1a9ea83f8c93b27312/documentation/manual/scalaGuide/main/async/ScalaAsync.md#returning-futures): 

<script 
src="https://gist.github.com/brikis98/b37fab2e26452877a375.js"></script>Notice 
that the code snippet is *not* in the Markdown. Instead, there is just the 
line <code>@[async-result](code/ScalaAsync.scala),</code> which is a reference 
to 
[ScalaAsync.scala](https://github.com/playframework/playframework/blob/321af079941f64cdd2cf32b407d4026f7e49dfec/documentation/manual/scalaGuide/main/async/code/ScalaAsync.scala#L63) 
in Play's git repo, where the relevant code is demarcated using special 
comments: 

<script 
src="https://gist.github.com/brikis98/581bec202b0a622d3c15.js"></script>Since 
this file is compiled and tested, developers have to update it whenever they 
make changes to the framework - otherwise, the build fails. Moreover, as the 
comments identify the section of code as "used in the documentation", there is 
a good chance the developers will remember to update the relevant part of the 
documentation as well. 
## <span style="font-size: large;">1d. Project websites 

<div class="separator" style="clear: both; text-align: center;">[<img 
border="0" 
src="http://3.bp.blogspot.com/-J3parWAd8Ys/U2RtNRrP8MI/AAAAAAAASCk/-AuaiM-FF7E/s1600/Screen+Shot+2014-05-02+at+9.14.33+PM.png" 
height="204" width="320" />](https://pages.github.com/)Standalone project 
websites are a great example of [documentation as 
marketing](http://zachholman.com/posts/open-source-marketing/): you can give 
your project its own home, with a custom look and feel, and content that is 
linkable, tweetable, and indexable. 

Here are a few great examples: 
1. [Bootstrap](http://getbootstrap.com/) 
1. [jekyll](http://jekyllrb.com/) 
1. [Yeoman](http://yeoman.io/) 
1. [Ember](http://emberjs.com/) 
1. [Foundation](http://foundation.zurb.com/) 
<div>The easiest way to create a website for your project is with [Github 
Pages](https://pages.github.com/): create a repo on Github, put a few static 
HTML files in it (possibly using [jekyll](http://jekyllrb.com/)), git push, 
and you have your own landing page on the github.io domain.<div> 
## <span style="font-size: large;">1e. White papers and books 
<div class="separator" style="clear: both; text-align: center;"> 
<div class="separator" style="clear: both; text-align: center;">[<img 
border="0" 
src="http://1.bp.blogspot.com/-_CiTjt-FHx0/U2TJw1A2VmI/AAAAAAAASFk/vwuVU7CO4iI/s1600/ShowCover.jpeg" 
height="320" width="254" 
/>](http://www.amazon.com/Effective-Java-Edition-Joshua-Bloch/dp/0321356683)<div 
class="separator" style="clear: both; text-align: center;"> 
If you want to make a project look legit, a white paper, and especially a 
book, is the way to go. White papers are a great way to explain the background 
for the project: why it was built, the requirements, the approach, and the 
results. Books, of course, can contain the material in all the sections above: 
a quick intro, a tutorial, a reference guide, and more. Books are a sign that 
your project has "made it": there is enough interest in it that a publisher is 
willing to put money into printing the book and programmers are willing to put 
money into buying the book. 

Some great examples: 
1. [Bitcoin: a peer-to-peer electronic cash 
system](https://bitcoin.org/bitcoin.pdf) 
1. [Ethereum white 
paper](https://github.com/ethereum/wiki/wiki/%5BEnglish%5D-White-Paper) 
1. [Kafka: a distributed messaging system for log 
processing](http://research.microsoft.com/en-us/um/people/srikanth/netdb11/netdb11papers/netdb11-final12.pdf) 
1. [C Programming 
Language](http://www.amazon.com/C-Programming-Language-2nd-Edition/dp/0131103628) 
1. [Effective 
Java](http://www.amazon.com/Effective-Java-Edition-Joshua-Bloch/dp/0321356683) 

## <span style="font-size: x-large;">2. Code documentation 

We now understand the role of written documentation: the README gets your foot 
in the door; the tutorial shows you how to walk around; the reference guide is 
a map. But to truly understand *how* a piece of software works, you have to 
[learn to read the 
source](http://blog.codinghorror.com/learn-to-read-the-source-luke/). As the 
author of a project, it is your job to make the code as easy to understand as 
possible: [programs must be written for people to read, and only incidentally 
for machines to 
execute](http://mitpress.mit.edu/sicp/full-text/book/book.html). 

However, the code cannot be the *only* documentation for a project. You can no 
more learn how to use a complicated piece of software by reading the source 
than you can [learn to drive a car by taking apart the 
engine](http://stevelosh.com/blog/2013/09/teach-dont-tell/). 

<div class="separator" style="clear: both; text-align: center;">[<img 
border="0" 
src="http://1.bp.blogspot.com/-HJ-tQ4OJoLw/U2Se29ztRzI/AAAAAAAASDI/4MpiFO-G-BQ/s1600/Car-Parts.jpg" 
height="207" width="320" 
/>](http://1.bp.blogspot.com/-HJ-tQ4OJoLw/U2Se29ztRzI/AAAAAAAASDI/4MpiFO-G-BQ/s1600/Car-Parts.jpg) 
As we'll discuss below, code structure, comments, API docs, design patterns, 
and test cases all contain critical information for learning how to use a 
project, but remember that they are not a replacement for written 
documentation. 

## <span style="font-size: large;">2a. Naming, design patterns, and the type 
system 
<div class="separator" style="clear: both; text-align: center;"> 
There is no such thing as "self documenting" code, but there are ways to make 
the code easier or harder to understand. One of the first aspects of code 
readability is naming: every piece of software defines its own mini language 
or DSL that consists of class names, package names, method names, and variable 
names. When a developer uses your code, they are really learning a new 
language, so choose the words in it wisely! However, since [naming is one of 
the two hardest problems in computer 
science](http://martinfowler.com/bliki/TwoHardThings.html), I recommend 
getting yourself a copy of [Code Complete](http://www.cc2e.com/Default.aspx), 
which dedicates quite a few pages to this topic: 

<div class="separator" style="clear: both; text-align: center;">[<img 
border="0" 
src="http://1.bp.blogspot.com/-AxHHfkBSCq4/U2S7_07OghI/AAAAAAAASEU/jOFLwKblba0/s1600/2352.9780735619678f_6D939405.jpg" 
height="200" width="163" />](http://www.cc2e.com/Default.aspx) 
[Design patterns](http://en.wikipedia.org/wiki/Software_design_pattern) are 
another tool for communicating the intent of your code. You have to be careful 
not to overuse them (see [Rethinking Design 
Patterns](http://blog.codinghorror.com/rethinking-design-patterns/)), but 
having a shared vocabulary of terms like singleton, factory, decorator, and 
iterator can be useful in setting expectations and making the naming problem a 
little easier. The classic book in on this topic is [Design Patterns: Elements 
of Reusable Object-Oriented 
Software](http://www.amazon.com/Design-Patterns-Elements-Reusable-Object-Oriented/dp/0201633612), 
aka "The Gang of Four": 

<div class="separator" style="clear: both; text-align: center;">[<img 
border="0" 
src="http://2.bp.blogspot.com/-Zjv66e9LO4c/U2S8EJTlzeI/AAAAAAAASEc/gLIgBMBHZ2o/s1600/6a0120a85dcdae970b012877701400970c-pi.png" 
height="200" width="152" 
/>](http://www.amazon.com/Design-Patterns-Elements-Reusable-Object-Oriented/dp/0201633612) 
Finally, the type system in statically typed languages can be another powerful 
source of information. A type system can reduce not only the number of tests 
you write (by catching a certain class of errors automatically), but also the 
amount of documentation you have to write. For example, when calling a 
function in a dynamically typed language, there is no way to know the types of 
parameters to pass in unless the author of the function manually documented 
it; in a statically typed language, the types are known automatically, 
especially with a good IDE. 

<div class="separator" style="clear: both; text-align: center;">[<img 
border="0" 
src="http://4.bp.blogspot.com/-iBesxITaYe8/U2S8IeOUiHI/AAAAAAAASEk/BvvDa--r2sM/s1600/602px-haskell-logo.png" 
height="140" width="200" 
/>](http://4.bp.blogspot.com/-iBesxITaYe8/U2S8IeOUiHI/AAAAAAAASEk/BvvDa--r2sM/s1600/602px-haskell-logo.png) 
Of course, not all type systems are equal, and you have to use them correctly 
(e.g. avoid [stringly typed 
programming](http://blog.codinghorror.com/new-programming-jargon/)) to see the 
benefits. For examples of powerful type systems, check out (in increasing 
order of power and crazy) [Scala](http://www.scala-lang.org/), 
[Haskell](http://www.haskell.org/haskellwiki/Haskell), and 
[Idris](http://www.idris-lang.org/). 
<b><span style="font-size: large;"> 
</b>**<span style="font-size: large;">2b. API docs and literate programming** 

API docs are documentation for each class, function, and variable in your 
code. They are a fine-grained form of documentation that lets you learn about 
the inputs and outputs of each function, the preconditions and postconditions, 
and, perhaps most importantly, *why* a certain piece of code exists and 
behaves the way it does. 

Many programming languages have tools to generate API docs. For example, Java 
comes with 
[JavaDoc](http://www.oracle.com/technetwork/java/javase/documentation/javadoc-137458.html), 
which lets you add specially formatted comments to the code: 

<script 
src="https://gist.github.com/brikis98/3af68cdc37ccd3eeb743.js"></script>You 
can then run a command line utility that generates a webpage for each class 
with the JavaDoc comment formatted as HTML: 

<div class="separator" style="clear: both; text-align: center;">[<img 
border="0" 
src="http://3.bp.blogspot.com/-JgkdxEMGgcs/U2SerjgtwJI/AAAAAAAASDA/EWAiK7d7PK8/s1600/Screen+Shot+2014-05-03+at+12.45.20+AM.png" 
height="284" width="400" 
/>](http://3.bp.blogspot.com/-JgkdxEMGgcs/U2SerjgtwJI/AAAAAAAASDA/EWAiK7d7PK8/s1600/Screen+Shot+2014-05-03+at+12.45.20+AM.png) 
Good IDEs can show API docs automatically for any part of the code: 

<div class="separator" style="clear: both; text-align: center;">[<img 
border="0" 
src="http://2.bp.blogspot.com/-fhm_uLZP_yI/U2SgfWje19I/AAAAAAAASDU/orxqARRSpWk/s1600/41-javadoc.png" 
height="186" width="400" 
/>](http://2.bp.blogspot.com/-fhm_uLZP_yI/U2SgfWje19I/AAAAAAAASDU/orxqARRSpWk/s1600/41-javadoc.png) 
Some frameworks have special handling for API docs as well. For example, 
[rest.li](http://rest.li/) automatically extracts the documentation from your 
REST service and exposes it in a [web 
UI](https://github.com/linkedin/rest.li-api-hub). You can use this UI to 
browse all the RESTful services available, see what resources they expose, 
what methods and parameters they support, and even make REST calls straight 
from your browser: 
<div class="separator" style="clear: both; text-align: center;"> 
<div class="separator" style="clear: both; text-align: center;">[<img 
border="0" 
src="http://1.bp.blogspot.com/-HutddWr7q4A/U2Sk1x5cs0I/AAAAAAAASD0/aa_GCcpLxio/s1600/resource-screenshot.png" 
height="223" width="400" />](https://github.com/linkedin/rest.li-api-hub) 
Here are a few nice examples of API docs: 
1. [Java API docs](http://docs.oracle.com/javase/7/docs/api/) 
1. [Scala API docs](http://www.scala-lang.org/api/current/) 
1. [Stripe API docs](https://stripe.com/docs/api) 
1. [Twilio API docs](http://www.twilio.com/docs/api) 
1. [Github API docs](https://developer.github.com/v3/) 
1. [rest.li API docs](https://github.com/linkedin/rest.li-api-hub) 
[Literate programming](http://en.wikipedia.org/wiki/Literate_programming) goes 
even further: the idea is that program logic should be described *first* in 
natural language; the code comes second, interspersed amongst the English 
description where convenient. Instead of organizing programs in a way that's 
easy for compilers to process (ie, rigid file, folder, and package structure), 
literate programs should be organized in a way that makes it easier for humans 
to understand, such as an essay format. 

I think literate programming is a great concept, but I'm not aware of any 
mainstream languages that support it fully. The closest I've seen are projects 
that use tools like [docco](http://jashkenas.github.io/docco/), which lets you 
generate an HTML page that shows your comments intermingled with the code, and 
feels like a halfway point between API docs and literate programming. Here's 
an example from [Literate 
CoffeeScript](http://coffeescript.org/documentation/docs/nodes.html): 

<div class="separator" style="clear: both; text-align: center;"><div 
class="separator" style="clear: both; text-align: center;">[<img border="0" 
src="http://3.bp.blogspot.com/-LWDZPdWfnq0/U2ao19V3MuI/AAAAAAAASGE/x4KIj6coKnY/s1600/Screen+Shot+2014-05-04+at+1.52.42+PM.png" 
height="239" width="320" 
/>](http://coffeescript.org/documentation/docs/nodes.html)<div 
class="separator" style="clear: both; text-align: left;">There are flavors of 
docco tailored for specific languages, such as 
[rocco](http://rtomayko.github.io/rocco/rocco.html) (Ruby), 
[Pycco](http://fitzgen.github.io/pycco/) (Python), 
[Gocco](http://nikhilm.github.io/gocco/) (Go), and 
[shocco](http://rtomayko.github.io/shocco/) (POSIX shell). There is also an 
extension of docco called [Groc](http://nevir.github.io/groc/), which adds 
support for a searchable table of contents, handles hierarchies of files and 
folders, and integrates with Github Pages..**<span style="font-size: 
large;">2c. Comments** 
<b> 
</b>When used correctly, comments are another important source of information: 
whereas the [code tells you how, comments tell you 
why](http://blog.codinghorror.com/code-tells-you-how-comments-tell-you-why/). 
The trick is finding the right balance. Code without any [comments can't 
explain why the program is being 
written](http://queue.acm.org/detail.cfm?id=1053354), the rationale for 
choosing this or that method, or the reasons certain alternative approaches 
were taken; code with too many comments can often be a sign that the code 
itself is unclear and instead of fixing the code, the [comments are being used 
as a 
crutch](http://sd.jtimothyking.com/2006/12/15/does-bad-writing-reflect-poor-programming-skills/). 

In short: always use comments in moderation and always to explain *why*. 

For the "best" examples of comments, I point you to a hilarious StackOverflow 
thread: [What is the best comment in source code you have ever 
encountered?](http://stackoverflow.com/questions/184618/what-is-the-best-comment-in-source-code-you-have-ever-encountered/) 

<script 
src="https://gist.github.com/brikis98/c4180e793ae32d1a4dfb.js"></script> 
**<span style="font-size: large;">2d. Example code and test code** 

No matter how good your docs are, you can't force developers to 
[RTFM](http://en.wikipedia.org/wiki/RTFM). Some developers prefer to learn by 
example - which is a polite way of saying that they like to copy and paste. 

<div class="separator" style="clear: both; text-align: center;">[<img 
border="0" 
src="http://2.bp.blogspot.com/-_HmqG7UIX5E/U2Syabad3TI/AAAAAAAASEE/ic2PwuSmCWM/s1600/b53ad99b8dfae5c65a4a797d95e6bcee.jpg" 
height="320" width="320" 
/>](http://2.bp.blogspot.com/-_HmqG7UIX5E/U2Syabad3TI/AAAAAAAASEE/ic2PwuSmCWM/s1600/b53ad99b8dfae5c65a4a797d95e6bcee.jpg) 
Getting the example code right is critical to the success of a project, as 
many developers will blindly copy and paste it. Your goal is to make as many 
clean, idiomatic examples available as possible. You may also want to invest 
extra time with the first few teams that adopt your project to help them write 
clean code: their projects may become the models for everyone else, so make 
sure it's a model that's worth following! 

Here are some projects with great example code: 
1. [Twilio HowTo's and Example Code](http://www.twilio.com/docs/howto) 
1. [Twitter bootstrap 
examples](http://getbootstrap.com/2.3.2/getting-started.html#examples) 
1. [Typesafe Activator templates](https://typesafe.com/activator/templates) 
1. [async.js](https://github.com/caolan/async) 
1. [Firebase examples](https://www.firebase.com/docs/examples.html) 
Automated tests are a special case of example code. Tests can be useful as 
documentation in that they show the *expected* behavior of the code for a 
variety of use cases. 
[BDD](http://en.wikipedia.org/wiki/Behavior-driven_development) style unit 
tests, such as [Specs2](http://etorreborre.github.io/specs2/) and 
[RSpec](http://rubydoc.info/gems/rspec-core/frames), even encourage writing 
test cases as a formal specifications. However, in practice, test code can get 
tangled up with mock objects, test frameworks, and corner cases, all of which 
can be a source of confusion if you try to rely on it too heavily as a form of 
documentation. 

Projects with great test code: 
1. [SQLite](http://www.sqlite.org/testing.html) 
1. [Apache Lucene](http://lucene.apache.org/core/index.html) 
1. [backbone.js](http://backbonejs.org/test/) 
1. [Chromium](http://dev.chromium.org/developers/testing) 
1. [jQuery](http://fireunit.org/jquery/test/) 

## <span style="font-size: x-large;">3. Community documentation 

We've talked about written documentation and code documentation; the final 
piece of the puzzle comes from the people involved with the project and the 
tools they use. 

<span style="font-size: large;">**3a. Project management tools** 

<div class="separator" style="clear: both; text-align: center;">[<img 
border="0" 
src="http://3.bp.blogspot.com/-p2aUPqRErJM/U2S9KIXM52I/AAAAAAAASEw/M6tdBbVhGT4/s1600/Tps_report.png" 
height="200" width="154" 
/>](http://3.bp.blogspot.com/-p2aUPqRErJM/U2S9KIXM52I/AAAAAAAASEw/M6tdBbVhGT4/s1600/Tps_report.png) 
Most teams use bug tracking software (e.g. 
[JIRA](https://www.atlassian.com/software/jira), 
[bugzilla](http://www.bugzilla.org/), [github 
issues](https://github.com/blog/831-issues-2-0-the-next-generation)) and/or 
project management software (e.g. [Basecamp](https://basecamp.com/), 
[Asana](https://asana.com/), [Trello](https://trello.com/)). These systems 
contain a lot of information about the project: what you worked on before, 
what you're working on now, what you'll work on in the future, bugs found, 
bugs fixed, and so on. 

A few examples: 
1. [Play Framework Github 
Issues](https://github.com/playframework/playframework/issues?state=open) 
1. [Mozilla Bugzilla](https://bugzilla.mozilla.org/) 
1. [Firefox Roadmap Wiki](https://wiki.mozilla.org/Firefox/Roadmap) 
1. [Chromium Issues](https://code.google.com/p/chromium/issues/list) 
<div>It's hard to imagine how a [TPS 
report](https://www.youtube.com/watch?v=Fy3rjQGc6lA) can be useful as 
documentation, but very often, the discussions over a tricky bug or the 
requirements gathering before starting a new project contain critical 
information not available anywhere else. It's not uncommon to come across a 
bug report or an old wiki page while searching for information about a 
project, especially if it's an open source project that makes all of this 
information publicly available.<div> 
## <span style="font-size: large;">3b. Mailing lists and Q&amp;A boards 

<div class="separator" style="clear: both; text-align: center;">[<img 
border="0" 
src="http://4.bp.blogspot.com/-diOsUMA8eYU/U2S-JHwBZvI/AAAAAAAASE8/kcaY7ty6Bn0/s1600/so-logo.png" 
height="95" width="320" 
/>](http://4.bp.blogspot.com/-diOsUMA8eYU/U2S-JHwBZvI/AAAAAAAASE8/kcaY7ty6Bn0/s1600/so-logo.png) 
Discussions from Q&amp;A sites like [StackOverflow](http://stackoverflow.com/) 
and mailing lists like [google 
groups](https://groups.google.com/forum/#!overview) also come up frequently in 
search results. Even the best documentation will not be able to answer 
everything, so cultivating community websites can be a critical part of making 
software learnable. Over time, these may become some of the most important 
parts of your project's documentation, as they inherently deal with issues 
where many developers got stuck. 

A few examples: 
1. [Play Framework Google 
Group](https://groups.google.com/forum/#!forum/play-framework) 
1. [Android StackOverflow 
Tag](http://stackoverflow.com/questions/tagged/android) 
1. [Ruby on Rails StackOverflow 
Tag](http://stackoverflow.com/questions/tagged/ruby-on-rails) 
<div>This is one area where open source projects shine: being able to 
instantly find answers by using google is a huge win. That said, for 
internal/proprietary projects, I encourage you to setup internal mailing 
lists, maintain an FAQ, and/or install an [internal StackOverflow-style 
Q&amp;A 
site](http://meta.stackexchange.com/questions/2267/stack-overflow-clones) 
within your company.<div> 
## <span style="font-size: large;">3c. Blog posts, talks, meetup groups 

<div class="separator" style="clear: both; text-align: center;">[<img 
border="0" 
src="http://1.bp.blogspot.com/-X9MJhDohbZc/U2S-h2HCtxI/AAAAAAAASFE/sRdn2_OG9O8/s1600/logo-2x.png" 
/>](http://1.bp.blogspot.com/-X9MJhDohbZc/U2S-h2HCtxI/AAAAAAAASFE/sRdn2_OG9O8/s1600/logo-2x.png) 
For popular open source projects, some of the best documentation comes in the 
form of content contributed by the community. For example, blog posts and 
talks from end users are a valuable source of information, revealing what's 
really working and what isn't; they are also great marketing, as it makes it 
clear other people are using project. Even blog posts that completely trash 
the project can be useful - think of it as a free design review! 

If your project is open source, growing a community around it can have a huge 
pay off. A small investment in "marketing" your project - via good 
documentation, custom project pages, giving talks, and setting up meetup 
groups - can yield huge returns in the form of [free labor, cleaner code, and 
better branding](http://brikis98.blogspot.com/2011/04/open-source.html). 

There are countless great blog posts and talks, so here are a few unbiased, 
randomly selected links that you should definitely check out: 
1. [The Ultimate Guide to Getting Started with the Play 
Framework](http://brikis98.blogspot.com/2014/03/the-ultimate-guide-to-getting-started.html) 
1. [Composable and Streamable Play 
Apps](http://engineering.linkedin.com/play/composable-and-streamable-play-apps) 
1. [The Play Framework at 
LinkedIn](http://engineering.linkedin.com/play/play-framework-linkedin) 
1. [Play Framework: Async I/O with Java and 
Scala](http://www.slideshare.net/brikis98/play-framework-async-io-with-java-and-scala) 
1. [Bitcoin by 
Analogy](http://brikis98.blogspot.com/2014/04/bitcoin-by-analogy.html) 

## <span style="font-size: x-large;">Further reading 

If you've made it this far, you should now know how, and why, to document your 
code. I hope you join me in building software that is easier to use and learn. 

If you're hungry for more info, I recommend the following resources: 
<span id="docs-internal-guid-c8fedc3e-bc18-e3b2-30df-9cafa7f4ef92"> 
<ol style="margin-bottom: 0pt; margin-top: 0pt;">1. [<span style="color: 
#1155cc; text-decoration: underline; vertical-align: baseline; white-space: 
pre-wrap;">Writing Great 
Documentation](http://jacobian.org/writing/great-documentation/) 
1. [<span style="color: #1155cc; text-decoration: underline; vertical-align: 
baseline; white-space: pre-wrap;">The Most Important Code Isn't 
Code](http://zachholman.com/posts/documentation/) 
1. [Teach, Don't Tell](http://stevelosh.com/blog/2013/09/teach-dont-tell/) 
1. [<span style="color: #1155cc; font-size: 15px; text-decoration: underline; 
vertical-align: baseline; white-space: pre-wrap;">Designing Great API 
Docs](http://blog.parse.com/2012/01/11/designing-great-api-docs/) 
1. <span style="color: #1155cc; font-family: Arial; font-size: 15px; 
line-height: 1.15; text-decoration: underline; vertical-align: baseline; 
white-space: pre-wrap;">[No docs == no 
product](http://www.mikepope.com/blog/DisplayBlog.aspx?permalink=1680) 
1. <span style="color: #1155cc; font-family: Arial; font-size: 15px; 
line-height: 1.15; text-decoration: underline; vertical-align: baseline; 
white-space: pre-wrap;">[Pointers to useful, well-written, and otherwise 
beautiful documentation](https://github.com/PharkMillups/beautiful-docs) 
1. [If It Isn't Documented, It Doesn't 
Exist](http://blog.codinghorror.com/if-it-isnt-documented-it-doesnt-exist/) 
1. <span style="color: #1155cc; font-family: Arial; font-size: 15px; 
line-height: 1.15; text-decoration: underline; vertical-align: baseline; 
white-space: pre-wrap;">[A beginners guide to writing 
documentation](http://docs.writethedocs.org/writing/beginners-guide-to-docs/) 
1. <span style="color: #1155cc; font-family: Arial; font-size: 15px; 
line-height: 1.15; text-decoration: underline; vertical-align: baseline; 
white-space: pre-wrap;">[Tips for Writing Good 
Documentation](http://readwrite.com/2010/08/14/tips-for-writing-good-document#awesm=~oCZZHjd5dUD5EN) 