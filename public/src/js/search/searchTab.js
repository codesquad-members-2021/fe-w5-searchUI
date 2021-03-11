import { CLASS_LIST, URL } from '../util/data';
import { li, makeAutoCompleteItem, makeRecommendItem, ul } from '../util/htmlTemplate';
import { autoCompleteParser } from '../util/parser';
import { getData, _ } from '../util/util';

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
      this.renderAutoComplete(value, parsedAutoCompleteData);
    }
  },

  getRecommendHTML() {
    const { SEARCH_TAB_LIST } = CLASS_LIST;
    const firstList = this.recommendData
      .slice(0, this.recommendData.length / 2)
      .reduce((acc, data, idx) => acc + makeRecommendItem(idx + 1, data), '');
    const secondList = this.recommendData
      .slice(this.recommendData.length / 2)
      .reduce((acc, data, idx) => acc + makeRecommendItem(idx + 1, data), '');
    const recommendHTML =
      ul({ value: firstList, classes: [SEARCH_TAB_LIST] }) + ul({ value: secondList, classes: [SEARCH_TAB_LIST] });
    return recommendHTML;
  },
  getAutoCompleteHTML(inputValue, data) {
    const { AUTOCOMPLETE_LIST } = CLASS_LIST;
    const autoCompleteList = data.reduce(
      (acc, autoData) => acc + makeAutoCompleteItem({ value: autoData, keyword: inputValue }),
      ''
    );
    const autoCompleteHTML = ul({ value: autoCompleteList, classes: [AUTOCOMPLETE_LIST] });
    return autoCompleteHTML;
  },
  renderSearchTab() {
    this.showTitle();
    this.searchTab.innerHTML = this.getRecommendHTML();
  },
  renderAutoComplete(inputValue, parsedAutoCompleteData) {
    this.hiddenTitle();
    this.searchTab.innerHTML = this.getAutoCompleteHTML(inputValue, parsedAutoCompleteData);
  },
  showTitle() {
    this.searchTabTitle.classList.remove(CLASS_LIST.HIDDEN);
  },
  hiddenTitle() {
    this.searchTabTitle.classList.add(CLASS_LIST.HIDDEN);
  },
};

export default SearchTab;
