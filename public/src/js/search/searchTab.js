import { URL } from '../util/data';
import { li, makeRecommendItem, ol, recommendListTitle, ul } from '../util/htmlTemplate';
import { autoCompleteParser } from '../util/parser';
import { createDom, getData, _ } from '../util/util';

function SearchTab({ data, selector }) {
  this.recommendData = data;
  this.searchTab = selector.searchTab;
  this.searchInput = selector.searchInput;
  this.searchTabTitle = selector.searchTabTitle;
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
    if (!value) {
      this.renderSearchTab();
    } else {
      const autoCompleteData = await getData(URL.autoComplete(value));
      const parsedAutoCompleteData = autoCompleteParser(autoCompleteData);
      this.renderAutoComplete(parsedAutoCompleteData);
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
  getAutoCompleteHTML(data) {
    const autoCompleteList = data.reduce(
      (acc, keyword) => acc + li({ value: keyword, classes: ['auto-complete__item'] }),
      ''
    );
    const autoCompleteHTML = ul({ value: autoCompleteList, classes: ['auto-complete__list'] });
    return autoCompleteHTML;
  },
  renderSearchTab() {
    this.showTitle();
    this.searchTab.innerHTML = this.getRecommendHTML();
  },
  renderAutoComplete(parsedAutoCompleteData) {
    this.hiddenTitle();
    this.searchTab.innerHTML = this.getAutoCompleteHTML(parsedAutoCompleteData);
  },
  showTitle() {
    this.searchTabTitle.classList.remove('hidden');
  },
  hiddenTitle() {
    this.searchTabTitle.classList.add('hidden');
  },
};

export default SearchTab;
