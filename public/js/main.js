import { _ } from './util/util.js';
import { $search, $rollingKeywords, $recommendedKeyword } from './util/ref.js';
import { URL, KEYCODE } from './util/data.js';
import { renderRecommendedKeywords } from './search/rolling.js';
const { log } = console;

$search.addEventListener('input', () => {
  const searchInput = $search.value;
  fetch(URL.autoComplete(searchInput))
    .then(res => res.json())
    .then(jsonData => jsonData.suggestions.map(v => v.value))
    .then(console.log);
})

renderRecommendedKeywords();