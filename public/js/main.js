import { _, getData } from './util/util.js';
import { $searchBar, $searchBarInput, $searchSuggestions, $rollingKeywords } from './util/ref.js';
import { SearchBar, Rolling, KeywordSuggestion } from './searchBar.js';
import { URL, KEYCODE } from './util/data.js';
import { parseRecommendedList } from './util/parser.js';
const { log } = console;

// auto-complete - 나중에 작업할 것
$searchBarInput.addEventListener('input', () => {
  const searchInput = $searchBarInput.value;
  fetch(URL.autoComplete(searchInput))
    .then(res => res.json())
    .then(jsonData => jsonData.suggestions.map(v => v.value))
    .then(console.log);
})

// search bar
const searchBarArgs = {
  domElem: $searchBar,
  inputArea: $searchBarInput,
  suggestions: $searchSuggestions
};
const searchBar = new SearchBar(searchBarArgs);
searchBar.registerEvent();

// rolling & search keyword suggestion
async function initSuggestion() {
  const recommendJsonData = await getData(URL.RECOMMEND);
  
  // rolling
  const { list: recommendListInfo } = recommendJsonData;
  const recommendList = parseRecommendedList(recommendListInfo); // 키워드만 뽑아서 10개로 자름
  const rollingArgs = {
    domElem: $rollingKeywords,
    rollingData: recommendList
  }
  const rolling = new Rolling(rollingArgs);
  
  // keyword suggestion
  const suggestionArgs = {
    domElem: $searchSuggestions,
    suggestionData: recommendList
  }
  const keywordSuggestion = new KeywordSuggestion(suggestionArgs);
  keywordSuggestion.render();
}

initSuggestion();
