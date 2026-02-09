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

More specifically, this is a comparison of computer backup options that meet the following requirements:

1. **Cloud backup.** I have multiple computers (laptops), and I travel a lot, so this post specifically focuses on
   cloud backup options that work no matter where you are in the world (as opposed to backing up to an external hard 
   drive or NAS that you have in your house).
2. **Personal backup.** I was looking for backup options for my home computers, so this post focuses on cloud backup
   services designed for consumers backing up their personal computers (as opposed to businesses backing up work
   computers or servers).[^1]
3. **Accessible backup.** I was looking for backup software that is accessible to everyone, so an easy-to-use GUI
   is a requirement (as opposed to backup software for programmers where you use a CLI).[^2]

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

1. **Created date.** How long ahas this backup provider been around? This not only gives you a sense of how mature
   the solution is, but also how likely it is to be around in the future.[^3] 

2. **Encryption.** What sort of encryption does the backup provider use to protect your data? There are 3 primary 
   types of encryption to look for:

    1. **Over-the-wire (TLS).** Is the data encrypted while it is sent over the network between your
       computer and the backup provider's servers?
    2. **Server-side.** Is the data encrypted when it is stored on the backup provider's servers? Note
       that this encryption uses a key known to the backup provider.
    3. **Client-side (zero-knowledge).** Is the data encrypted on your device, using a key only you know,
       _before_ it is sent to the backup provider's servers? This is the gold standard, as it ensures that no one other
       than you can read your data—not even the backup provider. The best backup providers will use client-side
       encryption by default.

3. **MFA.** Does the backup provider support multi-factor authentication (MFA)? That is, to authenticate, you need
   not only a password (something you know), but also an additional factor (something you have), such as a one-time 
   password generated from an authenticator app or hardware key. 

4. **Transparency.** How transparent is the provider with their security practices? There are three buckets to look
   at:

    1. **Published.** Have they published information on their website or in a whitepaper on how they protect your
       data?
    2. **Certified.** Has an independent third-party checked they actually follow their self-declared security 
       practices (e.g., SOC 2 type II, pen testing)?
    3. **Open.** Is their code (at least the client-side code) open source, so anyone can review it?

5. **Web access.** Does the backup provider allow you to see and restore your data via a webpage?

6. **Mobile app.** Does the backup provider allow you to see and restore your data via a mobile app?

7. **Versions.** How many versions of each file does the backup provider store? Sometimes, you need to recover an 
   earlier version of a file (e.g., if the latest version is corrupted), and providers vary widely in how much history
   they store.[^4]

8. **Version retention.** How long does the backup provider keep file versions around? Some providers store many
   versions of a file, but then delete them after 30 days, which can be problematic if you need to go back to 
   an older version of a file.

9. **Inactivity limit.** Does the backup provider delete your data if you have a device (e.g., computer or hard drive) 
   that becomes inactive? Be wary of backup providers that provide "unlimited" data storage, as they often have hidden
   inactivity policies, which can result in data loss.[^5]

10. **Granularity.** How much control do you have over what files and folders get backed up? Most cloud backup providers
    fall into the following buckets:

    1. **One folder.** Some backup providers are designed to sync one "magic" folder to the cloud (e.g., DropBox).
    2. **Multiple folders.** Some backup providers allow you to specify a set of folders to back up to the cloud.
    3. **System and multiple folders.** Some backup providers allow you to specify a set of folders to back up, or
      you can have them take a snapshot of your entire system. 

11. **Deduplication.** Does the cloud provider de-duplicate data to minimize storage and bandwidth usage?[^6]

12. **Pricing.** How much does the provider charge to store 1 TB of data for 1 year?[^7]

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
          <th>Encryption</th>
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

- Keep 3 copies of your data (the original, plus 2 copies)
- On 2 different types of storage media (magnetic hard drive, SSD, etc.)
- With 1 copy stored in a totally different geographic location (to survive local disasters like fire or flooding)

For example, for a primary backup provider, my must-haves were client-side encryption by default, MFA, web access, 
unlimited versions, unlimited version retention, no inactivity limit, and support for backing up multiple folders (you
can use [this link](#) to filter the comparison table to providers that match these requirements). To ensure I had
3 copies of my data, I also wanted a second backup provider, but I was OK if it was missing a few of those requirements
(e.g., unlimited version retention). I ended up picking Arq Premium as my primary and iCloud as my secondary backup
(the latter because I was using it anyway for my iPhone).

What backup provider(s) did you pick and why? Are there any missing from the comparison table? Let me know in the 
comments!

## Footnotes

[^1]: It seems that many backup providers that started in the consumer space have shifted their focus to business customers: e.g., [Crashplan](https://www.crashplan.com/) and [SpiderOak](https://spideroak.com/). As a result, they are not included in this comparison.
[^2]: If you are a programmer and comfortable with the CLI, here are some backup tools that are _not_ covered in this blog post that you may wish to consider: [Restic](https://restic.net/), [Borg](https://www.borgbackup.org/), [Duplicacy](https://duplicacy.com/), [Duplicati](https://duplicati.com/), [Kopia](https://kopia.io/).
[^3]: See the [Lindy effect](https://en.wikipedia.org/wiki/Lindy_effect). 
[^4]: Many cloud providers limit you to just 5 or 30 versions of a file. This works for some file types, but not for others: for example, if you're actively editing a Word document or Excel spreadsheet, it's easy to create 30 versions every single day.
[^5]: About 10 years ago, I was using Crashplan to back up multiple devices, including an external hard drive. At some point, the external hard drive died, but I didn't notice until I tried to use it months later. No problem, I thought, I have everything backed up in Crashplan! That's when I discovered that they had deleted all the data from that external hard drives due to inactivity, so that data was lost forever. I will never use a backup service with an inactivity policy again.
[^6]: Some providers dedupe on a per-file basis, so if you had an identical file already backed up, they don't need to store multiple copies of it. Some dedupe on a per-block basis, so if you had identical chunks of data (parts of files) already backed up, they don't need to store those parts again, which is even more efficient. Some providers don't dedupe at all.
[^7]: Since every provider offers multiple pricing plans, which are changing all the time, comparing every price point across every provider was impractical, so I figured I'd focus on a single price point as a simple way to give you a glimpse of how the providers stack up for a somewhat large (but not astronomical) amount of data storage.