---
layout: post
title: "What you can't vibe code"
subtitle: Why SaaS and open source aren't quite dead, yet
tags: ["AI", "Programming"]
thumbnail_path: "blog/what-you-cant-vibe-code/what-you-cant-vibe-code.png"
header_image: "blog/what-you-cant-vibe-code/what-you-cant-vibe-code.png"
excerpt_separator: "<!--more-->"
---

SaaS is dead! Why pay monthly for some app when you can vibe code your own in a few hours?

Open source is dead! Why use some bloated, complicated library when you can vibe code your own that does just what you
need?

While it's true that GenAI tools like ChatGPT and Claude have made a huge dent in the "build vs buy" decision making
process, and it's sometimes cheaper and faster to vibe code your own software, there are a number of domains
where this is not the case.

<!--more-->

In particular, there are (at least) two areas of software that you can't vibe code:

1. Maturity
2. Maintenance

## Maturity

There are a number of domains in software where the cost of errors is exceptionally high. Here are some
common examples (though this is by no means a comprehensive list):

* Data storage
* Finance
* Security

Losing your customer's data, losing money, or having a security incident can all be catastrophic events for a company.
When I was writing _[Hello, Startup](https://www.hello-startup.net/)_, I talked to early engineers at companies like
Google, Facebook, Twitter, LinkedIn, Instagram, and Stripe, and while all these companies varied widely in their coding
practices, when it came to data storage, finance, and security, they all invested _heavily_ in code quality, testing,
and reliability. These were domains where you simply could not afford to get it wrong.

When it comes to domains like data storage, finance, and security, what you need is _mature, battle-tested, proven
solutions that you can trust_. And there is only one way to achieve that: time.

Back in 2001, Joel Spolsky told us that [good software takes ten
years](https://www.joelonsoftware.com/2001/07/21/good-software-takes-ten-years-get-used-to-it/), and despite all the
advancements with GenAI tools, this is still true today in certain domains. Building a database that can handle
concurrency correctly, survive crashes, and prevent data loss takes _decades_.[^1] Building a finance system
that is scalable, auditable, and fraud-resistant takes decades.[^2] Building secure software where all the major flaws
and exploits have been found and fixed takes decades.[^3]

The software in these domains is like an iceberg: you can vibe code the 10% that's visible above the surface,
such as the user interface and the basic functionality, but you can't vibe code the 90% that's hidden below the
surface, which consists of all the hard-won lessons that accrue as a result of years of trial-and-error. The 90% below
the surface is what captures all the non-obvious design choices, corner cases, bug fixes, security patches, performance
tweaks, scalability practices, technical trade-offs, and other critical decisions _that are impossible to know ahead of
time_.

**You cannot shortcut the process of maturity.** You have to put the software out into the real world, see where it fails,
iterate on it, and do so across many years and many use cases before you have something you can rely on. Nine women
can't make a baby in one month. No GenAI model, no matter how powerful, can bake 10 years of maturity into 1 day of vibe
coding.

To me, the risk/reward ratio of using a vibe-coded database, payment system, or cryptography library is just not worth
it for any important use case. In these sorts of domains, I will continue to choose the mature, proven,
[boring](https://boringtechnology.club/) solutions, most of which are either open source or SaaS.

## Maintenance

Vibe coding can reduce the initial development costs of a piece of software. However,
**[60-90% of the costs of software is in
maintenance](https://web.archive.org/web/20120313070806/http://users.jyu.fi/~koskinen/smcosts.htm)**: that is, all the
work _after_ the initial development. That includes adding new features, fixing bugs, recovering from outages, scaling
the infrastructure to match demand, patching security issues, and so on.

So even if you're looking at a software domain where the maturity of the software isn't that important, vibe coding
your own solution "for free" may still turn out to be more expensive than using a paid SaaS product. That's
because you'll constantly be pulled away from your normal job to do maintenance work on your vibe-coded solution, and
that cost could easily be more expensive than the cost of the SaaS product.

This isn't a new phenomenon. Long before GenAI, just about every engineer had a story where they decided to build
something themselves because it would be faster and cheaper, only to end up paying back the cost 10-fold. The reality
is that, as a software developer, there's always a temptation to build  things yourself. We justify it by saying we can
do it faster or better, but if we're being completely honest, we also do it because it's fun, challenging, something
new to learn, or something new to add to the resume. In many cases, giving into the temptation to build it yourself
is the wrong decision.

Unfortunately, vibe coding makes the temptation to DIY considerably stronger, as it dramatically reduces the initial
build costs. **The question to ask is not can you vibe code a replacement in one afternoon, but do you want to be
liable for dealing with every bug, every outage, and every security issue every afternoon going forward?** Unless
you're vibe coding something that requires no maintenance (e.g., something you use once and then throw away) or is core
to your business (in which case, spending time on it is worth it), there's a good chance that the maintenance costs
will come back to bite you.

Here's an example of just such a story in two acts:

**Act I**

<blockquote class="twitter-tweet"><p lang="en" dir="ltr">an employee at this startup that my sister works at, made their own JIRA - they&#39;ve all fully discarded JIRA/Linear/Trello, and are using their own tool.<br>It&#39;s faaar better than JIRA and is just as detailed. and this person is not even a developer, he leads QA.</p>&mdash; Neha Kalani (@thericebowlgirl) <a href="https://x.com/thericebowlgirl/status/2032883038343016515?ref_src=twsrc%5Etfw">March 14, 2026</a></blockquote> <script async src="https://platform.x.com/widgets.js" charset="utf-8"></script>

**Act II**

<blockquote class="twitter-tweet"><p lang="en" dir="ltr">quick update on how this is going: they have gone back to linear because maintaining their internal tool that they vibecoded was taking away from their actual work’s bandwidth. <a href="https://t.co/P31TPaLRFa">https://t.co/P31TPaLRFa</a></p>&mdash; Neha Kalani (@thericebowlgirl) <a href="https://x.com/thericebowlgirl/status/2081575149334335552?ref_src=twsrc%5Etfw">July 27, 2026</a></blockquote> <script async src="https://platform.x.com/widgets.js" charset="utf-8"></script>

We're likely to see this same thing play out many, many times in the near future. There's a reason open source and SaaS
have been so successful the last several decades: having a community in place to do maintenance, or an ongoing monthly
fee to cover the maintenance costs, is what makes the software reliable enough to use over the long term.

## Conclusion

Don't get me wrong, vibe coding is still useful. There are many cases where maturity and maintenance aren't important,
or simply where no open source or SaaS option exists, so it makes perfect sense to vibe code a solution. It's a great
way to spin up internal tools, side projects, and hobby/learning projects; it's a great way to lower the barrier to
entry, allowing far more people to create software than ever before; and it's damn fun.

But you also shouldn't take vibe coding too far. Don't cancel all your SaaS subscriptions and try to vibe code
replacements quite yet. Your cost/benefit calculation needs to take into account not only the up-front costs, but also:

- **The risk/reward ratio** of using immature and unproven software.
- **The liability** of having to maintain that software yourself.

If you need software that you can trust, and software that will keep working for years, then you'll need to find
solutions that are mature and maintained, and the main models that achieve this are the same ones we've relied on the
last several decades: open source and SaaS.

## Footnotes

[^1]: Oracle's first release was in 1979, MySQL in 1995, Microsoft SQL Server in 1989, and PostgreSQL in 1989.
[^2]: Visa first launched in 1958, American Express (which was started as a mail carrier in 1850) launched its first charge card in 1958, and Mastercard was originally founded in 1966.
[^3]: RSA was invented in 1977, elliptic curve cryptography in 1985, and AES in 2001.