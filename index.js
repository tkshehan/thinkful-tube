$(startUp);

function startUp() {
  handleSearchForm();
}

function handleSearchForm() {
  $('.js-search-form').submit(function(event) {
    event.preventDefault();
    let searchTerm = $('#youtube-search').val();
    $('#youtube-seach').val('');

    getDataFromApi(searchTerm);
  });
}

function getDataFromApi(searchTerm) {
  const YOUTUBE_SEARCH_URL = 'https://www.googleapis.com/youtube/v3/search';

  let query = {
    key: 'AIzaSyCyzP05Kp56tTxNYzK_2zyey4Q2LwtkviY',
    q: searchTerm,
    part: 'snippet',
  };

  $.getJSON(YOUTUBE_SEARCH_URL, query, renderSearchResults);
}

function renderSearchResults(data) {
  let thumbnails = data.items.map(function(item) {
    return item.snippet.thumbnails.medium.url;
  });

  let html = thumbnails.map(function(url) {
    return `
    <div class="col-3">
      <img src="${url}" alt="Youtube Thumbnail">
    </div>
    `
  });

  $('.js-search-results').html(html);
}