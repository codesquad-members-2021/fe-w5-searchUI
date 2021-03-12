import { _ } from './util/util.js';
import { $search, $rollingKeywords, $recommendedKeyword } from './util/ref.js';
import { URL, KEYCODE } from './util/data.js';
const { log } = console;

$search.addEventListener('input', () => {
  const searchInput = $search.value;
  fetch(URL.autoComplete(searchInput))
    .then(res => res.json())
    .then(jsonData => jsonData.suggestions.map(v => v.value))
    .then(console.log);
})

const renderRecommendedKeywords = async () => {
  const recommendedKeywords = await fetch(URL.RECOMMEND)
    .then(res => res.json())
    .then(jsonData => jsonData.list.map(v => v.keyword));

  const renderedValue = recommendedKeywords.reduce((prev, curr, idx) => {
    return prev + `<li>${recommendedKeywords[idx]}</li>`
  }, '<ol>')
  $recommendedKeyword.innerHTML = renderedValue + '</ol>';
}

renderRecommendedKeywords();