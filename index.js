$(startUp);

function startUp() {
  handleSearchForm();
}

function handleSearchForm() {
  $('.js-search-form').submit(function(event) {
    event.preventDefault();
    let searchTerm = $('#youtube-search').val();
    $('#youtube-search').val('');

    getDataFromApi(searchTerm);
  });
}

function getDataFromApi(searchTerm) {
  const YOUTUBE_SEARCH_URL = 'https://www.googleapis.com/youtube/v3/search';

  let query = {
    key: 'AIzaSyCyzP05Kp56tTxNYzK_2zyey4Q2LwtkviY',
    q: searchTerm,
    part: 'snippet',
    type: 'video',
    maxResults: 8,
  };

  $.getJSON(YOUTUBE_SEARCH_URL, query, renderSearchResults);
}

function renderSearchResults(data) {
  let items = data.items.map(function(item) {
    return {
      url: item.snippet.thumbnails.medium.url,
      id: item.id.videoId,
    }
  });

  let html = items.map(function(item) {
    return `
    <div class="col-3">
      <a href="https://www.youtube.com/watch?v=${item.id}">
        <img src="${item.url}" alt="Youtube Thumbnail">
      </a>
    </div>
    `
  });

  $('.js-search-results').html(html);
}