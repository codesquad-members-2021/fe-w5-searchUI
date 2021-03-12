import { _ } from './util/util.js';
import { $searchBarInput, $rollingKeywords, $recommendedKeyword } from './util/ref.js';
import { URL, KEYCODE } from './util/data.js';
import initSearchBar from './searchBar.js';
const { log } = console;

$searchBarInput.addEventListener('input', () => {
  const searchInput = $searchBarInput.value;
  fetch(URL.autoComplete(searchInput))
    .then(res => res.json())
    .then(jsonData => jsonData.suggestions.map(v => v.value))
    .then(console.log);
})

initSearchBar();