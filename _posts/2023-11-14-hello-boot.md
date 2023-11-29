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

{% include figure.html path="blog/hello-boot/bios-wide.webp" caption=page.title %}

## How does an operating system begin execution?

That sounds like an awfully complicated question, reserved for tech-wizards of the highest order. But in reality it's a feasible question for a junior dev to answer if curious and motivated enough to do so. It's only made complex by lack of documentation or 'step-by-step tutorials' around the topic, but fortunately Dr. Nick Blundell conjured these [fantastic lecture notes](https://www.cs.bham.ac.uk/~exr/lectures/opsys/10_11/lectures/os-dev.pdf). For a more in-depth explanation of the topics covered in this article, I highly recommend checking it out.

To better understand the booting process this article will walk through the steps required to boot your own program off the B.I.O.S. and write the famous Hello World! string on the screen. This is the first in a series of 2 articles. This current article's purpose is to explain and show the fastest and easiest way to accomplish this goal. 

The 2nd article will accomplish the exact same thing, but lay out some more groundwork if one wanted to go beyond this exercise and write a larger operating system.


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

[Explain what a sector is]

The BIOS then gives the option to boot from this storage device. If selected, all of the data from the boot sector gets copied over to address 0x7c00h, then the bios uses a jmp instruction to pass execution to that same address.

Thus, if we:
1. Compile some code and write it into the boot sector of a storage device.
2. Write the AA55h magic number at the end of the boot sector.
3. Have the BIOS boot from that storage device. 

The firmware will then pass execution over to our code. And there it goes. The CPU is now executing our code.


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

[TODO: Make a mention of both the instruction EB FE and the magic number here]

You might notice in the binary form the magic number shows as flipped. This is because of endianness.

[TODO: Explain endianness]

At this point to boot off this code there are at least 3 options:

1. Manually overwrite the first sector of a hard-disk or usb drive with this data, and boot off our own machine.
2. Use a virtual machine to simulate a computer, and use this code in the boot sector of a virtualised storage device represented by an .iso image file.
3. Use a CPU emulator to simulate a CPU. Almost identical to option nr. 2, in that one would be using software to emulate a computer. The main difference lies in the backend implementation: A virtual machine makes use of the host operating system to run most of the instructions on the host CPU (to optimize for performance), whereas a CPU emulator's goal is not to optimize for performance, but to literally emulate the CPU using software. This results in a more portable, easier to debug but less performant simulation.

For the purposes of this article, we will go ahead with option nr 3.

### Using a CPU emulator
{% include figure.html path="blog/hello-boot/bochs-pretending.jpg" caption="In contrast to this devious smile, Bochs is very user friendly." %}

To emulate the CPU, I've been using Bochs on a Windows 10 machine. Bochs, as mentioned on [their website](https://bochs.sourceforge.io/) is a "highly portable open source IA-32 (x86) PC emulator written in C++, that runs on most popular platforms. It includes emulation of the Intel x86 CPU, common I/O devices, and a custom BIOS".

To set up Bochs, all one needs is a configuration file called bochsrc. Inside the installation folder for bochs, there is a file called bochsrc-sample.txt containing sensible default options for our emulator that I have copy pasted into the root folder of my repository and renamed as bochsrc. The reason for this is that bochs first searches the current [working directory](https://en.wikipedia.org/wiki/Working_directory#:~:text=In%20computing%2C%20the%20working%20directory,function%2C%20or%20just%20current%20directory.) for this configuration file, and I tend to run bochs while my directory is the root of my repo.

These options allow one to have bochs emulate a different processor type, change the amount of memory provided to the emulated machine, its sound driver, speaker and so on. But all of this functionality is not needed for the simple purpose of writing a string on the screen, the provided defaults are sufficient.

The only configuration option we need to change is:

{% highlight assembly%}
ata0-master: type=disk, mode=flat, path="30M.sample
{% endhighlight %}

to this:

{% highlight assembly%}
ata0-master: type=disk, mode=flat, path="os-image.img"
{% endhighlight %}

This option defines the type and characteristics of an attached ata device. Advanced Technology Attachment (ATA) is a standard physical interface for connecting storage devices within a computer. You might be familliar with [SATA](https://en.wikipedia.org/wiki/SATA) which stands for Serial ATA. I at least think of the SATA cables that one uses to connect modern hard disks or SSD's to one's motherboard.

Regardless, using this option we're basically defining our virtual hard disk. The important part is the path property which leads to the file that contains the contents of the virtual hard disk device.

This is the file that contains our code which importantly, is located in the first 512 byte sector of this file. It could have any name you choose, I arbitrarly chose to call it os-image.img.

Since the default configuration already defines the boot sequence to be from disk:

{% highlight assembly%}
boot: disk
{% endhighlight %}

This is all that needs to change for the firmware emulated by bochs to discover and boot off our virtual hard-disk.

### Let's run the smallest program on the emulator

Everything is set up and ready to go. All we need to do is compile the [smallest bootable program](#the-smallest-bootable-program), attach the code to the first sector of an image file, call that file os-image.img and run bochs.

I am using a Windows 10 machine, on which I've installed [Cygwin](https://www.cygwin.com/) and [nasm](https://www.nasm.us/). Nasm, which stands for the Netwide Assembler (NASM) is an asssembler for the x86 CPU architecture.

{% highlight assembly%}
nasm smallest_program/boot_sect.asm -f bin -o bin/smallest_program.bin
cat bin/smallest_program.bin > os-image.iso
truncate -s 10485760 os-image.iso
"C:/Program Files/Bochs-2.7/bochs.exe"
{% endhighlight %}

Let's walk through each command used:

[TODO: Significantly minify this text, make it smaller please]

The first command compiles the assembly source file to machine code. Note the -f bin property was set for nasm. This is to inform nasm to output pure binary code. This is opposed to its default behaviour which is to output an object file, meant to be further processed by a linker. On windows this would result in an executable with the PE format. Files of this nature have a .exe extension added to their name, which you'd be very familliar with as a Windows user. Windows executables have a lot more data inside them besides just machine code, and are meant to be loaded by an operating system. Since we do not have an operating system and are only interested in the machine code, we use this -f bin property.

The second command uses a GNU coreutil from cygwin, called cat. Normally cat would concatenate 2 files. This would be useful later on when we want to add the boot sector code to the beginning of an image. In this simple case, this is the equivalent of copy pasting our compiled assembly code and renaming it to os-image.iso.

The third command uses a GNU coreutil from cygwin, called truncate. This adds more data to our file to satisfy Bochs. Bochs doesn't allow an ata device to only have 512 bytes of data, so I've arbitrarly chosen to make the image 10 megabytes. Truncate simply adds bytes containing the value 0 to the file until it reaches 10 megabytes in size.


Run all of these commands and ...

{% include figure.html path="blog/hello-boot/SimplestProgram.gif" caption="The simplest possible program, booted off the bios showing and endless loop" %}

There it is, the simplest possible program, booted off the bios, in all its glory.

### Writing Hello World on the screen from a bootable program

No more fun and games. It is time.



### Conclusion and part 2 ...

It is done. Finished. Caput. 



# Appendix

## 1. CPU instructions and memory

A CPU instruction is represented by a number stored in memory. Why a number though? To better understand CPU instructions which are covered in the the next [section](#1. cpu-instruction), we need to have a brief discussion about memory.

Memory can be thought of as an electric circuit whose main purpose is to store data. Each data element in memory has a corresping **address** and **value**. Both the address and value are just numbers. The size of the address is reprented by the architecture of the cpu. On an 8 bit architecture the address is an 8 bit number, on a 16 bit architecture it's a 16 bit number, and as you might guess in current times on a 64 bit architecture, the adress is a 64 bit number. The value however is always an 8 bit value. Or at least [it has been on every modern computer arhitecture since 1978](https://en.wikipedia.org/wiki/Word_(computer_architecture)#Table_of_word_sizes).

### How does a computer store numbers?
{% include figure.html path="blog/hello-boot/magic-numbers.jpg" caption="Magic numbers" %}

I still remember when I started programming the confusion I felt trying to make a real world connection to how computers worked. Computers just do math everyone says. How is that possible? How can a physical thing be aware of and manipulate numbers?

A computer doesn't 'store numbers' since numbers are an abstract mathematical concept. The computer deals with electronic signals on a bus. It so happens that, as humans we can make a one to one abstract association between a number and a signal on a bus. This is because every number can be converted to base 2, which can then be associated with a signal. Let me explain:

Conventionally, when we think of numbers we think of them as being represented in base 10. But the base of a number can be changed, while the value of it remains the same. For example, nr. **5** in base 10 is represented as **101** in binary. As humans, we can make an abstract connection between 101 and a signal on a bus.

[Introduce a little gif here to demonstrate the point]

 For example, let's say that you want to ask the memory circuit for a value stored at address number 5. Let's say this is done on a 16 bit CPU. That means there's a BUS with 16 wires connecting the cpu and the memory and number 5 would be represented as 0000 0000 0000 0101. To make this ask of the memory circuit, the CPU would send an electric signal in which the wires representing bit number 0 and bit number 2 would be turned on, while every other wire would be turned off.
 
 Since the value returned is 8 bits long, in response the memory circuit would return the value stored at address 5 through an electronic signal of a bus with 8 wires. For every digit that is 1, its corresponding wire would be 'on' and for every digit that is 0, its corresponding wire would be 'off'. 

[This video by Ben Eater](https://www.youtube.com/watch?v=LnzuMJLZRdU&list=PLowKtXNTBypFbtuVMUVXNR0z1mu7dp7eH&ab_channel=BenEater) showing how to write a program to print out Hello World from a [6502 microprocessor](https://en.wikipedia.org/wiki/MOS_Technology_6502) is an absolutely fantastic resource that made things much more intuitive for me. I highly recommend checking it out if you're interested in understanding what was explained in this section more deeply.

## 1. CPU Instruction

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

[TODO: Expand a tiny bit more here on the two's complement. Or at least explain the concept of encoding something.]

Thus that code just does a relative jump -2 bytes from the address of the next instruction. Since our code is 2 bytes long, that jump will lead the program counter right back to our JMP instruction, resulting in an endless loop.

## 2. Assembly language

What is the Assembly language? First of, there is no one single assembly language. Every CPU has its own instruction set architecture, which comes with its own set of instructions. And each set of instructions corresponds to a different assembly language. In this post, we've been using x86-assembly, which compiles to instructions for the x86 instruction set architecture.

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
[TODO: Explain what times and $ and $$ are in assembly]

As can be seen in the [smallest bootable program](#the-smallest-bootable-program), the label 'loop:' was defined and used as an operand to the jmp instruction. The assembly compiler determined at compile time the value of the operand to the JMP instruction such that execution would jump to where the loop label would be.

Without assembly, there would be much mental overhead in figuring out the exact nr of bytes one would want to jump to in order to get behind where the loop label would be.

Not to mention you'd have to manually apply the [two's complement](https://en.wikipedia.org/wiki/Two%27s_complement) method to a number in order to figure out its integer representation.

By this point it's clear that as low-level as it is, assembly does a lot of work to simplify the creation of programs.

