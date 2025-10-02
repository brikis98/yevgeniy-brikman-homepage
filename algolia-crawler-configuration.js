new Crawler({
  appId: "TODO: intentionally hidden. The crawler will automatically fill in the app ID here.",
  indexPrefix: "",
  rateLimit: 8,
  maxUrls: 5000,
  schedule: "on monday",
  startUrls: ["https://www.ybrikman.com/blog/"],
  sitemaps: [],
  saveBackup: false,
  ignoreQueryParams: ["source", "utm_*"],
  exclusionPatterns: ["**/blog/page*"],
  actions: [
    {
      indexName: "ybrikman_blog",
      pathsToMatch: [
        "https://www.ybrikman.com/blog/**",
        "https://ybrikman.com/blog/**",
      ],
      recordExtractor: ({ url, $, helpers, contentLength, fileType }) => {
        const canonicalUrl = $("link[rel=canonical]").attr("href");
        const pageId = $("meta[name=page-id]").attr("content");
        const objectID = canonicalUrl;
        const title = $("title").text().trim();
        const description = $("meta[name=description]").attr("content");
        const date = $("meta[name=date]").attr("content");
        const keywords = ($("meta[name=keywords]").attr("content") || "").split(
          ",",
        );
        const image = $("meta[property=og:image]").attr("content");
        const ogType = $("meta[property=og:type]").attr("content");
        const rating = ($("meta[name=rating]").attr("content") || "").split(",");
        const outline = $("#post-outline").html();

        const baseRecord = {
          objectID,
          title,
          description,
          date,
          image,
          outline,
          url: canonicalUrl,
          id: pageId,
          Rating: rating,
          Type: ogType,
          Tags: keywords,
        };
        const records = helpers.splitContentIntoRecords({
          baseRecord,
          $elements: $("main article.post"),
          maxRecordBytes: 10000,
          textAttributeName: "text",
          orderingAttributeName: "part",
        });

        return records;
      },
    },
  ],
  initialIndexSettings: {
    ybrikman_blog: {
      distinct: true,
      attributeForDistinct: "url",
      searchableAttributes: [
        "unordered(title)",
        "unordered(description)",
        "unordered(text)",
      ],
      customRanking: ["asc(part)"],
      attributesForFaceting: [
        "afterDistinct(Tags)",
        "afterDistinct(Type)",
        "afterDistinct(Rating)",
      ],
      sortFacetValuesBy: "alpha",
      attributesToSnippet: ["text:50"],
      snippetEllipsisText: " [...] ",
      highlightPreTag: "<mark>",
      highlightPostTag: "</mark>",
      hitsPerPage: 10,
      renderingContent: {
        facetOrdering: {
          facets: { order: ["Type", "Tags", "Rating"] },
          values: {
            Tags: {
              hide: [
                "1 Stars",
                "2 Stars",
                "3 Stars",
                "4 Stars",
                "5 Stars",
                "Popular",
                "Review",
                "Review: Fiction",
                "Review: Nonfiction",
              ],
              sortRemainingBy: "alpha",
            },
            Type: { hide: ["Blog Post Listing"], sortRemainingBy: "alpha" },
            Rating: { sortRemainingBy: "alpha" },
          },
        },
      },
    },
  },
  apiKey: "TODO: intentionally hidden. The crawler will fill in its own auto-generated API key here.",
});