# Yevgeniy Brikman Home Page

This is the code for the [Yevgeniy Brikman Home Page](http://www.ybrikman.com).

![Yevgeniy Brikman Home Page Screenshot](/assets/img/screenshots/ybrikman-homepage-screenshot.png)

I wanted a clean, simple home page where I could put my writing, speaking, 
projects, and photos. It had to be fast, mobile-friendly, free to build, and 
easy to update. This is the result. Forks and pull requests are welcome!

Check out [Migrating from Blogger to GitHub Pages and launching the new ybrikman.com](http://www.ybrikman.com/writing/2015/04/20/migrating-from-blogger-to-github-pages/)
for background info.

# Quick start

1. Use Git to clone this repo
1. Make sure you have [Jekyll](http://jekyllrb.com/docs/installation/) installed
1. Just the first time: `bundle install`
1. To build the site and serve it: `bundle exec jekyll serve`
1. To test: `http://localhost:4000`

See the [Jekyll](http://jekyllrb.com/) and [GitHub Pages](https://pages.github.com/)
documentation for more info.

# Docker quick start

As an alternative to installing Ruby and Jekyll, if you're a user of
[Docker](https://www.docker.com/) and [Docker 
Compose](https://docs.docker.com/compose/), you can run a Docker image of 
yevgeniy-brikman-homepage that has all the dependencies already setup for you.

On Linux:

1. `git clone` this repo
2. `docker-compose up`
3. Go to `http://localhost:4000` to test 

On OS X, using the [docker-osx-dev](https://github.com/brikis98/docker-osx-dev)
project:

1. `git clone` this repo
2. `docker-osx-dev`
3. `docker-compose up`
4. Go to `http://dockerhost:4000` to test

# Technologies

1. Built with [Jekyll](http://jekyllrb.com/). This website is completely static
   and I use basic HTML or Markdown for everything.
1. Hosted on [GitHub Pages](https://pages.github.com/). I'm using the 
   [GitHub Pages Gem](https://help.github.com/articles/using-jekyll-with-pages/)
   and only Jekyll plugins that are 
   [available on GitHub Pages](https://help.github.com/articles/repository-metadata-on-github-pages/).
1. The design is loosely based on [Kasper](https://github.com/rosario/kasper),
   [Pixyll](http://pixyll.com/), and [Medium](https://medium.com/).
1. I used [Basscss](http://www.basscss.com/), [Sass](http://sass-lang.com/),
   [Font Awesome Icons](http://fortawesome.github.io/Font-Awesome/icons/),
   [Hint.css](http://kushagragour.in/lab/hint/),and 
   [Google Fonts](https://www.google.com/fonts) for styling.
1. I used [jQuery](https://jquery.com/), [lazySizes](http://afarkas.github.io/lazysizes/), 
   and [responsive-nav.js](http://responsive-nav.com/) for behavior.
1. I added [Disqus](https://disqus.com/websites/) as a commenting system.
1. I'm using [UptimeRobot](http://uptimerobot.com/) and 
   [Google Analytics](http://www.google.com/analytics/) for monitoring and
   metrics.
1. Most of the blog posts were imported from my old Blogger account, so there 
   are a few hacky Ruby scripts in `_scripts` left over from that migration.

# License

This code is released under the MIT License. See LICENSE.txt.