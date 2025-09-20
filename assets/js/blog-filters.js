const { liteClient: algoliasearch } = window['algoliasearch/lite'];
const instantsearch = window['instantsearch'];

const algoliaApplicationId = document.querySelector('meta[name="algolia_application_id"]').content;
const algoliaSearchApiKey = document.querySelector('meta[name="algolia_search_api_key"]').content;
const algoliaSearchIndex = document.querySelector('meta[name="algolia_search_index"]').content;

const originalBlogPostsContainer = document.getElementById('original-blog-posts-container');
const originalBlogPostCount = document.getElementById('original-blog-post-count');
const originalPagination = document.getElementById('original-blog-pagination');

const algoliaBlogPostsContainer = document.getElementById('algolia-blog-posts-container');
const algoliaBlogPostCount = document.getElementById('algolia-blog-post-count');
const algoliaPagination = document.getElementById('algolia-blog-pagination');

const searchBlog = document.getElementById('search-blog');
const filterByType = document.getElementById('filter-by-type');
const filterByTag = document.getElementById('filter-by-tag');
const filterByRating = document.getElementById('filter-by-rating');

const clearFilterByType = document.getElementById('clear-filter-by-type');
const clearFilterByTag = document.getElementById('clear-filter-by-tag');
const clearFilterByRating = document.getElementById('clear-filter-by-rating');

const filterByTypeButton = document.getElementById('filter-by-type-button');
const filterByTagButton = document.getElementById('filter-by-tag-button');
const filterByRatingButton = document.getElementById('filter-by-rating-button');

const filterLoadingSpinners = Array.from(document.getElementsByClassName('loading-spinner'));

const renderHitAsBlogPost = (hit) => {
  // I've included a hidden post-outline node in each blog post, and configured Algolia to index the contents of this
  // outline, which allows us to render it directly in the search results, without having to duplicate the Jekyll
  // template (post-outline.html) and all of its logic in JavaScript.
  const blogPost = new DOMParser().parseFromString(hit.outline, 'text/html');

  blogPost.querySelector('.post-title').innerHTML = hit._highlightResult.title.value;
  blogPost.querySelector('.post-excerpt').innerHTML =
    hit._highlightResult.description.matchLevel === 'none' && hit._highlightResult.text.matchLevel !== 'none'
      ? hit._highlightResult.text.value
      : hit._highlightResult.description.value;

  return blogPost.body.innerHTML;
};

const showElement = (element) => {
  element.classList.remove('display-none');
};

const hideElement = (element) => {
  element.classList.add('display-none');
};

const hideOriginalBlogPosts = () => {
  hideElement(originalBlogPostsContainer);
  hideElement(originalBlogPostCount);
  hideElement(originalPagination);

  showElement(algoliaBlogPostsContainer);
  showElement(algoliaBlogPostCount);
  showElement(algoliaPagination);
};

const showOriginalBlogPosts = () => {
  showElement(originalBlogPostsContainer);
  showElement(originalBlogPostCount);
  showElement(originalPagination);

  hideElement(algoliaBlogPostsContainer);
  hideElement(algoliaBlogPostCount);
  hideElement(algoliaPagination);
};

const updateFilterButton = (filterButton, selectedFilterValues) => {
  const placeholder = filterButton.querySelector('.placeholder');
  const filterSelection = filterButton.querySelector('.filter-selection');

  if (selectedFilterValues && selectedFilterValues.length > 0) {
    hideElement(placeholder);
    filterSelection.innerText = `${selectedFilterValues.length} selected`;
  } else {
    showElement(placeholder);
    filterSelection.innerText = '';
  }
};

const labelMiddleware = () => ({
  onStateChange({ uiState }) {
    updateFilterButton(filterByTypeButton, uiState[algoliaSearchIndex]?.refinementList?.['Type']);
    updateFilterButton(filterByTagButton, uiState[algoliaSearchIndex]?.refinementList?.['Tags']);
    updateFilterButton(filterByRatingButton, uiState[algoliaSearchIndex]?.refinementList?.['Rating']);
  },
  subscribe() {},
  unsubscribe() {},
});

const renderHits = ({items, results, widgetParams}, isFirstRender) => {
  if (items.length > 0) {
    widgetParams.container.innerHTML = items.map(item => renderHitAsBlogPost(item)).join('\n');
  } else {
    widgetParams.container.innerHTML = `<div class="center mt4">No posts match your search and filters.</div>`;
  }
};

const customHits = instantsearch.connectors.connectHits(renderHits);

const searchClient = algoliasearch(algoliaApplicationId, algoliaSearchApiKey);

let isInitialSearchToPopulateFilters = false;
let hadAnyRefinements = false;
let hadQuery = false;

const search = instantsearch({
  indexName: algoliaSearchIndex,
  searchClient,
  future: { preserveSharedStateOnUnmount: true },

  // Search requests that take longer than this will show the "loading" indicators. Searches that are faster will
  // not show the loading indicators; if they are that fast, we really don't need to, as the user won't even notice
  // a delay.
  stalledSearchDelay: 300,

  searchFunction: (helper) => {
    const hasQuery = !!helper.state.query?.trim();

    const hasFacetRefinements =
      Object.values(helper.state.disjunctiveFacetsRefinements).some(v => v.length) ||
      Object.values(helper.state.facetsRefinements).some(v => Object.keys(v).length);

    const hasNumericRefinements =
      Object.keys(helper.state.numericRefinements || {}).some(attr =>
        Object.keys(helper.state.numericRefinements[attr]).length
      );

    const hasAnyRefinements = hasFacetRefinements || hasNumericRefinements;

    const isClearingRefinements = hadAnyRefinements && !hasAnyRefinements;
    const isClearingSearch = hadQuery && !hasQuery;

    // Run when:
    // 1) There's a query.
    // 2) There are refinements.
    // 3) We’re *clearing* the last refinement (transition true -> false).
    // 4) We’re *clearing* the last query (transition true -> false). We need a search here to re-load all filters.
    // 5) It's the initial search to populate the list of filters

    if (hasQuery || hasAnyRefinements || isClearingRefinements || isClearingSearch || isInitialSearchToPopulateFilters) {
      helper.search();
    }

    // Show Algolia results when:
    // 1) There’s a query.
    // 2) There are refinements

    if (hasQuery || hasAnyRefinements) {
      hideOriginalBlogPosts();
    } else {
      showOriginalBlogPosts();
    }

    // Record if we had refinements or a query previously
    hadAnyRefinements = hasAnyRefinements;
    hadQuery = hasQuery;
  }
});

search.use(labelMiddleware);

search.addWidgets([
  instantsearch.widgets.searchBox({
    container: searchBlog,
    searchAsYouType: true,
    showReset: true,
    showSubmit: false,
    showLoadingIndicator: true
  }),
  customHits({
    container: algoliaBlogPostsContainer
  }),
  instantsearch.widgets.stats({
    container: algoliaBlogPostCount,
    cssClasses: {
      root: 'inline'
    },
    templates: {
      text: (data, {html}) => {
        return html`<span>${data.nbHits}</span>`;
      }
    }
  }),
  // TODO: make pagination UI better
  instantsearch.widgets.pagination({
    container: algoliaPagination,
  }),
  instantsearch.widgets.refinementList({
    container: filterByType,
    attribute: 'Type',
    limit: 10,
    sortBy: ['name:asc']
  }),
  instantsearch.widgets.refinementList({
    container: filterByTag,
    attribute: 'Tags',
    limit: 100,
    sortBy: ['name:asc']
  }),
  instantsearch.widgets.refinementList({
    container: filterByRating,
    attribute: 'Rating',
    limit: 10,
    sortBy: ['name:asc']
  }),
  instantsearch.widgets.clearRefinements({
    container: clearFilterByType,
    includedAttributes: 'Type',
    templates: {
      resetLabel: ({ hasRefinements }, { html }) => {
        return html`<span>${hasRefinements ? 'Clear filters' : ''}</span>`;
      }
    }
  }),
  instantsearch.widgets.clearRefinements({
    container: clearFilterByTag,
    includedAttributes: 'Tags',
    templates: {
      resetLabel: ({ hasRefinements }, { html }) => {
        return html`<span>${hasRefinements ? 'Clear filters' : ''}</span>`;
      }
    }
  }),
  instantsearch.widgets.clearRefinements({
    container: clearFilterByRating,
    includedAttributes: 'Rating',
    templates: {
      resetLabel: ({ hasRefinements }, { html }) => {
        return html`<span>${hasRefinements ? 'Clear filters' : ''}</span>`;
      }
    }
  })
]);

search.on('render', () => {
  // Note that we do NOT show the loading indicators for search.status === 'loading'. That's because we have set the
  // stalledSearchDelay configuration to a low enough value where searches that are faster than that will seem
  // instantaneous to the user, so there's no need to show loading indicators.
  if (search.status === 'stalled') {
    filterLoadingSpinners.forEach(showElement);
  } else {
    filterLoadingSpinners.forEach(hideElement);
  }
});

search.start();

const filterButtonClicked = (event) => {
  // If we haven't done any search queries, then the list of available facets are not loaded for any of the filter
  // menus, so perform search query to populate thoes facet values.
  if (!search.helper.lastResults) {
    isInitialSearchToPopulateFilters = true;
    search.helper.search();
  } else {
    isInitialSearchToPopulateFilters = false;
  }
};

filterByTypeButton.addEventListener('click', filterButtonClicked);
filterByTagButton.addEventListener('click', filterButtonClicked);
filterByRatingButton.addEventListener('click', filterButtonClicked);

// const noResults = document.getElementById('no-results');
// const pagination = document.getElementById('blog-pagination');
// const loadingSpinner = document.getElementById('loading-spinner');
//
// let allBlogPosts = null;
// let originalBlogPosts = null;
//
// const showLoadingSpinner = () => {
//   loadingSpinner.classList.remove('display-none');
// };
//
// const hideLoadingSpinner = () => {
//   loadingSpinner.classList.add('display-none');
// };
//
// const convertBlogPostsToDomNodes = (parsedBlogPosts, originalBlogPosts) => {
//   const sampleBlogPost = originalBlogPosts[0];
//   return parsedBlogPosts.map(parsedBlogPost => {
//     const clone = sampleBlogPost.cloneNode(true);
//
//     clone.dataset.id = parsedBlogPost.id;
//     clone.querySelector('.post-title').innerText = parsedBlogPost.title;
//     clone.querySelector('.post-date').dateTime = parsedBlogPost.date;
//     clone.querySelector('.post-excerpt').innerText = parsedBlogPost.excerpt;
//
//     // TODO: need links for tags
//     const postTags = Array.from(clone.querySelectorAll('.post-tag'));
//     const sampleTag = postTags[0];
//     const cloneTags = parsedBlogPost.tags.map(tag => {
//       const cloneTag = sampleTag.cloneNode(true);
//       cloneTag.innerText = tag;
//       return cloneTag;
//     })
//     clone.querySelector('.post-tags').replaceChildren(...cloneTags);
//
//     // TODO: need image URLs
//     // TODO: need comments URLs
//     // TODO: need to fill in post URL
//
//     return clone;
//   });
// };
//
// const showDefaultBlogPosts = () => {
//   pagination.classList.remove('display-none');
//
//   blogPostsContainer.replaceChildren(...originalBlogPosts);
// };
//
// const updatePostCount = () => {
//   const visibleBlogPosts = Array.from(blogPostsContainer.children).reduce((visibleCount, blogPost) => {
//     return visibleCount + (blogPost.checkVisibility() ? 1 : 0);
//   }, 0)
//
//   blogPostCount.innerText = visibleBlogPosts.toString();
//
//   if (visibleBlogPosts === 0) {
//     noResults.classList.remove('display-none');
//   } else {
//     noResults.classList.add('display-none');
//   }
// };
//
// const encodeForHash = (values) => {
//   return encodeURIComponent(values.join(';'));
// };
//
// const updateUrlHash = () => {
//   const searchText = searchBlog.value.trim();
//   const selectedTypes = filterByTypeMultiSelect.getSelects();
//   const selectedTags = filterByTagMultiSelect.getSelects();
//   const selectedRatings = filterByRatingMultiSelect.getSelects();
//   const sortType = sortMultiSelect.getSelects()[0];
//
//   const hashParts = [];
//
//   if (searchText.length > 0) {
//     hashParts.push(`search=${encodeForHash([searchText])}`);
//   }
//
//   if (selectedTypes.length > 0) {
//     hashParts.push(`types=${encodeForHash(selectedTypes)}`);
//   }
//
//   if (selectedTags.length > 0) {
//     hashParts.push(`tags=${encodeForHash(selectedTags)}`);
//   }
//
//   if (selectedRatings.length > 0) {
//     hashParts.push(`ratings=${encodeForHash(selectedRatings)}`);
//   }
//
//   if (sortType.length > 0) {
//     hashParts.push(`sort=${encodeForHash([sortType])}`);
//   }
//
//   window.location.hash = hashParts.join('&');
// };
//
// const enableFiltersAndSortFromUrlHash = async () => {
//   const parsedHash = new URLSearchParams(window.location.hash.substring(1));
//   let filterChanged = false;
//
//   if (parsedHash.has('search')) {
//     searchBlog.value = parsedHash.get('search');
//     filterChanged = true;
//   }
//
//   if (parsedHash.has('types')) {
//     filterByTypeMultiSelect.setSelects(parsedHash.get('types').split(';'));
//     filterChanged = true;
//   }
//
//   if (parsedHash.has('tags')) {
//     filterByTagMultiSelect.setSelects(parsedHash.get('tags').split(';'));
//     filterChanged = true;
//   }
//
//   if (parsedHash.has('ratings')) {
//     filterByRatingMultiSelect.setSelects(parsedHash.get('ratings').split(';'));
//     filterChanged = true;
//   }
//
//   if (filterChanged) {
//     await onFilterChange();
//   }
//
//   if (parsedHash.has('sort')) {
//     sortMultiSelect.setSelects([parsedHash.get('sort')]);
//     onSortChange();
//   }
//
//   window.addEventListener("hashchange", enableFiltersAndSortFromUrlHash);
// };
//
// const searchBlogForText = async (searchText) => {
//   if (searchText.length === 0) {
//     return [];
//   }
//
//   const index = await loadSearchIndex();
//   const results = index.search({
//     query: searchText,
//     enrich: true,
//     highlight: {
//       template: '<mark>$1</mark>',
//       boundary: {
//         total: 200,
//         before: 100,
//         after: 100
//       },
//       ellipsis: ' [...] ',
//       clip: false
//     }
//   });
//
//   // FlexSearch returns results grouped by the field that was matched (e.g., title or content). We want the list of
//   // matching blog posts, deduped, each with its field, highlight, and doc information.
//   const blogPostIdsToData = {};
//
//   results.forEach(resultForField => {
//     resultForField.result.forEach(result => {
//       const blogPost = blogPostIdsToData[result.id] || {id: result.id, doc: result.doc, matches: []};
//       blogPost.matches.push({field: resultForField.field, highlight: result.highlight});
//       blogPostIdsToData[result.id] = blogPost;
//     });
//   });
//
//   return Object.values(blogPostIdsToData);
// };
//
// const onFilterChange = async () => {
//   showLoadingSpinner();
//
//   const searchText = searchBlog.value.trim();
//   const selectedTypes = filterByTypeMultiSelect.getSelects();
//   const selectedTags = filterByTagMultiSelect.getSelects();
//   const selectedRatings = filterByRatingMultiSelect.getSelects();
//
//   const selectedFilters = [].concat(selectedTypes, selectedTags, selectedRatings);
//   if (searchText.length > 0 || selectedFilters.length > 0) {
//     // Fetch both in parallel
//     const blogPostsPromise = getAllBlogPosts();
//     const blogPostsMatchingSearchPromise = searchBlogForText(searchText);
//
//     const blogPosts = await blogPostsPromise;
//     const blogPostsMatchingSearch = await blogPostsMatchingSearchPromise;
//
//     filterBlogPosts(blogPosts, blogPostsMatchingSearch, searchText, selectedTypes, selectedTags, selectedRatings);
//   } else {
//     showDefaultBlogPosts();
//   }
//
//   updatePostCount();
//   updateUrlHash();
//
//   hideLoadingSpinner();
// };
//
// (async () => {
//   await enableFiltersAndSortFromUrlHash();
// })();
