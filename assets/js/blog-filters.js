import { multipleSelect } from './multiple-select-vanilla.js';

const blogPostCount = document.getElementById('blog-post-count');
const blogPostsContainer = document.getElementById('blog-posts-container');
const noResults = document.getElementById('no-results');
const pagination = document.getElementById('blog-pagination');
const loadingSpinner = document.getElementById('loading-spinner');
const searchBlog = document.getElementById('search-blog');

let allBlogPosts = null;
let originalBlogPosts = null;

const showLoadingSpinner = () => {
  loadingSpinner.classList.remove('display-none');
};

const hideLoadingSpinner = () => {
  loadingSpinner.classList.add('display-none');
};

const getAllBlogPosts = async () => {
  if (allBlogPosts) {
    return allBlogPosts;
  }

  const response = await fetch('/blog/all');
  const body = await response.text();
  const parsed = new DOMParser().parseFromString(body, 'text/html');

  allBlogPosts = Array.from(parsed.body.children);
  originalBlogPosts = Array.from(blogPostsContainer.children).map(node => node.cloneNode(true));

  return allBlogPosts;
};

const containsBookReviewFictionTags = (tags) => {
  return tags.some(tag => tag.includes('Review: Fiction'));
};

const containsBookReviewNonfictionTags = (tags) => {
  return tags.some(tag => tag.includes('Review: Nonfiction'));
};

const showBlogPostBasedOnTypeFilter = (selectedTypes, blogPostTags) => {
  const showTypeBlogPosts = selectedTypes.includes('Blog Post');
  const showTypeBookReviewsFiction = selectedTypes.includes('Review: Fiction');
  const showTypeBookReviewsNonfiction = selectedTypes.includes('Review: Nonfiction');

  return (
    (showTypeBlogPosts && showTypeBookReviewsFiction && showTypeBookReviewsNonfiction) ||                                     // All filters selected
    (!showTypeBlogPosts && !showTypeBookReviewsFiction && !showTypeBookReviewsNonfiction) ||                                  // No filters selected
    (showTypeBlogPosts && !containsBookReviewFictionTags(blogPostTags) && !containsBookReviewNonfictionTags(blogPostTags)) || // Blog posts filter selected and it's not a book review
    (showTypeBookReviewsFiction && containsBookReviewFictionTags(blogPostTags)) ||                                            // Fiction book reviews filter selected and it's a fiction book review
    (showTypeBookReviewsNonfiction && containsBookReviewNonfictionTags(blogPostTags))                                         // Nonfiction book reviews filter selected and it's a nonfiction book review
  );
};

const showBlogPostBasedOnRatingFilter = (blogPostTags, selectedRatings) => {
  return selectedRatings.length === 0 || selectedRatings.some(ratingTag => blogPostTags.includes(ratingTag));
};

const showBlogPostBasedOnTagFilter = (selectedTags, blogPostTags) => {
  return selectedTags.length === 0 || selectedTags.some(tag => blogPostTags.includes(tag));
};

const showBlogPostBasedOnSearch = (blogPostsMatchingSearch, searchText, blogPost) => {
  return searchText.length === 0 || blogPostsMatchingSearch.some(post => post.id === blogPost.dataset.id);
};

const removeSearchMatchHighlight = (visiblePost) => {
  const titleElement = visiblePost.querySelector('.post-title');
  titleElement.innerHTML = visiblePost.dataset.title;

  const excerptElement = visiblePost.querySelector('.post-excerpt');
  excerptElement.innerHTML = visiblePost.dataset.excerpt;
};

const highlightSearchMatch = (visiblePost, blogPostsMatchingSearch, searchText) => {
  const searchMatch = blogPostsMatchingSearch.find(post => post.id === visiblePost.dataset.id);
  searchMatch.matches.forEach(match => {
    switch (match.field) {
      case 'title':
        const titleElement = visiblePost.querySelector('.post-title');
        titleElement.innerHTML = match.highlight;
        break;
      case 'content':
        const excerptElement = visiblePost.querySelector('.post-excerpt');
        excerptElement.innerHTML = match.highlight;
        break;
      default:
        throw new Error(`Unsupported match field: '${match.field}`);
    }
  });
};

const highlightSearchMatches = (visibleBlogPosts, blogPostsMatchingSearch, searchText) => {
  visibleBlogPosts.forEach(visiblePost => {
    removeSearchMatchHighlight(visiblePost);
    if (searchText.length > 0) {
      highlightSearchMatch(visiblePost, blogPostsMatchingSearch, searchText);
    }
  });
};

const filterBlogPosts = (blogPosts, blogPostsMatchingSearch, searchText, selectedTypes, selectedTags, selectedRatings) => {
  pagination.classList.add('display-none');

  const visibleBlogPosts = blogPosts.filter(blogPost => {
    const blogPostTags = blogPost.dataset.tags.split(';');
    return showBlogPostBasedOnSearch(blogPostsMatchingSearch, searchText, blogPost) &&
      showBlogPostBasedOnTypeFilter(selectedTypes, blogPostTags) &&
      showBlogPostBasedOnTagFilter(selectedTags, blogPostTags) &&
      showBlogPostBasedOnRatingFilter(blogPostTags, selectedRatings);
  });
  highlightSearchMatches(visibleBlogPosts, blogPostsMatchingSearch, searchText);
  blogPostsContainer.replaceChildren(...visibleBlogPosts);
};

const showDefaultBlogPosts = () => {
  pagination.classList.remove('display-none');

  blogPostsContainer.replaceChildren(...originalBlogPosts);
};

const updatePostCount = () => {
  const visibleBlogPosts = Array.from(blogPostsContainer.children).reduce((visibleCount, blogPost) => {
    return visibleCount + (blogPost.checkVisibility() ? 1 : 0);
  }, 0)

  blogPostCount.innerText = visibleBlogPosts.toString();

  if (visibleBlogPosts === 0) {
    noResults.classList.remove('display-none');
  } else {
    noResults.classList.add('display-none');
  }
};

const encodeForHash = (values) => {
  return encodeURIComponent(values.join(';'));
};

const updateUrlHash = () => {
  const searchText = searchBlog.value.trim();
  const selectedTypes = filterByTypeMultiSelect.getSelects();
  const selectedTags = filterByTagMultiSelect.getSelects();
  const selectedRatings = filterByRatingMultiSelect.getSelects();
  const sortType = sortMultiSelect.getSelects()[0];

  const hashParts = [];

  if (searchText.length > 0) {
    hashParts.push(`search=${encodeForHash([searchText])}`);
  }

  if (selectedTypes.length > 0) {
    hashParts.push(`types=${encodeForHash(selectedTypes)}`);
  }

  if (selectedTags.length > 0) {
    hashParts.push(`tags=${encodeForHash(selectedTags)}`);
  }

  if (selectedRatings.length > 0) {
    hashParts.push(`ratings=${encodeForHash(selectedRatings)}`);
  }

  if (sortType.length > 0) {
    hashParts.push(`sort=${encodeForHash([sortType])}`);
  }

  window.location.hash = hashParts.join('&');
};

const enableFiltersAndSortFromUrlHash = async () => {
  const parsedHash = new URLSearchParams(window.location.hash.substring(1));
  let filterChanged = false;

  if (parsedHash.has('search')) {
    searchBlog.value = parsedHash.get('search');
    filterChanged = true;
  }

  if (parsedHash.has('types')) {
    filterByTypeMultiSelect.setSelects(parsedHash.get('types').split(';'));
    filterChanged = true;
  }

  if (parsedHash.has('tags')) {
    filterByTagMultiSelect.setSelects(parsedHash.get('tags').split(';'));
    filterChanged = true;
  }

  if (parsedHash.has('ratings')) {
    filterByRatingMultiSelect.setSelects(parsedHash.get('ratings').split(';'));
    filterChanged = true;
  }

  if (filterChanged) {
    await onFilterChange();
  }

  if (parsedHash.has('sort')) {
    sortMultiSelect.setSelects([parsedHash.get('sort')]);
    onSortChange();
  }

  window.addEventListener("hashchange", enableFiltersAndSortFromUrlHash);
};

const searchBlogForText = async (searchText) => {
  if (searchText.length === 0) {
    return [];
  }

  const index = await loadSearchIndex();
  const results = index.search({
    query: searchText,
    enrich: true,
    highlight: {
      template: '<mark>$1</mark>',
      boundary: {
        total: 200,
        before: 100,
        after: 100
      },
      ellipsis: ' [...] ',
      clip: false
    }
  });

  // FlexSearch returns results grouped by the field that was matched (e.g., title or content). We want the list of
  // matching blog posts, deduped, each with its field, highlight, and doc information.
  const blogPostIdsToData = {};

  results.forEach(resultForField => {
    resultForField.result.forEach(result => {
      const blogPost = blogPostIdsToData[result.id] || {id: result.id, doc: result.doc, matches: []};
      blogPost.matches.push({field: resultForField.field, highlight: result.highlight});
      blogPostIdsToData[result.id] = blogPost;
    });
  });

  return Object.values(blogPostIdsToData);
};

const onFilterChange = async () => {
  showLoadingSpinner();

  const searchText = searchBlog.value.trim();
  const selectedTypes = filterByTypeMultiSelect.getSelects();
  const selectedTags = filterByTagMultiSelect.getSelects();
  const selectedRatings = filterByRatingMultiSelect.getSelects();

  const selectedFilters = [].concat(selectedTypes, selectedTags, selectedRatings);
  if (searchText.length > 0 || selectedFilters.length > 0) {
    // Fetch both in parallel
    const blogPostsPromise = getAllBlogPosts();
    const blogPostsMatchingSearchPromise = searchBlogForText(searchText);

    const blogPosts = await blogPostsPromise;
    const blogPostsMatchingSearch = await blogPostsMatchingSearchPromise;

    filterBlogPosts(blogPosts, blogPostsMatchingSearch, searchText, selectedTypes, selectedTags, selectedRatings);
  } else {
    showDefaultBlogPosts();
  }

  updatePostCount();
  updateUrlHash();

  hideLoadingSpinner();
};

const parseDateFromPost = (post) => {
  return new Date(Date.parse(post.dataset.date));
};

const compareBlogPostsByDate = (postA, postB) => {
  const postADate = parseDateFromPost(postA);
  const postBDate = parseDateFromPost(postB);
  return postBDate - postADate;
};

const compareBlogPostsByTitle = (postA, postB) => {
  return postA.dataset.title.localeCompare(postB.dataset.title);
};

const compareBlogPosts = (postA, postB, sortType) => {
  switch (sortType) {
    case 'date-desc':
      return compareBlogPostsByDate(postA, postB);
    case 'date-asc':
      return compareBlogPostsByDate(postB, postA);
    case 'title-asc':
      return compareBlogPostsByTitle(postA, postB);
    case 'title-desc':
      return compareBlogPostsByTitle(postB, postA);
    default:
      throw new Error(`Unrecognized sort type: '${sortType}`);
  }
};

const onSortChange = () => {
  const sortType = sortMultiSelect.getSelects()[0];
  // Sorting and using appendChild based on https://stackoverflow.com/a/50127768/483528
  [...blogPostsContainer.children]
    .sort((a, b) => compareBlogPosts(a, b, sortType))
    .forEach(blogPost => blogPostsContainer.appendChild(blogPost));

  updateUrlHash();
};


// Replace all curly quotes, curly apostrophes, and other fancy typography into simple quotes and apostrophes, as that
// is what search queries will contain.
const normalizeForSearchIndex = (str) => {
  return str
    .replace(/[\u2018\u2019\u201B\u2032\u02BC]/g, "'") // all curly-ish apostrophes → '
    .replace(/[\u201C\u201D]/g, '"');                  // curly double quotes → "
};

const normalizeSearchData = (searchData) => {
  return searchData.map(searchDoc => {
    return {
      title: normalizeForSearchIndex(searchDoc.title),
      tags: searchDoc.tags.map(normalizeForSearchIndex),
      content: normalizeForSearchIndex(searchDoc.content),
      id: normalizeForSearchIndex(searchDoc.id)
    };
  });
};

let _index;

const loadSearchIndex = async () => {
  if (_index) {
    return _index;
  }

  // Fetch both in parallel
  const flexSearchPromise = import('./flexsearch.compact.module.min.js');
  const searchDataPromise = fetch('/blog/search');

  const FlexSearch = (await flexSearchPromise).default;
  const searchResponse = await searchDataPromise;
  const searchData = await searchResponse.json();
  const normalizedSearchData = normalizeSearchData(searchData);

  _index = new FlexSearch.Document({
    tokenize: 'forward',
    encoder: FlexSearch.Charset.LatinBalance,
    document: {
      id: 'id',
      index: ['title', 'content'],
      store: true
    }
  });

  normalizedSearchData.forEach(document => _index.add(document));

  return _index;
};

const debounce = (callback, wait) => {
  let timeoutId = null;
  return (...args) => {
    window.clearTimeout(timeoutId);
    timeoutId = window.setTimeout(() => {
      callback(...args);
    }, wait);
  };
};

const filterByTypeMultiSelect = multipleSelect('#filter-by-type', {
  selectAll: false,
  showOkButton: true,
  useSelectOptionLabelToHtml: true,
  showClear: true,
  width: 135,
  autoAdjustDropWidthByTextSize: true,
  minimumCountSelected: 1,
  onChange: onFilterChange
});

const filterByTagMultiSelect = multipleSelect('#filter-by-tag', {
  selectAll: false,
  showOkButton: true,
  useSelectOptionLabelToHtml: true,
  showClear: true,
  width: 135,
  autoAdjustDropWidthByTextSize: true,
  minimumCountSelected: 2,
  maxHeightUnit: 'row',
  maxHeight: 8,
  onChange: onFilterChange
});

const filterByRatingMultiSelect = multipleSelect('#filter-by-rating', {
  selectAll: false,
  showOkButton: true,
  useSelectOptionLabelToHtml: true,
  showClear: true,
  width: 120,
  autoAdjustDropWidthByTextSize: true,
  minimumCountSelected: 2,
  maxHeightUnit: 'row',
  maxHeight: 8,
  onChange: onFilterChange
});

const sortMultiSelect = multipleSelect('#sort', {
  selectAll: false,
  width: 95,
  autoAdjustDropWidthByTextSize: true,
  displayTitle: true,
  onChange: onSortChange
});

await enableFiltersAndSortFromUrlHash();

searchBlog.addEventListener('focus', loadSearchIndex);
searchBlog.addEventListener('input', debounce(onFilterChange, 250));