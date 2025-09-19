const { liteClient: algoliasearch } = window['algoliasearch/lite'];
const instantsearch = window['instantsearch'];

const algoliaApplicationId = document.querySelector('meta[name="algolia_application_id"]').content;
const algoliaSearchApiKey = document.querySelector('meta[name="algolia_search_api_key"]').content;
const algoliaSearchIndex = document.querySelector('meta[name="algolia_search_index"]').content;

const blogPostsContainer = document.getElementById('blog-posts-container');
const blogPostTemplate = blogPostsContainer.children[0].cloneNode(true);
const searchBlog = document.getElementById('search-blog');
const blogPostCount = document.getElementById('blog-post-count');
const pagination = document.getElementById('blog-pagination');

const originalBlogPosts = Array.from(blogPostsContainer.children).map(node => node.cloneNode(true));
const originalCount = blogPostCount.innerText;
const originalPagination = Array.from(pagination.children).map(node => node.cloneNode(true));

const renderHitAsBlogPost = (hit) => {
  const blogPost = blogPostTemplate.cloneNode(true);

  Array.from(blogPost.querySelectorAll('.post-link')).forEach(link => {
    link.href = hit.url;
  });

  if (hit.image) {
    let blogImage = blogPost.querySelector('.post-image');
    if (!blogImage) {
      blogImage = document.createElement('img');
      blogPost.querySelector('.post-image-container').appendChild(blogImage);
      blogPost.querySelector('.post-no-image').classList.add('display-none');
    }
    blogImage.dataset.src = hit.image;
    blogImage.setAttribute('alt', hit.title);
  } else {
    blogPost.querySelector('.post-no-image').classList.remove('display-none');
  }

  blogPost.querySelector('.post-title').innerHTML = hit._highlightResult.title.value;
  blogPost.querySelector('.post-excerpt').innerHTML =
    hit._highlightResult.description.matchLevel === 'none' && hit._highlightResult.text.matchLevel !== 'none'
      ? hit._highlightResult.text.value
      : hit._highlightResult.description.value;

  const postDate = blogPost.querySelector('.post-date');
  postDate.dateTime = hit.date;
  postDate.textContent = new Date(Date.parse(hit.date)).toLocaleDateString("en-US", {year: 'numeric', month: 'long', day: 'numeric'});

  const postComments = blogPost.querySelector('.post-comments');
  postComments.href = `${hit.url}#comments`;
  postComments.dataset.disqusIdentifier = hit.id;

  const postTags = blogPost.querySelector('.post-tags');
  const tagLinks = hit.Tags.map(tag => `<a href="#TODO">${tag}</a>`); // TODO: figure out tag URL
  postTags.innerHTML = tagLinks.join(', ');

  return blogPost.outerHTML;
};

const hideOriginalBlogPosts = () => {
  blogPostsContainer.replaceChildren();
  blogPostCount.innerText = '';
  pagination.replaceChildren();
};

const showOriginalBlogPosts = () => {
  blogPostsContainer.replaceChildren(...originalBlogPosts);
  blogPostCount.innerText = originalCount;
  pagination.replaceChildren(...originalPagination);
};

const renderHits = ({items, widgetParams}, isFirstRender) => {
  widgetParams.container.innerHTML = items.map(item => renderHitAsBlogPost(item)).join('\n');
};

const customHits = instantsearch.connectors.connectHits(renderHits);

const searchClient = algoliasearch(algoliaApplicationId, algoliaSearchApiKey);

const search = instantsearch({
  indexName: algoliaSearchIndex,
  searchClient,
  future: { preserveSharedStateOnUnmount: true },
  searchFunction: (helper) => {
    if (helper.state.query.trim() === '') {
      showOriginalBlogPosts();
    } else {
      hideOriginalBlogPosts();
      helper.search();
    }
  }
});

search.addWidgets([
  instantsearch.widgets.searchBox({
    container: searchBlog,
    placeholder: 'Search...',
    searchAsYouType: true,
    showReset: true,
    showSubmit: false,
    showLoadingIndicator: true
  }),
  customHits({
    container: blogPostsContainer,
    cssClasses: {
      emptyRoot: 'center mt4',
    },
    templates: {
      item: renderHitAsBlogPost,
      empty: (results, {html}) => {
        return html`No results match your search or filters.`;
      }
    }
  }),
  instantsearch.widgets.stats({
    container: blogPostCount,
    cssClasses: {
      root: 'inline'
    },
    templates: {
      text: (data, {html}) => {
        return html`<span>${data.nbHits}</span>`;
      }
    }
  }),
  instantsearch.widgets.pagination({
    container: pagination,
  })
]);

search.start();

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
