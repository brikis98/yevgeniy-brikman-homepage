---
layout: post
title: "The 10:1 rule of writing and programming"
tags:
- Writing
- Software Engineering
thumbnail_path: blog/thumbs/editing.jpg
---

> Hofstadter's Law: It always takes longer than you expect, even when you take into account Hofstadter's Law.
>
> — Douglas Hofstadter, **Gödel, Escher, Bach**

Writing prose and writing code have a lot in common, but perhaps the biggest similarity is that neither writers nor
programmers can get things done on time. Writers are notorious for missing deadlines. Programmers are notorious for
being wildly off with estimates. The question is, why?

Today, I had an idea for how to answer this question. What I found was eye opening.

## Looking into my books

I wrote both of my books,
*[Hello, Startup](https://www.amazon.com/Hello-Startup-Programmers-Building-Technologies/dp/1491909900)* and
*[Terraform: Up & Running](https://www.amazon.com/Terraform-Running-Writing-Infrastructure-Code/dp/1491977086)*,
using [Atlas](https://atlas.oreilly.com/), which manages all the content in Git. That means that every line of text,
every edit, and every change was captured in the Git commit log.

So what does it really take to write two books?

#### Hello, Startup

Let's start with my first book,
*[Hello, Startup](https://www.amazon.com/Hello-Startup-Programmers-Building-Technologies/dp/1491909900)*, which is
602 pages long and contains roughly 190,000 words. I ran [cloc](https://github.com/AlDanial/cloc) in the
*Hello, Startup* Git repo and got the following output  (truncated for readability):

{% highlight text %}
-------------------------------------------------------------
Language                     files          blank        code
-------------------------------------------------------------
AsciiDoc                        18           3392       20495
HTML                            20             35        3149
Java                           103            654        2308
Ruby                             8             28         110
JSON                             1              0          79
Python                           1             34          67
CSS                              4             25          58
[...]
-------------------------------------------------------------
SUM:                           182           4241       26571
-------------------------------------------------------------
{% endhighlight %}

So the 602 pages comes from 26,571 lines of text. The vast majority of those lines are in
[AsciiDoc](https://www.methods.co.nz/asciidoc/), which is the Markdown-like language used in Atlas to write almost
all the content. The rest consists of HTML and CSS, which are used in Atlas to define the layout and
structure of the book, plus a whole bunch of other programming languages (Java, Ruby, Python, etc.) which are used in
the many code examples throughout the book.

But the 602 pages and 26,571 lines we see are just the final result. They don't capture the roughly 10 months of
writing, rewriting, editing, proofreading, copyediting, researches, notes, and other work it took to get there. To get
more insight, I used [git-quick-stats](https://github.com/arzzen/git-quick-stats#usage) to analyze the entire commit
log for the book:

{% highlight text %}
Yevgeniy Brikman:
  insertions:    163756 (95%)
  deletions:     131425 (95%)
  files:         1693 (59%)
  commits:       544 (32%)
{% endhighlight %}

So, I added 163,756 lines and deleted 131,425 lines, for a total of 295,181 lines of code churn. That is, I wrote
and deleted 295,181 lines of to produce a final output of 26,571 lines. That's a ratio of more than 10:1! For every 1
line that got published, I actually had to write 10!

I admit that lines added and removed in Git are not a perfect measure of the editing process, but if anything, this
data understates the work involved, as much of the editing process isn't reflected in the Git commit log at all. For
example, I  wrote the first few chapters in Google Docs before switching to Atlas and I made many rounds of edits on
my computer without commits in between.

The data is far from perfect, but I suspect the order of magnitude is correct: a 10:1 ratio of raw text to published
text.

## Terraform: Up & Running

Let's see if the numbers are similar for my second book,
*[Terraform: Up & Running](https://www.amazon.com/Terraform-Running-Writing-Infrastructure-Code/dp/1491977086)*, which
is 206 pages and contains roughly 52,000 words. Here's the (truncated) output from <code>cloc</code>:

{% highlight text %}
---------------------------------------------------------------
Language                     files          blank          code
---------------------------------------------------------------
AsciiDoc                         8           1268          4283
HCL                             64            507          1730
Markdown                        40            583          1453
Go                               8            164           427
Bourne Shell                    20             57           142
[...]
---------------------------------------------------------------
SUM:                           170           2670          8410
---------------------------------------------------------------
{% endhighlight %}

Those 206 pages come from 8,410 lines of text. Again, the majority of the text is AsciiDoc, though you can see this
book has even more code examples, primarily in HCL, which is the underlying language used in Terraform. There's also
lots of Markdown, which I used to document those HCL examples.

Let's use <code>git-quick-stats</code> to check the edit history for this book:

{% highlight text %}
Yevgeniy Brikman:
  insertions:    32209 (85%)
  deletions:     22402 (89%)
  files:         1662 (70%)
  commits:       256 (28%)
{% endhighlight %}

Over roughly 5 months, I added 32,209 lines and deleted 22,402 lines, for a total of 54,611 lines of code churn. In
this case, the editing process is even more understated, as *Terraform: Up & Running* started as a
[blog post series](https://blog.gruntwork.io/a-comprehensive-guide-to-terraform-b3d32832baca), which went through
considerable churn before I moved it over to Atlas and Git. The blog post series is about half the length of the book,
so it seems reasonable to increase the total churn by 50%. That gives us 54,611 * 1.5 = 81,916 lines of churn to
produce 8,410 lines in the final result.

Again, we see a ratio of roughly 10:1! No wonder writers miss deadlines. We're being held to a schedule for a 250
page book, but to write such a book, we actually have to write 2,500 pages.

## What about programming?

So how does writing a book compare to writing code? I decided to take a look at a few open source Git repos of various
levels of maturity, from a few months old, all the way up to 23 years old.

#### terraform-aws-couchbase (2018)

[terraform-aws-couchbase](https://github.com/gruntwork-io/terraform-aws-couchbase/) is a set of modules open sourced
in 2018 to deploy and manage Couchbase on AWS. Here's the (truncated) <code>cloc</code> output:

{% highlight text %}
---------------------------------------------------------------
Language                      files          blank         code
---------------------------------------------------------------
HCL                              30            662         2298
Bourne Again Shell                7            326         1622
Markdown                         21            664         1270
Bourne Shell                     13            260         1069
Go                                7            211          795
[...]
---------------------------------------------------------------
SUM:                             94           2177         7481
---------------------------------------------------------------
{% endhighlight %}

And here are the <code>git-quick-stats</code> totals:

{% highlight text %}
total:
	  insertions:    24417 (100%)
	  deletions:     13276 (100%)
	  files:         926 (100%)
	  commits:       333 (100%)
{% endhighlight %}

That's 37,693 lines of code churn to produce 7,481 final lines of code, or a 5:1 ratio. Even on a repo that's less than
5 months old, we've already rewritten every line 5 times! No wonder software estimation is hard. We come up with a time
estimate for ~7,500 lines of code, not realizing that we'll have to write ~35,000 lines of code to get there!

Let's see what happens when we look at a slightly older codebase.

#### Terratest (2016)

[Terratest](https://github.com/gruntwork-io/terratest) is an open source library that was created in 2016 for testing
infrastructure code. Here's the (truncated) <code>cloc</code> output:

{% highlight text %}
-------------------------------------------------------------
Language                     files          blank        code
-------------------------------------------------------------
Go                              78           1204        4466
Markdown                        16            446         949
HCL                             20            159         451
[...]
-------------------------------------------------------------
SUM:                           136           1857        6140
-------------------------------------------------------------
{% endhighlight %}

And here are the <code>git-quick-stats</code> totals:

{% highlight text %}
total:
  insertions:    29247 (100%)
  deletions:     19879 (100%)
  files:         1254 (100%)
  commits:       394 (100%)
{% endhighlight %}

That's 49,126 lines of code churn to produce 6,140 final lines of code, or an 8:1 ratio for this ~2 year old repo. But
Terratest is still fairly young, so let's go back in time a bit more.

#### Terraform (2014)

[Terraform](https://github.com/hashicorp/terraform) is an open source library released in 2014 for managing
infrastructure as code. Here's the (truncated) <code>cloc</code> output:

{% highlight text %}
--------------------------------------------------------------
Language                      files          blank        code
--------------------------------------------------------------
Go                             3858         232296     1326665
Markdown                        218           6783       23160
JSON                             24             15        7685
HCL                             794            917        4885
Assembly                         33            281        2459
Protocol Buffers                 18            583        1827
Bourne Shell                     36            328        1717
Perl                             16            271        1554
[...]
--------------------------------------------------------------
SUM:                           5045         241890     1371718
--------------------------------------------------------------
{% endhighlight %}

And here are the <code>git-quick-stats</code> totals:

{% highlight text %}
total:
  insertions:    7568830 (100%)
  deletions:     5377136 (100%)
  files:         82960 (100%)
  commits:       17125 (100%)
{% endhighlight %}

That's 12,945,966 lines of code churn to produce 1,371,718 final lines of code, or an 9:1 ratio. Terraform is about 4
years old now, but it hasn't hit a 1.0 release yet, so even with a 9:1 ratio, it's not a fully "mature" codebase. Let's
go back a few more years.

#### Express.js (2010)

[Express](https://github.com/expressjs/express) is a popular open source JavaScript web framework that was released
in 2010. Here's the (truncated) <code>cloc</code> output:

{% highlight text %}
-------------------------------------------------------------
Language                      files          blank       code
-------------------------------------------------------------
JavaScript                      147           3282      11673
Markdown                          8            734       3314
[...]
-------------------------------------------------------------
SUM:                            174           4033      15325
-------------------------------------------------------------
{% endhighlight %}

And here are the <code>git-quick-stats</code> totals:

{% highlight text %}
total:
  insertions:    123129 (100%)
  deletions:     101082 (100%)
  files:         10696 (100%)
  commits:       5024 (100%)
{% endhighlight %}

That's 224,211 lines of code churn to produce 15,325 final lines of code, or a 14:1 ratio. At the time of writing,
Express is ~8 years old, on version 4.x, and the most popular and battle-tested web framework for Node.js. It seems
that once we're north of a 10:1 ratio, we can confidently say that a codebase is "mature." Let's see what happens if
we go back even further in time.

#### jQuery (2006)

[jQuery](https://github.com/jquery/jquery) is a popular open source JavaScript library that came out in 2006. Here's
the (truncated) <code>cloc</code> output:

{% highlight text %}
---------------------------------------------------------------
Language                     files          blank          code
---------------------------------------------------------------
JavaScript                     177          11020         44390
HTML                            50            116          1958
[...]
---------------------------------------------------------------
SUM:                           250          11500         47559
---------------------------------------------------------------
{% endhighlight %}

And here are the <code>git-quick-stats</code> totals:

{% highlight text %}
total:
  insertions:    398332 (100%)
  deletions:     331814 (100%)
  files:         12143 (100%)
  commits:       6090 (100%)
{% endhighlight %}

That's 730,146 lines of code churn to produce 47,559 final lines of code, or a 15:1 ratio for this ~12 year old repo.
Let's go back another 10 years and see what we find.

#### MySQL (1995)

[MySQL](https://github.com/mysql/mysql-server) is a popular open source relational database that came out in 1995.
Here's the (truncated) <code>cloc</code> output:

{% highlight text %}
-------------------------------------------------------
Language              files          blank         code
-------------------------------------------------------
C++                    3189         336798      1859803
C/C++ Header           3394         134989       812273
JavaScript             3668          39539       439770
JSON                     89             17       103555
Pascal                  187          13973        92623
CSS                     558           2420        92385
C                       215          15307        90811
Java                    526          12790        54568
Perl                    125           7522        23273
CMake                   264           2965        17860
SQL                      41           1225        17667
[...]
-------------------------------------------------------
SUM:                  12835         577395      3662869
-------------------------------------------------------
{% endhighlight %}

And here are the <code>git-quick-stats</code> totals:

{% highlight text %}
total:
  insertions:    35992625 (100%)
  deletions:     22570374 (100%)
  files:         570117 (100%)
  commits:       79845 (100%)
{% endhighlight %}

That's 58,562,999 lines of code churn to produce 3,662,869 final lines of code, or a 16:1 ratio for this ~23 year old
repo. Wow! Roughly speaking, every single line of MySQL has been rewritten 16 times.

## Conclusion

Here's a summary of the data we've seen for books:

<table class="table-light mt2 mb3 no-wrap">
  <thead>
    <tr>
      <th style="min-width: 220px">Name</th>
      <th>Churn</th>
      <th>Lines</th>
      <th>Ratio</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><a href="https://www.amazon.com/Hello-Startup-Programmers-Building-Technologies/dp/1491909900">Hello, Startup</a></td>
      <td>295,181</td>
      <td>26,571</td>
      <td>11:1</td>
    </tr>
    <tr>
      <td><a href="https://www.amazon.com/Terraform-Running-Writing-Infrastructure-Code/dp/1491977086">Terraform: Up & Running</a></td>
      <td>81,916</td>
      <td>8,410</td>
      <td>10:1</td>
    </tr>
  </tbody>
</table>

And here's a summary of what we've seen for programming:

<table class="table-light mt2 mb3 no-wrap">
  <thead>
    <tr>
      <th style="min-width: 220px">Name</th>
      <th>Released</th>
      <th>Churn</th>
      <th>Lines</th>
      <th>Ratio</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><a href="https://github.com/gruntwork-io/terraform-aws-couchbase/">terraform-aws-couchbase</a></td>
      <td>2018</td>
      <td>37,693</td>
      <td>7,481</td>
      <td>5:1</td>
    </tr>
    <tr>
      <td><a href="https://github.com/gruntwork-io/terratest">Terratest</a></td>
      <td>2016</td>
      <td>49,126</td>
      <td>6,140</td>
      <td>8:1</td>
    </tr>
    <tr>
      <td><a href="https://github.com/hashicorp/terraform">Terraform</a></td>
      <td>2014</td>
      <td>12,945,966</td>
      <td>1,371,718</td>
      <td>9:1</td>
    </tr>
    <tr>
      <td><a href="https://github.com/expressjs/express">Express</a></td>
      <td>2010</td>
      <td>224,211</td>
      <td>15,325</td>
      <td>14:1</td>
    </tr>
    <tr>
      <td><a href="https://github.com/jquery/jquery">jQuery</a></td>
      <td>2006</td>
      <td>730,146</td>
      <td>47,559</td>
      <td>15:1</td>
    </tr>
    <tr>
      <td><a href="https://github.com/mysql/mysql-server">MySQL</a></td>
      <td>1995</td>
      <td>58,562,999</td>
      <td>3,662,869</td>
      <td>16:1</td>
    </tr>
  </tbody>
</table>

So what do all these numbers mean?

#### The 10:1 rule of writing and programming

Give that my data set is limited, I can only draw a few preliminary conclusions:

1. The ratio of "raw materials" to "finished product" in a book is roughly 10:1. Keep this in mind the next time an
   editor asks you for a timeline! If you want to write a 300 page book, you'll probably have to write around
   3,000 pages.

1. Similarly, the ratio of "code churn" to "lines of code" in mature and non-trivial software is also at least 10:1.
   Keep this in mind the next time a manager or customer asks you for a time estimate! To build a 10,000 line app,
   expect to write roughly 100,000 lines.

These can be summarized as what I shall dub the **10:1 rule of writing and programming**:

> Good software and good writing requires that every line has been rewritten, on average, at least 10 times.

#### Next steps

Of course, lines of code and lines of writing are an imperfect measure, but I think given enough data, we may be able
to determine if the 10:1 rule actually holds up, and if it's useful to help improve estimation.

Some questions I'd love to know the answer to:

* Could we use the ratio of code churn to lines of code as a quick measure of the maturity of a piece of software?
  For example, for critical pieces of infrastructure, such as databases, programming languages, and operating
  systems, should we only trust code that has at least a 10:1 ratio?
* Does the amount of churn depend on the type of software? For example, Bill Scott found that at Netflix, [only about
  10% of the UI code lasted more than a year, and the other 90% had to be thrown
  away](http://looksgoodworkswell.blogspot.com/2012/04/experimentation-layer.html). What are the rates of churn in
  backend code, databases, CLI tools, and so on?
* What percentage of code churn comes *after* the initial release? That is, what percentage of work can be classified
  as "software maintenance?"

If you have written a book and can do a similar analysis, I'd love to hear what numbers you found! And if anyone has
time to automate this analysis, I'd love to see what the ratios are across a variety of open source projects. Share
your thoughts in the comments!

#### Update, 08/13/18

This blog hit the front page of
[Hacker News](https://news.ycombinator.com/item?id=17749750) and
[Reddit's r/programming](https://www.reddit.com/r/programming/comments/96vlmk/the_101_rule_of_writing_and_programming/)!

Two quick notes from those discussions:

First, it looks like similar 10:1 rules show up in [film, journalism, music, and
photography](https://news.ycombinator.com/item?id=17750165)! How cool is that?

Second, a common response is that even a single character change may show up in Git as an "inserted line" or "deleted
line", so when you see 100,000 lines were changed, it doesn't mean that _all_ the text in those lines was rewritten.
This is true, but as I wrote above, there are also many types of changes missing from the data:

1. I don't do a commit for every single line that I change. In fact, I may change a line 10 times, and commit only once.
1. This is actually even more pronounced for code. While doing a code-test cycle, I may change a few lines of code 50
   times over, but only do one commit.
1. For my books, a lot of edit rounds and writing happened outside of Git (e.g., I wrote some of the chapters in Google
   Docs or Medium and O'Reilly does copyediting in a PDF).

My guess is that these two factors roughly cancel out. It won't be exact, of course, and the actual ratio may be 8:1 or
12:1, but the order of magnitude is probably correct, and 10:1 is easier to remember.

#### Update, 08/14/18

GitHub user [Decagon](https://github.com/Decagon) created a repo called
[hofs-churn](https://github.com/Decagon/hofs-churn) that contains a Bash script to easily calculate code churn for your
Git repos. He also ran it across a variety of open source repos such as React.js, Vue, Angular, RxJava, and many
others, and the results are pretty interesting!

