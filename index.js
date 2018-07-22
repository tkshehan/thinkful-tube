$(startUp);

const YOUTUBE_SEARCH_URL = 'https://www.googleapis.com/youtube/v3/search';
let searchTerm;
let nextPageToken;

function startUp() {
  handleSearchForm();
  handleMoreButton();
}

function handleSearchForm() {
  $('.js-search-form').submit(function(event) {
    event.preventDefault();
    searchTerm = $('#youtube-search').val();
    $('#youtube-search').val('');

    getDataFromApi(searchTerm);
  });
}

function handleMoreButton() {
  $('.js-more-button').on('click', 'button', function() {
    moreDataFromApi(searchTerm);
  });
}

function getDataFromApi(searchTerm) {
  let query = {
    key: 'AIzaSyB7FPnZtg6Wo-KPKcxgAcoeQ3HJAfp-r7w',
    q: searchTerm,
    part: 'snippet',
    type: 'video',
    maxResults: 8,
  };

  $.getJSON(YOUTUBE_SEARCH_URL, query, renderSearchResults);
}

function moreDataFromApi(searchTerm) {
  let query = {
    key: 'AIzaSyB7FPnZtg6Wo-KPKcxgAcoeQ3HJAfp-r7w',
    q: searchTerm,
    part: 'snippet',
    type: 'video',
    maxResults: 8,
    pageToken: nextPageToken,
  };

  $.getJSON(YOUTUBE_SEARCH_URL, query, renderMoreResults);
}

function renderSearchResults(data) {
  nextPageToken = data.nextPageToken;
  let totalResults = data.pageInfo.totalResults;
  let html = buildHtmlFromData(data);

  $('.js-search-results').html(`
    <div> <h2> Results: ${totalResults} </h2> </div>
  `);
  $('.js-search-results').append(html);
  $('.js-more-button').html('<button>More</button>')
}

function renderMoreResults(data) {
  nextPageToken = data.nextPageToken;
  let html = buildHtmlFromData(data);

  $('.js-search-results').append(html);
}

function buildHtmlFromData(data) {
  let items = data.items.map(function(item) {
    return {
      url: item.snippet.thumbnails.medium.url,
      title: item.snippet.title,
      id: item.id.videoId,
    }
  });

  let html = items.map(function(item) {
    return `
    <div class="col-3">
      <a href="https://www.youtube.com/watch?v=${item.id}">
        <img src="${item.url}" alt="Youtube Video ${item.title}">
      </a>
    </div>
    `
  });

  return html;
}