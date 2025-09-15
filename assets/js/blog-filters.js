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

const filterBlogPosts = (blogPosts, blogPostsMatchingSearch, searchText, selectedTypes, selectedTags, selectedRatings) => {
  pagination.classList.add('display-none');

  const visibleBlogPosts = blogPosts.filter(blogPost => {
    const blogPostTags = blogPost.dataset.tags.split(';');
    return showBlogPostBasedOnSearch(blogPostsMatchingSearch, searchText, blogPost) &&
      showBlogPostBasedOnTypeFilter(selectedTypes, blogPostTags) &&
      showBlogPostBasedOnTagFilter(selectedTags, blogPostTags) &&
      showBlogPostBasedOnRatingFilter(blogPostTags, selectedRatings);
  });
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

// I've generally found that anything Fuse.js returns with a search score greater than this value is likely to have
// nothing to do with the original search, so we filter it out.
const searchScoreCutOff = 0.1;

const searchBlogForText = async (searchText) => {
  if (searchText.length === 0) {
    return [];
  }

  const fuse = await loadSearchIndex();
  const results = fuse.search(searchText);

  console.log(`Search results for ${searchText}`);
  console.log(results);

  return results
    .filter(result => result.score < searchScoreCutOff)
    .map(result => result.item);
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

let _fuse;

const loadSearchIndex = async () => {
  if (_fuse) {
    return _fuse;
  }

  // Fetch both in parallel
  const FusePromise = import('./fuse.js');
  const searchDataPromise = fetch('/blog/search');

  const Fuse = await FusePromise;
  const searchResponse = await searchDataPromise;
  const searchData = await searchResponse.json();

  const options = {
    keys: ['title', 'tags', 'content'],
    threshold: 0.2,
    includeScore: true,
    includeMatches: true,
    ignoreLocation: true,
    ignoreFieldNorm: true
  };

  _fuse = new Fuse.default(searchData, options);
  return _fuse;
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