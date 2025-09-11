import { multipleSelect } from './multiple-select-vanilla.js';

const blogPosts = Array.from(document.getElementsByClassName('blog-post'));
const blogPostCount = document.getElementById('blog-post-count');
const blogPostsContainer = document.getElementById('blog-posts-container');
const noResults = document.getElementById('no-results');
const pagination = document.getElementById('blog-pagination');

const hideBlogPost = (blogPost) => {
  blogPost.classList.remove('block');
  blogPost.classList.add('display-none');
};

const showBlogPost = (blogPost) => {
  blogPost.classList.add('block');
  blogPost.classList.remove('display-none');
};

const containsBookReviewFictionTags = (tags) => {
  return tags.some(tag => tag.includes('Review: Fiction'));
};

const containsBookReviewNonfictionTags = (tags) => {
  return tags.some(tag => tag.includes('Review: Nonfiction'));
};

const showBlogPostBasedOnTypeFilter = (selectedTypes, blogPostTags, isPopularBlogPost) => {
  const showTypeBlogPosts = selectedTypes.includes('Blog Post');
  const showTypePopularBlogPosts = selectedTypes.includes('Popular Blog Post');
  const showTypeBookReviewsFiction = selectedTypes.includes('Book Review, Fiction');
  const showTypeBookReviewsNonfiction = selectedTypes.includes('Book Review, Nonfiction');

  return (
    (showTypeBlogPosts && showTypePopularBlogPosts && showTypeBookReviewsFiction && showTypeBookReviewsNonfiction) ||         // All filters selected
    (!showTypeBlogPosts && !showTypePopularBlogPosts && !showTypeBookReviewsFiction && !showTypeBookReviewsNonfiction) ||     // No filters selected
    (showTypeBlogPosts && !containsBookReviewFictionTags(blogPostTags) && !containsBookReviewNonfictionTags(blogPostTags)) || // Blog posts filter selected and it's not a book review
    (showTypePopularBlogPosts && isPopularBlogPost) ||                                                                        // Popular blog posts filter selected and it's a popular post
    (showTypeBookReviewsFiction && containsBookReviewFictionTags(blogPostTags)) ||                                            // Fiction book reviews filter selected and it's a fiction book review
    (showTypeBookReviewsNonfiction && containsBookReviewNonfictionTags(blogPostTags))                                         // Nonfiction book reviews filter selected and it's a nonfiction book review
  );
};

const showBlogPostBasedOnTagFilter = (selectedTags, blogPostTags) => {
  return selectedTags.length === 0 || selectedTags.some(tag => blogPostTags.includes(tag));
};

const filterBlogPosts = (selectedTypes, selectedTags) => {
  pagination.classList.add('display-none');

  blogPosts.forEach(blogPost => {
    const blogPostTags = blogPost.dataset.tags.split(';');
    const isPopularBlogPost = blogPost.dataset.popular === 'true';
    if (showBlogPostBasedOnTypeFilter(selectedTypes, blogPostTags, isPopularBlogPost) && showBlogPostBasedOnTagFilter(selectedTags, blogPostTags)) {
      showBlogPost(blogPost);
    } else {
      hideBlogPost(blogPost);
    }
  });
};

const showDefaultBlogPosts = () => {
  pagination.classList.remove('display-none');

  blogPosts.forEach(blogPost => {
    if (blogPost.dataset.hidden === 'true') {
      hideBlogPost(blogPost);
    } else {
      showBlogPost(blogPost);
    }
  });
};

const updatePostCount = () => {
  const visibleBlogPosts = blogPosts.reduce((visibleCount, blogPost) => {
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
  const selectedTypes = filterByTypeMultiSelect.getSelects();
  const selectedTags = filterByTagMultiSelect.getSelects();
  const sortType = sortMultiSelect.getSelects()[0];

  window.location.hash = `types=${encodeForHash(selectedTypes)}&tags=${encodeForHash(selectedTags)}&sort=${encodeForHash([sortType])}`;
};

const enableFiltersAndSortFromUrlHash = () => {
  const parsedHash = new URLSearchParams(window.location.hash.substring(1));

  if (parsedHash.has('types')) {
    filterByTypeMultiSelect.setSelects(parsedHash.get('types').split(';'));
  }

  if (parsedHash.has('tags')) {
    filterByTagMultiSelect.setSelects(parsedHash.get('tags').split(';'));
  }

  if (parsedHash.has('types') || parsedHash.has('tags')) {
    onFilterChange();
  }

  if (parsedHash.has('sort')) {
    sortMultiSelect.setSelects([parsedHash.get('sort')]);
    onSortChange();
  }
};

const onFilterChange = (data) => {
  const selectedTypes = filterByTypeMultiSelect.getSelects();
  const selectedTags = filterByTagMultiSelect.getSelects();

  const selectedFilters = [].concat(selectedTypes, selectedTags);
  if (selectedFilters.length > 0) {
    filterBlogPosts(selectedTypes, selectedTags);
  } else {
    showDefaultBlogPosts();
  }

  updatePostCount();
  updateUrlHash();
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

const onSortChange = (data) => {
  const sortType = sortMultiSelect.getSelects()[0];
  // Sorting and using appendChild based on https://stackoverflow.com/a/50127768/483528
  [...blogPostsContainer.children]
    .sort((a, b) => compareBlogPosts(a, b, sortType))
    .forEach(blogPost => blogPostsContainer.appendChild(blogPost));

  updateUrlHash();
};

const filterByTypeMultiSelect = multipleSelect('#filter-by-type', {
  selectAll: false,
  showOkButton: true,
  useSelectOptionLabelToHtml: true,
  showClear: true,
  width: 250,
  autoAdjustDropWidthByTextSize: true,
  minimumCountSelected: 1,
  onChange: onFilterChange
});

const filterByTagMultiSelect = multipleSelect('#filter-by-tag', {
  selectAll: false,
  showOkButton: true,
  useSelectOptionLabelToHtml: true,
  showClear: true,
  width: 200,
  autoAdjustDropWidthByTextSize: true,
  minimumCountSelected: 2,
  maxHeightUnit: 'row',
  maxHeight: 8,
  onChange: onFilterChange
});

const sortMultiSelect = multipleSelect('#sort', {
  selectAll: false,
  width: 155,
  autoAdjustDropWidthByTextSize: true,
  displayTitle: true,
  onChange: onSortChange
});

enableFiltersAndSortFromUrlHash();