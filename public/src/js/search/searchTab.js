import { URL } from '../util/data';
import { makeRecommendItem, ol } from '../util/htmlTemplate';
import { autoCompleteParser } from '../util/parser';
import { createDom, getData } from '../util/util';

function SearchTab({ data, selector }) {
  this.recommendData = data;
  this.searchTab = selector.searchTab;
  this.searchTabContainer = selector.searchTabContainer;
  this.searchInput = selector.searchInput;
  this.rollingContainer = selector.rollingContainer;
}

SearchTab.prototype = {
  constructor: SearchTab,
  init() {
    this.registerEvent();
    this.renderSearchTab();
  },
  registerEvent() {
    this.searchInput.addEventListener('input', this.handleInput.bind(this));
  },
  async handleInput({ target: { value } }) {
    if (!value) this.renderSearchTab();
    else {
      const autoCompleteData = await getData(URL.autoComplete(value));
      const parsedAutoComData = autoCompleteParser(autoCompleteData);
      this.renderAutoComplete(parsedAutoComData);
    }
  },

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
  getAutoCompleteHTML(data) {
    createDom('ul')({ value, classes });
  },
  renderAutoComplete(parsedAutoComData) {
    this.searchTab.innerHTML = this.getAutoCompleteHTML(parsedAutoComData);
  },
};

export default SearchTab;
