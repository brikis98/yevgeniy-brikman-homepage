---
layout: post
title: 'Seven Languages in Seven Weeks&#58; Io, Day 2'
date: '2012-02-04T14:07:00.000-08:00'
author: Yevgeniy Brikman
tags:
- Seven Languages in Seven Weeks
modified_time: '2012-02-11T19:47:00.433-08:00'
blogger_id: tag:blogger.com,1999:blog-5422014336627804072.post-6838053320631947816
blogger_orig_url: http://brikis98.blogspot.com/2012/02/seven-languages-in-seven-weeks-io-day-2.html
thumbnail_path: blog/seven-languages/book-cover.jpg
---

Today is Day 2 of [Io](http://iolanguage.com/) in my [Seven Languages in Seven 
Weeks](https://www.ybrikman.com/writing/tags/#Seven%20Languages%20in%20Seven%20Weeks) 
series of blog posts. You can check out [Day 1 of IO 
here](https://www.ybrikman.com/writing/2012/02/03/seven-languages-in-seven-weeks-io-day-1/). 
 
## Io, Day 2: Thoughts

Day 2 made some huge leaps and bounds over the basic syntax introduced in 
Day 1. The key learning from this day is that in Io, just about everything is 
a message sent to an object. There aren't separate semantics for calling 
functions, using control structures, or defining objects: those are all just 
objects reacting to some sort of message. 
One of the most startling examples of this is the realization that even 
the basic operators in Io, such as `+`, `-`, and `*`, are actually messages. That 
is, the code `2 + 5` is actually understood as the message `+` being sent to 
the object `2` with `5` as a parameter. In other words, it could be re-written as 
`2 +(5)`. The `+`, then, is just a method defined on the number object that 
takes another number as a parameter. 
This makes supporting operators on custom objects simple: all I have to 
do is define a "slot" with the operator's name. For example, here's an object 
for complex numbers that can be used with the `+` operator: 

{% highlight io %}
Complex := Object clone do (
  setValues := method(real, imaginary, 
    self real := real; 
    self imaginary := imaginary; 
    self
  )
  + := method(other, 
    result := Complex clone setValues(self real + other real, self imaginary + other imaginary)
  ) 
)
 
c1 := Complex clone setValues(1, 2)
c2 := Complex clone setValues(3, 4)
 
c3 := c1 + c2
c3 println
 
/* 
 Complex_0x22ee90:
  imaginary        = 6
  real             = 4
*/
{% endhighlight %}

I found this fairly eye opening. As I think of the syntaxes of other 
languages I'm used to, such as Java, there are "special cases" all over the 
place. For example, the `+` operator has special code to handle addition for 
numbers and String concatenation and nothing else; for loops, while loops, if 
statements, defining classes, and so on are all special syntax features. In 
Io, they are all just objects responding to messages. 

## Io, Day 2: Problems 

### Fibonacci 

Write a program to find the nth [Fibonacci 
number](http://en.wikipedia.org/wiki/Fibonacci_number). Both the recursive and 
iterative solutions are included: 

{% highlight io %}
fib_recursive := method(n,
  if(n < 3, 1, fib_recursive(n - 1) + fib_recursive(n - 2))
)
 
fib_iterative := method(n,
  prev_prev := 0
  prev := 0
  sum := 1
  for(i, 2, n, 
    prev_prev = prev
    prev = sum
    sum = prev + prev_prev
  )
  sum
)
 
"-- Recursive Fibonacci --" println
for(i, 1, 10, fib_recursive(i) println)
 
"" println
 
"-- Iterative Fibonacci --" println
for(i, 1, 10, fib_iterative(i) println)
 
/*

-- Recursive Fibonacci --
1
1
2
3
5
8
13
21
34
55

-- Iterative Fibonacci --
1
1
2
3
5
8
13
21
34
55

*/
{% endhighlight %}

### Safe division 

How would you change the `/` operator to return 0 if the denominator is zero? 

{% highlight io %}
(1 / 0) println // inf
(1 / 2) println // 0.5
 
Number originalDivision := Number getSlot("/")
Number / := method(other, 
  if (other == 0, 0, self originalDivision(other))
)
 
(1 / 0) println // 0
(1 / 2) println // 0.5
{% endhighlight %}

### 2d add 

Write a program to add up all the values in a 2-dimensional array. 

{% highlight io %}
sum2dArray := method(arr,
  arr flatten sum  
)
 
arr := list(list(1, 2), list(3, 4), 5, list(6, 7, 8), 9, 10)
sum2dArray(arr) println // 55
{% endhighlight %}

### myAverage 

Add a slot called `myAverage` to a list that computes the average of all the 
numbers in a list. Bonus: raise an exception if any item in the list is not a 
number. 

{% highlight io %}
List myAverage := method(
  sum := 0
  self foreach(i, v, if(v type == "Number", sum = sum + v, Exception raise("#{v} is not a Number" interpolate)))
  sum / (self size)
)

list(1) myAverage println                           // 1
list(3, 3, 3) myAverage println                     // 3
list(1, 2, 3, 4, 5, 6, 7, 8, 9) myAverage println   // 5
list(1, "A", 3) myAverage println                   // Exception: A is not a Number
{% endhighlight %}

### Two Dimensional List 

Write a prototype for a two-dimensional list. The `dim(x, y)` method should 
allocate a list of `y` lists that are `x` elements long. `set(x, y, value)` should 
set a value and `get(x, y)` should return that value. Write a `transpose` method 
so that `new_matrix get(y, x) == original_matrix get(x, y)`. Write the matrix to 
a file and read the matrix from a file. 

{% highlight io %}
TwoDList := Object clone do (
  init := method(
    self lists := list()
  )
  
  dim := method(x, y,
    self lists preallocateToSize(y)
    for(i, 0, y - 1, self lists append(list() preallocateToSize(x)))
    self
  )
  
  set := method(x, y, value,
    self lists at(y) atInsert(x, value)
  )
  
  get := method(x, y,
    self lists at(y) at(x)
  )
  
  transpose := method(
    transposedList := TwoDList clone dim(self lists size, self lists at(0) size)
    self lists foreach(y, subList, 
      subList foreach(x, value,
        transposedList set(y, x, value)
      )
    )
    transposedList
  ) 
  
  println := method(
    self lists foreach(y, subList, 
      subList foreach(x, value, 
        if(x == 0 or x == subList size, "|" print)
        " #{get(x, y)} |" interpolate print        
      )
      "" println      
    )
  )
  
  toFile := method(name,
    File with(name) open write(self serialized) close
  )
  
  fromFile := method(name,
    doRelativeFile(name)
  ) 
)

list = TwoDList clone dim(2, 3)

list set(0, 0, "A")
list set(1, 0, "B")
list set(0, 1, "C")
list set(1, 1, "D")
list set(0, 2, "E")
list set(1, 2, "F")

transposedList := list transpose

transposedList toFile("transposed.txt")

transposedListFromFile := TwoDList fromFile("transposed.txt")

"2x3 list:" println
list println

"Transposed 3x2 list:" println
transposedList println

"Transposed 3x2 list from file:" println
transposedListFromFile println

/*

2x3 list:
| A | B |
| C | D |
| E | F |
Transposed 3x2 list:
| A | C | E |
| B | D | F |
Transposed 3x2 list from file:
| A | C | E |
| B | D | F |

*/
{% endhighlight %}

### Guess Number 

Write a program that gives you ten tries to guess a random number from 1-100. 
Give a hint of "hotter" or "colder" for each guess after the first one. 

{% highlight io %}
// Can't use Random due to http://stackoverflow.com/questions/3481651/how-do-i-import-an-addon-in-the-io-language
// toGuess := Random value(100) ceil

// A random number as per http://xkcd.com/221/
toGuess := 4

guessCounter := 0
previousDiff := nil
currentDiff := nil

while(guessCounter < 10, 
  guessCounter = guessCounter + 1  
  currentGuess := File standardInput readLine("Enter your guess: ") asNumber() 

  currentDiff := (toGuess - currentGuess) abs  
  if(currentDiff == 0) then (
    guessCounter = 10
  ) else (
    if (previousDiff == nil) then("Try again" println) elseif(currentDiff == previousDiff) then ("You just guessed that!" println) elseif(currentDiff < previousDiff) then ("Hotter" println) else("Colder" println)
    previousDiff = currentDiff
  )
)

if(currentDiff == 0, "Correct!", "Sorry, you ran out of guesses.") println
{% endhighlight %}

## On to day 3! 

Continue on to [day 3 of Io 
here](https://www.ybrikman.com/writing/2012/02/07/seven-languages-in-seven-weeks-io-day-3/). 