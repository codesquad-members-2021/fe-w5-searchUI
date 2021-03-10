import { CLASS_LIST } from '../util/data';
import { makeRecommendItem, ol } from '../util/htmlTemplate';
import { createDom } from '../util/util';

class SearchTab {
  constructor({ data, selector }) {
    this.recommendData = data;
    this.searchTab = selector.searchTab;
    this.searchTabContainer = selector.searchTabContainer;
    this.searchInput = selector.searchInput;
    this.rollingContainer = selector.rollingContainer;
  }
  init() {
    this.onEvent();
  }
  onEvent() {
    this.searchInput.addEventListener('click', this.handleClick.bind(this));
    this.searchInput.addEventListener('input', this.handleInput.bind(this));
  }
  handleClick({ target: { value } }) {
    if (value) return;
    this.renderSearchTab();
  }
  handleInput({ target: { value } }) {}

  getRecommendHTML() {
    let firstList = '';
    let secondList = '';
    this.recommendData.forEach((v, idx) => {
      if (idx < this.recommendData.length / 2) firstList += makeRecommendItem(idx + 1, v);
      else secondList += makeRecommendItem(idx + 1, v);
    });
    const recommendHTML =
      createDom('ol')({ value: firstList, classes: ['search-tab__list'] }) +
      createDom('ol')({ value: secondList, classes: ['search-tab__list'] });
    return recommendHTML;
  }
  renderSearchTab() {
    this.searchTab.innerHTML = this.getRecommendHTML();
  }
}

export default SearchTab;
