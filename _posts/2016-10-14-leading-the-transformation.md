---
layout: post
title: "Review: Leading the Transformation by Gary Gruver"
tags: ["Review: Nonfiction", "4 Stars", "DevOps"]
thumbnail_path: "reviews/leading-the-transformation.jpg"
header_image: "reviews/leading-the-transformation.jpg"
header_image_url: "https://www.amazon.com/dp/1942788010?tag=brikis98-20&linkCode=osi&th=1&psc=1"
header_image_caption: "'Leading the Transformation' by Gary Gruver"
date: "2016-10-14"
---

A practical guide for executives on how to apply Agile and DevOps principles to large organizations. This book is based on real-world experience at HP and it doesn't try to sugar coat how difficult such a transformation really is. They tell you up front that it took them 3 years, which is the right time scale for thinking about these issues. That's because it's not just about tossing in a few new technologies or techniques; it's about changing how people think, the goals of the organization, and the company's entire culture. It's a slow and painful process, but one that's well-worth doing.  
  
Here are some of the new ideas and lessons I got from this book:  
  
\* Don't try to "do Agile" or "do DevOps". These are techniques for accomplishing a goal and not goals in and of themselves. The goals you should focus on are the ones that are important to your business, such as increasing productivity, releasing code more often, increasing the stability of code in production, and so on. Once you have these goals in mind, you can then pick tools from Agile or DevOps to accomplish those goals. But don't forget that these are just tools, and that your ultimate end goals are something else.  
  
\* Even once you've picked certain "tools" from Agile or DevOps, don't try to do everything all at once. For example, if you try to do continuous integration, continuous delivery, automated testing, trunk-based development, and 20 other DevOps techniques at the same time, then the project will become too large. Large projects require approval for large budgets; they require trying to prove that the project is a higher priority than other initiatives; they require going a long time without seeing any results or ROI; and most importantly, research has shown consistently that the larger the project, the more likely it is to fail. Instead, identify a small, incremental aspect of Agile or DevOps that will allow you to see improvements quickly. Implement just that aspect, which you can typically do with minimal approval, and allow everyone to see the impact it has. Then repeat the process again and again, each time biting off small chunks that each show an improvement.   
  
\* Focus on getting feedback a) as quickly as possible that b) localizes the problem as much as possible to the actual cause. If it takes weeks or months to get feedback, a developer won't remember what code was responsible or that they were even the one to write it, and fixing the issue will take much longer. On the other hand, if you can get feedback quickly--say, immediately after the commit--then the developer will know exactly the cause, know for sure they were responsible, and will be able to fix it quickly. Moreover, they will learn much more from rapid feedback, and if they can run the same tests locally, they are more likely to prevent the issue in the first place.  
  
\* Break tests into layers. For example, one layer of tests for each individual component; another layer for several components working together; another layer for the system as a whole. As you go up each level, the tests become more and more expensive (e.g. layer 1 may take seconds, layer 2 may take minutes, layer 3 may take hours). Therefore, you want to continuously identify "acceptance tests" at each layer that are most likely to prevent issues from slipping into the next layer. For example, if you see a test repeatedly failing in layer 3, that means you know how to test some particular type of functionality, but you're not doing it in the earlier layers. If this layer 3 failure happens often, then you may want to add a new acceptance test for this exact issue at layer 1 or 2, since those can catch the issue in seconds or minutes, instead of only catching it in layer 3, where it takes hours.  
  
\* When converting a testing process from manual to automated, don't just script the exact actions you would take manually. For example, a manual test for a credit card payment web page may involve going to the website, signing up for an account, clicking a confirmation email, logging in, entering your credit card details, ..., 15 other steps, and then clicking a "pay now" button. If you create an automated test that does these exact steps and the test fails, you won't know if the cause is that the "pay now" button is broken or any of the 20 steps before it. Automated tests can be designed in a fundamentally different way than manual testing that allows them to provide not only faster and more reliable feedback, but also much more localized feedback that points to the exact cause. A better alternative for the credit card test would be to configure the automated test to run on top of mock data where the user already has the account fully set up so that all the test has to do is click the "pay now" button. If that test fails, you can be more or less certain that it's the button that's broken and not any of the 20 prior steps.  
  
The book does have some downsides.   
  
\* Most of the chapters are very high level: there are relatively few concrete technical recommendations, no architecture diagrams, and nothing resembling a line of code in the entire book. Perhaps that's because they expect the target audience to be semi-technical executives, but without concrete examples, it's hard to know how to apply some of the advice. Having worked at a company that went through a similar transformation, I was already familiar with most of the terms, but I imagine someone new to the ideas of Agile and DevOps would struggle to use this book, as it lacks sufficient technical detail for how to put these practices in motion. Fortunately, it's a quick read, and at the end, there is a list of further reading which includes several books with lots of technical details.  
  
\* Too many buzzwords. The writing sounds too much like managerial-speak, falling into the "kingdom of nouns" trap where they use a bunch of custom fancy-sound vocabulary (usually ending in "ion") instead of clearly expressing what they mean with simple verbs.  
  
  
Finally, some of my favorite quotes:  
  
‚ÄúWe see many companies that embark on a ‚Äúdo Agile‚Äù journey. They plan a big investment. They hire coaches to start training small Agile teams and plan a big organizational change. They go to conferences to benchmark how well they are ‚Äúdoing DevOps or Agile.‚Äù They see and feel improvements, but the management teams struggle to show bottom-line business results to the CFO. Not having clear business objectives is a key source of the problem.‚Äù  
  
‚ÄúMost traditional organizations, when faced with the reality of just how inaccurate their software planning processes are, tend to react by investing more and more in planning. They do this because they are convinced that with enough effort they will make their plan accurate. It works for every other part of their business, so why not with software? The reality is that with software you are reaching a point of diminishing returns, and at that point the best way to learn more about the schedule is to start writing code.‚Äù   
  
‚ÄúIn traditional organizations when you describe the vision and direction of large-scale CD on trunk to the engineers, they immediately will tell you why it won‚Äôt work and how it will break when bringing in large changes [...] Once engineers have worked in an environment like this they can‚Äôt imagine having worked any other way. Before they have experienced it, though, they can‚Äôt imagine how it could ever work.‚Äù  
  
‚ÄúLet the pain of increasing the frequency on this production-like environment drive the priority of your technical changes. This will force you to fix the issues in priority order and provide the fastest time to value for the transformation.‚Äù  
  
‚ÄúDevelopers want to do a good job, and they assume they have until they get feedback to the contrary. If this feedback is delayed by weeks or months, then it can be seen as beating up developers for defects they don‚Äôt even remember creating. If feedback comes within a few hours of the developer commit and the tools and tests can accurately identify which commits introduced the problem, the feedback gets to engineers while they are still thinking about and working on that part of the code.‚Äù

**Rating**: 4 stars

