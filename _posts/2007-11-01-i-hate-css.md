---
layout: post
title: I Hate CSS
date: '2007-11-01T12:45:00.000-07:00'
author: Yevgeniy Brikman
tags:
- Web Dev
- Software Engineering
modified_time: '2011-08-06T15:10:36.793-07:00'
blogger_id: tag:blogger.com,1999:blog-5422014336627804072.post-1117971464467025140
blogger_orig_url: http://brikis98.blogspot.com/2007/11/i-hate-css.html
---

Those of you who design webpages have probably seen this rant before. In fact, 
if you search google for "I Hate CSS" you will find. 
[lots](http://www.evilgeniuschronicles.org/wordpress/2005/06/12/i-hate-css/). 
[of](http://www.artblog.net/?name=2005-08-08-14-24-css). 
[results](http://blog.taragana.com/index.php/archive/i-hate-css-i-hate-hacking-php-hacks/). 
Still, I need to rant a bit. 

CSS, or cascading style sheets should be used, as their name implies, just for 
*style*. And by that, i mean fonts, colors, text size, borders, etc. 
Unfortunately, the "expert" web design community is pushing hard to use CSS 
for layouts and having a great time denouncing tables. Now, i agree tables 
aren't the best solution. Tables are very simple to understand and use and are 
generally well supported in most browsers. However, they are not terribly 
flexible and can be very hard to maintain. You need to use hacks here and 
there, throw in spacer images, invisible gif's, and so on. So, i certainly 
understand the motive for developing an alternative to table-based layouts. 

But CSS is **NOT** it. 

The idea behind CSS was to: 

1. Separate presentation from content. This allows you to layout &amp; decorate the same content in many different ways, which is very handy. 
1. Remove the hacks needed to make tables layouts work. 
1. Save you time. 
1. Give you far more powerful presentation and layout options. 

The [CSS Zen Garden](http://www.csszengarden.com/) is a brilliant example 
of what, in theory, could "easily" be achieved with CSS. My [own 
website](https://www.ybrikman.com/) uses CSS extensively and it does allow for 
some beautiful effects. It's probably one of the main things that separates a 
[modern website](http://www.altavista.com/) from those made in the [late 
90's](http://web.archive.org/web/19970509000911/http://www.altavista.com/). 
But CSS is severely lacking and flawed as a means of layout. 

First of all, it's completely unintuitive. Many constructs that we were used 
to&mdash;and those that make logical sense&mdash;are gone. For example, let's talk 
about center align. With a table, you could set the table, and each cell (`td`) 
in it, to `align="center"`. Couldn't be easier. 

How does CSS do it? Well, you can try `text-align: center`. This works every now 
and then, but typically only on text or inline elements. Fine, it is called 
**text**-align for a reason I guess. But why isn't there a 
**everything-else-**align? Instead, you end up trying `margin: 0 auto`. What do 
margins have to do with it? And when this fails, which it often does, you try 
relative position, putting the left edge at 50%, of the container width minus 
the width of the item... Which doesn't apply to all layouts, so then you 
resort to absolute position. But of course, that's not flexible and also tends 
to work poorly at times... 

And that's just center align *horizontally*. Center align *vertically* is 
significantly worse. With tables, each cell/row supported the `valign` property. 
Again, simple and effective. 

To get this to work in CSS, you have to go through 
[page](http://www.student.oulu.fi/%7Elaurirai/www/css/middle/) after 
[page](http://phrogz.net/CSS/vertical-align/index.html) of techniques until 
you find one that works for you. One idea calls for `padding` and negative 
`margin`. Another requires you to set `line-height` to the height of the 
container. Another tells you to set the container to be a `table-cell` (irony, 
anyone?). Almost none of them, as ridiculous as it sounds, use the CSS 
vertical-align property. 

Isn't center align a VERY basic task? Doesn't virtually every website on the 
planet require center alignment (look at my blog, google, cnn)? Why is it so 
painfully difficult and unintuitive with CSS? 

The relationship between containers in CSS is also pretty unintuitive. With 
tables, it was very obvious how cells interacted: it's just hard to mess up 
rows and columns. Say you wanted a webpage with a classic 3 column layout. 
With tables it's easy: `tr td td td`. Done. 

How does CSS compare? Take a look at one of the [highly recommended 
approaches](http://www.glish.com/css/7.asp). We're talking several *pages* of 
styling, involving absolute positioning, gigantic margins (`margin-left: 201px;`), 
and a few hacks. Don't people realize how ridiculous this is? 

Heaven help you if you wanted 3 columns with a header in footer. In the world 
of tables this was: `tr td (colspan=3) tr td td td tr td (colspan=3)`. Done. Now 
check out the [CSS](http://www.tanfa.co.uk/css/layouts/main.css) from [this 
site](http://www.tanfa.co.uk/css/layouts/css-3-column-layout-v2.asp) that 
shows you how to achieve it. We're talking several pages of complex CSS. And 
the ultimate irony: many of the containers are set to `display: table-cell`! 
Better solutions exist, but in terms of simplicity and intuitiveness, CSS 
cannot come close to tables. 

Now, the numerous flaws and drawbacks in CSS could be forgiven, if not for one 
thing: ridiculously inconsistent browser support. It's probably not the fault 
of the CSS creators, but it'll make your eyes bleed trying to get your page to 
look the same in different browsers, not to mention in different versions of 
the same browser, different resolutions, on different OS's, in different 
languages, etc... It's impossible. 

Want to use `max-height`? Sorry, Microsoft decided not to implement it, at all. 
`Padding` and `margin` should be simple, right? Nope, each browser does it's own 
thing. And don't every try setting the width to a percentage to have a 
flexible layout... That's ridiculous and you should be ashamed to have thought 
of it. You need a [giant chart](http://centricle.com/ref/css/filters/) just to 
figure out what's available on each browser. 

The main culprit tends to be Internet Explorer, which is not only riddled with 
CSS bugs, but does not implement the same CSS features as other browsers. You 
end up using the Holly hack for the [IE6 peek-a-boo 
bug](http://positioniseverything.net/explorer/peekaboo.html), [selector 
hacks](http://www.positioniseverything.net/articles/ie7-dehacker.html) for 
everything else IE6 related and reading [entire 
guides](http://www.webcredible.co.uk/user-friendly-resources/css/internet-explorer.shtml) 
and [websites](http://archive.webstandards.org/css/winie/) on dealing with 
IE/CSS issues. You use JavaScript to fill in the gaps, you yell, scream, kick, 
break down to a cry, and finally fall back to tables. It's obscene and 
ridiculous. As a web designer, I end up spending 10% of my time on design, 10% 
on coding and %80 fighting with compatibility issues. 

CSS is just not cutting it. But, as I said before, tables are not the ideal 
solution either. I think what we really need is a separate language designed 
specifically for layouts. Let the basic HTML code handle your content. Let CSS 
handle the styling of the content. And let this new layout language handle how 
all the pieces fit together. 