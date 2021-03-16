import { URL } from './util/data.js';
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
  constructor({ list }) {
    this.list = list;
    this.currItemIdx = 0;
    this.currY = 4;
    this.heightOfOneItem = 30;
    this.init();
  }

  async getKeywords() {
    const recommendedKeywords = await fetch(URL.RECOMMEND)
      .then(res => res.json())
      .then(jsonData => jsonData.list.map(v => v.keyword).slice(0, 10));
    return recommendedKeywords
  }

  render() {
    let renderingValue = this.keywords.reduce((prev, curr, idx) => {
      return prev + `<li><span class="num-rank">${idx + 1}</span>${this.keywords[idx]}</li>`
    }, '')
    renderingValue += `<li><span class="num-rank">1</span>${this.keywords[0]}</li>`
    this.list.innerHTML = renderingValue;
  }

  async roll() {
    await delay('', 2000);
    const rollngTimeoutId = setTimeout(() => {
      this.setRollingAnimation();
      this.currItemIdx++;
      if(this.currItemIdx === 11) {
        this.currY = 4;
        this.list.style.transform = '';
        this.list.style.transition = '';
        this.currItemIdx = 0;
      }
      this.roll()
    }, 1000);
  }

  setRollingAnimation() {
    this.list.style.transform = `translateY(${this.currY - this.heightOfOneItem}px)`;
    this.list.style.transition = 'all 0.5s'
    this.currY -= this.heightOfOneItem;
  }

  async init(){
    this.keywords = await this.getKeywords();
    this.render();
    this.roll();
  }
}

class KeywordSuggestion {
  constructor({ ui }) {
    this.ui = ui
  }

  async render() {
    const recommendedKeywords = await fetch(URL.RECOMMEND)
      .then(res => res.json())
      .then(jsonData => jsonData.list.map(v => v.keyword));
  
    const renderedValue = recommendedKeywords.reduce((prev, curr, idx) => {
      return prev + `<li>${recommendedKeywords[idx]}</li>`
    }, '<ol>')
    this.ui.innerHTML = renderedValue + '</ol>';
  }
}

export { SearchBar, Rolling, KeywordSuggestion }