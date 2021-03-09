import { makeRecommendItem, ol } from '../util/htmlTemplate';

class SearchTab {
  constructor({ data, selector }) {
    this.recommendData = data;
    this.searchTab = selector.searchTab;
    this.container = selector.container;
    this.searchInput = selector.searchInput;
  }
  init() {
    this.onEvent();
  }
  onEvent() {
    this.searchInput.addEventListener('click', this.handleClick.bind(this));
    this.searchInput.addEventListener('input', this.handleInput.bind(this));
  }
  handleClick({ target }) {
    console.log(target);
  }
  handleInput({ target: { value } }) {}

  getRecommendHTML() {
    let firstList = '';
    let secondeList = '';
    this.recommendData.forEach((v, idx) => {
      if (idx < this.recommendData.length / 2) firstList += makeRecommendItem(idx, v);
      else secondeList += makeRecommendItem(idx, v);
    });
    const recommendHTML =
      ol({ value: firstList, classes: ['search-tab__list'] }) +
      ol({ value: secondtList, classes: ['search-tab__list'] });
    return recommendHTML;
  }
  renderSearchTab() {
    this.searchTab.innerHTML = this.getRecommendHTML();
  }
}

export default SearchTab;
