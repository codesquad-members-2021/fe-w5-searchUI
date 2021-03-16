import { CLASS_LIST } from './util/cssClasses.js';
import { delay } from './util/util.js';

class SearchBar {
  constructor({ ui, inputArea, suggestions }) {
    this.ui = ui;
    this.inputArea = inputArea;
    this.suggestions = suggestions;
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

export { SearchBar, Rolling, KeywordSuggestion }