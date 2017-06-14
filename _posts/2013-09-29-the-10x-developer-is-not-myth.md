---
layout: post
title: The 10x developer is NOT a myth
date: '2013-09-29T15:05:00.001-07:00'
author: Yevgeniy Brikman
tags:
- Hiring
- Software Engineering
modified_time: '2015-03-31T16:13:01.640-07:00'
blogger_id: tag:blogger.com,1999:blog-5422014336627804072.post-8716458741587159889
blogger_orig_url: http://brikis98.blogspot.com/2013/09/the-10x-developer-is-not-myth.html
add_to_popular_list: true
---

*Update: you can find a [Spanish translation of this blog post here](https://www.campusmvp.es/recursos/post/el-desarrollador-estrella-del-rock-10x-no-es-un-mito.aspx).*

Last night, I tweeted the following: 

<blockquote class="twitter-tweet" lang="en"><p>I&#39;m confused by the claim that &quot;10x&quot; or &quot;rockstar developers&quot; are a myth. Are star athletes, artists, writers, and, uh, rock stars, a myth?</p>&mdash; Yevgeniy Brikman (@brikis98) <a href="https://twitter.com/brikis98/status/384208625725497344">September 29, 2013</a></blockquote>
<script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script>

I got tons of replies and questions, but Twitter is an awful medium for 
discussion, so I'm writing this blog post as a follow-up. 

There have been 
[a](http://blog.jelastic.com/2012/04/24/7-programming-myths-busted/) 
[bunch](http://sdt.bz/36247) 
[of](http://www.knowing.net/index.php/2011/12/11/why-10x-ticks-me-off/) 
[articles](http://www.hanselman.com/blog/TheMythOfTheRockstarProgrammer.aspx) 
that claim that 10x developer doesn't exist. The arguments against it 
generally fall into 3 buckets: 

1. The original 10x number came from a single study (Sackman, Erikson, and 
Grant (1968)) that was flawed. 
1. Productivity is a fuzzy thing that's very hard to measure, so we can't make 
any claims like 10x. 
1. There is a distribution of talent, but there is no way a single engineer 
could do the work of 10. 

I disagree with all of these. Let's go through the arguments one by one. 
 
## It's not one study

Although armchair scientists on Twitter and Hacker News love to shoot 
down peer-reviewed studies, the evidence in this case is fairly compelling and 
not limited to a single study. Allow me to quote the top reply from this 
related [discussion on 
StackOverflow](http://programmers.stackexchange.com/questions/179616/a-good-programmer-can-be-as-10-times-more-productive-than-a-mediocre-one): 

<blockquote>
  <p>
    ...The original study that found huge variations in 
    individual programming productivity was conducted in the late 1960s by 
    Sackman, Erikson, and Grant (1968). They studied professional programmers with 
    an average of 7 years' experience and found that the ratio of initial coding 
    time between the best and worst programmers was about 20 to 1; the ratio of 
    debugging times over 25 to 1; of program size 5 to 1; and of program execution 
    speed about 10 to 1. They found no relationship between a programmer's amount 
    of experience and code quality or 
    productivity.
  </p>
  <p>
    Detailed examination of Sackman, 
    Erickson, and Grant's findings shows some flaws in their methodology... 
    However, even after accounting for the flaws, their data still shows more than 
    a 10-fold difference between the best programmers and the 
    worst.
  </p>
  <p>
    In years since the original study, the general 
    finding that "There are order-of-magnitude differences among programmers" has 
    been confirmed by many other studies of professional programmers (Curtis 1981, 
    Mills 1983, DeMarco and Lister 1985, Curtis et al. 1986, Card 1987, Boehm and 
    Papaccio 1988, Valett and McGarry 1989, Boehm et al 
    2000)...
  </p>
</blockquote>

Read more 
[here](http://programmers.stackexchange.com/questions/179616/a-good-programmer-can-be-as-10-times-more-productive-than-a-mediocre-one) 
and 
[here](http://www.construx.com/10x_Software_Development/Origins_of_10X_%E2%80%93_How_Valid_is_the_Underlying_Research_/). 

## If you can't measure it, you can still reason about it 

Even if you ignore the studies above and declare that "programming 
productivity" is hard to measure&mdash;which it is&mdash;we can still have a 
discussion about 10x programmers. Just because something is hard to measure 
doesn't mean we can't reason about it. 

For example, how did you pick the programming language for your most recent 
project? Did you look up a study that "proved" the language was more effective 
than other alternatives? Personally, I don't need an experiment to prove that 
Ruby will be an order of magnitude more productive choice for building a 
website than, say, C. You could throw together some rough metrics (library 
availability, community support, documentation), but the reality is that most 
people make this sort of language decision based on intuitive reasoning and 
not a double blind study. And despite the lack of hard data, I'd bet that 
picking Ruby over C for website development turns out to be the right decision 
most of the time. 

Of course, this isn't unique to programming: what "metric" could tell you one 
writer, artist, teacher, or philosopher is better than another? Merely from 
observing them, I can't give you a "productivity metric" that suggests 
Shakespeare, Nabokov, or Orwell were an order of magnitude better than the 
average writer, but the vast majority of people would agree that they are. 


## Programming is not manual labor 

The biggest problem with the pushback against a 10x programmer is that some 
people think of programming as manual labor and programmers as assembly line 
workers. Some programmers are a bit better than others, but surely, a single 
programmer could not consistently close 10 times as many tickets as another! 
And a team of 10 will always outperform a single coder! Nine women can't 
produce a baby in 1 month! 

The logic above makes it sound like programming productivity is all about 
typing speed; as if the 10x programmer is simply the one that produces 10 
times as much code as the average guy. This line of reasoning ignores that 
programming is a *creative* profession and not manual labor: there are many, 
many ways of solving the same problem. Instead of the baby analogy, think more 
of a crime solving analogy: 10 average detectives versus one Sherlock Holmes. 
Who will solve the crime faster? 

A 10x developer will have insights and find solutions that would never occur 
to an average programmer; they will avoid entire categories of problems that 
eat up enormous amounts of time amongst average programmers. 10 engineers 
writing the *wrong* code could definitely be out performed by a single 
engineer writing the *right* code. 

## Programming is about choices 

Consider how many decisions go into building a single software product, such 
as a website: what language do you use? What web framework(s)? What do you use 
for data storage? What do you use for caching? Where do you host the site? How 
do you monitor it? How do you push new changes? How do you store the code? 
What kind of automated testing do you setup? 

10 average programmers will make "average" quality decisions at each step and 
the costs or benefits of these decisions will *multiply*. Imagine traffic 
increases exponentially, and this average team setup an average website, with 
a data storage engine that's hard to shard, hosting that doesn't have enough 
redundancy, version control without proper backup, no CI environment, and no 
monitoring. How productive will those 10 coders be if they are spending all 
their time putting out fires? 

A single programmer could outperform this team of 10 if the programmer can 
model the problem in a way where *there is an order of magnitude less work to 
do*. From years of experience, a great programmer will know that errors are 
much more costly to fix later. By making good decisions up front, a 10x 
programmer may avoid *months* of work down the line. 

**It's not about writing more code; it's about writing the right code. You 
become a 10x programmer not by doing an order of magnitude more work, but by 
making better decisions an order of magnitude more often.** 

This isn't to say 10x programmers make no mistakes at all; but programmers 
make a huge number of choices every single day and great programmers make the 
right choices far more often than average programmers. 

And this isn't unique to programming. Would you rather have 10 average 
scientists or 1 Isaac Newton? 10 average scientists did not come up the laws 
of motion, theory of gravity, binomial series, calculus, etc; a single Isaac 
Newton did. Would you rather have Michael Jordan on your team or 10 average 
players (note: Jordan got paid ~10x the average NBA salary)? Would you rather 
let Steve Jobs or Elon Musk run a company or hand over the keys to 10 average 
entrepreneurs? 

## 10x programmers are rare 

It's important to put things into perspective. Star programmers, athletes, 
writers, and scientists are exceedingly rare. I wouldn't recommend building a 
hiring strategy around solely hiring "rock stars"; you'll end up looking 
foolish and lonely. Don't let perfect be the enemy of good: hire the best 
engineers you can get and give them ample opportunity to develop and get even 
better. 

However, don't fall into the fallacy that all programmers are created equal. 
There is a vast spectrum of ability in any creative profession. On one end are 
the type of hires that can sink an organization, actively increasing tech debt 
with every line of code they write. On the other, there are people who can 
write code that changes what is *possible* and have an impact that is an order 
of magnitude greater than the average. 