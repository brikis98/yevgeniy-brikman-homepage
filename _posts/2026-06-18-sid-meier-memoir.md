---
layout: post
title: "Review: Sid Meier's Memoir by Sid Meier"
tags: ["Review: Nonfiction", "4 Stars", "Biography", "Games"]
thumbnail_path: "reviews/sid-meier-memoir.jpg"
header_image_url: "https://www.amazon.com/Sid-Meiers-Memoir-Computer-Games/dp/B08MNG8VX8?&linkCode=ll2&tag=brikis98-20&linkId=76a285ff15456175e72e3d0eb44b8297&language=en_US&ref_=as_li_ss_tl"
excerpt_separator: "<!--more-->"
---

This is the memoir of Sid Meier, co-founder of MicroProse, and creator of some of the most popular and influential
video games of all time, including _Civilization_, _Pirates!_, and _Railroad Tycoon_. The _Civilization_ series is one
of my all-time favorite game series—I cannot count how many times I've said, "OK, just one more turn, and then bed,"
only to look up, and realize the sun is rising—so I found this book to be an entertaining and informative read on how
some of these games were created.

<!--more-->

Here are a few of my favorite takeaways from the book:

## 1 billion minutes

As of 2020, when this book was published, Steam reports that players have spent more than 1 _billion_ minutes
playing _Civilization 5_. If one person played non-stop, that's nearly 2,000 years of play time. And that's just for
one of the dozen or so civilization games and expansions, on one platform. Insane. I wonder how many of those minutes
are my own...

## No overnight successes

Sid Meier is best know for the game _Civilization_, and to many, it seemed like that game became a mega-hit out of
nowhere. However, the reality is that by the time _Civilization_ came out in 1990, Sid had been making games for nearly
a decade, and _Civilization_ was roughly the _27th game_ he had created. It made me think of the 10,000-hour rule from
_[Outliers](/blog/2011/01/01/outliers-the-story-of-success/)_.

## Games are a series of interesting decisions

Sid Meier has famously said that "a game is a series of interesting decisions." In this book, he adds a bit more detail
to that idea:

> Interesting decisions are not about the specifics of what you let the player choose between, but whether the
> investment feels both personal and significant to the outcome… Ultimately, the most fundamental characteristic of an
> interesting decision is that it makes the player think, ‘I wonder what would happen next time, if I did it
> differently?’

> A game is not just a vehicle for fun, but an exercise in self-determination and confidence. Good games teach us
> there are tradeoffs to everything, actions lead to outcomes, and the chance to try again is almost always out there.

## Games are about the player, not the game designer

> Other works of art are successful when the performer is interesting, but a game is successful only when the player is
> interesting. Our job is to impress you with yourself.

## Feedback is fact and player irrationality

Meier believes that "feedback is fact". If a player feels a mechanic is unfair, then it makes the game less fun, and
it doesn't matter if that mechanic is realistic, or logical, or is implemented correctly from a mathematical standpoint.
This is especially visible with how irrational players are about probabilities:

- **The 3:1 rule**. For most people, if you have a 3:1 advantage in a battle, you believe that victory is guaranteed.
  In reality, a 3:1 advantage gives you a 75% chance of winning, which means you should lose 25% of the time, but if
  you implement that in the game, players will feel the game is unfair or broken. So many of Sid Meier's games are
  hard-coded to give you a guaranteed win any time the odds are 3:1 or better. It's not mathematically correct, but
  it tends to make the game feel more fun.
- **Bad luck mitigation**. If your odds are 1:1 in a battle, you aren't surprised when you lose half the time. But if
  you fight 3 battles in a row, you will lose all 3 battles about 12.5% of the time. For many players, if this happens,
  the game again feels unfair or broken. Therefore, Sid Meier's games keep track of losing streaks, and artificially
  boost your odds if you have several losses in a row.
- **Big vs small numbers**. If you have a unit of strength 2 go up against a unit of strength 1, you probably aren't
  surprised that you lose from time to time, as 2 is pretty close to 1. However, if you use a unit of strength 20
  against a unit of strength 10, you may be surprised that you lose just as often as in the 2:1 battles (as the odds
  are identical); after all, the difference of 10 feels so much bigger! This is another place where Sid Meier's games
  either artificially change the odds to make the game feel more fun, or move away from simple odds calculations to
  other mechanics, such as health bars and multi-step battles.

This manipulation of probabilities has been copied by many other games, such as X-Com.

## Iteration over up-front design

I found it interesting that Sid Meier and his companies did not create design docs for their games:

> This is why I never write design documents. Some managers are irrationally devoted to them, expecting to see the
> entire game laid out in descriptive text and PowerPoint slides before a single line of code is ever written. But to
> me, that's like drawing a map before you've visited the terrain.

Instead, they would just build prototypes, test them, keep what worked, and delete what wasn't working. Sid Meier even
had a rule, where if he was tweaking something, he would always either halve it or double it, as that gets you to
the right value much faster than going up or down by just 5%.

## Leaders in Civilization

The game includes a number of historical civilizations, such as the Romans, Egyptians, and French, and each one is
led by a famous leader from that civilization, such as Caesar, Ramesses, and Napoleon. They ran into a problem with
Germany: their most famous leader is Hitler, but they were worried about the backlash from the community.
Eventually, they settled on Frederick the Great. Interestingly enough, at the time, they were _not_ worried about
backlash from having Stalin as the leader of Russia and Mao as the leader of China.

## The Gandhi bug

There's a famous story that, due to an overflow bug, the most peaceful leader in the game, Gandhi, would become
the most violent, and inevitably, you'd get [nuked by Gandhi](https://en.wikipedia.org/wiki/Nuclear_Gandhi). It turns
out that this was an urban legend, and no such bug existed or was possible in the game!

## Marketing and sales

I got a chuckle from the story of how Sid's co-founder, Bill Stealey, did marketing and sales for MicroProse games. Over
a period of a few weeks, he would call game stores dozens of times, doing different voices each time, asking if they
carried the latest MicroProse game, and acting upset if the answer was no. Then, a short while later, he'd call again,
but this time introduce himself on behalf of MicroProse, and ask the store owner if they were interested in ordering
the game. Not surprisingly, the answer was often yes, thanks to all the "demand" Bill drummed up himself.
