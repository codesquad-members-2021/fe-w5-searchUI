import { CLASS_LIST } from './util/cssClasses.js';
import { delay, getData } from './util/util.js';
import { URL, KEYCODE } from './util/constants.js';
import { parseAutoCompleteList } from './util/parser.js';

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
  constructor({ domElem, rollingKeywords, searchSuggestions }) {
    this.domElem = domElem;
    this.rollingKeywords = rollingKeywords;
    this.searchSuggestions = searchSuggestions;
    this.selectedItemIdx = null;
  }

  registerEvent() {
    this.domElem.addEventListener('input', async () => {
      const searchInput = this.domElem.value;
      const { HIDDEN } = CLASS_LIST;

      if(searchInput === '') {
        // 인기검색어를 다시 불러와서 화면에 넣어줘야 함..
        // 구조를 뜯어 고쳐야 할 것 같은 느낌..
      }

      this.rollingKeywords.classList.add(HIDDEN);
      this.searchSuggestions.classList.remove(HIDDEN);
      
      const { suggestions: suggestionListInfo } = await getData(URL.autoComplete(searchInput));
      const autoCompleteList = parseAutoCompleteList(suggestionListInfo);

      const renderedValue = autoCompleteList.map(keyword => `<li class="suggestion">${keyword}</li>`).join('');
      this.searchSuggestions.innerHTML = renderedValue;
    })

    this.domElem.addEventListener('keydown', ({ keyCode }) => {
      const autoCompleteItems = this.searchSuggestions.children;
      const ITEMS_COUNT = autoCompleteItems.length;
      const { HIDDEN } = CLASS_LIST;

      if(keyCode === KEYCODE.DOWN) {
        if(this.selectedItemIdx === null) {
          this.selectedItemIdx = 0
          autoCompleteItems[this.selectedItemIdx].classList.add('suggestion-selected');
          this.selectedItemIdx++;
          return;
        }
        if(this.selectedItemIdx >= ITEMS_COUNT) {
          autoCompleteItems[this.selectedItemIdx - 1].classList.remove('suggestion-selected');
          this.selectedItemIdx = null;
        }
        if(this.selectedItemIdx) {
          autoCompleteItems[this.selectedItemIdx - 1].classList.remove('suggestion-selected');
          autoCompleteItems[this.selectedItemIdx].classList.add('suggestion-selected');
          this.selectedItemIdx++;
        }
      }

      if(keyCode === KEYCODE.UP) {
        if(this.selectedItemIdx === null) this.searchSuggestions.classList.toggle(HIDDEN);
        if(this.selectedItemIdx === 0) {
          autoCompleteItems[this.selectedItemIdx].classList.remove('suggestion-selected');
          this.selectedItemIdx = null;
        }
        if(this.selectedItemIdx >= 1) {
          autoCompleteItems[this.selectedItemIdx].classList.remove('suggestion-selected');
          autoCompleteItems[this.selectedItemIdx - 1].classList.add('suggestion-selected');
          this.selectedItemIdx--;
        }
      }
    })
  }
}

export { SearchBar, Rolling, KeywordSuggestion, AutoComplete }