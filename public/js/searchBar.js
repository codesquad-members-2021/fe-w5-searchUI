import { URL } from './util/data.js';
import { $searchBar, $searchBarInput, $searchSuggestions, $rollingKeywords } from './util/ref.js';
import { CLASS_LIST } from './util/cssClasses.js';
import { delay } from './util/util.js';

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
    this.rollingListUI.innerHTML = renderingValue;
  }

  async roll() {
    await delay('', 1000);
    const rollngTimeoutId = setTimeout(() => {
      this.setRollingAnimation();
      this.currItemIdx++;
      if(this.currItemIdx === 11) {
        this.currY = 4;
        this.rollingListUI.style.transform = '';
        this.rollingListUI.style.transition = '';
        this.currItemIdx = 0;
      }
      this.roll()
    }, 1000);
  }

  setRollingAnimation() {
    this.rollingListUI.style.transform = `translateY(${this.currY - this.heightOfOneItem}px)`;
    this.rollingListUI.style.transition = 'all 1s'
    this.currY -= this.heightOfOneItem;
    console.log('애니메이션!');
  }

  async init(){
    this.keywords = await this.getKeywords();
    this.render();
    this.roll();
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

export { SearchBar, RollingUI, KeywordSuggestion }