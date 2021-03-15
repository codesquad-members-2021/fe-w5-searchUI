import { URL } from './util/data.js';
import { $searchBar, $searchBarInput, $searchSuggestions, $rollingKeywords } from './util/ref.js';
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
    // constructor에서는 직접적으로 async, await 사용이 불가능하니,
    // constructor에서 init 함수를 호출하고,
    // init 함수에서 변수를 정의해주자.
    this.rollingListUI = $rollingKeywords;
    this.init();
  }

  async getKeywords() {
    const recommendedKeywords = await fetch(URL.RECOMMEND)
      .then(res => res.json())
      .then(jsonData => jsonData.list.map(v => v.keyword));
    return recommendedKeywords
  }

  render() {
    const renderingValue = this.keywords.reduce((prev, curr, idx) => {
      return prev + `<li><span class="num-rank">${idx + 1}</span>${this.keywords[idx]}</li>`
    }, '')
    this.rollingListUI.innerHTML = renderingValue;
  }

  async init(){
    this.keywords = await this.getKeywords();
    this.render();
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
    $searchSuggestions.innerHTML = renderedValue + '</ol>';
  }
}

const init = () => {
  const searchBar = new SearchBar();
  searchBar.registerEvent();

  const rolling = new RollingUI();
  // rolling.render();

  const keywordSuggestion = new KeywordSuggestion();
  keywordSuggestion.render();
}

export default init