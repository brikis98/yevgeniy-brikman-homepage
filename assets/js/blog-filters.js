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

const showBlogPostBasedOnTypeFilter = (selectedTypes, blogPostTags) => {
  const showTypeBlogPosts = selectedTypes.includes('blog-post');
  const showTypeBookReviewsFiction = selectedTypes.includes('book-review-fiction');
  const showTypeBookReviewsNonfiction = selectedTypes.includes('book-review-nonfiction');

  return (
    (showTypeBlogPosts && showTypeBookReviewsFiction && showTypeBookReviewsNonfiction) ||                                     // All filters selected
    (!showTypeBlogPosts && !showTypeBookReviewsFiction && !showTypeBookReviewsNonfiction) ||                                  // No filters selected
    (showTypeBlogPosts && !containsBookReviewFictionTags(blogPostTags) && !containsBookReviewNonfictionTags(blogPostTags)) || // Blog posts filter selected and it's not a book review
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
    if (showBlogPostBasedOnTypeFilter(selectedTypes, blogPostTags) && showBlogPostBasedOnTagFilter(selectedTags, blogPostTags)) {
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

const onFilterChange = (event) => {
  const selectedTypes = filterByTypeMultiSelect.getSelects();
  const selectedTags = filterByTagMultiSelect.getSelects();

  const selectedFilters = [].concat(selectedTypes, selectedTags);
  if (selectedFilters.length > 0) {
    filterBlogPosts(selectedTypes, selectedTags);
  } else {
    showDefaultBlogPosts();
  }

  updatePostCount();
};

const parseDateFromPost = (post) => {
  return new Date(Date.parse(post.dataset.date));
};

const compareBlogPostsByDateDesc = (postA, postB) => {
  const postADate = parseDateFromPost(postA);
  const postBDate = parseDateFromPost(postB);
  return postBDate - postADate;
};

const compareBlogPostsByDateAsc = (postA, postB) => {
  const postADate = parseDateFromPost(postA);
  const postBDate = parseDateFromPost(postB);
  return postADate - postBDate;
};

const compareBlogPostsByTitleAsc = (postA, postB) => {
  const postATitle = postA.dataset.title;
  const postBTitle = postB.dataset.title;
  return postATitle.localeCompare(postBTitle);
};

const compareBlogPostsByTitleDesc = (postA, postB) => {
  const postATitle = postA.dataset.title;
  const postBTitle = postB.dataset.title;
  return postBTitle.localeCompare(postATitle);
};

const compareBlogPosts = (postA, postB, sortType) => {
  let out = 0;
  switch (sortType) {
    case 'date-desc':
      return compareBlogPostsByDateDesc(postA, postB);
    case 'date-asc':
      return compareBlogPostsByDateAsc(postA, postB);
    case 'title-asc':
      return compareBlogPostsByTitleAsc(postA, postB);
    case 'title-desc':
      return compareBlogPostsByTitleDesc(postA, postB);
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
  filter: true,
  filterPlaceholder: 'Search for tags',
  useSelectOptionLabelToHtml: true,
  showClear: true,
  width: 250,
  autoAdjustDropWidthByTextSize: true,
  minimumCountSelected: 2,
  onChange: onFilterChange
});

const sortMultiSelect = multipleSelect('#sort', {
  selectAll: false,
  onChange: onSortChange,
  autoAdjustDropWidthByTextSize: true
});
