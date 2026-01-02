---
name: new-book-review
description: Create a new book review post with proper frontmatter, cover image, and Amazon affiliate link. Use when creating book reviews, adding new reviews, or setting up review posts.
---

# New Book Review

Create a new book review post by gathering information from the user, automatically finding the Amazon product, downloading the cover image, and generating the required files.

## Instructions

When the user invokes this skill, follow these steps:

### Step 1: Gather Information

Use the AskUserQuestion tool to collect the following information:

1. **Book title** (text input) - The title of the book
2. **Author name** (text input) - The author's full name
3. **Star rating** - Options: 1 Stars, 2 Stars, 3 Stars, 4 Stars, 5 Stars
4. **Fiction or Nonfiction** - Options: Fiction, Nonfiction
5. **Genres** (text input) - Comma-separated list of genres (e.g., "Science Fiction, Space Opera" or "Biography, Philosophy")
6. **Is this part of a book series?** - Options: Yes, No
   - If Yes, also ask for: Series name, Book number in series

### Step 2: Find the Amazon Product

1. Use WebSearch to search for the book on Amazon:
   ```
   Query: "BOOK_TITLE" "AUTHOR_NAME" site:amazon.com
   ```

2. From the search results, identify the Amazon product URL (should contain `/dp/` followed by the ASIN)

3. Extract the ASIN (10-character code after `/dp/`)

### Step 3: Download the Cover Image

1. Use WebFetch on the Amazon product page to extract the main product image URL

2. The cover image is typically in a format like:
   - `https://m.media-amazon.com/images/I/IMAGEID._SX300_.jpg`
   - Or similar patterns

3. Download the image using curl or wget to a temporary location

4. Determine the dasherized filename from the book title:
   - Convert to lowercase
   - Replace spaces and special characters with hyphens
   - Remove multiple consecutive hyphens
   - Example: "The Burning Room" → "the-burning-room"

5. Resize the image to approximately 500px height while maintaining aspect ratio and save to the destination:
   ```bash
   curl -L "IMAGE_URL" -o /tmp/book-cover.jpg && sips -Z 500 /tmp/book-cover.jpg --out "assets/img/reviews/DASHERIZED-NAME.jpg"
   ```

### Step 4: Generate the Amazon Affiliate URL

Create the affiliate URL in this format:
```
https://www.amazon.com/BOOK-SLUG/dp/ASIN?&linkCode=ll1&tag=brikis98-20&linkId=RANDOM_HEX&language=en_US&ref_=as_li_ss_tl
```

- Use the book slug from the Amazon URL (or generate from title)
- Use the extracted ASIN
- Generate a random 32-character hex string for linkId:
  ```bash
  openssl rand -hex 16
  ```

### Step 5: Create the Markdown File

1. Determine today's date in YYYY-MM-DD format

2. Create the file at: `_posts/YYYY-MM-DD-DASHERIZED-NAME.md`

3. Use this frontmatter template:

```yaml
---
layout: post
title: "Review: BOOK_TITLE by AUTHOR_NAME"
tags: ["Review: Fiction/Nonfiction", "X Stars", "Genre1", "Genre2", ...]
thumbnail_path: "reviews/DASHERIZED-NAME.jpg"
header_image_url: "AFFILIATE_URL"
excerpt_separator: "<!--more-->"
book_series_name: "SERIES_NAME Series"  # Only include if part of a series
book_series_number: N                   # Only include if part of a series
---

Write your review here...

<!--more-->

Continue your review here...
```

### Step 6: Create the book series Markdown file (if necessary)

If this is part of a book series, create a file at `_book_series/SERIES_NAME.md` with the following frontmatter 
template: 

```yaml
---
---
title: "SERIES_NAME Series"
author: AUTHOR_NAME
layout: book-series
---
```

### Step 7: Confirm Success

After creating the files:
1. Show the user the created post file path
2. Show the saved cover image path
3. Show the generated Amazon affiliate URL
4. Remind them to write their review content in the markdown file

## Example

For a book titled "Project Hail Mary" by Andy Weir, rated 5 stars, Fiction, genres "Science Fiction, Space":

**Search:** `"Project Hail Mary" "Andy Weir" site:amazon.com`

**Extracted ASIN:** `0593135202`

**Downloaded cover to:** `assets/img/reviews/project-hail-mary.jpg`

**Created file:** `_posts/2025-01-01-project-hail-mary.md`

**Frontmatter:**
```yaml
---
layout: post
title: "Review: Project Hail Mary by Andy Weir"
tags: ["Review: Fiction", "5 Stars", "Science Fiction", "Space"]
thumbnail_path: "reviews/project-hail-mary.jpg"
header_image_url: "https://www.amazon.com/Project-Hail-Mary-Andy-Weir/dp/0593135202?&linkCode=ll1&tag=brikis98-20&linkId=a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4&language=en_US&ref_=as_li_ss_tl"
excerpt_separator: "<!--more-->"
---
```

## Notes

- The affiliate tag is always `brikis98-20`
- Images should be resized to ~500px height
- Genre tags should be capitalized appropriately (e.g., "Science Fiction" not "science fiction")
- The star rating tag must match exactly: "1 Stars", "2 Stars", "3 Stars", "4 Stars", or "5 Stars"
- If WebSearch or WebFetch fail to find the Amazon product, ask the user to provide the Amazon URL manually
