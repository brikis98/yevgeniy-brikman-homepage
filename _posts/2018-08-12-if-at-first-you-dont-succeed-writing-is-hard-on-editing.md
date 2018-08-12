---
layout: post
title: "The 10:1 rule of writing and programming"
tags:
- Writing
- Software Engineering
thumbnail_path: blog/thumbs/editing.jpg
---

I wrote both of my books,
*[Hello, Startup](https://www.amazon.com/Hello-Startup-Programmers-Building-Technologies/dp/1491909900)* and
*[Terraform: Up & Running](https://www.amazon.com/Terraform-Running-Writing-Infrastructure-Code/dp/1491977086)*,
using O'Reilly Media's [Atlas](https://atlas.oreilly.com/), which lets you create all the content using a combination
of [AsciiDoc](https://www.methods.co.nz/asciidoc/) (which is somewhat similar to Markdown), HTML, and CSS files checked
into Git. Since I had the full history of both books in Git—every edit, every commit, every line changed—I figured I'd
nerd out a bit and calculate some stats on what it really takes to create two books.

What I found was, frankly, a bit shocking. And what's even more surprising is that the same findings seem apply to
programming too.

## Hello, Startup

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
YAML                             4              9          53
XSLT                             2              5          45
Markdown                         2             15          44
SQL                              4             10          41
Bourne Shell                     4             13          34
Groovy                           2              6          27
C                                2              4          27
Scala                            1              6          11
JavaScript                       2              1           9
ERB                              1              1           5
Dockerfile                       1              3           5
Haskell                          2              0           4
-------------------------------------------------------------
SUM:                           182           4241       26571
-------------------------------------------------------------
{% endhighlight %}

So the 602 pages comes from 26,571 lines of "code." The vast majority of that code is, unsurprisingly, AsciiDoc, which
contains almost all the text in the book. The rest consists of HTML and CSS, which are used to define the layout and
structure of the book, plus a whole bunch of other programming languages (Java, Ruby, JSON, Python, SQL, Haskell, etc.)
which are used in the many code examples throughout the book.

But the 26,571 lines we see are just the final result. They don't capture the roughly 10 months of work it took to
get there. To get more insight, I used [git-quick-stats](https://github.com/arzzen/git-quick-stats#usage) to analyze
the entire commit log for the book and find out just how many lines were added, deleted, and changed:

{% highlight text %}
Yevgeniy Brikman:
  insertions:    163756 (95%)
  deletions:     131425 (95%)
  files:         1693 (59%)
  commits:       544 (32%)
{% endhighlight %}

So, I added 163,756 lines and deleted 131,425 lines—a total of 295,181 lines of code churn—to produce a final output
of 26,571 lines. That's a ratio of more than 10:1! I admit that lines added and removed in Git are not a perfect
measure of the editing process, but if anything, this data understates the work involved, as much of the editing process
isn't reflected in Git at all (e.g., I wrote the first few chapters in Google Docs before switching to Atlas; the
copyediting process used PDFs; I made many rounds of edits locally without commits in between). Despite that, this data
gives us a rough order of magnitude: for every one line in the final book, I wrote roughly 10 lines in the earlier
drafts.

## Terraform: Up & Running

Let's see how the numbers look with my second book,
*[Terraform: Up & Running](https://www.amazon.com/Terraform-Running-Writing-Infrastructure-Code/dp/1491977086)*, which
is 206 pages and contains roughly 52,000 words. Here's the output from <code>cloc</code>:

{% highlight text %}
---------------------------------------------------------------
Language                     files          blank          code
---------------------------------------------------------------
AsciiDoc                         8           1268          4283
HCL                             64            507          1730
Markdown                        40            583          1453
Go                               8            164           427
Bourne Shell                    20             57           142
JSON                             5              0           125
Ruby                             5             24           102
HTML                             9             22            77
YAML                             4              5            33
CSS                              4             32            22
Dockerfile                       3              8            16
---------------------------------------------------------------
SUM:                           170           2670          8410
---------------------------------------------------------------
{% endhighlight %}

Those 206 pages come from 8,410 lines of "code." Again, the vast majority is AsciiDoc, but this book has even more code
examples, the vast majority in HCL, the underlying language used in Terraform, and Markdown, which I used to document
those examples. Let's use <code>git-quick-stats</code> to check the edit history for this book:

{% highlight text %}
Yevgeniy Brikman:
  insertions:    32209 (85%)
  deletions:     22402 (89%)
  files:         1662 (70%)
  commits:       256 (28%)
{% endhighlight %}

Over roughly 5 months, I added 32,209 lines and deleted 22,402 lines—a total of 54,611 lines of code churn—to produce a
final output of 8,410 lines, or a ratio of 6:1. In this case, the editing process is even more understated, as
*Terraform: Up & Running* started as a
[blog post series](https://blog.gruntwork.io/a-comprehensive-guide-to-terraform-b3d32832baca), which went through
considerable churn itself. The blog post series is about half the length of the book, so I'd guess the real churn was
~50% higher, or 54,611 * 1.5 = 81,916 lines of churn to produce 8,410 lines in the final result. Again, we see a ratio
of 10:1!

## What about programming?

Going through this exercise made me curious: how does writing a book compare to writing code? I decided to take a look
at a few repos of various levels of maturity, from a few months old, all the way up to 23 years old.

#### terraform-aws-couchbase (2018)

[terraform-aws-couchbase](https://github.com/gruntwork-io/terraform-aws-couchbase/) is a set of modules open sourced
in 2018 to deploy and manage Couchbase on AWS. Here's the <code>cloc</code> output:

{% highlight text %}
---------------------------------------------------------------
Language                      files          blank         code
---------------------------------------------------------------
HCL                              30            662         2298
Bourne Again Shell                7            326         1622
Markdown                         21            664         1270
Bourne Shell                     13            260         1069
Go                                7            211          795
YAML                              6             50          248
JSON                              9              0          173
TOML                              1              4            6
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

That's 37,693 lines of code churn to produce 7,481 final lines of code, or a 5:1 ratio for this ~5 month old repo.

#### Terratest (2016)

[Terratest](https://github.com/gruntwork-io/terratest) is an open source library created in 2016 for testing
infrastructure code. Here's the <code>cloc</code> output:

{% highlight text %}
-------------------------------------------------------------
Language                     files          blank        code
-------------------------------------------------------------
Go                              78           1204        4466
Markdown                        16            446         949
HCL                             20            159         451
JSON                            10              0          99
Dockerfile                       4             14          80
YAML                             3             10          41
TOML                             1              8          21
Bourne Shell                     3             11          21
Ruby                             1              5          12
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

That's 49,126 lines of code churn to produce 6,140 final lines of code, or an 8:1 ratio for this ~2 year old repo.

#### Terraform (2014)

[Terraform](https://github.com/hashicorp/terraform) is a popular open source library released in 2014 for managing
infrastructure as code. Here's the <code>cloc</code> output:

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
ERB                               9            127         642
make                             17            121         401
Ruby                              2             61         241
Fish Shell                        1             18         134
YAML                              7             27         121
Python                            1             13          95
Dockerfile                        3             15          53
Bourne Again Shell                4             14          32
C                                 1             10          24
TOML                              1              6          12
INI                               1              2          10
C/C++ Header                      1              2           1
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

That's 12,945,966 lines of code churn to produce 1,371,718 final lines of code, or an 9:1 ratio for this ~4 year old
repo.

#### Express.js (2010)

[Express](https://github.com/expressjs/express) is a popular open source JavaScript web framework that was released
in 2010. Here's the <code>cloc</code> output:

{% highlight text %}
-------------------------------------------------------------
Language                      files          blank       code
-------------------------------------------------------------
JavaScript                      147           3282      11673
Markdown                          8            734       3314
JSON                              1              0         98
YAML                              3              3         68
Handlebars                        3              5         65
CSS                               4              1         44
HTML                              6              2         40
Bourne Again Shell                1              4         12
make                              1              2         11
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

That's 224,211 lines of code churn to produce 15,325 final lines of code, or a 14:1 ratio for this ~8 year old
repo.

#### jQuery (2006)

[jQuery](https://github.com/jquery/jquery) is a popular open source JavaScript library that came out in 2006. Here's
the <code>cloc</code> output:

{% highlight text %}
---------------------------------------------------------------
Language                     files          blank          code
---------------------------------------------------------------
JavaScript                     177          11020         44390
HTML                            50            116          1958
Markdown                         5            201           370
CSS                              3            101           342
JSON                             9             24           240
PHP                              2             34           203
XML                              2              0            36
YAML                             2              4            20
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

That's 730,146 lines of code churn to produce 47,559 final lines of code, or an 15:1 ratio for this ~12 year old repo.

#### MySQL (1995)

[MySQL](https://github.com/mysql/mysql-server) is a popular open source relational database that came out in 1995.
Here's the <code>cloc</code> output (truncated for readability):

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
Python                   33           1906         8191
HTML                     90            799         7427
Bourne Shell            106           1409         6773
LESS                     94            472         6590
XML                      36            712         6535
Markdown                 28           2009         4754
Puppet                   22              0         3374
Protocol Buffers         28            638         3070
make                     33            304         1251
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

That's 58,562,999 lines of code churn to produce 3,662,869 final lines of code, or an 16:1 ratio for this ~23 year old
repo.

## The 10:1 ratio

Here's a summary of what we've seen for books:

<table class="table-light mt2 mb3 no-wrap">
  <thead>
    <tr>
      <th style="min-width: 220px">Name</th>
      <th>Duration</th>
      <th>Churn</th>
      <th>Lines</th>
      <th>Ratio</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><a href="https://www.amazon.com/Hello-Startup-Programmers-Building-Technologies/dp/1491909900">Hello, Startup</a></td>
      <td>10 months</td>
      <td>295,181</td>
      <td>26,571</td>
      <td>11:1</td>
    </tr>
    <tr>
      <td><a href="https://www.amazon.com/Terraform-Running-Writing-Infrastructure-Code/dp/1491977086">Terraform: Up & Running</a></td>
      <td>5 months</td>
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

Here are my preliminary takeaways from this this very limited data set:

1. I would guess that the ratio of "raw materials" to "finished product" in a book is roughly 10:1. If you want to
   write a 300 page book, you'll probably end up writing closer to 3,000 pages, and throwing 90% of it away.

1. Similarly, I would guess that the ratio of "code churn" to "lines of code" in a *mature and battle-tested* piece of
   non-trivial software is also at least 10:1. For every line of code in the final product, expect to write 10 lines,
   and throw 90% of them away.

In 2012, Bill Scott wrote that at Netflix, [only about 10% of the UI code lasted more than a year, and 90% had to be
thrown away](http://looksgoodworkswell.blogspot.com/2012/04/experimentation-layer.html). In 2001, Joel Spolsky wrote
that [good software takes ten years](https://www.joelonsoftware.com/2001/07/21/good-software-takes-ten-years-get-used-to-it/).

I now propose the **10:1 rule of writing and programming**:

> Good software and good writing requires that every line has been rewritten, on average, at least 10 times.

Of course, lines of code and lines of writing are an imperfect measure, but I think given enough data, we may be able
to determine if this law actually holds and is useful. If you have written a book and can do a similar analysis, I'd
love to hear what numbers you found. And if anyone has time to write a tool to automate this analysis, I'd love to see
what the ratios are for other popular open source projects. Do the tools that seem buggy and immature have a lower
ratio than the ones you fully trust in production? Could we use this as a quick measure of the quality and maturity of
a GitHub project?

Share your thoughts in the comments!

