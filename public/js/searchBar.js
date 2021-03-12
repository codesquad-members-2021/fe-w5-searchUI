import { URL } from './util/data.js';
import { $searchBar, $searchBarInput, $searchSuggestions, $rollingKeywords, $recommendedKeyword } from './util/ref.js';
import { CLASS_LIST } from './util/cssClasses.js';

class SearchBar {
  constructor() {
    this.ui = $searchBar;
    this.inputArea = $searchBarInput;
    this.suggestions = $searchSuggestions;
  }

  registerEvent() {
    const { HIDDEN } = CLASS_LIST;

    this.inputArea.addEventListener('focus', () => {
      this.suggestions.classList.remove(HIDDEN);
    })

    this.ui.addEventListener('mouseleave', () => {
      this.inputArea.blur();
      this.suggestions.classList.add(HIDDEN);
    });
  }
}

class RollingUI {
  constructor() {

  }

  render() {

  }
}

class KeywordSuggestion {
  constructor() {

  }

  async render() {
    const recommendedKeywords = await fetch(URL.RECOMMEND)
      .then(res => res.json())
      .then(jsonData => jsonData.list.map(v => v.keyword));
  
    const renderedValue = recommendedKeywords.reduce((prev, curr, idx) => {
      return prev + `<li>${recommendedKeywords[idx]}</li>`
    }, '<ol>')
    $recommendedKeyword.innerHTML = renderedValue + '</ol>';
  }
}

const init = () => {
  const searchBar = new SearchBar();
  searchBar.registerEvent();
  const keywordSuggestion = new KeywordSuggestion();
  keywordSuggestion.render();
}

export default init