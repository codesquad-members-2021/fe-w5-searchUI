import { CLASS_LIST } from './util/cssClasses.js';
import { delay } from './util/util.js';
import { URL, KEYCODE } from './util/data.js';

class SearchBar {
  constructor({ domElem, inputArea, suggestions, rollingKeywords }) {
    this.domElem = domElem;
    this.inputArea = inputArea;
    this.suggestions = suggestions;
    this.rollingKeywords = rollingKeywords;
  }

  registerEvent() {
    const { HIDDEN } = CLASS_LIST;

    this.inputArea.addEventListener('focus', () => {
      this.suggestions.classList.remove(HIDDEN);
      this.rollingKeywords.classList.add(HIDDEN);
    })

    this.domElem.addEventListener('mouseleave', () => {
      if(this.inputArea.value === '') {
        this.inputArea.blur();
        this.suggestions.classList.add(HIDDEN);
        this.rollingKeywords.classList.remove(HIDDEN);
      }
      if(this.inputArea.value) {
        this.inputArea.blur();
        this.suggestions.classList.add(HIDDEN);
      }
    });
  }
}

class Rolling {
  constructor({ domElem, rollingData }) {
    this.domElem = domElem;
    this.rollingData = rollingData;
    this.currItemIdx = 0;
    this.currY = 4;
    this.heightOfOneItem = 30;
    this.init();
  }

  render() {
    let renderingValue = this.rollingData.reduce((prev, curr, idx) => {
      return prev + `<li><span class="num-rank">${idx + 1}</span>${this.rollingData[idx]}</li>`
    }, '')
    renderingValue += `<li><span class="num-rank">1</span>${this.rollingData[0]}</li>`
    this.domElem.innerHTML = renderingValue;
  }

  async roll() {
    await delay('', 2000);
    const rollngTimeoutId = setTimeout(() => {
      this.setAnimation();
      this.currItemIdx++;
      if(this.currItemIdx === 11) {
        this.resetStates();
      }
      this.roll()
    }, 1000);
  }

  setAnimation() {
    this.domElem.style.transform = `translateY(${this.currY - this.heightOfOneItem}px)`;
    this.domElem.style.transition = 'all 0.5s'
    this.currY -= this.heightOfOneItem;
  }

  resetStates() {
    this.currY = 4;
    this.domElem.style.transform = '';
    this.domElem.style.transition = '';
    this.currItemIdx = 0;
  }

  async init(){
    this.render();
    this.roll();
  }
}

class KeywordSuggestion {
  constructor({ domElem, suggestionData }) {
    this.domElem = domElem;
    this.suggestionData = suggestionData;
  }

  getSuggestionHtml() {
    let suggestionHtml = this.suggestionData.map((keyword, idx) => `<li><span class="num-rank">${idx + 1}</span>${keyword}</li>`).join('');
    suggestionHtml = `
      <div class="suggestion-title">인기 쇼핑 키워드</div>
      <ol class="suggestion-keywords">${suggestionHtml}</ol>
    `;
    return suggestionHtml;
  }

  render() {
    const renderedValue = this.getSuggestionHtml();
    this.domElem.innerHTML = renderedValue;
  }
}

class AutoComplete {
  constructor({ domElem, rollingKeywords }) {
    this.domElem = domElem;
    this.rollingKeywords = rollingKeywords;
  }

  registerEvent() {
    this.domElem.addEventListener('input', () => {
      const { HIDDEN } = CLASS_LIST;
      this.rollingKeywords.classList.add(HIDDEN);
      
      const searchInput = this.domElem.value;
      fetch(URL.autoComplete(searchInput))
        .then(res => res.json())
        .then(jsonData => jsonData.suggestions.map(v => v.value))
        .then(console.log);
    })
  }
}

export { SearchBar, Rolling, KeywordSuggestion, AutoComplete }