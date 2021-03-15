import { _, getData } from './util/util.js';
import { $searchBarInput, $rollingKeywords } from './util/ref.js';
import { SearchBar, RollingUI, KeywordSuggestion } from './searchBar.js';
import { URL, KEYCODE } from './util/data.js';
const { log } = console;

$searchBarInput.addEventListener('input', () => {
  const searchInput = $searchBarInput.value;
  fetch(URL.autoComplete(searchInput))
    .then(res => res.json())
    .then(jsonData => jsonData.suggestions.map(v => v.value))
    .then(console.log);
})

const searchBar = new SearchBar();
searchBar.registerEvent();

// ================================== ● rolling ● ==================================
const suggestionData = getData(URL.RECOMMEND);
const rolling = new RollingUI();


const keywordSuggestion = new KeywordSuggestion();
keywordSuggestion.render();