---
layout: post
title: Don't learn to code. Learn to think.
date: '2014-05-19T12:42:00.001-07:00'
author: Yevgeniy Brikman
tags:
- Philosophy
- Learning
modified_time: '2014-07-30T10:44:20.756-07:00'
thumbnail_path: blog/learn-to-think/cat-learn-to-code.jpg
blogger_id: tag:blogger.com,1999:blog-5422014336627804072.post-6807518811602176191
blogger_orig_url: http://brikis98.blogspot.com/2014/05/dont-learn-to-code-learn-to-think.html
excerpt: |
  It seems like everyone is trying to learn to code: Code.org has celebrities 
  like Bill Gates, Mark Zuckerberg, and Chris Bosh telling you anyone can code; 
  CoderDojo's are springing up all over the country; the UK has made it part of 
  their official curriculum for all grade school kids.
add_to_popular_list: true
---

{% include figure.html path="blog/learn-to-think/cat-learn-to-code.jpg" alt="I should learn to code" %}

*(This blog post was covered on [Lifehacker](http://lifehacker.com/dont-just-learn-to-code-learn-how-to-think-from-comput-1598683903) 
and translated into [Spanish](http://itechnode.com/no-aprendas-solo-a-programar-aprende-a-pensar) 
and [Chinese](http://www.keiko.tw/?p=1648).)* 

It seems like everyone is trying to learn to code: 
[Code.org](http://code.org/) has celebrities like Bill Gates, Mark Zuckerberg, 
and Chris Bosh telling you anyone can code; 
[CoderDojo's](http://coderdojo.com/#zoom=3&amp;lat=48.9225&amp;lon=-35.15625&amp;layers=00B0T) 
are springing up all over the country; the UK has made it part of their 
[official curriculum](http://www.computingatschool.org.uk/) for all grade 
school kids. 

I think this is slightly misguided. Don't get me wrong - I do think the world 
would be better off if everyone had some familiarity with coding - but coding 
itself should not be the goal. Computers and programming are just *tools*. 
They are a means to an end. 

The real goal should be to teach people a new way to *think*. In other words, 
we should be trying to teach computer science and not just coding. In this 
blog post, I'll explain the difference between the two, and why focusing on 
the right one is critical for the movement to succeed. 

If you prefer a video explanation, I highly recommend Simon Peyton Jones' 
wonderful TED talk [Teaching Creative Computer 
Science](https://www.youtube.com/watch?v=Ia55clAtdMs), which was the 
inspiration for this post: 

{% include iframe.html url="//www.youtube.com/embed/Ia55clAtdMs" %}
 
Still here for the written version? Great. Let's get started by asking a key 
question: why should you care about coding or computer science at all? 

To answer that, we'll take a walk. 

## Welcome to the real world

{% include figure.html path="blog/learn-to-think/red-pill.jpg" alt="Red pill or blue pill" %}

You're probably reading this blog post in Chrome or Firefox, running on Windows or OS 
X, on a laptop or desktop. I'm guessing you also spent some time today reading 
email, checking your friends' Facebook statuses, or watching a video on 
Youtube. Much of your life is on computers these days: your medical records 
are in a database; you resume is on LinkedIn; you use Google and Facebook to 
market your products; you use Amazon to buy them; you file your taxes online; 
you manage your bank account on a website; perhaps you even dabble in [digital 
currencies](https://www.ybrikman.com/writing/2014/04/24/bitcoin-by-analogy/). 

Now, look up from your computer: in your pocket, purse, or on a desk nearby, 
you may have a smartphone. It's loaded with a GPS, camera, touch screen, and 
tons of apps. If you're in your living room, you might also have an LCD TV 
hooked up to digital cable, a DVR, DVD player, Apple TV, XBox, or PlayStation. 
The movies, music, and games you may play on those devices are packed full of 
computer graphics and digital audio processing. 

Let's head outside. Did you walk past your car? Modern cars are designed using 
software, built in a factory full of robots, and stuffed full of computers. If 
you drive your car, you might use Google Maps to find your way around, Yelp to 
find a place to eat, or TripAdvisor to find a place to stay. Now, look up: 
somewhere above you, a plane will pass by that is controlled by auto pilot, 
has in-flight Wifi and entertainment systems, and is constantly communicating 
with other planes, traffic controllers, and its manufacturer. Somewhere above 
that, satellites and space stations are orbiting the earth, taking pictures, 
measuring the weather, and routing phone calls. 

[Software is eating the 
world](http://online.wsj.com/news/articles/SB10001424053111903480904576512250915629460). 
But this is only the beginning. Before you know it, you'll be [wearing 
technology](http://www.google.com/glass/start/), [locking your doors with 
computers](https://lockitron.com/), using robots to [deliver 
goods](http://www.amazon.com/b?node=8037720011) and [clean your 
house](http://www.irobot.com/us), building your own 
[electronics](http://www.arduino.cc/), running your own [manufacturing 
plant](http://en.wikipedia.org/wiki/3D_printing), living in [virtual 
reality](http://www.oculusvr.com/), traveling in [self driving 
cars](http://www.cnet.com/news/googles-self-driving-car-turns-out-to-be-a-very-smart-ride/), 
and [flying to space](http://www.virgingalactic.com/). 

## The matrix is everywhere

{% include figure.html path="blog/learn-to-think/matrix-code.jpg" alt="The matrix" %}

Absolutely all of the technology I just described is powered by software. In every aspect 
of your life, you are surrounded by code. And the amount of code is only going 
to increase in the future. 

Now, just because a technology is ubiquitous doesn't mean you have to study it 
in school. For example, we all fly in airplanes, but getting your pilot's 
license is not part of the K-12 curriculum. 

However, the tools you need to understand how to think about flying *are* part 
of the curriculum: 

1. Physics and math help you understand gravity, forces, pressure, velocity, 
friction, and lift. 
1. Biology teaches you what happens to the human body at high altitudes, with 
limited oxygen, and extreme cold. 
1. History explains how the airplane was developed, how it evolved, and its 
role in travel, commerce, and warfare. 

By the time you graduate high school, you have an idea of what a plane is, how 
it works, and how to use it safely. General purpose classes like physics, 
math, biology, and history teach you how to *think* about a wide variety of 
topics, including airplanes; this is in contrast to a class that teaches you 
how to *use a tool*, such as how to fly one specific type of airplane. 

For the same reason, we should focus on teaching computer science and not just 
coding: the former is a general purpose way of thinking, whereas the latter is 
a specific tool. Let's look closer at computer science to get a better 
understanding of the distinction. 

## What is computer science? 

{% include figure.html path="blog/learn-to-think/lambda.png" alt="Lambda" %}

[Computer science](http://en.wikipedia.org/wiki/Computer_science) is the study of 
[computation](http://en.wikipedia.org/wiki/Computation): that is, how to 
represent and process information. Here are just a few of the concepts you 
might study: 

1. **Problem solving**: you'll learn 
[algorithms](http://en.wikipedia.org/wiki/Algorithm) - that is, general 
strategies, such as [divide and 
conquer](http://en.wikipedia.org/wiki/Divide_and_conquer_algorithm), 
[recursion](http://en.wikipedia.org/wiki/Recursive_algorithm), 
[heuristics](http://en.wikipedia.org/wiki/Heuristic_algorithm), [greedy 
search](http://en.wikipedia.org/wiki/Greedy_algorithm), and [randomized 
algorithms](http://en.wikipedia.org/wiki/Randomized_algorithm) - that help you 
model, decompose, and solve *any* kind of problem. 
1. **Logic**: you will start to use precise and formal methods of thinking, 
including 
[abstraction](http://en.wikipedia.org/wiki/Abstraction_(computer_science)), 
[boolean logic](http://en.wikipedia.org/wiki/Boolean_logic), [number 
theory](http://en.wikipedia.org/wiki/Number_theory), and [set 
theory](http://en.wikipedia.org/wiki/Set_theory), so you can solve problems in 
an air tight manner. 
1. **Data**: you will touch [information 
theory](http://en.wikipedia.org/wiki/Information_theory) and start asking 
questions like what *is* information? How do you represent it? How do you 
model the real world? 
1. **Systems**: how do you design and build complex systems that satisfy a set 
of requirements and constraints? [Systems 
engineering](http://en.wikipedia.org/wiki/Systems_engineering) is an essential 
topic in almost every business. 
1. **Thinking**: one of the best ways to understand the human mind is to try 
to replicate it. Topics like [artificial 
intelligence](http://en.wikipedia.org/wiki/Artificial_intelligence), [machine 
learning](http://en.wikipedia.org/wiki/Machine_learning), [computer 
vision](http://en.wikipedia.org/wiki/Computer_vision), and [natural language 
processing](http://en.wikipedia.org/wiki/Natural_language_processing) are at 
the forefront of not only computer science, but also biology, psychology, 
philosophy, and mathematics. 

Note that the above list doesn't really mention coding or programming, 
because they are just *tools* that can perform computation: they are not, in 
and of themselves, computer science. 

<blockquote>
  <p>
    Computer science is no more about computers than astronomy is about 
    telescopes, biology about microscopes, or chemistry about beakers and test 
    tubes. Science is not about tools.
  </p>
  <cite>Michael Fellows and Ian Parberry</cite>
</blockquote>

It turns out there is another tool that we rely on 
for computation even more: the brain! The goal of computer science is to teach 
your brain new, general purpose, and widely applicable ways to think. As 
technology becomes more and more ubiquitous, this new way of thinking will 
become just as important as physics, math, biology, and history. 

All that said, thinking alone is not enough: we need to know how to apply it. 
In physics, you do experiments with scales, prisms, and magnets; in biology, 
you might use test tubes, plants, and petri dishes; in computer science, you 
learn programming. 

## What is programming?

{% include figure.html path="blog/learn-to-think/coding.png" alt="Coding" %}

Programming, or writing code, is how you instruct a computer to perform some operation. If 
you've never written code before, you're probably used to interacting with a 
computer by clicking on things in an existing app. Under the hood, this app 
consists of code that tells the computer how to display the application, where 
to store or retrieve data, and how to react to your clicks. 

All of programming is based on the principles of computer science we discussed 
above. It is remarkable that the same set of concepts - logic, algorithms, 
data, systems engineering - can be used to build everything from the web 
browser you're using to read this post to the autopilot software on an 
airplane. Although programming involves lots of math and structure, it is also 
a remarkably creative exercise: you think products into existence, one line of 
code at a time. 

Learning programming as part of a computer science education brings about a 
number of benefits:

1. **DIY**: if you can code, you can build things for 
yourself. You can start simple: create a script to rename a bunch of travel 
photos or an Excel formula to help calculate your taxes. Then, get fancier: 
create a website for your portfolio; create a mobile app for your company; 
build a game to play with your friends. 
1. **Troubleshooting**: once you've built a few apps yourself, figuring out 
other apps is easier. Once you stop fearing the computer - the unknown - you 
will become a master of [tech support](http://xkcd.com/627/). As technology 
touches every part of your life, knowing how to navigate it will become as 
important as knowing how to read. 
1. **Career**: the goal of learning computer science is *not* to become a 
professional programmer. We all study math, physics, and chemistry in school, 
but we don't all become professional mathematicians, physicists, and chemists. 
However, if you do have a passion for it, you'll find that software 
engineering is one of the [highest 
rated](http://money.usnews.com/careers/best-jobs/rankings/the-100-best-jobs), 
[highest paid, and fastest 
growing](http://www.businessinsider.com/12-fast-growing-high-paying-jobs-in-2014-2013-12) 
jobs out there. 

## Putting it all together 

{% include figure.html path="blog/learn-to-think/binary.jpg" alt="Binary" %}

Let's recap: 

1. **Computer science** is a new way of thinking. The concepts in it are 
useful for every single person in a technology-filled world. 
1. **Programming** is an essential part of learning computer science by 
applying the new way of thinking. However, by itself, programming is not 
nearly as general purpose. 

Confusing these two concepts is causing problems for the learn-to-code 
movement. Slate published an article called [Maybe Not Everybody Should Learn 
to Code](http://www.slate.com/articles/technology/future_tense/2013/08/everybody_does_not_need_to_learn_to_code.html); 
the Atlantic wrote [Should Journalism Schools Require Reporters to 'Learn 
Code'? No](http://www.theatlantic.com/education/archive/2013/10/should-journalism-schools-require-reporters-to-learn-code-no/280711/); 
Jeff Atwood wrote [Please Don't Learn To 
Code](http://blog.codinghorror.com/please-dont-learn-to-code/), where he asks 
a question that neatly summarizes the confusion: 

<blockquote>
  <p>
    How [would] Michael Bloomberg be better at his day to day job of leading 
    the largest city in the USA if he woke up one morning as a crack Java coder?  
  </p>
</blockquote>

This is, of course, the wrong question. It 
is the result of public campaigns that suggest that learning to code, as 
opposed to learning to think, is the end goal. If even Jeff Atwood, an 
experienced and respected programmer, is fooled by this distinction, then the 
average person has no chance of getting it right. The question we should be 
asking is: 

<blockquote>
  <p>
    Would Bloomberg&mdash;or anyone else&mdash;be better at their job if they 
    improved their ability to think by learning new problem solving strategies 
    and developing a better grasp of logic?
  </p>
</blockquote>

I think the answer here is obvious. As the world fills up with more and more 
technology, I think the answer becomes even more obvious. This is why we need 
to focus on teaching computer science and not just coding. 

## How to get started 

{% include figure.html path="blog/learn-to-think/keep-calm-think.png" alt="Keep calm and learn to think" %}

The good news is that you don't need to wait for Code.org to get this message - 
you can start learning computer science right now! In fact, it's one of the 
easiest topics to learn, as all you need is a computer and an Internet 
connection, and if you're reading this post, you probably have both. 

Here are some great resources to get you going: 

### University courses 

1. [Coursera](https://www.coursera.org/) 
1. [Udacity](https://www.udacity.com/) 
1. [MIT OpenCourseWare](http://ocw.mit.edu/index.htm) 
1. [Stanford Engineering Everywhere](http://see.stanford.edu/see/courses.aspx) 
1. [Academic Earth](http://academicearth.org/computer-science/) 

### Online tutorials

1. [Khan Academy](https://www.khanacademy.org/) 
1. [Treehouse](http://teamtreehouse.com/) 
1. [MIT Scratch](http://scratch.mit.edu/) 
1. [Codecademy](http://www.codecademy.com/) 
1. [Code School](https://www.codeschool.com/) 

### Communities and clubs

1. [CoderDojo](http://coderdojo.com/#zoom=3&amp;lat=48.9225&amp;lon=-35.15625&amp;layers=00B0T) 
1. [Girls Who Code](http://girlswhocode.com/) 
1. [Girl Develop It](http://girldevelopit.com/) 
1. [Code.org](http://code.org/learn/local) 
1. [Coding meetup Groups](http://coding.meetup.com/) 