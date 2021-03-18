import { CLASS_LIST } from './util/cssClasses.js';
import { delay, getData } from './util/util.js';
import { URL, KEYCODE } from './util/constants.js';

class SearchBar {
  constructor({ domElem, inputArea, suggestions, rollingKeywords }) {
    this.domElem = domElem;
    this.inputArea = inputArea;
    this.suggestions = suggestions;
    this.rollingKeywords = rollingKeywords;
  }

  registerEvent() {
    this.inputArea.addEventListener('focus', this._handleInputFocus.bind(this, CLASS_LIST));
    this.domElem.addEventListener('mouseleave', this._handleMouseleave.bind(this, CLASS_LIST));
  }

  _handleInputFocus({ HIDDEN }) {
    this.suggestions.classList.remove(HIDDEN);
    this.rollingKeywords.classList.add(HIDDEN);
  }

  _handleMouseleave({ HIDDEN }) {
    this.inputArea.blur();
    this.suggestions.classList.add(HIDDEN);
    if(this.inputArea.value === '') {
      this.rollingKeywords.classList.remove(HIDDEN);
    }
  }
}

class Rolling {
  static MAX_ITEM_COUNT = 10;

  constructor({ domElem, rollingData }) {
    this.domElem = domElem;
    this.rollingData = rollingData;
    this.initialY = 4;
    this.currItemIdx = 0;
    this.currY = this.initialY;
    this.heightOfOneItem = 30;
    this.init();
  }

  render() {
    let renderingValue = this.rollingData.map((keyword, idx) => `<li><span class="num-rank">${idx + 1}</span>${keyword}</li>`).join('');
    renderingValue += `<li><span class="num-rank">1</span>${this.rollingData[0]}</li>`
    this.domElem.innerHTML = renderingValue;
  }

  async roll() {
    // 👇 나중에 timeout을 정지시켜야 할 일이 있어서 setTimeout 남겨둠
    // await delay(2000);
    // const rollngTimeoutId = setTimeout(() => {
    //   this.setAnimation();
    //   this.currItemIdx++;
    //   if(this.currItemIdx === 11) {
    //     this.resetStates();
    //   }
    //   this.roll()
    // }, 1000);

    // 👇 setTimeout을 delay로 바꾼 버전
    await delay(3000);
    this.setAnimation();
    this.currItemIdx++;
    if(this.currItemIdx === Rolling.MAX_ITEM_COUNT + 1) {
      this.resetStates();
    }
    this.roll();
  }

  setAnimation() {
    this.domElem.style.transform = `translateY(${this.currY - this.heightOfOneItem}px)`;
    this.domElem.style.transition = 'all 0.5s'
    this.currY -= this.heightOfOneItem;
  }

  resetStates() {
    this.currY = this.initialY;
    this.domElem.style.transform = '';
    this.domElem.style.transition = '';
    this.currItemIdx = 0;
  }

  init() {
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