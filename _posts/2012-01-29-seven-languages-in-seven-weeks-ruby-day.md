---
layout: post
title: 'Seven Languages in Seven Weeks&#58; Ruby, Day 1'
date: '2012-01-29T13:38:00.000-08:00'
author: Yevgeniy Brikman
tags:
- Seven Languages in Seven Weeks
modified_time: '2012-02-01T00:43:30.969-08:00'
thumbnail: http://4.bp.blogspot.com/-LEqb3ctyDHA/TyWo3qOwgfI/AAAAAAAAKWU/9z6_5bsTg_o/s72-c/seven-languages.jpg
blogger_id: tag:blogger.com,1999:blog-5422014336627804072.post-8427700545639440272
blogger_orig_url: http://brikis98.blogspot.com/2012/01/seven-languages-in-seven-weeks-ruby-day.html
thumbnail_path: blog/seven-languages/book-cover.jpg
---

I recently picked up a copy of [Seven Languages in Seven 
Weeks](http://www.amazon.com/Seven-Languages-Weeks-Programming-Programmers/dp/193435659X) 
by Bruce A Tate. The book is a survey of seven very different programming 
languages: Ruby, IO, Prolog, Scala, Erlang, Clojure, and Haskell. For each 
language, the goal is to give you just enough of a taste that you can see what 
makes it unique, what its strengths and weaknesses are, and the mindset and 
philosophy behind it. 

{% include figure.html path="blog/seven-languages/book-cover.jpg" caption="Seven Languages in Seven Weeks" url="http://www.amazon.com/dp/193435659X?ref=hello-startup-20" %}
 
Each section of the book focuses on a different language and includes coding 
problems for the reader to try at home. I've decided to record my my solutions 
to the problems and thoughts about each language in my blog. Today, we'll 
start with [Ruby](http://www.ruby-lang.org/). 

## Ruby, Day 1: Thoughts

I've used [Ruby](http://www.ruby-lang.org/) fairly extensively the last few 
years, including several [Ruby on Rails](http://rubyonrails.org/) apps 
([Resume Builder](http://resume.linkedinlabs.com/), [Veterans 
Hackday](http://veterans2011.linkedin.com/)) and a number of utility scripts. 
There is a lot to like about Ruby - the concise &amp; clean syntax, incredible 
flexibility, expressiveness, powerful DSLs - but my favorite part is the 
central tennet of the language, as expressed by its creator: 

<blockquote>
  <p>Ruby is designed to make programmers happy.</p>
  <cite>Yukihiro Matsumoto</cite>
</blockquote>

The language isn't built for speed, concurrency, or any 
particular feature set. Its central "success metric" is programmer happiness 
and productivity, which are, arguably, the biggest bottlenecks in most 
projects. 

## Ruby, Day 1: Problems

The "Day 1" Ruby chapter focused on the very basics of the language, so I 
didn't learn anything new. The problems are extremely simple and basic, but 
for completeness, here are my solutions: 

### Hello, World

Print the string "Hello, world". 

{% highlight ruby %}
puts "Hello, world"
{% endhighlight %}

### Hello, Ruby

For the String "Hello, Ruby", find the index of the word "Ruby". 

{% highlight ruby %}
"Hello, Ruby".index "Ruby"
{% endhighlight %}

### Print Name

Print your name ten times. 

{% highlight ruby %}
10.times { puts "Jim" }
{% endhighlight %}

### Print Sentence

Print the string "This is sentence number 1" where the number 1 changes from 1 
to 10. 

{% highlight ruby %}
1.upto(10) { |i| puts "This is sentence number #{i}" }
{% endhighlight %}

### Random Number

Write a program that picks a random number. Let a player guess the number, 
telling the player whether the guess is too high or too low. 

{% highlight ruby %}
to_guess = rand(10) + 1
puts "Try to guess a number between 1 and 10."
 
begin
  print "Enter your guess: "
  guess = gets.to_i
  puts "Too low!" if guess < to_guess
  puts "Too high!" if guess > to_guess
end while guess != to_guess
 
puts "Correct!"
{% endhighlight %}

## Ruby vs. Java

Coming from a Java background, every time I see Ruby, I'm amazed at how 
concise and readable it is. There is far less boilerplate: you don't have to 
wrap everything in classes and methods, no semi-colons, far fewer curly 
braces, and so on. Everything is an object and there are countless helper 
functions, all with intuitive names: even if you've never used Ruby, it's easy 
to guess the effects of `10.times` or `1.upto(10)`. Whereas in the Java world, 
libraries seem to compete on having every bell, whistle, and tuning knob, in 
the Ruby world, libraries focus much more on having the simplest, easiest, 
one-line-and-you're-done API possible. 

For comparison, I implemented the number guessing game in Java: 

{% highlight java %}
import java.util.Random;
import java.util.Scanner;
 
public class GuessNumber {
  public static void main(String[] args) {
    Random generator = new Random();
    int toGuess = generator.nextInt(10) + 1;
    int guess;
    Scanner scanner = new Scanner(System.in);
    try {
      System.out.println("Try to guess a number between 1 and 10.");
      do {
        System.out.print("Enter your guess: ");
        guess = scanner.nextInt();
        if (guess < toGuess) {
          System.out.println("Too low!");
        } else if (guess > toGuess) {
          System.out.println("Too high!");
        }
      } while (guess != toGuess);
      System.out.println("Correct!");
    } finally {
      scanner.close();
    }
  }
}
{% endhighlight %}

It's has more than *twice* the number of lines of code as the Ruby version 
(and I kept opening curly braces on the same line!) and even though I've been 
doing Java for a very long time, it still took longer to write. Of course, 
there are many other trade-offs at play here, but they key thing to think 
about is the golden rule of programming: 

<blockquote>
  <p>
    Programs must be written for people to read, and only incidentally for 
    machines to execute.
  </p>
  <cite>
    <a href="http://www.amazon.com/dp/0262011530?ref=hello-startup-20">Structure and Interpretation of Computer Programs</a>
  </cite>
</blockquote>

Ruby has its downsides, but it is one of the best languages I've seen for writing 
code that others can read, understand, and maintain for a long time after. 

## Ruby, Continued

The Ruby explorations continue on [Ruby, Day 
2](https://www.ybrikman.com/writing/2012/01/29/seven-languages-in-seven-weeks-ruby-day_29/). 