---
layout: post
title: Bitcoin by analogy
date: '2014-04-24T11:51:00.000-07:00'
author: Yevgeniy Brikman
tags:
- Bitcoin
modified_time: '2014-04-29T13:49:56.625-07:00'
thumbnail_path: blog/bitcoin/bitcoin-logo.png
blogger_id: tag:blogger.com,1999:blog-5422014336627804072.post-879076770255702128
blogger_orig_url: http://brikis98.blogspot.com/2014/04/bitcoin-by-analogy.html
excerpt: |
  Bitcoin is the first purely digital, decentralized money. It has been on my 
  mind a lot lately and apparently, I'm not the only one. Paul Graham called it 
  a paradigm shift; Marc Andreessen believes Bitcoin is as big of a 
  technological breakthrough as PCs and the Internet; Ben Bernanke said virtual 
  currencies may hold long-term promise; Chris Dixon is investing millions in 
  it; Google is interested in Bitcoin; Apple is afraid of it. In short, Bitcoin 
  is something you should be paying attention to.
add_to_popular_list: true
---

{% include figure.html path="blog/bitcoin/bitcoin-logo.png" alt="Bitcoin" %}

<blockquote>
  <p>
    Hackers are the animals that can detect a storm coming or an earthquake. 
    They just know, even though they don't know why, and there are two big 
    things hackers are excited about now and can't articulate why&mdash;Bitcoin 
    and 3D printing.
  </p>
  <cite>
    Paul Graham, <a href="http://blogs.wsj.com/venturecapital/2013/05/07/coinbase-nabs-5m-in-biggest-funding-for-bitcoin-startup/">Wall Street Journal</a>
  </cite>
</blockquote>

[Bitcoin](https://bitcoin.org/) 
is the first purely digital, decentralized money. It has been on my mind a lot 
lately and apparently, I'm not the only one. Paul Graham called it a [paradigm 
shift](https://news.ycombinator.com/item?id=5402513); Marc Andreessen believes 
[Bitcoin is as big of a technological breakthrough as PCs and the 
Internet](http://dealbook.nytimes.com/2014/01/21/why-bitcoin-matters/); Ben 
Bernanke said virtual currencies [may hold long-term 
promise](http://qz.com/148399/ben-bernanke-bitcoin-may-hold-long-term-promise/); 
[Chris Dixon is investing millions in 
it](http://cdixon.org/2013/12/31/why-im-interested-in-bitcoin/); [Google is 
interested in 
Bitcoin](http://motherboard.vice.com/blog/why-silicon-valley-and-google-loves-bitcoin); 
[Apple is afraid of 
it](http://www.forbes.com/sites/jonmatonis/2012/06/13/why-apple-is-afraid-of-bitcoin/). 
In short, Bitcoin is something you should be paying attention to. 

Using Bitcoin is easy: to pay with Bitcoin, you just install an app called a 
[Bitcoin wallet](https://bitcoin.org/en/choose-your-wallet) on your computer 
or mobile device and click some buttons in the app to send money to other 
Bitcoin users over the Internet: 

{% include figure.html path="blog/bitcoin/bitcoin-wallet.jpg" alt="Bitcoin wallet app" %}

To receive money, you just give people your bitcoin address, or [create a QR 
code](http://bitcoinqrcode.org/). For example, here's mine: 

{% include bitcoin_qr_code.html amount="0.5" label="Bitcoin by analogy" %}

Understanding what's happening under the hood is a bit trickier. I read a 
number of articles, but still couldn't wrap my head around many of the 
details. Therefore, in the spirit of "the best way to learn is to teach", I 
forced myself to write this blog post as a learning tool. 

The post is broken up into a series of questions about Bitcoin: 

1. **Validity**: is Bitcoin really money? 
1. **Decentralized money**: how can you have a currency that no one controls? 
1. **Decentralized mint**: how is money created in Bitcoin? 
1. **Decentralized transactions**: how do you transfer money in Bitcoin? 
1. **Decentralized ledgers**: how are transactions recorded in Bitcoin? 
1. **Further reading**: where can I find more info? 

Also, in the spirit of "if you can't explain it simply, you don't understand 
it well enough", I've tried to make the key Bitcoin concepts accessible to 
audiences without a programming background. Most sections in this post start 
with a simple analogy for Bitcoin that involves no tech whatsoever before 
diving into the tech details. 

Of course, I'm a Bitcoin novice myself, so if after reading this you're still 
confused, or I've made any errors or omissions, please leave a comment! 

## Validity 

{% include figure.html path="blog/bitcoin/bitcoin-accepted-here.png" alt="Bitcoin accepted here" %}

Before discussing how Bitcoin works, let's answer a common question: how can 
Bitcoin be considered money? It was created by a bunch of computer programmers 
with no government backing; it's purely digital, so it exists only on 
computers and has no "intrinsic value"; it might not even fit the standard 
[definition of 
money](http://en.wikipedia.org/wiki/Bitcoin#Classification_as_money) because 
it's not a [stable store of 
value](http://en.wikipedia.org/wiki/Store_of_value) and rarely used as a [unit 
of account](http://en.wikipedia.org/wiki/Unit_of_account). 

Despite all that, Bitcoin is still used as a [medium of 
exchange](http://en.wikipedia.org/wiki/Medium_of_exchange): thousands of 
merchants are willing to accept Bitcoin in trade for real goods or services. 
Why? Because these merchants see Bitcoin as an effective medium of exchange 
and they believe that other merchants will feel the same way in the future. 
Or, to put it another way: 

<blockquote>
  <p>
    It's not as much that the Bitcoin currency has some arbitrary value and 
    then people are trading with it; it's more that people can trade with 
    Bitcoin (anywhere, everywhere, with no fraud and no or very low fees) and 
    as a result it has value.
  </p>
  <cite>Marc Andreessen, <a href="http://dealbook.nytimes.com/2014/01/21/why-bitcoin-matters/">Why Bitcoin Matters</a></cite>
</blockquote>

## Decentralized money (analogy)

[Yap](http://en.wikipedia.org/wiki/Yap) is a nation in the South Pacific that 
uses a unique form of money called [Rai 
stones](http://en.wikipedia.org/wiki/Rai_stones), which are circular disks 
carved out of limestone, with a hole in the middle, that can be up to 12 feet 
in diameter and weigh up to 8,800 lbs! 

{% include figure.html path="blog/bitcoin/yap-stone.jpg" alt="Yap stone money" %}

Trading stones of this size is difficult: no one wants to cart around a 4 ton 
stone every time they make a purchase. As a result, the Yapese came up with a 
clever solution: they decided to determine ownership by verbal agreement. 
Whenever there was a trade, the parties involved would communicate to the rest 
of the tribe the amount of stone that had been exchanged. The stones wouldn't 
actually move from one house to another, but the knowledge of who owned what 
was memorized and handed down through oral history. 

{% include figure.html path="blog/bitcoin/yap-stone-house.jpg" alt="Yap stone in front of house" %}
 
At this point, I must apologize to historians: in the rest of the post, I'm 
going to completely reinvent Yap history so I can use it as an effective 
analogy for understanding Bitcoin. 

As a first step, imagine that a tribe on Yap struggled to accurately track Rai 
ownership purely through memory and oral history. After many arguments and 
fights over who owns what, they decided they were going to write down every 
transaction in a book called a ledger, which would be considered the source of 
truth. 

The chief appointed one of the tribesmen as the bookkeeper. If Alice wanted to 
pay Bob 10 lbs of Rai, Alice would go to the bookkeeper's house and announce 
the transaction. The bookkeeper would go through the ledger, make sure Alice 
actually owned 10 lbs of Rai, and if she did, add the new transaction to the 
book. 

{% include figure.html path="blog/bitcoin/bitcoin-central-bookkeeper.png" alt="Yap village with a central bookkeeper" %}

Everything worked well for a while, but gradually, problems appeared: the bookkeeper 
started charging transaction fees; trade would sometimes halt entirely because 
the bookkeeper was on vacation or sick;  pressured by the chief, the 
bookkeeper would charge very high fees or completely ban certain transactions, 
especially with other tribes; sometimes, after a dispute, the bookkeeper would 
seize someone's assets entirely. Eventually, the bookkeeper became one of the 
most rich, powerful, and controversial figures in society: despite rumors of 
corruption, fraud, and favoritsm, who would dare question the person who 
controls all the money? 

10 families in the tribe, upset with the bookkeeper's behavior, decided to 
find a new way to manage their money. Since a single person cannot be trusted 
to maintain the ledger, these families had a radical idea: *every* family 
would maintain its own ledger! 

{% include figure.html path="blog/bitcoin/bitcoin-distributed-ledgers.png" alt="Yap village with distributed bookkeepers" %}

For example, if Alice wanted to to pay Bob 10 lbs of Rai, Alice would go to 
the center of town and announce the new transaction to all the other families. 
Each family would then check their own ledger, make sure Alice really had 10 
lbs of Rai, and if she did, add the new transaction to their ledger. Since 
each family now kept a ledger, no one family had more power than any other! 

## Decentralized money (tech details)

All modern currencies, such as the US Dollar and Euro, are centralized: that 
is, they are controlled by a small number of institutions, such as 
governments, banks, and credit card companies. For example, if Alice wants to 
transfer $10 to Bob, she'll login to her bank's website, wait for the bank to 
verify her identity, send the transfer information to the bank's servers, wait 
a few days for the bank to clear the transaction, at which point the bank will 
update her balance, and send the info over to Bob's bank. In short, even 
though it's Alice's money, the entire process is controlled by the bank's 
rules and procedures: 

{% include figure.html path="blog/bitcoin/bitcoin-send-dollars.png" alt="Sending money through a centralized bank" %}

This centralized approach has the same problems as the Yap bookkeeper: even 
though it's your money, a small group of institutions controls almost 
everything about it, including who can spend money, when they can spend it, 
what they can spend it on, where they can spend it, what fees and taxes are 
imposed, and so on. 

Bitcoin offers an alternative without all of these limitations: a 
decentralized currency. As in the Yap analogy, Bitcoin uses a distributed 
ledger approach. Of course, instead of 10 families, Bitcoin consists of 
thousands of computers, each of which maintains its own ledger; and instead of 
someone yelling from the town center, these computers communicate with each 
other by sending messages over the Internet. 

For example, if Alice was transferring 10 Bitcoins to Bob, she'd click some 
buttons in her Bitcoin wallet, and it would broadcast this transaction to all 
other Bitcoin users: 

{% include figure.html path="blog/bitcoin/bitcoin-send-message.png" alt="Broadcasting a transaction to the Bitcoin network" %}

This collection of computers is known as the [Bitcoin 
network](http://en.wikipedia.org/wiki/Bitcoin_network) and anyone can join it 
by installing the [Bitcoin software](https://bitcoin.org/en/download), which 
will automatically download the global ledger onto your computer. This allows 
you to see every transaction that has ever happened in Bitcoin's history! You 
can even browse them online on sites like 
[blockchain.info](https://blockchain.info/) and 
[blockexplorer.com](http://blockexplorer.com/). This is a very different model 
of privacy than you get with banks, so you may want to check out [Bitcoin 
privacy](https://bitcoin.org/en/protect-your-privacy) and [Is Bitcoin 
anonymous](https://bitcoin.org/en/faq#is-bitcoin-anonymous) for more info. 

When each of these computers - I'll refer to them as "nodes" to indicate that 
they are running Bitcoin software that automatically handles all of these tech 
details - receives Alice's message, it'll check its ledger to make sure Alice 
owns 10 Bitcoins, and if she does, add the new entry to the ledger. 

## Decentralized mint (analogy) 

{% include figure.html path="blog/bitcoin/mining.png" alt="Mining" %}

In a decentralized system, there is no mint to create money. So how do more 
Rai stones enter circulation? The answer is mining! 

There is no limestone on the Yap islands themselves, so the villagers have to 
sail to distant islands to find it. The limestone is scarce and randomly 
distributed, so finding it can take a long time and is mostly a matter of 
luck. If Alice mines some new stone, she can get all the villagers to 
recognize that she now owns more Rai by displaying the new stone in front of 
her home and announcing it to the other villagers. All villagers will enter 
this in their ledgers as a transaction where Alice is the recipient of some 
amount of Rai stone. 

## Decentralized mint (tech details) 

{% include figure.html path="blog/bitcoin/bitcoin-miner.jpg" alt="Bitcoin mining" %}

How do Bitcoins get created? The answer here is *also* mining! 

However, [Bitcoin mining](https://en.bitcoin.it/wiki/Mining) does not involve 
any pick axes: it's purely digital. Any Bitcoin node that solves a 
computationally expensive math problem gets Bitcoin as a reward! Much like the 
stone mining, these math problems can take a long time to solve, and which 
node solves it first is mostly a matter of luck. However, once some lucky node 
finds a solution, it will broadcast it out to the rest of the Bitcoin network, 
and all other nodes will record in their ledgers that the lucky node has 
earned some new Bitcoin. 

The problems to solve involve [cryptographic hash 
functions](http://en.wikipedia.org/wiki/Cryptographic_hash_function); the math 
behind them is beyond the scope of this post, but I'll give a brief 
introduction. 

If you pass a string of text through a cryptographic hash function, it will 
convert it to a different string of text, called the "digest", in a totally 
unpredictable manner: 

{% highlight text %}
cryptographic-function("Hello World") = 124610xktj1l32kxjcj24j1
{% endhighlight %}

Given the slightest change to the text, such as adding an exclamation point, 
you get a totally different digest as output: 

{% highlight text %}
cryptographic-function("Hello World!") = 444lkxckl15lsck51lk234
{% endhighlight %}

The most important feature of cryptographic hash functions is that they are 
"one way": for a given string `T`, you'll always get back the same 
digest `D`; however, given an arbitrary digest `D`, 
there is no way to figure out what was the original text `T`. In 
other words, there is no way to "reverse" the hash function. 

In Bitcoin mining, you pass two pieces of data into the 
[SHA-256](http://en.wikipedia.org/wiki/SHA-2) cryptographic hash function: 

1. Information about a block, `B`: we'll discuss the details of this later 
1. A random guess, `R` 

{% highlight text %}
sha-256(B, R) = digest
{% endhighlight %}

The goal is to find the right `R` so that you get back a digest 
that starts with some required number of leading zeroes: 

{% highlight text %}
sha-256(B, R) = 00000000000001234sdfxxc1414...
{% endhighlight %}

Since cryptographic hash functions are "one way", there is no way to know what 
value(s) of R will produce a digest that 
starts with zeroes. All you can do is repeatedly guess random values of `R` 
until you accidentally stumble across one that works. Since SHA-256 has 
2<sup>256</sup> possible outputs, as the number of required leading zeroes goes 
up, the odds of any one guess being right becomes extremely small. 

In fact, the problem is intentionally designed - and occasionally recalibrated 
(see [Blockchain stats](https://blockchain.info/stats)) - to take a very long 
time: a single computer will have to guess non-stop, on average, for *several 
years* to find the right value of R. 
However, with all the nodes on the Bitcoin network guessing, the average time 
to find the right value of R is roughly 
10 minutes. 

Spending so much CPU time and energy on useless calculations may seem 
wasteful, but as we'll see later, the fact that the calculations are expensive 
is essential in establishing a consistent timeline. 

A few interesting notes on Bitcoin mining: 

1. There is pre-determined, [fixed 
supply](https://en.bitcoin.it/wiki/Controlled_Currency_Supply) of Bitcoin: 
every year, the number of Bitcoins that can be mined will drop by half and the 
total supply will max out at 21 million. 
1. After all Bitcoins have been mined, the reward for mining will switch to 
small fees on each Bitcoin transaction. These are expected to be significantly 
smaller than bank or credit card fees. 
1. The number of nodes participating in Bitcoin mining today means it is not 
practical or cost effective to try to do mining on your home computer. 
Instead, the recommendation is to join a mining pool and even invest in 
dedicated hardware (see [bitcoinmining.com](http://bitcoinmining.com/) for 
more info). 
1. The fixed supply of Bitcoin is not a problem as you can pay with tiny 
fractions of a Bitcoin, all the way down to 0.00000001 BTC, known as a 
[Satoshi](http://bitcoin.stackexchange.com/questions/114/what-is-a-satoshi).

## Decentralized transactions (analogy)

{% include figure.html path="blog/bitcoin/ledger.jpg" alt="Ledger" %}

Each of the 10 families maintains a ledger by hand that lists every 
transaction that has ever happened. Each transaction consists of 3 sections: 

1. **From**: the name of the person sending money. 
1. **To**: the name of the recipient of the money. 
1. **Amount**: how many pounds of Rai stone to transfer. 

To find out Alice's balance, you start at the beginning of the book and go 
through every transaction, adding up transactions where she received money, 
and subtracting transactions where she sent money. When Alice announces a new 
transaction, before adding it to the book, you can use this balance 
calculation to make sure she has enough money for the transaction. 

## Decentralized transactions (tech details)

The Yap transactions contained three pieces of data: From, To, and Amount. With 
Bitcoin, the To and From fields are tricky: we can't just look to the town 
center to see who is announcing a new transaction and in a decentralized 
world, there is no central system to store usernames and passwords. 

To manage and verify identity in a decentralized fashion, Bitcoin uses [public 
key cryptography](http://en.wikipedia.org/wiki/Public-key_cryptography). 
Public key cryptography involves lots of math that is beyond the scope of this 
post, so this section is just a brief intro to make it clear how it applies to 
Bitcon. 

{% include figure.html path="blog/bitcoin/lock.jpg" alt="Lock" %}

In this form of cryptography, there are two keys, or long strings of letters 
and numbers, that are mathematically linked: 

1. **Public key**: a public identifier that can be freely shared with others. 
1. **Private key**: a secret or password that must never be shared with 
anyone. 

When you install a Bitcoin wallet on your computer, it will automatically 
generate a public and private key pair for you. You can freely share your 
public key: in fact, the public key is your identity or address in Bitcoin. 

Public/private keys can be used for several tasks, but the main one we care 
about is "authenticity": that is, we can use them to mathematically verify 
that a message really came from the person we expect and that the message 
contents have not been modified along the way. 

Every time Alice sends a message, she can pass the contents of the message, 
along with her private key, through a `sign` function: 

{% highlight text %}
sign("Hello World", Alice's private key) = n67n54n6l10xf15
{% endhighlight %}

The value she gets back, called a [digital 
signature](http://en.wikipedia.org/wiki/Digital_signature), is a completely 
unrecognizable string of letters and numbers. Without Alice's private key, 
there is no way to guess what that string should be. Moreover, if you change 
the input text at all, even by a single character, such as adding an 
exclamation point to "Hello World", the signature will change in totally 
unpredictable ways: 

{% highlight text %}
sign("Hello World!", Alice's private key) = vk34jxl140501025
{% endhighlight %}

This is similar to the cryptographic hash functions we saw earlier, except 
that the mathematical link between the private and public keys means Bob can 
use Alice's public key to verify the signature: 

{% highlight text %}
verify("n67n54n6l10xf15", "Hello World", Alice's public key) = valid or invalid
{% endhighlight %}

If the signature is "valid", then Bob can be confident that it was really 
Alice who sent the message and that the message is exactly as she originally 
created it. 

We now know enough to take a look at a typical Bitcoin transaction. For 
example, if Alice was sending 10 Bitcoins to Bob, the message might look 
something like this:

<dl class="rounded px3 py2 ml4 mr4" style="background-color: #fab874;">
  <dt class="bold">Signature</dt>
  <dd>mn546yhg (signed with Alice's private key)</dd>
  <dt class="bold">Inputs</dt>
  <dd>
    nhn3891a (transaction where Alice got 7 BTC) <br>
    vc4232v32 (transaction where Alice got 3 BTC) 
  </dd>
  <dt class="bold">Outputs</dt>
  <dd>
    To: 60sdfs951sdfxo66 (Bob's public key) <br>
    Amount: 10 Bitcoins 
  </dd>
</dl>

The message consists of 3 sections: 

1. **Signature**: Alice includes a digital signature with her messages so that 
other Bitcoin nodes can verify the message really came from her. 
1. **Inputs**: this is a list of the signatures of transactions already in the 
ledger where Alice was the recipient of Bitcoins. In other words, these are 
the funds Alice is using in this transaction, a total of 10 Bitcoins. 
1. **Outputs**: this is a list of how the funds in the inputs should be 
distributed. To keep calculations simple, you are required to redistribute 
*all* the funds in the inputs. You can include more than one recipient in the 
ouputs section - including yourself, if you need change. In this case, Alice 
is sending 10 Bitcoin to a single recipient, Bob, identified by his public 
key. 

Since each transaction references a previous transaction in its "inputs" 
section, it is possible to follow the graph of transactions all the way back 
to the beginning of Bitcoin. This is the mechanism for checking the ownership 
of bitcoins! 

For example, to calculate a user's balance, we use an approach very similar to 
the Yap ledger: you go through every transaction, add up the ones where the 
user was a recipient, and subtract the ones where they were a sender. To check 
that a new message is valid, such as Alice's transfer to Bob, you can check 
that the inputs refer to valid transactions already in the ledger where Alice 
was the recipient. 

## Decentralized ledgers (analogy)

Over time, the number of families using the distributed ledger system grew 
from 10 to 30. The homes for the new families were spread out, so instead of 
one town center, there were now 3 town centers, one for every 10 houses. 
Therefore, when Alice wanted to transfer 10 lbs of Rai to Bob, she had to 
announce the transaction 3 times. 

{% include figure.html path="blog/bitcoin/bitcoin-multiple-village-centers.png" alt="Multiple Yap villages" %}

Eventually, the villagers noticed that this led to a problem: the order of 
transactions was not consistent across all ledgers! This could lead to 
problems. For example, Alice wants to transfer 10 lbs of Rai to Bob. She 
announces it at village center #1 and heads off to announce it at the other 
village centers. Bob, who lives near village center #1, hears Alice's 
announcement and, excited to finally have some money, immediately starts his 
own transaction to transfer 10lbs of Rai to Carole. Bob announces his 
transaction at village center #1, where all the families now have the follow 
transaction order: 

1. Alice -&gt; Bob, 10 lbs Rai 
1. Bob -&gt; Carole, 10 lbs Rai 

Bob then heads off to village center #2 to make the same announcement. 
However, it turns out that Alice went to village center #3 first and hasn't 
made it to #2 yet. As a result, the families in village center #2 have the 
following transaction order: 

1. Bob -&gt; Carole, 10 lbs Rai 
1. Alice -&gt; Bob, 10 lbs Rai 

The ledgers in different villages centers are out of sync! Moreover, since Bob 
had no money before Alice's transaction, the families in village center #2 
reject his transaction, even though the families in village center #1 accepted 
it! 

We need a way to establish a consistent order of transactions in all ledgers 
in a decentralized way. For example, simply letting a single family choose the 
order wouldn't work since that family could use that power to their advantage 
(e.g. by constantly delaying a rival family's transactions). This is a hard 
problem, but the ingenious villagers once again came up with a clever 
solution: use random chance! 

Here's the idea: when a new transaction comes in, the first step is to add it 
to an "unverified" transactions list. For example, when Alice announces her 
transfer of 10 lbs of Rai to Bob, the ledger and unverified lists would look 
like this: 

{% include figure.html path="blog/bitcoin/bitcoin-yap-ledger.png" alt="Yap ledger with unverified list" %}

Every time a family mines new Rai stone, to get all the families to recognize 
the new stone in their ledgers, this family must pick one transaction to move 
from the unverified list to the ledger. 

This mechanic accomplishes several goals at once: 

1. Since limestone is scarce and randomly distributed, it's a matter of luck 
which family will get to "verify" the next transaction, so no family can 
control transaction order to their advantage. 
1. Every family now has a strong incentive to participate in maintaining 
ledgers: it's the only way that their newly mined limestone will be allowed to 
enter circulation! 
1. Since new limestone is randomly distributed and takes a long time to find, 
the odds of two families overlapping in finding new stone are essentially 
zero*. This give us a consistent ordering for transactions: in the case above, 
either all village centers accept Bob's transfer to Carole or all of them 
reject it. 

(\* To be honest, point #3 is not entirely accurate: an overlap would be 
rare, but *could* still happen. Unfortunately, this is one place where I can't 
find a *simple* analogy that captures the math Bitcoin uses to handle these 
occasional overlaps. Nevertheless, the main point still holds: a random, 
unpredictable process means no family will be able to control the order of 
multiple transactions in a row.) 

## Decentralized ledgers (tech details) 

The naive strategy of immediately adding new transactions to the ledger didn't 
work for the Yap when they got too big; since Bitcoin is several orders of 
magnitude bigger (thousands of nodes, multiple transactions per second), the 
strategy definitely doesn't work for Bitcoin. So how does Bitcoin establish a 
consistent timeline amongst distributed ledgers? 

It turns out that this is a general problem in distributed systems research 
known as the [Byzantine Generals 
Problem](http://en.wikipedia.org/wiki/Two_Generals'_Problem). As we'll discuss 
next, Bitcoin offers the first practical (read: probabilistic) solution to 
this problem - see [Bitcoin &amp; the Byzantine Generals 
Problem](http://expectedpayoff.com/blog/2013/03/22/bitcoin-and-the-byzantine-generals-problem/) 
for more info. 

The ledger in Bitcoin is called the [block 
chain](https://en.bitcoin.it/wiki/Block_chain). Here's a rough idea of what a 
block chain might look like: 

{% include figure.html path="blog/bitcoin/bitcoin-block-chain-small.png" alt="Bitcoin block chain" %}

The block chain consists of a series of blocks (3 are shown above), where each 
block contains: 

1. **Transactions**: transactions or messages sent between users. 
1. **Proof of work**: this is the digest from Bitcoin mining! 
1. **Previous reference**: a reference to the digest of the previous block. 

Notice how each block has a reference to the previous block: this chain of 
references is what defines the timeline in the Bitcoin network. The 
transactions in a single block happened "at the same time" (there must be no 
dependencies between them); the transactions in previous blocks happened 
earlier. This is different than the Yap ledger, where order is implicit from 
the order the transactions are written in the ledger. 

You can follow the "previous references" from block to block, all the way back 
to the very first block, known as the [genesis 
block](https://en.bitcoin.it/wiki/Genesis_block). The genesis block was part 
of the seed data when Bitcoin was first created; how do all other blocks get 
added in a consistent order across all computers? Just as we discussed in the 
Yap analogy section, when new messages arrive at a Bitcoin node, they 
initially go into an "unverified" bucket: 

{% include figure.html path="blog/bitcoin/bitcoin-block-chain-unverified.png" alt="Bitcoin block chain with unverified transactions" %}

Any node in the Bitcoin network can put several unverified transactions into a 
block and send it out to the rest of the network as the proposed next block in 
the chain. The catch is that the proposed block must include a "proof of 
work", which is the solution to a computationally expensive math problem 
involving cryptographic hash functions. Sound familiar? That's right, this is 
Bitcoin mining! 

Just like the Yap families propose the next transaction when they mine new Rai 
stones, it is the Bitcoin miners who propose new blocks for the block chain 
when they mine new Bitcoin. Here are the rules: take all the text from several 
unverified transactions `T`, plus the digest of the most recent 
block in the ledger `D`, plus a random guess `R`, and do 
the following SHA-256 calculation: 

{% highlight text %}
sha-256(T, D, R) = digest
{% endhighlight %}

The miners keep guessing different values of R until they find a digest with 
the required number of leading zeroes. The first miner to find it gets a 
reward of Bitcoin: to receive it, the miner must send out the new block, which 
includes the digest as the "proof of work", to all other Bitcoin nodes. 
Assuming the new block is valid, it becomes a part of the block chain: 

{% include figure.html path="blog/bitcoin/bitcoin-block-chain-verified.png" alt="Bitcoin block chain with verified transactions" %}

In the example above, block 54 is now part of the block chain&mdash;that is, the 
Bitcoin timeline&mdash;and all the transactions in it, including Alice's, are 
considered "verified". 

What if multiple nodes come up with a proof of work at the same time? This is 
a rare occurrence, but if it happens, the network will temporarily have 
multiple possible paths in the block chain: 

{% include figure.html path="blog/bitcoin/bitcoin-block-chain-fork.png" alt="Bitcoin block chain fork" %}

The solution is simple: Bitcoin nodes always accept the longest available 
chain. 

In the example above, some parts of the network will be mining a new block 
that has 56 as its previous reference, and others will be mining a new block 
with 57 as its previous reference. Eventually, someone will complete a proof 
of work on one of these paths, making it the longest one. For example, if the 
first proof of work calculation to finish was for a new block on the block 57 
path, the network would switch to this path, and the transactions in block 56 
would get put back into the unverified bucket: 

{% include figure.html path="blog/bitcoin/bitcoin-block-chain-dropped.png" alt="Bitcoin block chain transaction goes back into the unverified bucket" %}

Of course, it's possible that two blocks, one on each path, will be found 
simultaneously again, but a) this is even more unlikely and b) it just means 
that the block chain stays diverged for a little while longer while we wait 
for yet another block to be found. Eventually, *some* path will end up longer, 
and the network will converge on it. 

Since nodes always accept the longest path, couldn't an attacker create 
their own block chain with lots of fraudulent transactions and get the whole 
network to adopt it, so long as it was longer? For example, if Mallory managed 
to generate blocks 59, 60, and 61 while the network was still working on 57 
and 58, then Mallory's fraudulent blocks would be accepted and all the others 
would be dropped: 

{% include figure.html path="blog/bitcoin/bitcoin-block-chain-attacker.png" alt="Bitcoin block chain attacker" %}

Attacks of this sort are very unlikely to succeed because Mallory is in a 
race against the *entire Bitcoin network* to generate those blocks. This is 
why the proof of work calculation is intentionally designed to be very 
expensive. Mallory would have to control more computing power than all other 
nodes on the Bitcoin network, combined, to have a viable chance of winning 
this race for a *single* block, let alone 3. 

This is the real reason Bitcoins are offered as a reward to miners: they are 
an incentive to make the network as big and active as possible, so an attacker 
has no chance of being faster than the rest of the network. In fact, most 
attackers will find it more profitable to use their computing resources to 
mine bitcoins legitimately instead of taking the risk of trying to add 
fraudulent blocks to the block chain. 

The odds of an attacker succeeding get even smaller as time goes on. For 
example, if you want to tamper with a transaction in block 51, you'll have to 
recalculate the proof of work for that block; since the proof of work 
calculation for block 52 includes the proof of work from block 51, you now 
also have to recalculate the proof of work for block 52 as well; and then 
block 53; and in the meantime, you're racing the rest of the network, which 
has since added blocks 54 and 55, so your chain is not the longest! 

The implication here is that older blocks&mdash;those further back in the 
chain&mdash;are more "secure" than newer ones. 

{% include figure.html path="blog/bitcoin/bitcoin-block-chain-risk.png" alt="Bitcoin block chain risk" %}

In fact, if Bob is a merchant, he can tune the level of risk he's willing to 
tolerate by deciding how many blocks must elapse before he considers a 
transaction verified. If it's a tiny transaction, a single block (~10 minutes) 
may be enough; if it's a large transaction, waiting for 6 blocks (~1 hour) may 
be more advisable. For a merchant, waiting 1 hour to avoid fraud may still be 
better than the situation today with credit cards, where a chargeback may 
appear a month after the transaction. 
An important disclaimer: while Bitcoin's design seems sound from a security 
standpoint, it's still susceptible to fraud as a result of user error, just 
like any other system. The difference with Bitcoin is that it's a 
decentralized system: when something goes wrong, there is no one you can call 
for help. 

For example, if you accidentally send Bitcoin to the wrong address, there is 
no way to get that money back. If you fall for a phishing attack, there is no 
fraud department to report it to. If you lose your private key (e.g. in a hard 
drive crash), you lose access to any Bitcoins associated with it, and there is 
*nothing* anyone can do to help you get them back. In fact, if a private key 
is lost, those Bitcoins are no longer accessible to *anyone* on the Bitcoin 
network; they are gone, effectively out of circulation, forever! 

## Further reading 

In the spirit of giving credit where it's due, these are the resources that 
helped me put this post together, and may help you learn more: 

1. [How Bitcoin works under the 
hood](https://www.youtube.com/watch?v=Lx9zgZCMqXE) (video). 
1. [How the Bitcoin protocol actually 
works](http://www.michaelnielsen.org/ddi/how-the-bitcoin-protocol-actually-works/) 
1. [Why Bitcoin 
Matters](http://dealbook.nytimes.com/2014/01/21/why-bitcoin-matters/?_php=true&amp;_type=blogs&amp;_r=0) 
1. [Bitcoin: a peer-to-peer electronic cash 
system](https://bitcoin.org/bitcoin.pdf) (PDF) 
1. [Bitcoin and the Byzantine Generals 
Problem](http://expectedpayoff.com/blog/2013/03/22/bitcoin-and-the-byzantine-generals-problem/) 
1. [Bitcoin homepage](https://bitcoin.org/) 
1. [Bitcoin FAQ](https://bitcoin.org/en/faq) 
1. [Bitcoin source code](https://github.com/bitcoin/bitcoin) 
1. [Bitcoin Wikipedia page](http://en.wikipedia.org/wiki/Bitcoin) 
1. [Explaining Bitcoin to the man in the street, sort 
of](http://tomorrowstransactions.com/2013/04/explaining-bitcoin-to-the-man-in-the-street-sort-of/) 