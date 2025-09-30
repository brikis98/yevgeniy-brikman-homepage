---
layout: post
title: "Review: Leading the Transformation by Gary Gruver"
tags: ["Review: Nonfiction", "4 Stars", "DevOps", "Detailed Notes"]
thumbnail_path: "reviews/leading-the-transformation.jpg"
header_image: "reviews/leading-the-transformation.jpg"
header_image_url: "https://www.amazon.com/dp/1942788010?tag=brikis98-20&linkCode=osi&th=1&psc=1"
header_image_caption: "'Leading the Transformation' by Gary Gruver"
date: "2016-10-14"
---

A practical guide for executives on how to apply Agile and DevOps principles to large organizations. This book is based on real-world experience at HP, and it doesn't try to sugar coat how difficult such a transformation really is. They tell you up front that it took them 3 years, which is the right timescale for thinking about these issues. That's because it's not just about tossing in a few new technologies or techniques; it's about changing how people think, the goals of the organization, and the company's entire culture. It's a slow and painful process, but one that's well-worth doing.  
  
Here are some of the new ideas and lessons I got from this book:  
  
## Don't try to "do Agile" or "do DevOps" 

- These are techniques for accomplishing a goal and not goals in and of themselves. 
- The goals you should focus on are the ones that are important to your business, such as increasing productivity, releasing code more often, increasing the stability of code in production, and so on. 
- Once you have these goals in mind, you can then pick tools from Agile or DevOps to accomplish those goals. 
- But don't forget that these are just tools, and that your ultimate end goals are something else.  

## Work in small increments

Even once you've picked certain "tools" from Agile or DevOps, don't try to do everything all at once. For example, if you try to do continuous integration, continuous delivery, automated testing, trunk-based development, and 20 other DevOps techniques at the same time, then the project will become too large. Large projects:

- Require approval for large budgets.
- Require trying to prove that the project is a higher priority than other initiatives.
- Require going a long time without seeing any results or ROI.
- Most importantly, research has shown consistently that the larger the project, the more likely it is to fail.

Instead: 

- Identify a small, incremental aspect of Agile or DevOps that will allow you to see improvements quickly. 
- Implement just that aspect, which you can typically do with minimal approval, and allow everyone to see the impact it has. 
- Then repeat the process again and again, each time biting off small chunks that each show an improvement.   

## Aim for short feedback loops

Focus on getting feedback: 

- As quickly as possible.
- That localizes the problem as much as possible to the actual cause. 

If it takes weeks or months to get feedback: 

- The developer won't remember what code was responsible.
- They might not even remember they were the one to write the code.
- Fixing the issue will take much longer. 

On the other hand, if you can get feedback quickly--say, immediately after the commit--then the developer will:

- Be able to figure out the cause quickly.
- Know for sure they were responsible.
- Be able to fix it quickly
- Learn much more from the rapid feedback loop.
- Learn to prevent the issue in the first place (especially if they can run the same tests locally, before commit).  
  
## Break tests into layers

For example: 

- One layer of tests for each individual component.
- Another layer for several components working together.
- Another layer for the system as a whole. 

As you go up each level, the tests become more and more expensive (e.g. layer 1 may take seconds, layer 2 may take minutes, layer 3 may take hours). Therefore, you want to continuously identify "acceptance tests" at each layer that are most likely to prevent issues from slipping into the next layer. For example: 

- If you see a test repeatedly failing in layer 3, that means you know how to test some particular type of functionality, but you're not doing it in the earlier layers. 
- If this layer 3 failure happens often, then you may want to add a new acceptance test for this exact issue at layer 1 or 2. 
- That way, you can catch the issue in seconds or minutes, instead of only catching it in layer 3, where it takes hours.  

## Automated tests are different from manual tests

When converting a testing process from manual to automated, don't just script the exact actions you would take manually. For example, a manual test for a credit card payment web page may involve: 

- Going to the website
- Signing up for an account
- Clicking a confirmation email
- Logging in
- Entering your credit card details
- (15 other steps)
- Clicking a "pay now" button

If you create an automated test that does these exact steps and the test fails, you won't know if the cause is that the "pay now" button is broken or any of the 20 steps before it. 

Automated tests can be designed in a fundamentally different way than manual testing that allows them to provide not only faster and more reliable feedback, but also much more localized feedback that points to the exact cause. 

- A better alternative for the credit card test would be to configure the automated test to run on top of mock data where the user already has the account fully set up so that all the test has to do is click the "pay now" button. 
- If that test fails, you can be more or less certain that it's the button that's broken and not any of the 20 prior steps.  

## Book weaknesses
  
* **Most of the chapters are very high level.** There are relatively few concrete technical recommendations, no architecture diagrams, and nothing resembling a line of code in the entire book. Perhaps that's because they expect the target audience to be semi-technical executives, but without concrete examples, it's hard to know how to apply some of the advice. Having worked at a company that went through a similar transformation, I was already familiar with most of the terms, but I imagine someone new to the ideas of Agile and DevOps would struggle to use this book, as it lacks sufficient technical detail for how to put these practices in motion. Fortunately, it's a quick read, and at the end, there is a list of further reading which includes several books with lots of technical details.  
  
* **Too many buzzwords.** The writing sounds too much like managerial-speak, falling into the "kingdom of nouns" trap where they use a bunch of custom fancy-sound vocabulary (usually ending in "ion") instead of clearly expressing what they mean with simple verbs.  


## Quotes

Finally, some of my favorite quotes:  
  
> We see many companies that embark on a "do Agile" journey. They plan a big investment. They hire coaches to start training small Agile teams and plan a big organizational change. They go to conferences to benchmark how well they are "doing DevOps or Agile." They see and feel improvements, but the management teams struggle to show bottom-line business results to the CFO. Not having clear business objectives is a key source of the problem.

> Most traditional organizations, when faced with the reality of just how inaccurate their software planning processes are, tend to react by investing more and more in planning. They do this because they are convinced that with enough effort they will make their plan accurate. It works for every other part of their business, so why not with software? The reality is that with software you are reaching a point of diminishing returns, and at that point the best way to learn more about the schedule is to start writing code.

> In traditional organizations when you describe the vision and direction of large-scale CD on trunk to the engineers, they immediately will tell you why it won't work and how it will break when bringing in large changes [...] Once engineers have worked in an environment like this they can't imagine having worked any other way. Before they have experienced it, though, they can't imagine how it could ever work.

> Let the pain of increasing the frequency on this production-like environment drive the priority of your technical changes. This will force you to fix the issues in priority order and provide the fastest time to value for the transformation.

> Developers want to do a good job, and they assume they have until they get feedback to the contrary. If this feedback is delayed by weeks or months, then it can be seen as beating up developers for defects they don't even remember creating. If feedback comes within a few hours of the developer commit and the tools and tests can accurately identify which commits introduced the problem, the feedback gets to engineers while they are still thinking about and working on that part of the code.

## Rating

{% include star-rating.html rating=4 %}

