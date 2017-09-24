---
layout: post
title: Programming lessons I wish I knew when I graduated, part 1
date: '2011-07-08T20:06:00.000-07:00'
author: Yevgeniy Brikman
tags:
- HowTo
- Software Engineering
modified_time: '2011-08-06T14:44:46.343-07:00'
blogger_id: tag:blogger.com,1999:blog-5422014336627804072.post-4673230584667905173
blogger_orig_url: http://brikis98.blogspot.com/2011/07/programming-lessons-i-wish-i-knew-when.html
thumbnail_path: blog/programming-lessons/dont-test-code.jpeg
---

I've been writing code for about ~13 years. I've had jobs in the software industry since 
9th grade: while my friends spent summers slaving away at their McJobs, I was 
in an air conditioned office browsing the web. I got my BS and masters from a 
good [CS department](http://www.cs.cornell.edu/), consistently ranked [top 5 
in the 
nation](http://grad-schools.usnews.rankingsandreviews.com/best-graduate-schools/top-science-schools/computer-science-rankings). 
Despite all that, when I got to the "real world", I absolutely, positively, 
unconditionally, sucked. 

{% include figure.html path="blog/programming-lessons/you-suck.jpg" alt="You suck" %}

Actually, I still suck, but I'm much more aware of it now and am actively doing 
something about it. There are many things about "professional" software engineering that you just can't learn in 
school. This post will go through several hard lessons that every programmer 
must eventually learn or remain in perpetual suck-land forever. This list 
certainly isn't comprehensive, but hopefully it'll help some newbie programmer 
out there so s/he can suck just a little less when it's time to go "pro".

## 1. Maintenance

<blockquote>
  <p>
    Always code as if the guy who ends up maintaining your code will be a violent 
    psychopath who knows where you live.
  </p>
  <cite>Rick Osborne</cite>
</blockquote>

The nature of being a student is that most projects are short lived: you spend 
a few nights on it before the assignment is due, hand it in, and never think 
about it again. In the professional world, it's often the opposite. 
When an employer asks you to build something, remember: they are also asking 
you to maintain it. Possibly forever.

Just about every company is mired in "legacy" code that has been around for years and 
someone gets the soul-sucking work of keeping it running. Try not too laugh 
too much when you see it: before long, your own contributions will be part of 
the mess that someone else is maintaining. Once you start dealing with this 
crud on a daily basis, you'll learn the true value of writing clear, 
understandable and maintainable code.  Don't cry too much when you come across 
some horrendous pile of spaghetti code, tear your hair out to understand it, 
curse the author and his whole family... only to come to the realization that 
it was something *you* scrawled together 6 months ago.

**Pro tip**: learn that programming is part engineering and part *writing*. You must 
write code that can be understood by **two** audiences: [the computer *and* 
your fellow 
programmers](http://www.codinghorror.com/blog/2008/11/coding-its-just-writing.html). 

## 2. Testing

<blockquote>
  <p>
    Whenever you are tempted to type something into a print statement or 
    a debugger expression, write it as a test instead.
  </p>
  <cite>Martin Fowler</cite> 
</blockquote>

Programming is [hard](http://msmvps.com/blogs/jon_skeet/archive/2009/01/29/programming-is-hard.aspx). 
Really [hard](http://www.bricklin.com/wontprogram.htm). Some people [can't do 
it at all](http://t.co/DFc6NeF). And of those who claim they can, they often 
[suck at it](http://www.iovene.com/56/), 
[badly](http://www.codinghorror.com/blog/2007/02/why-cant-programmers-program.html). 
Given how difficult it is to produce correct code, it is all the more 
appalling to find programmers who barely test what they write. I've seen 
people refactor classes, modify hundreds of lines of code, totally rework core 
pieces of logic and then check-in with no more than a cursory glance at the 
output. This is horrifying. 

{% include figure.html path="blog/programming-lessons/dont-test-code.jpeg" alt="I don't always test my code" %}

Part of the problem is that programming education is often based around manual testing: 
run this, click that, and if the output looks correct, you're done. It makes 
sense to do this in an intro level CS course, as it's hard to write code to 
test your code if you don't know how to, er, code. However, once you get 
beyond this beginner stage, I don't think any university course, coding 
tutorial, or book should ever encourage or accept manual testing again. For 
example, I'd love for every CS course to require each project to include an 
automated test suite: you are graded not just on the correctness of your code, 
but also on the (very related) issue of the effectiveness of your tests.

**Pro tip**: get really good at writing automated tests. They are the "healthy diet and 
regular exercise" of software engineering. 

## 3. You don't know what you don't know

<blockquote>
  <p>
    On two occasions I have been asked, "Pray, Mr. Babbage, if you put into the 
    machine wrong figures, will the right answers come out?" In one case a member 
    of the Upper, and in the other a member of the Lower House put this question. 
    I am not able rightly to apprehend the kind of confusion of ideas that could 
    provoke such a question.
  </p>
  <cite>Charles Babbage</cite>
</blockquote>

I came out of school and thought I knew almost everything I needed to know to be a 
successful programmer. I oozed overconfidence. In reality, the gaps in my 
knowledge were so huge that I didn't even know what was missing. I was not 
just a carpenter who only knew how to use a hammer, I didn't even know that 
screw drivers, pliers, or saws existed. And I was a worse programmer for 
it.

Oddly enough, finishing school was just the beginning of the learning process. Every 
new programming language I learned, every new technology I mastered, and each 
new problem I solved didn't just add a single item to my toolbelt: it 
*exponentially* increased the range of problems that I could solve and the 
efficiency with which I solved them. 

**Pro tip**: you can't predict the benefits of learning something until you actually 
learn it. The only way to become a great programmer is to take the plunge and 
try to learn just about everything you can. Read all the 
[blogs](http://programmers.stackexchange.com/questions/67/can-you-recommend-some-good-programming-blogs) 
and 
[books](http://stackoverflow.com/questions/1711/what-is-the-single-most-influential-book-every-programmer-should-read) 
you can find and get involved with [open 
source](https://www.ybrikman.com/writing/2011/04/14/open-source/) as soon as 
possible. 

## To be continued...

Continue on to 
[part 2](https://www.ybrikman.com/writing/2011/07/09/programming-lessons-i-wish-i-knew-when_09/) 
of this series to learn about screwing up, how to get things done and how to 
be recognized for it.
