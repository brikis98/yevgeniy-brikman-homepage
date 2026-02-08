---
layout: post
title: "A Comprehensive Comparison of Computer Backup Options"
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
surprisingly tricky, and after spending several days digging through the options, I created this blog post to capture
what I learned.

## Comparison of backup options

Below is a comprehensive comparison of popular backup solutions. Click the <i class="fas fa-filter filter-icon"></i> 
icon to filter any column.

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
          <th>E2E Encryption</th>
          <th>MFA Support</th>
          <th>Web Access</th>
          <th>Desktop App</th>
          <th>Mobile App</th>
          <th>Versions Stored</th>
          <th>Versions Retention</th>
          <th>Inactivity Limit</th>
          <th>Deduplication</th>
          <th>Price Tier</th>
        </tr>
      </thead>
      <tbody>
        {% for item in site.data["backup-providers"] %}
        <tr>
          <td><strong>{{ item.provider }}</strong></td>
          <td>{{ item.e2e_encryption }}</td>
          <td>{{ item.mfa_support }}</td>
          <td>{{ item.web_access }}</td>
          <td>{{ item.desktop_app }}</td>
          <td>{{ item.mobile_app }}</td>
          <td>{{ item.versions_stored }}</td>
          <td>{{ item.versions_time_limit }}</td>
          <td>{{ item.inactivity_limit }}</td>
          <td>{{ item.deduplication }}</td>
          <td>{{ item.price_tier }}</td>
        </tr>
        {% endfor %}
      </tbody>
    </table>
  </noscript>
</div>
