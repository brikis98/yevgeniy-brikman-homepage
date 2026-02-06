---
layout: post
title: "A Comprehensive Comparison of Computer Backup Options"
tags: ["HowTo", "Computers"]
thumbnail_path: "blog/computer-backup/cover-image.png"
header_image: "blog/computer-backup/cover-image.png"
excerpt_separator: "<!--more-->"
---

Your computer hard drive can die at any time. To ensure you don't lose the data you care about—photos, documents, 
code, and so on—you have to set up a robust strategy for backing up your computer. Even in 2026, this is still 
surprisingly tricky, and after spending several days digging through the options, I created this blog post to capture
what I learned.

## The factors to consider

- Storage 
  - Local vs cloud: this post focuses mostly on cloud
  - Entire system vs folders: Back up specific folders (I want to back up specific files, not an entire OS snapshot)
  - Space
  - Bandwidth
  - Deduplication
- Resilience 
  - 3-2-1 rule: multiple providers. I trusted one, once (Crashplan), and paid for it badly.
  - Version history: number of versions, how long you keep them, configuration. Can be done via snapshots or on a file-by-file basis.
  - Inactivity deletion: hard no
- Security
  - E2E encryption (client-side, zero-knowledge) support
  - E2E encryption by default
  - MFA to access the data
  - Transparency: open source, audits, attestations
- User interface
  - Desktop app (Mac, Windows)
  - Web access to my files
  - Mobile app to access my files
  - Ease of use: including UI speed
  - Collaboration tools: file sharing, document collaboration
- Trust
  - Product maturity: 10 years
  - Company stability: around a long time, not likely to disappear overnight, focused on consumers
  - Reviews and reputation
- Pricing
