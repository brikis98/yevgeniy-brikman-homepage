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
   computers or servers). 
3. **Accessible backup.** I was looking for backup software that is accessible to everyone, so an easy-to-use GUI
   is a requirement (as opposed to backup software for programmers where you use a CLI).[^1]

## Attributes

TODO: mention

## Comparison of backup options

Below is a comprehensive comparison of popular backup solutions. Click the <i class="fas fa-filter filter-icon"></i> 
icon to filter any column.

TODO: mention this is the latest info as of Feb, 2026, sorted alphabetically, and it focuses on the standard configuration of consumer plans
(not business plans) of each service. 

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
          <th>Launched</th>
          <th>E2E Encryption</th>
          <th>MFA Support</th>
          <th>Web Access</th>
          <th>Desktop App</th>
          <th>Mobile App</th>
          <th>Versions Stored</th>
          <th>Versions Retention</th>
          <th>Inactivity Limit</th>
          <th>Granularity</th>
          <th>Deduplication</th>
          <th>Price For 1TB</th>
        </tr>
      </thead>
      <tbody>
        {% for item in site.data["backup-providers"] %}
        <tr>
          <td><strong>{{ item.provider }}</strong></td>
          <td>{{ item.launched }}</td>
          <td>{{ item.e2e_encryption }}</td>
          <td>{{ item.mfa_support }}</td>
          <td>{{ item.web_access }}</td>
          <td>{{ item.desktop_app }}</td>
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

## Footnotes

[^1]: If you are a programmer and comfortable with the CLI, here are some backup tools that are _not_ covered in this blog post that you may wish to consider: [Restic](https://restic.net/), [Borg](https://www.borgbackup.org/), [Duplicacy](https://duplicacy.com/), [Kopia](https://kopia.io/).