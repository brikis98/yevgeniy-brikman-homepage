---
layout: post
title: "Review: The Inmates Are Running the Asylum by Alan Cooper"
tags: ["Review: Nonfiction", "3 Stars", "Design"]
thumbnail_path: "reviews/the-inmates-are-running-the-asylum.jpg"
header_image: "reviews/the-inmates-are-running-the-asylum.jpg"
header_image_url: "https://www.amazon.com/dp/0672326140?tag=brikis98-20&linkCode=osi&th=1&psc=1"
header_image_caption: "'The Inmates Are Running the Asylum' by Alan Cooper"
date: "2015-01-22"
---

I found this book frustrating. It's has a number of great design insights, but they are mixed with some truly awful advice on what programmers are like and how to build software, that I would hesitate to recommend it to any "business" person (the audience identified in the preface), as the advice in this book may cause more problems than it solves.  
  
Pros:  
  
* Good discussion of how programming is not like manufacturing or building physical goods.  
* Love the ideas behind where software design goes wrong. E.g. the needs of a computer and a user are very different, and that trying to satisfy both as a programmer inherently creates conflict; physical device has one concrete use for every part, but software may have different "modes" for each part; physical products have inherent limits on the number of "features", whereas software doesn't; treating the interface as something you slap on later is a recipe for failure.  
* The ideas behind using personas, scenarios, and building software to accomplish goals (not tasks) are very powerful.  
* I'm a big fan of the concept that software should be "polite" and the examples that go with it.  
  
Cons:  
  
* Treats software as the sole exemplar of bad design. In reality, there is bad design everywhere. Only reason some mechanical systems are better designed is a) they've had way more time to develop those design practices and b) most mechanical devices are much simpler than software systems.  
* Claims that computer literacy shouldn't be a requirement of using computers. That's like saying knowing how to read shouldn't be a requirement of using books.  
* The author is WAY too dismissive of iterative development and "ship early and often". He claims that a) no good design has ever come from being iterative, b) 1 year release cycles are too fast for meaningful design, and b) software should be built like movies, with a massive "pre-production" phase where you do a huge, detailed, up front design. This is completely counter to everything we've learned about software development in the last 20 years and should be largely ignored. Every single good design is the result of enormous amounts of iteration and every good piece of software has evolved from something much smaller and simpler.  
* Repetitive. The first 9 chapters (more than half the book) are about all the things that are wrong with design today. That's a bit too much.  
* Very disrespectful of programmers, especially in part 3 of the book. Describes programmers almost as a different species, using lots of stereotypes. In fact, at points, the book seems to use the word "programmer" as a synonym for "someone who is a terrible designer." Even makes the absurd claim that bad UI is just the way nerds are getting revenge against jocks. Seriously?   
  
Overall: skim quickly for the excellent design advice, and ignore all the horrible parts on how to run software projects or what programmers are like.  
  
  
  
  
Good quotes from the book:  
  
Reducing the cost of programming is not the same as reducing the cost of manufacturing. It's more like giving cheap tools to your workers than it is like giving the workers smaller paychecks. The companies that are shipping programming jobs overseas in order to pay reduced salaries are missing the point entirely.  
  
Ironically, the best way to increase profitability in the information age is to spend more.  
  
Treating any aspect of software design and construction as if it were a manufacturing process courts failure.   
  
In all other construction disciplines, engineers plan a construction strategy that craftsmen execute. Engineers don't build bridges; ironworkers do. Only in software is the engineer tasked with actually building the product. Only in software is the "ironworker" tasked with determining how the product will be constructed. Only in software are these two tasks performed concurrently instead of sequentially. But companies that build software seem totally unaware of the anomaly.   
  
I believe that there are two kinds of executives: those who are engineers, and those who are terrified of engineers.  
  
Communications can be precise and exacting while still being tragically wrong.   
  
To be a good programmer, one must be sympathetic to the nature and needs of the computer. But the nature and needs of the computer are utterly alien from the nature and needs of the human being who will eventually use it. The creation of software is so intellectually demanding, so all-consuming, that programmers must completely immerse themselves in an equally alien thought process. In the programmer's mind, the demands of the programming process not only supersede any demands from the outside world of users, but the very languages of the two worlds are at odds with each other.  
  
The process of programming subverts the process of making easy-to-use products for the simple reason that the goals of the programmer and the goals of the user are dramatically different. The programmer wants the construction process to be smooth and easy. The user wants the interaction with the program to be smooth and easy. These two objectives almost never result in the same program.  
  
Playing a violin is extremely difficult but low in cognitive friction because—although a violinist manipulates it in very complex and sophisticated ways—the violin never enters a "meta" state in which various inputs make it sound like a tuba or a bell. The violin's behavior is always predictable—though complex—and obeys physical laws, even while being quite difficult to control. In contrast, a microwave oven has a lot of cognitive friction, because the 10 number keys on the control panel can be put into one of two contexts, or modes. In one mode they control the intensity of the radiation, and in the other they control the duration. This dramatic change, along with the lack of sensory feedback about the oven's changed state, results in high cognitive friction.  
  
I prefer the term interaction design to the term interface design because "interface" suggests that you have code over here, people over there, and an interface in between that passes messages between them. It implies that only the interface is answerable to the users' needs. The consequence of isolating design at the interface level is that it licenses programmers to reason like this: "I can code as I please because an 'interface' will be slapped on after I'm done." It postpones design until after programming, when it is too late.  
Like putting an Armani suit on Attila the Hun, interface design only tells how to dress up an existing behavior.  
  
The number-one goal of all computer users is to not feel stupid  
  
The prodigious gifts of silicon are so overwhelming that we find it easy to ignore the collateral costs. If you are stranded on a deserted island, you don't care much that your rescue ship is a leaky, rat-infested hulk. The difference between having a software solution for your problem and not having any solution is so great that we accept any hardship or difficulty that the solution might force on us.  
  
Most software vendors don't know how to make their programs easy to use, but they sure know how to add features, so that is what they do.  
  
Physical objects, such as my Swiss Army knife, are subject to a natural brake on the proliferation of marginal features. Each new blade or accessory costs money for the manufacturer to build into the knife. The maker of the knife knows this, and each proposed new feature must pass a gauntlet of justification before it makes it into a shipping product. In engineering terms, this is called a _negative feedback loop_, in which intrinsic forces trend toward stability and equilibrium.  
  
Software architect Scott McGregor points out that Gresham's Law—that bad currency drives out good—is also relevant here. If there are two currencies, people will hoard the good one and try to spend the bad one. Eventually, only the bad currency circulates. Similarly, bad schedule estimates drive out good ones. If everybody makes bogus but rosy predictions, the one manager giving realistic but longer estimates will appear to be a heel-dragger and will be pressured to revise his estimates downward.  
  
Most product managers that I have worked with would rather ship a failure on time than risk going late.  
  
It has been said that the way Stalin cleared a minefield was to march a regiment through it. Effective? Yes. Efficient, humanitarian, viable, desirable? No.  
  
I am not saying that you cannot learn from trial and error, but those trials should be informed by something more than random chance and should begin from a well-thought-out solution, not an overnight hack. Otherwise, it's just giving lazy or ignorant businesspeople license to abuse consumers.  
  
It is more costly in the long run to have programmers write the wrong thing than to write nothing at all. This truth is so counterintuitive that most managers balk at the very idea. After code is written, it is very difficult to throw it out. Like writers in love with their prose, programmers tend to have emotional attachments to their algorithms. Altering programs in midstride upsets the development process and wounds the code, too. It's hard on the manager to discard code because she is the one who paid dearly for it, and she knows she will have to spend even more to replace it.  
  
Develop a precise description of our user and what he wishes to accomplish.  
  
The broader a target you aim for, the more certainty you have of missing the bull's-eye. If you want to achieve a product-satisfaction level of 50%, you cannot do it by making a large population 50% happy with your product. You can only accomplish it by singling out 50% of the people and striving to make them 100% happy. It goes further than that. You can create an even bigger success by targeting 10% of your market and working to make them 100% _ecstatic_. It might seem counterintuitive, but designing for a _single user_ is the most effective way to satisfy a broad population.  
  
Giving the persona a name is one of the most important parts of successfully defining one. _A persona without a name is simply not useful_. Without a name, a persona will never be a concrete individual in anyone's mind.  
  
There is an easy way to tell the difference between tasks and goals. Tasks change as technology changes, but goals have the pleasant property of remaining very stable. For example, to travel from St. Louis to San Francisco, my goals are speed, comfort, and safety. Heading for the California gold fields in 1850, I would have made the journey in my new, high-tech Conestoga wagon. In the interest of safety, I would have brought my Winchester rifle. Heading from St. Louis to the Silicon Valley in 1999, I would make the journey in a new, high-tech Boeing 777.  
  
Designing from tasks instead of goals is one of the main causes of frustrating and ineffective interaction.  
  
One important implication of the research is remarkably profound: If we want users to like our software, we should design it to behave like a likeable person. If we want users to be productive with our software, we should design it to behave like a good human work mate. Simple, huh?  
  
The program just doesn't care about me and treats me like a stranger even though I'm the only human it knows.  
  
Although the _code_ may succeed or fail in its ability to handle edge cases, the _product_ will succeed or fail in its ability to handle daily use and necessary cases.  
  
From an interaction designer's point of view, the divisions between hardware and software are inconsequential because they are inconsequential to a user. The user doesn't care which is more expensive to build.  
  
In programming, there is always an infinite variety of ways to solve any given problem. Experienced programmers, as they explore their options searching for the optimum solution, occasionally stumble on a technique that allows them to throw out hundreds—or even thousands—of lines of code. This only happens when the programmer has made a valuable conceptual leap forward. When she can toss out lots of code, her program is getting better. Less code means less complexity, fewer bugs, fewer opportunities for invalid interactions, and easier maintainability. Interaction designers share this sensation. As they explore their options, they discover places where they can dispense with entire screens or discard large and complex dialog boxes. The designer knows that each element of the user interface is a burden on the user. Each button and icon is one more thing that the user must know about, and must work around, to get to what she really wants. Doing more with less is always better.  
  
There is a big difference between _listening to_ and _following_ your customers. Listening is good. It means applying your own filter to what you have heard. Following is bad. It means merely doing what your customers tell you to do.   
  
The customer might have money, but it lacks two vital things: It doesn't have your best, long-term interests at heart, and it doesn't know how to design your product.

**Rating**: 3 stars

