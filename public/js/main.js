import { _, getData } from './util/util.js';
import { $searchBar, $searchBarInput, $searchSuggestions, $rollingKeywords } from './util/ref.js';
import { SearchBar, Rolling, KeywordSuggestion } from './searchBar.js';
import { URL, KEYCODE } from './util/data.js';
const { log } = console;

// auto-complete - 나중에 작업할 것
$searchBarInput.addEventListener('input', () => {
  const searchInput = $searchBarInput.value;
  fetch(URL.autoComplete(searchInput))
    .then(res => res.json())
    .then(jsonData => jsonData.suggestions.map(v => v.value))
    .then(console.log);
})

// ================================== ● rolling ● ==================================

const searchBar = new SearchBar({ ui: $searchBar, inputArea: $searchBarInput, suggestions: $searchSuggestions });
searchBar.registerEvent();

// ================================== ● rolling ● ==================================

const suggestionData = getData(URL.RECOMMEND);
const rolling = new Rolling({ list: $rollingKeywords });

// ============================= ● keyword suggestion ● =============================

const keywordSuggestion = new KeywordSuggestion({ ui: $searchSuggestions});
keywordSuggestion.render();