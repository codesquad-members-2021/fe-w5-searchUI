import { makeRecommendItem, ol } from '../util/htmlTemplate';
import { createDom } from '../util/util';

function SearchTab({ data, selector }) {
  this.recommendData = data;
  this.searchTab = selector.searchTab;
  this.searchTabContainer = selector.searchTabContainer;
  this.searchInput = selector.searchInput;
  this.rollingContainer = selector.rollingContainer;
}

SearchTab.prototype = {
  constrctor: SearchTab,
  init() {
    this.registerEvent();
    this.renderSearchTab();
  },
  registerEvent() {
    this.searchInput.addEventListener('input', this.handleInput.bind(this));
  },
  handleInput({ target: { value } }) {},

  getRecommendHTML() {
    let firstList = this.recommendData
      .slice(0, this.recommendData.length / 2)
      .reduce((acc, data, idx) => acc + makeRecommendItem(idx + 1, data), '');
    let secondList = this.recommendData
      .slice(this.recommendData.length / 2)
      .reduce((acc, data, idx) => acc + makeRecommendItem(idx + 1, data), '');
    const recommendHTML =
      createDom('ol')({ value: firstList, classes: ['search-tab__list'] }) +
      createDom('ol')({ value: secondList, classes: ['search-tab__list'] });
    return recommendHTML;
  },
  renderSearchTab() {
    this.searchTab.innerHTML = this.getRecommendHTML();
  },
};

export default SearchTab;
