---
layout: post
title: "Hello Boot. Writing a string on the screen after booting off the B.I.O.S."
date: '2023-11-18'
author: Andrei Tihoan
tags:
- Software Engineering
modified_time: '2023-11-18'
thumbnail_path: "projects/bios.jpg"
excerpt: |
  How does an operating system begin execution? That sounds like an awfully complicated question, 
  reserved for tech-wizards of the highest order. But in actuality it's a fairly simple exercise
  a junior dev could complete in a weekend if curious and motivated enough to do so. It's only made 
  complex by lack of documentation or 'tutorials' around the topic...
---

{% include figure.html path="blog/hello-boot/bios-wide.jpg" caption=page.title %}

## How does an operating system begin execution?

That sounds like an awfully complicated question, reserved for tech-wizards of the highest order. But in reality it's a feasible question for a junior dev to answer if curious and motivated enough to do so. It's only made complex by lack of documentation or 'step-by-step tutorials' around the topic, but fortunately Dr. Nick Blundell conjured these [fantastic lecture notes](https://www.cs.bham.ac.uk/~exr/lectures/opsys/10_11/lectures/os-dev.pdf). For a more in-depth explanation of the topics covered in this article, I highly recommend checking it out.

To better understand the booting process this article will walk through the steps required to boot your own program off the B.I.O.S. and write the famous Hello World! string on the screen. This is the first in a series of 2 articles. This current article's purpose is to explain and show the fastest and easiest way to accomplish this goal. 

The 2nd article will accomplish the exact same thing, but lay out some more groundwork if one wanted to go beyond this exercise and write a larger operating system.

### The code:

All of the code referenced in this article is in this [public github repo](https://github.com/AndreiTih/Hello_Boot).


## 1. The genesis

How does one even get code to run in the first place? A conventional application is started by the operating system. But in the barren pre-os land, you would rely on your system's [firmware](https://en.wikipedia.org/wiki/Firmware) to get things started.

Firmware is software that is 'baked' into the motherboard of the PC, usually stored on what is called an [EEPROM](https://en.wikipedia.org/wiki/EEPROM). It's the first software that runs after the PC is powered on.

There's no need to know everything about the PC's firmware, the interesting part one would would need to understand is the interface between the firmware and a bootable program, that is: the *B.I.O.S. interface*.

#### The B.I.O.S.

What is the B.I.O.S? Historically, it is the firmware of an [IBM PC](https://en.wikipedia.org/wiki/IBM_Personal_Computer).

The IBM PC, released on August 12, 1981 by [IBM](https://en.wikipedia.org/wiki/IBM) had a substantial influence on the personal computer market. Short for Basic Input Output System, the BIOS firmware came pre-installed on an IBM PC or IBM PC compatible's system board. The specifications of the IBM PC became one of the most popular computer design standards in the world. The only significant competition it faced from a non-compatible platform throughout the 1980s was from Apple's Macintosh product line, as well as consumer-grade platforms created by companies like Commodore and Atari. Due to it's popularity and the nature of the market at the time, the **interface** of that original system served as a *de facto standard* for a long time in the Personal Computer market. In 1996, the [BIOS Boot Specification](https://www.scs.stanford.edu/nyu/04fa/lab/specsbbs101.pdf) was written by Compaq, Phoenix Technologies and Intel.

[comment]: <> (Ref: https://en.wikipedia.org/wiki/BIOS)
[comment]: <> (Ref: https://en.wikipedia.org/wiki/IBM_Personal_Computer)
[comment]: <> (Ref: https://en.wikipedia.org/wiki/IBM)

In other words, the interface between the B.I.O.S firmware of the IBM PC and its operating system became a standard in the PC market. So much so, that one could assume that the firmware any Personal Computer has installed today implements this very interface.

It's important to note that in modern times the [BIOS Boot Specification](https://www.scs.stanford.edu/nyu/04fa/lab/specsbbs101.pdf) is considered a legacy specification and [U.E.F.I](https://uefi.org/specifications) is the current standard specification for the interface between firmware and an Operating System today. Regardless, for compatibility reasons, the BIOS boot specification is still implemented by firmware vendors to this day.

### Taking up the mantle

{% include figure.html path="blog/hello-boot/knighted-by-firmware.jpg" caption="The firmware trusts you, 'tis a great honor" %}

How do you get your code to run?

This next part involves writing a tiny bit of assembly code. If you're not familliar with x86 assembly language or the concept of CPU instructions, there's a brief explanation in the [appendix](#appendix) of this article. The code for this exercise only contains 5 distinct x86 assembly instructions, 2 of which are only used once. Only a tiny bit of assembly code is required and soon enough it'll be possible to use a higher-level language such as C, C++, Rust, Zig or any language that compiles to native code.

#### Booting your code

The firmware that implements the BIOS interface looks to the first **sector** of the persistent data storage devices on one's machine. This could be a hard disk, floppy disk, optical disc, a usb drive etc. This sector is also known as the ['boot sector'](https://en.wikipedia.org/wiki/Boot_sector) of a storage device. If the sector ends with the 'magic number' AA55h in hexadecimal, then the firmware identifies it as a bootable device.

A sector is the minimum storage unit of a storage device. "Each sector stores a fixed amount of user-accessible data, traditionally 512 bytes for hard disk drives (HDDs) and 2048 bytes for CD-ROMs and DVD-ROMs"

[REFERENCE https://en.wikipedia.org/wiki/Disk_sector]

Since we're simulating using a hard-disk, we'll be placing the magic number at the 511th and 512th byte of the first sector of our disk.

The BIOS then gives the option to boot from this storage device. If selected, all of the data from the boot sector gets copied over to address 0x7c00h, then the bios uses a jmp instruction to pass execution to that same address.

Thus, if we:
1. Compile some code and write it into the boot sector of a storage device.
2. Write the AA55h magic number at the end of the boot sector.
3. Have the BIOS boot from that storage device. 

The firmware will then pass execution over to our code. And there it would go. The CPU would now be executing our code.


### The smallest bootable program

With that in mind, one could write the following program:

{% highlight assembly %}
loop:
jmp loop 
times 510 -($ - $$) db 0 ; Bootsector padding. Adding the AA55h
dw 0xaa55                ; magic number to the end of the 512 
                         ; byte sector
{% endhighlight %}

Which is a classic endless loop.

In the assembly source file, directives were used to pad out the binary with 0's and to add the magic number AA55h.

Using a program to view the contents of a file in binary form we can see the data inside the boot sector:

{% include figure.html path="blog/hello-boot/endless-loop.jpg" caption="The while(true) of x86-assembly shown in binary form. The HxD hex editor was used to view the binary file" %}

There are 2 chunks of data here worth talking about, that I've underlined in red in the above image:

The 2 bytes at the beginning of the sector EB FE, represent the JMP instruction, along with its operand. Looking at [this reference derived from the Intel® 64 and IA-32 Architectures Software Developer’s Manual](https://www.felixcloutier.com/x86/jmp), we can see the encoding for the x86 JMP instruction, for a relative JMP with an operand that is 1 byte in size is EB. FE represents the number -2 that is encoded using the [two's complement](https://en.wikipedia.org/wiki/Two%27s_complement) method.

The 2 bytes at the end of the sector 55 AA represent the magic number that lets BIOS know this disk is bootable.

### Endianness

 Hold your horses, I thought the magic number was 0xAA55? It is, but in binary format it is flipped because of [endianness](https://en.wikipedia.org/wiki/Endianness). When a data element is larger than 1 byte, the question of : In which order should this sequence of bytes be read has to asked. Left to right or right to left? "Danny Cohen introduced the terms big-endian and little-endian into computer science for data ordering in an Internet Experiment Note published in 1980"  The x86 architecture handles multi-byte values in little-endian format, whereby less significant bytes proceed more significant bytes, which is contrary to how we normally read numbers.

[REFERENCE: https://en.wikipedia.org/wiki/Endianness]

### Ways of booting our code

At this point to boot off this code there are at least 3 options:

1. Manually overwrite the first sector of a hard-disk or usb drive with this data, and boot off our own machine.
2. Use a virtual machine to simulate a computer, and use this code in the boot sector of a virtualised storage device represented by an .iso image file.
3. Use a CPU emulator to simulate a CPU. Almost identical to option nr. 2, in that one would be using software to emulate a computer. The main difference lies in the backend implementation: A virtual machine makes use of the host operating system to run most of the instructions on the host CPU (to optimize for performance), whereas a CPU emulator's goal is not to optimize for performance, but to literally emulate the CPU using software. This results in a more portable, easier to debug but less performant simulation.

For the purposes of this article, we will go ahead with option nr 3.

### Using a CPU emulator
{% include figure.html path="blog/hello-boot/bochs-pretending.jpg" caption="In contrast to its devious smile, Bochs is very user friendly." %}

To emulate the CPU, I've been using Bochs on a Windows 10 machine. Bochs, as mentioned on [their website](https://bochs.sourceforge.io/) is a "highly portable open source IA-32 (x86) PC emulator written in C++, that runs on most popular platforms. It includes emulation of the Intel x86 CPU, common I/O devices, and a custom BIOS".

To set up Bochs, all one needs is a configuration file called bochsrc. Inside the installation folder for bochs, there is a file called bochsrc-sample.txt containing sensible default options for our emulator that I have copy pasted into the "/Part1" folder and renamed as bochsrc. In this case "/" references the root folder of [the github repo](https://github.com/AndreiTih/Hello_Boot) containing the code referenced in this article. The reason for this is that bochs first searches the current [working directory](https://en.wikipedia.org/wiki/Working_directory#:~:text=In%20computing%2C%20the%20working%20directory,function%2C%20or%20just%20current%20directory.) for this configuration file, and in this case I execute bochs while my working directory is "/Part1".


These options allow one to have bochs emulate a different processor type, change the amount of memory provided to the emulated machine, its sound driver, speaker and so on. But all of this functionality is not needed for the simple purpose of writing a string on the screen, the provided defaults are sufficient.

The only configuration option we need to change is:

{% highlight assembly%}
ata0-master: type=disk, mode=flat, path="30M.sample
{% endhighlight %}

to this:

{% highlight assembly%}
ata0-master: type=disk, mode=flat, path="os-image.iso"
{% endhighlight %}

This option defines the type and characteristics of an attached ata device. Advanced Technology Attachment (ATA) is a standard physical interface for connecting storage devices within a computer. You might be familliar with [SATA](https://en.wikipedia.org/wiki/SATA) which stands for Serial ATA. I at least think of the SATA cables that one uses to connect modern hard disks or SSD's to one's motherboard.

Regardless, using this option we're basically defining our virtual hard disk. The important part is the path property which leads to the file that contains the contents of the virtual hard disk device.

This is the file that contains our code which importantly, is located in the first 512 byte sector of this file. It could have any name you choose, I arbitrarly chose to call it os-image.iso.

Since the default configuration already defines the boot sequence to be from disk:

{% highlight assembly%}
boot: disk
{% endhighlight %}

This is all that needs to change for the firmware emulated by bochs to discover and boot off our virtual hard-disk.

### Let's run the smallest program on the emulator

Everything is set up and ready to go. All we need to do is compile the [smallest bootable program](#the-smallest-bootable-program), attach the code to the first sector of an image file, call that file os-image.iso and run bochs.

I am using a Windows 10 machine, on which I've installed [Cygwin](https://www.cygwin.com/) and [nasm](https://www.nasm.us/). Nasm, which stands for the Netwide Assembler (NASM) is an asssembler for the x86 CPU architecture. These are the commands I used to compile the code and start Bochs:

{% highlight assembly%}
nasm smallest_program/boot_sect.asm -f bin -o bin/smallest_program.bin
cat bin/smallest_program.bin > os-image.iso
truncate -s 10485760 os-image.iso
"C:/Program Files/Bochs-2.7/bochs.exe"
{% endhighlight %}

Let's walk through each command used:

[TODO: Significantly minify this text, make it smaller please]

The first command compiles the assembly source file to machine code. Note the -f bin property was set for nasm. This is to inform nasm to output pure binary code. This is opposed to its default behaviour which is to output an object file, meant to be further processed by a linker. On windows this further processing would result in an executable with the PE format. Files of this nature have a .exe extension added to their name, which you'd be very familliar with assuming you are a Windows user. Windows executables have a lot more data inside them besides just machine code, and are meant to be loaded by an operating system. Since we do not have an operating system and are only interested in the machine code, we use this -f bin property.

The second command uses a GNU coreutil from cygwin, called cat. Normally cat would concatenate 2 files. This would be useful later on when we want to add the boot sector code to the beginning of an image. In this simple case, this is the equivalent of copy pasting our compiled assembly code and renaming it to os-image.iso.

The third command uses a GNU coreutil from cygwin, called truncate. This adds more data to our file to satisfy Bochs. Bochs doesn't allow an ata device to only have 512 bytes of data, so I've arbitrarly chosen to make the image 10 megabytes. Truncate simply adds bytes containing the value 0 to the file until it reaches 10 megabytes in size.


Run all of these commands and ...

{% include figure.html path="blog/hello-boot/SimplestProgram.gif" caption="Huh, even this gif looks old." %}

There it is, the simplest possible program, booted off the bios in all its glory. Notice that this gif looks like it was recorded by a camera from the 1960's. That's because I chose to export the gif with only 8 colors to save on disk space.

### Writing Hello World on the screen from a bootable program

We're so close to our goal. All we need is a way to write to the screen. Fortunately, the B.I.O.S interface describes a function just for that goal.

### Intrerrupts

The B.I.O.S interface makes its routines available via intrerrupts. Intrerrupts are a processor feature that allows you to temporarily halt the CPU from what it's doing, and have it jump execution to what is called an **ISR** (Intrerrupt Service Routine), also known as an intrerrupt handler. The handler is just normal code that the CPU can execute. Often then, the CPU resumes the code it was previously executing.

Intrerrupts can be triggered both by software and hardware and are a vital feature for making computers work.

In theory we could scan memory to find the B.I.O.S routine we're interested in and manually jump execution to its address, but to keep code easy and portable across multiple machines B.I.O.S provides us with an intrerrupt.

As mentioned in Dr. Nick Blundell [lecture notes](https://www.cs.bham.ac.uk/~exr/lectures/opsys/10_11/lectures/os-dev.pdf): "Each interrupt is represented by a unique number that is an index to the interrupt vector, a table initially set up by BIOS at the start of memory (i.e. at physical address 0x0) that contains address pointers to interrupt service routines (ISRs).

...

So, in a nutshell, BIOS adds some of its own ISRs to the interrupt vector that specialise in certain aspects of the computer, for example: interrupt 0x10 causes the screen-related ISR to be invoked; and interrupt 0x13, the disk-related I/O ISR.
".

### Writing a character on the screen

BIOS makes use of the ah register to determine which routine we want to invoke. For the routine related to printing characters on the screen it requires ah to contain the value 0xeh. The ISR we need is invoked by index 10 in the intrerrupt vector, and we'll use the int instruction to invoke a software intrerrupt which will execute the ISR that's currently attached to index 10.

{% highlight assembly%}
mov ah , 0x0e
mov al, 'A'
int 0x10 ; Invoke software intrerrupt to print al 
         ; which contains the character 'A'
{% endhighlight %}

{% include figure.html path="blog/hello-boot/PrintChar.gif" caption="Printing a single character on the screen." %}


# Hello Boot!
With this information we could technically just write this code and be done:

{% highlight assembly%}
mov ah , 0x0e
mov al, 'H'
int 0x10
mov al, 'E'
int 0x10
mov al, 'L'
int 0x10
mov al, 'L'
int 0x10
mov al, 'O'
int 0x10
mov al, ' '
int 0x10
mov al, 'B'
int 0x10
mov al, 'O'
int 0x10
mov al, 'O'
int 0x10
mov al, 'O'
int 0x10
mov al, 'T'
int 0x10
mov al, '!'
int 0x10
{% endhighlight %}

But in the interest of making the code a bit cleaner, we'll write a little loop to do this work:

{% highlight assembly%}
[org 0x7c00]
mov bx , HELLO_WORLD_STRING
mov ah , 0x0e ; int 10/ ah = 0eh -> scrolling teletype BIOS routine

print_string_loop:
mov cl, [bx] ; Moving the value of one byte into the cl register
cmp cl, 0 ; Checking if we reached the end of C style string
je print_string_end
;Print the first character at the bx address
mov al, [bx] ; then copy bl ( i.e. 8- bit char ) to al
int 0x10 ; print (al)
inc bx ;Increment address
jmp print_string_loop
print_string_end:

jmp $

HELLO_WORLD_STRING db "Hello Boot!" , 0

times 510 -($ - $$) db 0
dw 0xaa55
{% endhighlight%}

This code introduces a new directive, **org**, some new instructions **cmp**, **je** and **inc** and what nasm calls a 'pseudo-instruction' **db**. Let's explain each one of them one by one.

### The org directive

{% highlight assembly%}
[org 0x7c00]
{% endhighlight%}

This directive lets nasm know that this code will be loaded at address 0x7c00, which is where the BIOS always loads our boot sector.

This is important because we reference the label HELLO_WORLD_STRING in our code. That label will be replaced by a memory address, and the assembler wouldn't know where in memory it's going to be without this directive.

Let's try compiling the code and then disassembling it with and without the org directive to see what happens (I will be using the ndisasm utility executable that comes with NASM to disassemble the code after compilation):

With the org directive:

{% highlight assembly%}
00000000  BB157C            mov bx,0x7c15
00000003  B40E              mov ah,0xe
00000005  8A0F              mov cl,[bx]
00000007  80F900            cmp cl,0x0
...
{% endhighlight%}

Without the org directive:

{% highlight assembly%}
00000000  BB1500            mov bx,0x15
00000003  B40E              mov ah,0xe
00000005  8A0F              mov cl,[bx]
00000007  80F900            cmp cl,0x0
...
{% endhighlight%}

As can be seen, without the directive the code will try to fetch data from adress 15, which is not where the Hello World string of bytes will end up. Since the string of bytes is inside our 512 byte boot sector, it'll get copied over along with our code to address 0x7c00. Only by using the directive can the assembler correctly resolve our label to the address where the string of bytes is.


### The db 'pseudo-instruction'

We introduce what nasm calls a '[pseudo-instruction](https://nasm.us/doc/nasmdoc3.html#section-3.2)' db. According to nasm's [reference manual](https://nasm.us/doc/nasmdoc3.html#section-3.2) "Pseudo-instructions are things which, though not real x86 machine instructions, are used in the instruction field anyway because that's the most convenient place to put them"

db is used to declared initialized data in the output file, where the name stands for data byte. In other words, we're just declaring some data somewhere and in our binary output file, we'll literally just have the ASCII code representing the "Hello World" characters followed by 0. The 0 is important so that our loop would know when we reached the end of our string.

### CMP and JE

The cmp instruction compares the next character with 0, so that we know when we reached the end of our string. What the instruction does is set a register flag EFLAGS according to the results. We're interested in the ZF flag inside EFLAGS, which is going to be set to 1 if the 2 operands to CMP are equal.
The je stands for Jump if Equal, and all it does is jump to the specified addres offset if the ZF flag is set to 1. You can see how CMP and JE are working together here since CMP is setting the ZF flag (along with other flags which we're not interested in here) that then JE instruction depends on. Together they cause the code to jump to the print_string_end label when the next character is 0 and we've reached the end of the string.

### The [] notation
This notation of surrounding a register with square braces '[bx]' literally means: take the value pointed to by the address in the bx register instead of the actual value of the bx register which is an address. If we were to write the same code without the square brackets, instead of moving the character that bx points to into cl, we'd actually move the address that the character is at into cl.

### INC 
The inc instruction just increments the value stored at the bx register by 1, so that we have bx point to the adress of the next character in our string.

### Finally...

Then we run the same commands as we did with the smallest bootable program and ...

{% include figure.html path="blog/hello-boot/HelloBoot.gif" caption="Magic numbers" %}

There it is! We're done.

[TODO: Look over this text and try to minify it (The text explaining our code to print off bios)]

### Conclusion and part 2 ...

Phew, that was a lot more work than:
{% highlight C++%}
cout << "Hello World!";
{% endhighlight%}

But hopefully it was worth it. I learned so much from asking this question and delving into this topic, even learning a tiny bit of assembly, a bit about electronics and computers along the way. Some might say this is a pointless exercise, why reinvent the wheel? But I found it fun and I was just curious to know how an operating systems starts executing code. I do find that I have a better understanding how user-space programs work, and I scratch my head a bit less when reading about C++ features that aren't related to algorithm logic, but have more to do with how the code compiles internally.

C/C++ and systems languages in general have a range of features that can only be understood from the bottom up. For example when declaring the calling convention of a function. Whatever algorithm the function implements will work the exact same way, but the underlying machine code will be different. Or another example, move semantics in C++. It's hard to understand this concepts without a bit of low-level diving, and I hope that this exercise got you a bit more curious about how things work under the hood.


### What's to come...

This is the first article in a series of 2. Where we accomplish the same thing, but instead of keeping all of our code inside the boot sector, we dive into how to load the rest of the operating system from the disk image. Moreover, we set things up so we can run code from a higher-level langauge, in this case C++ and a few other things...

# Appendix

## 1. CPU instructions and memory

A CPU instruction is represented by a number stored in memory. Why a number though? To better understand CPU instructions which are covered in the the next [section](#1-cpu-instructions), we need to have a brief discussion about memory.

Memory can be thought of as an electric circuit whose main purpose is to store data. Each data element in memory has a corresping **address** and **value**. Both the address and value are just numbers. The size of the address is reprented by the architecture of the cpu. On an 8 bit architecture the address is an 8 bit number, on a 16 bit architecture it's a 16 bit number, and as you might guess in current times on a 64 bit architecture, the adress is a 64 bit number. The value however is always an 8 bit value. Or at least [it has been on every modern computer arhitecture since 1978](https://en.wikipedia.org/wiki/Word_(computer_architecture)#Table_of_word_sizes).

### How does a computer store numbers?
{% include figure.html path="blog/hello-boot/magic-numbers.jpg" caption="Magic numbers" %}

I still remember when I started programming the confusion I felt trying to make a real world connection to how computers worked. Computers just do math everyone says. How is that possible? How can a physical thing be aware of and manipulate numbers?

A computer doesn't 'store numbers' since numbers are an abstract mathematical concept. The computer deals with electronic signals on a bus. It so happens that, as humans we can make a one to one abstract association between a number and a signal on a bus. This is because every number can be converted to base 2, which can then be associated with a signal. Let me explain:

Conventionally, when we think of numbers we think of them as being represented in base 10. But the base of a number can be changed, while the value of it remains the same. For example, nr. **5** in base 10 is represented as **101** in binary. As humans, we can make an abstract connection between 101 and a signal on a bus.




For example, let's assume we're programming for a CPU with a 16 bit architecture. The [6502 microprocessor](https://en.wikipedia.org/wiki/MOS_Technology_6502) is a perfect example of one. This very processor or variants of its design were used in the Atari2600, the Apple II, the NES (Nintendo Entertainment System), Commodore 64 and many other machines.


Let's say that on the memory module connected to the [6502](https://en.wikipedia.org/wiki/MOS_Technology_6502), we have the value 0x7 stored at address 0x5544. These are completely arbitrary values chosen for the purposes of this example.

{% include figure.html path="blog/hello-boot/CPU-Signal-12fps.gif" caption="Cpu reading the value 0x7 from address 0x5544 over and over again..." %}

Since the 6502 uses a 16 bit architecture, that means there's a BUS with 16 wires connecting the cpu and the memory. Number 0x5544 is equivalent to 0101 0101 0100 0100 in binary. For the CPU to do a memory **read** the CPU would send an electric signal on this 16 wire BUS in which the wires representing bit number 2, bit number 6, bit number 8, bit number 10, bit number 12 and bit number 14 would be turned on, while every other wire would be turned off.
 
 Since the value returned is 8 bits long, in response the memory circuit would return the value stored at address 0x5544 which in this example is 0x7 through an electronic signal of a bus with 8 wires. Number 0x7 is equivalent to 0000 0111 in binary. In response to the CPU's read, the memory circuit would return a signal to the CPU on an 8 wire BUS in which the last 3 wires representing bit 0, 1 and 2 would be turned on, while every other wire would be turned off.

[This video by Ben Eater](https://www.youtube.com/watch?v=LnzuMJLZRdU&list=PLowKtXNTBypFbtuVMUVXNR0z1mu7dp7eH&ab_channel=BenEater) showing how to write a program to print out Hello World from a [6502 microprocessor](https://en.wikipedia.org/wiki/MOS_Technology_6502) is an absolutely fantastic resource that made things much more intuitive for me. I highly recommend checking it out if you're interested in understanding what was explained in this section more deeply.

## 1. CPU Instructions

CPU instructions are just numbers stored in memory. The CPU has a special register called a '[program counter](https://en.wikipedia.org/wiki/Program_counter)', sometimes known as the 'instruction pointer' holding the address of the next instruction to be executed.

A register is just a container inside a CPU that stores some data. Unlike memory, the register is physically inside the CPU and as a result access to registers is much faster than access to a memory address.

What the CPU literally does is look at the address specified in the program counter, fetch the next instruction from memory at that address, increment the program counter by the length of the instruction fetched, execute the instruction and repeat.
{% include figure.html path="blog/hello-boot/cpu-fate.jpg" caption="The cruel fate of the CPU..." %}

If we take the [smallest bootable program](#the-smallest-bootable-program) as an example, you can see in the image that the number EB FE is at the beginning of the boot sector. That represents the JMP instruction and its operand in the x86 instruction set architecture. Looking at [this reference derived from the Intel® 64 and IA-32 Architectures Software Developer’s Manual](https://www.felixcloutier.com/x86/jmp), it can be seen in the first column that the opcode for the JMP instruction with an 8 byte operand is EB, just like in our code.

| Opcode                   | Instruction        | Op/En          | 64 bit mode | Compat/Leg mode | 
|--------------------------|-----------------------------------------|
| **EB cb**                | JMP rel8           | D              | Valid       | Valid           |

<br/>

FE is the operand to the instruction, and is the hexadecimal representation of -2. Why is -2 equal to FE ? There are multiple ways of representing signed integers, but the Intel® 64 and IA-32 Architectures use the [two's complement](https://en.wikipedia.org/wiki/Two%27s_complement) method.

### On the concept of encoding

More generally, any information at all can be encoded into a number. If I wanted to I could create an encoding standard where I refer to the sweater I'm wearing as number 1, my coffee cup as nr 2 and so on.

As for a more practical example, there's the [ASCII](https://en.wikipedia.org/wiki/ASCII) encoding standard abbreviated from American Standard Code for Information Interchange which encodes text characters. For example, the character 'A' is represented as nr. 65 in decimal. 

Since computers can only really store numbers we rely on encoding methods that humans define and agree on to represent any kind of data numerically. In this case we want to encode negative numbers, and while there exist many methods to do so, one of the most common is the [two's complement](https://en.wikipedia.org/wiki/Two%27s_complement) method which happens to be used by the Intel® 64 and IA-32 Architectures.


Thus that code just does a relative jump -2 bytes from the address of the next instruction. Since our code is 2 bytes long, that jump will lead the program counter right back to our JMP instruction, resulting in an endless loop.

## 2. Assembly language

What is the Assembly language? First of, there is no one single assembly language. Every CPU has its own instruction set architecture, which comes with its own assembly language. In this post, we've been using x86-assembly, which compiles to instructions for the x86 instruction set architecture.

### An instruction set architecture

An [instruction set architecture](https://www.arm.com/glossary/isa) is in some sense the information most relevant to a software programmer, since it defines what instructions a CPU implements. It does not describe how, internally these instructions are to be implemented, but what they are and what they functionally do.

From [Arm's website](https://www.arm.com/glossary/isa): "An Instruction Set Architecture (ISA) is part of the abstract model of a computer that defines how the CPU is controlled by the software. The ISA acts as an interface between the hardware and the software, specifying both what the processor is capable of doing as well as how it gets done."


Assembly is a language in which each statement corresponds to an instruction. One large advantage of it over just writing machine code by hand is that you can refer to instructions by their name, rather than a dull number. It's a lot easier to associate JMP with the functionality of having the processor jump to a new address, rather than associating the number EB to that functionality.

Moreover, instructions with very similar functionality have a different encoding based on factors such as operand size. For example, the JMP instruction's encoding changes from EB to E9 if the operand used is 2 bytes long instead of 1.

| Opcode                   | Instruction        | Op/En          | 64 bit mode | Compat/Leg mode | 
|--------------------------|-----------------------------------------|
| **EB cb**                | JMP rel8           | D              | Valid       | Valid           |
| **E9 cw**                |JMP rel16           | D              |N.S          | Valid           |

<br/>

Assembly removes the mental overhead of having to switch instructions based on operand size and other factors, and allows us to just use JMP in both scenarios, since the compiler will figure out what opcode should be used.

Moreover there are other features in assembly languages, such as labels, or the ability to express data.

{% highlight assembly %}
loop:
jmp loop 
times 510 -($ - $$) db 0 ; Bootsector padding. Adding the AA55h
dw 0xaa55                ; magic number to the end of the 512 
                         ; byte sector
{% endhighlight %}

What are these $ symbols though? From [nasms reference manual](https://nasm.us/doc/nasmdoc3.html#section-3.2): "NASM supports two special tokens in expressions, allowing calculations to involve the current assembly position: the $ and $$ tokens. $ evaluates to the assembly position at the beginning of the line containing the expression; so you can code an infinite loop using JMP $. $$ evaluates to the beginning of the current section; so you can tell how far into the section you are by using ($-$$)"


As can be seen in the [smallest bootable program](#the-smallest-bootable-program), the label 'loop:' was defined and used as an operand to the jmp instruction. The assembly compiler determined at compile time the value of the operand to the JMP instruction such that execution would jump to where the loop label would be.

Without assembly, there would be much mental overhead in figuring out the exact nr of bytes one would want to jump to in order to get behind where the loop label would be.

Not to mention you'd have to manually apply the [two's complement](https://en.wikipedia.org/wiki/Two%27s_complement) method to a number in order to figure out its integer representation.

By this point it's clear that as low-level as it is, assembly does a lot of work to simplify the creation of programs.

