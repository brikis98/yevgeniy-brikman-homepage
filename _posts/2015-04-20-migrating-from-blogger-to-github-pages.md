---
layout: post
title: "Migrating from Blogger to GitHub Pages and launching the new ybrikman.com"
tags:
- Writing
- HowTo
thumbnail_path: blog/github-pages/github-pages.png
---  

Around 2007, I created my home page on a free PHP host and a blog on Blogger. 
The two websites have served me well for nearly 8 years, but they were long past
due for an update. Last week, I finally sat down and rebuilt my home page on
top of [Jekyll](http://jekyllrb.com/), [GitHub Pages](https://pages.github.com/), 
and [Basscss](http://www.basscss.com/), migrated my blog into it, and launched 
the new [ybrikman.com]({{ site.url }}):

{% include figure.html path="screenshots/ybrikman-homepage-screenshot-small.png" alt=site.url url=site.url %}

I wish I could say it was a quick and painless process, but it wasn't. Coming 
up with a design was easy, but making it work in Internet Explorer and on mobile 
was painful. Learning Jekyll and GitHub Pages was easy, but the fact that 
GitHub Pages only supports a few Jekyll plugins was painful. Learning Basscss 
was easy, but filling in the UI elements it lacked was painful. And 
importing my posts from Blogger to Jekyll was easy, but making them look nice, 
and redirecting from Blogger to GitHub pages without losing SEO rank was 
painful. In short, just like every
[ground-up rewrite](http://onstartups.com/tabid/3339/bid/97052/How-To-Survive-a-Ground-Up-Rewrite-Without-Losing-Your-Sanity.aspx),
it took much longer than I expected.

<blockquote>
  <p>
    Hofstadter's Law: It always takes longer than you expect, even when you 
    take into account Hofstadter's Law.
  </p>
  <cite>
     Douglas Hofstadter, 
     <a href="http://www.amazon.com/dp/0465026567?ref=hello-startup-20">Gödel, Escher, Bach</a>
  </cite>
</blockquote>

As documentation for myself in the future, and as a guide for anyone else 
thinking of doing a similar migration, I've written this blog post to capture 
the key steps involved:

1. [Design](#design)
1. [Code](#code)
1. [Migrate](#migrate)

<a name="design"></a>

## Step 1: Design

In the spirit of [dogfooding](http://en.wikipedia.org/wiki/Eating_your_own_dog_food),
I came up with a design by following the design chapter in my own 
[book]({{ site.hello_startup_url }}?ref=migrate-blogger-github). One of the key 
lessons there is *design re-use*. Just as a programmer should prefer building 
on top of existing, battle-tested, and (preferably) open source libraries 
instead of reinventing the wheel, a designer should prefer using existing, 
battle-tested, and (preferably) open source designs instead of coming up with 
something from scratch. I browsed through my list of 
[design resources]({{ site.hello_startup_url }}/resources/design/?ref=migrate-blogger-github),
and found two free, open source templates to use as a starting point:

1. [Kasper](https://github.com/rosario/kasper)
1. [Pixyll](https://github.com/johnotander/pixyll)

I then added a menu based on the 
[Freelancer Bootstrap Template](http://startbootstrap.com/template-overviews/freelancer/),
a comments and footer section inspired by [Medium](https://medium.com/), and the
simplest favicon I could think of (my initials) generated using
[favicon-generator.org](http://www.favicon-generator.org/). Copy and paste may 
strike some people as an uninspiring way to come up with a design, but the 
truth is that copy, transform, and combine are the basis of *all* creative work, 
as beautifully captured in the 
[Everything is a Remix](http://everythingisaremix.info/watch-the-series/) video
series:

{% include iframe-figure.html url="https://player.vimeo.com/video/14912890" caption="Everything is a Remix" link="http://everythingisaremix.info/watch-the-series/" %}

I ended up with a nice clean design, but once I started testing it in Internet
Explorer (IE) and on mobile, I ran into a number of issues. Internet Explorer,
at least the older versions, is problematic because, well, because 
[IE](http://knowyourmeme.com/memes/subcultures/internet-explorer) 
[is](http://whyiesucks.blogspot.com/) 
[terrible](http://www.ihateinternetexplorer.com/):

{% include image.html path="blog/github-pages/browsers.jpg" alt="Browsers" %}

Therefore, I've minimally tested my website in the latest IE, and everything
less than version 10 is probably broken (which is OK, since that's less than 
0.5% of my visitors). Mobile is tricky because of the insane number of screen 
sizes you have to support. For example, these are just the screen sizes for 
Android back in 2012:

{% include figure.html path="blog/github-pages/screen-sizes.png" caption="Android fragmentation" url="http://opensignal.com/reports/fragmentation.php" %}

The situation has only gotten worse in the last several years. The only two 
things that helped were a) learning some of the basics of
[responsive web design](https://developers.google.com/web/fundamentals/layouts/rwd-fundamentals/)
and b) making heavy use of the
[Device Mode and Emulation](https://developer.chrome.com/devtools/docs/device-mode)
feature in Google Chrome:

{% include figure.html path="blog/github-pages/chrome-device-mode.png" caption="Google Chrome Device Mode and Emulation" url="https://developer.chrome.com/devtools/docs/device-mode" %}

<a name="code"></a>

## Step 2: Code

Let's now turn our attention to the code. The primary technologies I'll focus 
on are:

1. [Jekyll](#jekyll)
1. [GitHub Pages](#github-pages)
1. [Styling](#styling)
1. [UI Components](#components)

<a name="jekyll"></a>

### Jekyll

In 2007, when I first signed up for Blogger, it was a fairly cutting-edge 
blogging platform. Today, it feels downright dated. It loads slowly, the available 
designs are uninspiring and cluttered, the templates are coded in an arcane XML 
syntax (more on that in the [migrate section](#migrate)), and the in-browser 
writing and editing experience is awful (the WYSIWYG preview is inaccurate, it's
hard to format things correctly, and several times, I've accidentally deleted 
something and it auto-saved, with no way to recover due to a lack of revision 
history). I played around with WordPress, Medium, and a number of 
other blogging platforms, but I found all of them too limiting, especially in 
terms of controlling the design and including arbitrary code. Therefore, 
instead of a hosted blogging platform, I decided to try to build my blog on top 
of [Jekyll](http://jekyllrb.com/).

Jekyll is a static website generator. There are no databases, web frameworks, 
or complicated Content Management Systems (CMS) to deal with. You just create 
pages in HTML, [Markdown](http://daringfireball.net/projects/markdown/), and
[Liquid](https://github.com/Shopify/liquid), and Jekyll compiles them for you 
into a completely static website that consists of plain HTML files. You can 
think of it as a preprocessor for HTML in the same way that 
[Sass](http://sass-lang.com/) is a preprocessor for CSS and 
[CoffeeScript](http://coffeescript.org/) is a preprocessor for JavaScript. For 
example, to create a new blog post, you could put a markdown file such as 
`my-new-blog-post.md` into the `_posts` folder:

{% highlight text %}
---
layout: post
title: Blog post title
---  

This is my new blog post.
{% endhighlight %}

The section delimited by `---` at the top of `my-new-blog-post.md` is a block of
YAML called the [Front Matter](http://jekyllrb.com/docs/frontmatter/) that 
tells Jekyll to process this file. The `layout: post` line tells Jekyll to 
stitch the contents of `my-new-blog-post.md` into the layout defined in 
`_layouts/post.html`:

{% highlight html %}
<html>
  <head>
    <title>{% raw %}{{ page.title }}{% endraw %}</title>
    <link rel="stylesheet" href="/assets/css/main.css">
  </head>
  <body>
    <main>
      {% raw %}{{ content }}{% endraw %}
    </main>
  </body>
</html>
{% endhighlight %}

The `{% raw %}{{ XXX }}{% endraw %}` syntax is a variable lookup, so 
`{% raw %}{{ page.title }}{% endraw %}` will be replaced by the title of the 
blog in your Front Matter ("Blog post title") and 
`{% raw %}{{ content }}{% endraw %}` will be replaced by the contents of the 
actual blog post ("This is my new blog post"). Since you have full access to the 
[Liquid template language](https://github.com/Shopify/liquid), you can build 
your website with variables, layouts, includes, for loops, and lots of other 
features that keep your code DRY. And since the output is completely static, 
you can host it anywhere, such as 
[Amazon S3](http://docs.aws.amazon.com/AmazonS3/latest/dev/WebsiteHosting.html), 
[DropBox](http://learn.andrewmunsell.com/learn/jekyll-by-example/dropbox-hosting),
or the host that I chose, [GitHub Pages](https://pages.github.com/).

<a name="github-pages"></a>

### GitHub Pages

GitHub Pages allows you to deploy your code to the github.io domain (you can also 
[set up a custom domain](https://help.github.com/articles/setting-up-a-custom-domain-with-github-pages/),
as I did with ybrikman.com) just by pushing your code to a public GitHub repo. 
For example, the repo for ybrikman.com is 
[{{ site.website_repo_url }}]({{ site.website_repo_url }}), and every time I 
`git push` changes there, GitHub automatically runs Jekyll to compile the
site, and deploys the new files. 

The only downside is that GitHub Pages supports only 
[a few Jekyll Plugins](https://help.github.com/articles/using-jekyll-plugins-with-github-pages/).
You can use other Jekyll plugins on your local computer and check the compiled
files in, but I've always found that error-prone, so for now, I'm trying to 
work around the lack of plugins as follows:

1. **Assets**: I'm using Jekyll's [native support for sass](http://jekyllrb.com/docs/assets/) 
   to compile, concatenate, and minify my CSS. As for JavaScript, I'm just
   using a few open source libraries that are already minified and concatenated 
   into one small file. If I end up with a lot more assets to manage in the 
   future, I may switch to the 
   [jekyll-assets](https://github.com/jekyll-assets/jekyll-assets) plugin and
   check in the compiled files instead.
1. **Tags**: using a small 
   [hack](https://github.com/brikis98/yevgeniy-brikman-homepage/blob/gh-pages/writing/tags/index.html),
   I generated a single page with all of my [tags](https://www.ybrikman.com/writing/tags/). 
   If I want to have a separate page for each tag, I'll switch to the 
   [jekyll-categories](https://github.com/zroger/jekyll-categories) generator
   and check in the compiled files instead.
1. **RSS**: [jekyll-rss-feeds](https://github.com/snaptortoise/jekyll-rss-feeds)
   works great with GitHub Pages to generate an 
   [RSS feed]({{ site.nav.writing.rss }}). No hacks required!

<a name="styling"></a>

### Styling

I use [Bootstrap](http://getbootstrap.com/) for most of my projects because
it provides a great set of default styles, a nice grid system, and a large 
number of reusable UI elements and behaviors. However, I've never been a fan of
how Bootstrap organizes its CSS and markup, and found that small changes often
break my websites in unexpected ways. As a way to learn something new, I 
decided to try [Basscss](http://www.basscss.com/) for my homepage redesign. 
Basscss is loosely based on [Object Oriented CSS](http://www.smashingmagazine.com/2011/12/12/an-introduction-to-object-oriented-css-oocss/)
(OOCSS), which, in theory, makes your CSS more maintainable and reusable. For 
example, in the past, to put together the page that lists all of my
[blog posts](https://www.ybrikman.com/writing/), with a thumbnail on the 
left and the blog post description on the right, I might have written the 
following HTML:

{% highlight html %}
<div class="blog-post">
  <div class="thumbnail">
    <img src="thumbnail.jpg">
  </div>
  <div class="description">
    <p>Description...</p>
  </div>
</div>
{% endhighlight %}

And I would have had the following CSS to go with it:

{% highlight css %}
.blog-post {
  padding: 10px;  
}

.blog-post .thumbnail {
  float: left;
  padding: 20px;
}

.blog-post .description {
  float: left;
  padding: 20px;
  font-size: 16px;
}
{% endhighlight %}

This CSS is not particularly reusable. It'll work for the list of blog posts, 
but not for other similar lists, such as my list of 
[projects](https://www.ybrikman.com/projects/), which also has a thumbnail on
the left and a description on the right. Of course, I could make the 
CSS class names more generic, such as replacing `.blog-post` with `.media-item`,
but now the HTML and CSS for both pages is tightly coupled. What if the 
projects list needs to have more padding or use a different font? I'd have to 
insert all sorts of CSS overrides, which make it much harder to reason about 
and maintain the CSS.

The approach in Basscss is, as much as possible, to define small, granular, 
immutable (so you don't override them!), and therefore, highly reusable CSS 
classes. Here's a rough example of the CSS:

{% highlight css %}
/* Reusable classes for padding */
.p1 { padding: 10px; }
.p2 { padding: 20px; }
.p3 { padding: 30px; }

/* Reusable float utilities */
.left { float: left; }
.right { float: right; }

/* Reusable font utilities */
.h1 { font-size: 28px; }
.h2 { font-size: 24px; }
.h3 { font-size: 20px; }
.h4 { font-size: 16px; }
{% endhighlight %}

I can toss these reusable CSS classes into my HTML as follows:

{% highlight html %}
<div class="p1">
  <div class="left p2">
    <img src="thumbnail.jpg">
  </div>
  <div class="left p2 h4">
    <p>Description...</p>
  </div>
</div>
{% endhighlight %}

I could use the same markup in both the blog and project lists. If I wanted more 
padding in the projects list, I would change the `p1` to a `p2`; if I wanted a 
different font, I would change the `h4` to an `h3`; in either case, since the
CSS classes are simple and immutable, I can be confident in making those changes
because it's unlikely they will have any effect on the blog post list. In other
words, this approach makes it *much* easier to reason about style changes, at
least in the short time I've used it so far. The only downside is you end up 
with many more CSS classes in your markup, which does feel slightly verbose and 
repetitive, but the tools for dealing with this in markup (i.e. a templating
language) are much better than in CSS, so it seems like a reasonable trade-off.
Of course, what I've shown above is only a taste of how Basscss works (check out 
their [design principles](http://www.basscss.com/docs/reference/principles/) for 
more info), but so far, I'm pretty happy with the approach.

What I'm less happy with is that Basscss is a minimal and fairly low-level 
framework, so it does not have support built-in for nearly as many UI elements 
and behaviors as Bootstrap (side note: if you're looking for an open 
source project, I'd love to see Bootstrap rewritten on top of Basscss). As a 
result, I've had to do more work to find and glue together libraries that fill 
in the missing UI components.

<a name="components"></a>

### UI Components

Here's a quick list of a few of other UI libraries I used:

1. [responsive-nav.js](https://github.com/viljamis/responsive-nav.js): A nav 
   that collapses down to the "hamburger icon" on mobile. Bootstrap has this
   built-in, and it turned out to be harder to replicate manually than I 
   expected, so I turned to this library to take care of all the corner cases.
1. [hover.css](http://ianlunn.github.io/Hover/): Simple popover effects when you
   mouse over text or an image. Bootstrap has this built in as well, although
   this library does it with pure CSS, so no extra JavaScript is required.
1. [lazysizes](https://github.com/aFarkas/lazysizes): A lazy loader that 
   significantly speeds up page load time by only rendering images and iframes
   when (and if) they scroll into view. Very easy to use and it makes a huge
   difference in load time, especially for image and iframe heavy blog posts
   such as [Must-See Tech Talks for Every Programmer](https://www.ybrikman.com/writing/2014/05/29/must-see-tech-talks-for-every-programmer/).
1. [Disqus](https://disqus.com/websites/): Add a few lines of JavaScript to
   your page and you have a full-fledged commenting system. It's free, fits 
   well into most UI's, and has great moderation tools to fight spam. 

<a name="migrate"></a>

## Step 3: Migrate

Once I had the code for the website in place, the next steps were:

1. [Import old blog posts](#import)
1. [Redirect old blog posts](#redirect)

<a name="import"></a>

### Import old blog posts

Jekyll has [importers](http://import.jekyllrb.com/docs/home/) for a number of
blogging engines, including [Blogger](http://import.jekyllrb.com/docs/blogger/). 
You download your Blogger posts as an XML feed and the Jekyll importer converts
them to static HTML files for you. This process doesn't take long, and it's
certainly better than doing it by hand, but the results pull in a lot of the 
Blogger markup, which is verbose and includes a huge amount of inline CSS styles
that break the look and feel of your blog. I wrote a *very* hacky 
[Ruby script](https://github.com/brikis98/yevgeniy-brikman-homepage/blob/gh-pages/_scripts/blogger_convert.rb)
that stripped out as much of this markup as possible and converted the files to
Markdown. I wouldn't recommend using it directly (yes, I committed the cardinal 
sin of using [RegEx to parse HTML](http://stackoverflow.com/a/1732454/483528)),
but it might be helpful as a reference. Anything the script didn't handle 
correctly, I did by hand, which was a painful and time consuming process,
even for my fairly small blog. 

<a name="redirect"></a>

### Redirect old blog posts

Now that I had all of my blog posts in Jekyll, the final step was to direct
all traffic to the new URLs. I had two requirements:

1. **Redirect each blog post to its equivalent on my new website**. For
   example, if a user was looking at my old Blogger post, which has the format
   `http://brikis98.blogspot.com/2014/02/bar.html`, I couldn't just redirect 
   them to `{{ site.url }}/writing`, as they would never find the original 
   `bar.html` post that they were looking at. Instead, I needed a way to 
   redirect them to the equivalent Jekyll URL, which for me was of the form 
   `{{ site.url }}/writing/2014/02/03/bar`. Notice how transforming the URL
   from the old format to the new one requires a fair amount of string 
   manipulation, including changing the domain name, adding the day of the year 
   to the path, and removing the `.html` extension.
1. **Redirect without losing SEO rank**. This means I needed a way to redirect
   all search engine bots (so JavaScript probably won't work) and I 
   needed a way to include a `<link rel="canonical" href="..."/>` tag on the 
   page with the new URL. 

I found some blog posts with instructions on migrating from Blogger to other
blogging platforms, such as WordPress, that made it seem like this would be 
easy. It wasn't. Blogger templates use some sort of 
[arcane XML syntax](https://support.google.com/blogger/answer/46995?hl=en) that
only supports basic variable lookups, loops, and if/else statements, and I could
not find any way to do the type of string manipulation I'd need to transform
URLs as shown in requirement #1 above (in fact, I found very little 
documentation in general for this XML syntax). I did come across a 
[StackOverflow discussion](http://stackoverflow.com/questions/16216813/redirecting-old-blog-address-to-a-new-blog-address-permanently-in-blogger)
that showed how you can do the string manipulation in JavaScript, but this 
fails requirement #2 above.

Therefore, it was time to build another hack. The idea was to generate an XML
Blogger template that had all of my blog post URLs, and their equivalent redirect
URLs, hard-coded into it as a series of if-statements. It would look something
like this:

{% highlight xml %}
<b:if cond='data:blog.canonicalUrl == "http://brikis98.blogspot.com/2007/10/search-for-perfect-pda-phone.html"'>
  <link rel="canonical" href="https://www.ybrikman.com/writing/2007/10/31/search-for-perfect-pda-phone/"/>
  <meta http-equiv="refresh" content="0; url=https://www.ybrikman.com/writing/2007/10/31/search-for-perfect-pda-phone/"/>
<b:elseif cond='data:blog.canonicalUrl == "http://brikis98.blogspot.com/2007/11/i-hate-css.html"'/>
  <link rel="canonical" href="https://www.ybrikman.com/writing/2007/11/01/i-hate-css/"/>
  <meta http-equiv="refresh" content="0; url=https://www.ybrikman.com/writing/2007/11/01/i-hate-css/"/>
<b:elseif cond='data:blog.canonicalUrl == "http://brikis98.blogspot.com/2007/11/call-of-duty-4-modern-warfare-review.html"'/>
  <link rel="canonical" href="https://www.ybrikman.com/writing/2007/11/27/call-of-duty-4-modern-warfare-review/"/>
  <meta http-equiv="refresh" content="0; url=https://www.ybrikman.com/writing/2007/11/27/call-of-duty-4-modern-warfare-review/"/>
<!-- And so on, one if-statement per blog post -->
{% endhighlight %}

I created another [hacky Ruby script](https://github.com/brikis98/yevgeniy-brikman-homepage/blob/gh-pages/_scripts/redirect_urls.rb)
that ran through all the blog posts I converted earlier (see the 
[import section](#import) above) and automatically generated this huge,
hard-coded XML template for me. It's ugly, but now that it's in place, it seems
to work. Or as the old saying goes, if it looks stupid but works, it ain't
stupid.

{% include image.html path="blog/github-pages/shopping-cart-grill.jpg" alt="If it looks stupid but works, it ain't stupid" %}

The final step was to remove or update all the old Blogger URLs that I 
controlled. This included any links I had on social media (e.g. my Twitter 
profile, LinkedIn profile, Facebook profile, etc), as as well as any 
cross-references in the blog itself (I updated these automatically with
[yet another Ruby script](https://github.com/brikis98/yevgeniy-brikman-homepage/blob/gh-pages/_scripts/update_blogger_links.rb)).

## Wrapping up

It took a fair bit of work, but I'm fairly happy with the results:

1. I completely control the look and feel of my blog and home page.
1. It loads quickly and works on mobile.
1. I can write blog posts in Markdown and include arbitrary code snippets.
1. I have full revision history powered by Git.
1. I get to use `git push` to deploy new content.

All the code for my blog is open source on [GitHub](https://github.com/brikis98/yevgeniy-brikman-homepage)
under an MIT License, so feel free to fork it and reuse pieces as you wish.

Thoughts? Feedback? Leave a comment.


