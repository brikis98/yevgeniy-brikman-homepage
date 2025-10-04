---
layout: post
title: "Review: Writing Secure Code by Michael Howard and David LeBlanc"
tags: ["Review: Nonfiction", "3 Stars", "Programming"]
thumbnail_path: "reviews/writing-secure-code.jpg"
header_image: "reviews/writing-secure-code.jpg"
header_image_url: "https://www.amazon.com/dp/0735617228?tag=brikis98-20&linkCode=osi&th=1&psc=1"
header_image_caption: "'Writing Secure Code' by Michael Howard and David LeBlanc"
date: "2017-11-09"
---

This book should be called "Writing Secure Code in Windows and C, in 2001."  
  
In 2001, this was probably a fantastic book. But in 2017, I found that the material is dated and way too focused on problems that are specific to C and old versions of Windows. The book does teach some of the underlying security principles too, and those are as important today as ever, but the security practices and threats you have to take into account have evolved considerably since 2001, and the problems you face on other operating systems, programming languages, and application types are considerably different.  

## The good
  
I found a few aspects of the book useful: 

- **How to do threat modeling.** Every developer should know how to do this. 
- **How to create data flow diagrams (DFDs).** Very useful in threat modeling.
- **Threat analysis with STRIDE.** STRIDE stands for Spoofing identity, Tampering with data, Repudiation, Information disclosure, Denial of service, Escalation of privilege.
- **The large number of real-world examples of vulnerabilities.** New developers need to see as many of these as possible to realize that (a) your software WILL be attacked, (b) hackers are very creative, and (c) getting security right is incredibly hard. 
- **The basic list of security practices:**  
  
    - Learn from mistakes  
    - Minimize your attack surface  
    - Use defense in depth  
    - Use least privilege  
    - Employ secure defaults  
    - Remember that backward compatibility will always give you grief  
    - Assume external systems are insecure  
    - Plan on failure  
    - Fail to a secure mode  
    - Remember that security features != secure features  
    - Never depend on security through obscurity alone  
    - Don't mix code and data  
    - Fix security issues correctly

## The not so good

- **Overly focused on C.** The book spends a huge amount of time on various flavors of buffer overruns, and calls them "public enemy #1." For older languages, like C, this is true. However, for most modern languages, with automatic memory management, they are a non issue. 
- **Too much focus on Windows.** The book also spends a ton of time talking about the Windows registry, Windows ACLs, and Windows APIs. Most of this is dated, and unless you're building Windows desktop apps, it's not useful. I'll also say that Windows does not exactly have a sterling record when it comes to security, especially in the 2001 era (remember that virus that could reboot your computer via RPC?), so I found it a bit odd to be reading a "security best practices" guide from Microsoft.    
- **Vague advice.** Some of the advice was just downright useless: "the first line of defense is simply to write solid code." Gee, thanks. That's like saying "the way to avoid security vulnerabilities in your code is to write code without security vulnerabilities."
- **Very dated advice on server-side development.** The book touches a bit on server-side development, but the advice there is very weak and dated: 

    - The information on how to store passwords is woefully incomplete. 
    - There is no mention of Cross-Site Request Forgery (CSRF) attacks. 
    - There is no advice on regularly patching vulnerabilities in long-running servers. 
    - There is very little discussion on the dangers of `eval`, which is a massive source of vulnerabilities in all dynamic languages (another weakness of focusing too much on C). 
    - There is no discussion on the safety of various over-the-wire protocols and parsing. 
    - The recommended algorithms for encryption and hashing are dated, and some of them should no longer be used at all. 

In short, it's dangerous to rely on this book for your security advice in 2017. You're honestly better off starting with the OWASP top 10.  
  

