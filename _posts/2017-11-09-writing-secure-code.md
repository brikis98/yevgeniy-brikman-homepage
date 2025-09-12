---
layout: post
title: "Review: Writing Secure Code by Michael Howard and David LeBlanc"
tags: ["Review: Nonfiction", "3 Stars", "Programming"]
thumbnail_path: "reviews/writing-secure-code.jpg"
header_image: "reviews/writing-secure-code.jpg"
header_image_url: "https://www.amazon.com/dp/0735617228?tag=brikis98-20&linkCode=osi&th=1&psc=1"
header_image_caption: "'Writing Secure Code' by Michael Howard"
date: "2017-11-09"
---

This book should be called "Writing Secure Code in Windows and C, in 2001."  
  
In 2001, this was probably a fantastic book. But in 2017, I found that the material is dated and way too focused on problems that are specific to C and old versions of Windows. The book does teach some of the underlying security principles too, and those are as important today as ever, but the security practices and threats you have to take into account have evolved considerably since 2001, and the problems you face on other operating systems, programming languages, and application types are considerably different.  
  
For example, the book spends a huge amount of time on various flavors of buffer overruns, and calls them "public enemy #1", but the reality is that buffer overruns are largely a non-issue in most modern languages, and they are only a serious vulnerability in old, low-level languages like C (honestly, using C in 2017 for anything security-sensitive is damn-near criminal negligence). The book also spends a ton of time talking about the Windows registry, Windows ACLs, and Windows APIs, whereas the vast majority of developers I know today are building either (a) server-side software that runs on Linux or (b) client-side software that runs in the browser, iOS, or Android, so best-practices for Windows app development seems totally irrelevant.   
  
Worse yet, while the book touches a bit on server-side development, the advice there is very weak and dated. For example, the information on how to store passwords is woefully incomplete. There is no mention of Cross-Site Request Forgery (CSRF) attacks. There is no advice on regularly patching vulnerabilities in long-running servers. There is very little discussion on the dangers of eval, which is a massive source of vulnerabilities in all dynamic languages (another weakness of focusing too much on C). There is no discussion on the safety of various over-the-wire protocols and parsing. The recommended algorithms for encryption and hashing are dated, and some of them should no longer be used at all. In short, it's dangerous to rely on this book for your security advice in 2017. You're honestly better off starting with the OWASP top 10.  
  
I'll also say that Windows does not exactly have a sterling record when it comes to security, especially in the 2001 era (remember that virus that could reboot your computer via RPC?), so I found it a bit odd to be reading a "security best practices" guide from Microsoft. And some of the advice was just downright useless: "the first line of defense is simply to write solid code." Gee, thanks. That's like saying "the way to avoid security vulnerabilities in your code is to write code without security vulnerabilities."  
  
That said, there are a few gems here and there. The discussions on how to do threat modeling, how to create data flow diagrams (DFDs), and how to use STRIDE (Spoofing identity, Tampering with data, Repudiation, Information disclosure, Denial of service, Escalation of privilege) for threat analysis were pretty useful. I also enjoyed that the book contains a large number of real-world examples of vulnerabilities. New developers need to see as many of these as possible to realize that (a) your software WILL be attacked, (b) hackers are very creative, and (c) getting security right is incredibly hard. I also found the basic list of security practices to be quite handy:  
  
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
- Don‚Äôt mix code and data  
- Fix security issues correctly

**Rating**: 3 stars

