---
layout: post
title: "Introducing FlagGuessr: Guess the flag. Guess the place."
tags: ["Games", AI", "Programming", "Projects"]
thumbnail_path: "projects/flag-guessr-screenshot.png"
---

I've created a new browser-based game called [FlagGuessr](https://www.flag-guessr.com/)! The idea is simple: you're
shown a flag, you guess which country it belongs to, and then you try to find that country on the map. The fewer guesses
it takes you to get it right, the more points you get. At the end of each turn, you are shown a little bit of
information about the flag and the country's history. Each game is 5 turns (5 flags), for a maximum of 50,000 points,
and a new game is available every day.

{% include figure.html path=page.thumbnail_path caption="FlagGuessr: Guess the flag. Guess the place." url="https://www.flag-guessr.com/" %}

In the past, I would've never had time to build something like this, but with GenAI, I'm creating side projects and
internal projects like this all the time. I wrote up a small spec and let my GenAI tools work on it in the background,
checking in and making small updates whenever I had a bit of time between normal work.

The game mechanics are inspired by games I play all the time, such as [TimeGuessr](https://timeguessr.com/) and
[Wordle](https://www.nytimes.com/games/wordle/index.html). Hopefully, you find FlagGuessr to be a fun way to learn
about flags, geography, and a bit of world history.

I'd love to hear what you think! Feedback, bug reports, and suggestions are very welcome.
[Give FlagGuessr a try](https://www.flag-guessr.com/) and see how close you can get to 50,000 points!
