---
layout: post
title: "A Comprehensive Comparison of Cloud Backup Tools"
tags: ["HowTo", "Computers"]
thumbnail_path: "blog/computer-backup/cover-image.png"
header_image: "blog/computer-backup/cover-image.png"
excerpt_separator: "<!--more-->"
extra_scripts:
  "https://unpkg.com/tabulator-tables@6.3.1/dist/js/tabulator.min.js": "text/javascript"
  "/assets/js/backup-comparison-table.js": "text/javascript"
extra_styles:
  "https://unpkg.com/tabulator-tables@6.3.1/dist/css/tabulator_simple.min.css": "text/css"
  "/assets/css/backup-comparison-table.css": "text/css"
---

Your computer hard drive can die at any time. To ensure you don't lose the data you care about—photos, documents, 
code, and so on—you have to set up a robust strategy for backing up your computer. Even in 2026, this is still 
surprisingly hard to do, and after spending several days digging through the options such as iCloud, OneDrive, DropBox,
BackBlaze, Arq, iDrive, and many others, I created this blog post to capture what I learned.

More specifically, this is a comparison of _personal, accessible, cloud backup options_. That's a mouthful, so let's
break it down:

**Cloud backup**
: I have multiple computers (laptops), and I travel a lot, so this post specifically focuses on
  cloud backup options that work no matter where you are in the world (as opposed to backing up to an external hard 
  drive or NAS that you have in your house).

**Personal backup** 
: I was looking for backup options for my personal computers, so this post focuses on cloud backup
  services designed for consumers (as opposed to backup services designed for businesses backing up work
  computers or servers).[^1]

**Accessible backup** 
: I was looking for backup software that is accessible to everyone, so an easy-to-use GUI
  is a requirement (as opposed to backup software for programmers where you use a CLI).[^2]

The post consists of three parts:

1. [How to compare backup options](#how-to-compare-backup-options)
1. [Comparison table of backup options](#comparison-table-of-backup-options)
1. [Conclusion](#conclusion)

<!--
TODO:

- Fix filters so you can select multiple filters (right now, picking a new filter deselects other filters)
- Fix filtering for "Launched" and "Pricing" so you can use a slider to set a minimum or maximum year/price
- Add support for parsing filter options from the URL, so you can link to specific configurations
- Fill in filtered URLs in the post
- Check all data... Maybe have Gemini and ChatGPT each take a crack at the YAML?
-->

## How to compare backup options

Here are the key attributes to look for when comparing backup providers:

1. **Created date.** How long has this backup provider been around? This not only gives you a sense of how mature
   the solution is, but also how likely it is to be around in the future.[^3] 

2. **Client-side (CS) encryption.** Is the data encrypted on your device, using a key only you know, _before_ it is sent 
   to the backup provider's servers? Don't confuse this with server-side encryption, where the data is encrypted on the
   backup provider's servers using a key they can access. Client-side (zero knowledge) encryption, enabled by default, 
   is the gold standard, as it ensures that no one other than you can read your data—not even the backup provider. 

3. **MFA.** Does the backup provider support multi-factor authentication (MFA)? That is, to authenticate, you need
   not only a password (something you know), but also an additional factor (something you have), such as a one-time 
   password generated from an authenticator app or hardware key. 

4. **Transparency.** How transparent is the provider with their security practices? _Published:_ the provider
   shares information on their website on how they protect your data. _Certified:_ an independent 3rd checked the 
   provider actually follows their published security practices (e.g., SOC 2 type II). _Open:_ the provider's code (at 
   least the client-side code) is open source, so everyone can check they actually follow their published security 
   practices.

5. **Web access.** Does the backup provider allow you to see and restore your data via a webpage?

6. **Mobile app.** Does the backup provider allow you to see and restore your data via a mobile app?

7. **Versions.** How many versions of each file does the backup provider store? The more versions, the more you can go
   back in history to recover an earlier version of a file (e.g., if the file was corrupted at some point).[^4]

8. **Version retention.** How long does the backup provider keep file versions around? Storing many versions isn't
   as useful if those versions are deleted after just a few days.

9. **Inactivity limit.** Does the backup provider delete your data if you have a device that becomes inactive? Be
   warned: if you back up a computer or external hard drive that becames disconnected, some providers (especially those
   with "unlimited storage") will delete the data from that "inactive device" after a period of time.[^5]

10. **Granularity.** How much control do you have over what gets backed up? _One folder:_ some providers 
    are designed to sync only one "magic" folder to the cloud, making it hard to back up anything 
    outside that folder. _System:_ some providers take a snapshot of your entire system, backing up everything, 
    including potentially data you don't need. _Multiple folders:_ some providers allow you to specify the 
    exact folders you want to back up. 

11. **Deduplication.** Does the provider de-duplicate data to minimize storage and bandwidth usage?[^6]

12. **Pricing.** How much does the provider charge to store 1 TB for 1 year?[^7]

## Comparison table of backup options

Below is a table that compares popular cloud backup solutions across the attributes in the previous section, based on 
data I gathered in February 2026.

You can filter this table to find providers that meet your specific needs by clicking
the <i class="fas fa-filter filter-icon"></i> icon on any column. For example, you can use the filters to select
just the providers that do [client-side encryption by default](#) or those that [store unlimited revisions, for an
unlimited time, with no inactivity limits](#). 

<script type="text/javascript">
window.backupProvidersData = {{ site.data["backup-providers"] | jsonify }};
</script>

<div class="backup-comparison-container mx-auto max-width-viewport width-viewport-90-percent center-in-viewport mt2 mb2">
  <div id="backup-comparison-table"></div>
  <noscript>
    <table class="backup-comparison-fallback">
      <thead>
        <tr>
          <th>Provider</th>
          <th>Created</th>
          <th>Client-side encryption</th>
          <th>MFA</th>
          <th>Transparency</th>
          <th>Web</th>
          <th>Mobile</th>
          <th>Versions</th>
          <th>Version Retention</th>
          <th>Inactivity Limit</th>
          <th>Granularity</th>
          <th>Deduplication</th>
          <th>Price (1TB for 1 year)</th>
        </tr>
      </thead>
      <tbody>
        {% for item in site.data["backup-providers"] %}
        <tr>
          <td><strong>{{ item.provider }}</strong></td>
          <td>{{ item.launched }}</td>
          <td>{{ item.encryption }}</td>
          <td>{{ item.mfa_support }}</td>
          <td>{{ item.transparency }}</td>
          <td>{{ item.web_access }}</td>
          <td>{{ item.mobile_app }}</td>
          <td>{{ item.versions_stored }}</td>
          <td>{{ item.versions_time_limit }}</td>
          <td>{{ item.inactivity_limit }}</td>
          <td>{{ item.granularity }}</td>
          <td>{{ item.deduplication }}</td>
          <td>{{ item.price_tier }}</td>
        </tr>
        {% endfor %}
      </tbody>
    </table>
  </noscript>
</div>

## Conclusion

I hope this blog post helps you pick a backup solution. Actually, you may wish to pick more than one solution, as per
the **3-2-1 backup rule**, which states:

- **3** copies of your data (the original, plus 2 backups)
- **2** different types of storage media (SSD, NAS, cloud)
- **1** copy in a different location (to survive local disasters like fire)

I use two backup providers. For my primary provider, my must-haves were [client-side encryption by default, MFA, 
unlimited versions, unlimited version retention, no inactivity limit, and support for backing up multiple folders](#).
This narrowed the table to just a few options, from which I picked Arq Premium. For my secondary provider, I was 
OK if it was missing a few of those requirements (e.g., versioning). I ended up picking iCloud with Advanced Data 
Protection (in part because I was using it anyway for my iPhone).

What backup provider(s) did you pick and why? Are there any missing from the comparison table? Let me know in the 
comments!

## Footnotes

[^1]: It seems that many backup providers that started in the consumer space have shifted their focus to business customers: e.g., [Crashplan](https://www.crashplan.com/) and [SpiderOak](https://spideroak.com/). As a result, they are not included in this comparison.
[^2]: If you are a programmer and comfortable with the CLI, here are some backup tools that are _not_ covered in this blog post that you may wish to consider: [Restic](https://restic.net/), [Borg](https://www.borgbackup.org/), [Duplicacy](https://duplicacy.com/), [Duplicati](https://duplicati.com/), [Kopia](https://kopia.io/).
[^3]: See the [Lindy effect](https://en.wikipedia.org/wiki/Lindy_effect). 
[^4]: Many cloud providers limit you to just 30 versions of a file. This isn't nearly enough for many file types: for example, if you're actively editing a Word document or Excel spreadsheet, it's easy to create 30 versions every single day.
[^5]: About 10 years ago, I was using Crashplan to back up multiple devices, including an external hard drive. At some point, the external hard drive died, but I didn't notice until I tried to use it months later. No problem, I thought, I have everything backed up in Crashplan! That's when I discovered that they had deleted all the data from that external hard drives due to inactivity, so that data was lost forever. I will never use a backup service with an inactivity policy again.
[^6]: Some providers dedupe on a per-file basis, so if you had an identical file already backed up, they don't need to store multiple copies of it. Some dedupe on a per-block basis, so if you had identical chunks of data (parts of files) already backed up, they don't need to store those parts again, which is even more efficient. Some providers don't dedupe at all.
[^7]: Since every provider offers multiple pricing plans, which are changing all the time, comparing every price point across every provider was impractical, so I figured I'd focus on a single price point as a simple way to give you a glimpse of how the providers stack up for a somewhat large (but not astronomical) amount of data storage.