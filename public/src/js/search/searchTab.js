import { CLASS_LIST, URL, KEYCODE } from '../util/data';
import { li, makeAutoCompleteItem, makeRecommendItem, ul } from '../util/htmlTemplate';
import { autoCompleteParser } from '../util/parser';
import { getData, _ } from '../util/util';

function SearchTab({ data, selector }) {
  this.recommendData = data;
  this.searchTab = selector.searchTab;
  this.searchInput = selector.searchInput;
  this.searchTabTitle = selector.searchTabTitle;
  this.currentIdx = 0;
  this.orginInput;
  this.autoCompleteData;
}

SearchTab.prototype = {
  constructor: SearchTab,
  init() {
    this.registerEvent();
    this.renderSearchTab();
  },
  registerEvent() {
    this.searchInput.addEventListener('input', this.handleInput.bind(this));
    this.searchInput.addEventListener('keydown', this.handleKeydown.bind(this));
  },
  async handleInput({ target: { value } }) {
    this.currentIdx = 0;
    this.orginInput = value;
    const autoCompleteData = await getData(URL.autoComplete(value));
    this.autoCompleteData = autoCompleteParser(autoCompleteData);
    if (!this.autoCompleteData.length) this.renderSearchTab();
    else this.renderAutoComplete(value, this.autoCompleteData);
  },
  handleKeydown({ keyCode }) {
    if (keyCode === KEYCODE.UP) {
      this.moveUpList();
    } else if (keyCode === KEYCODE.DOWN) {
      this.moveDownList();
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
  renderAutoComplete(inputValue) {
    this.hiddenTitle();
    this.searchTab.innerHTML = this.getAutoCompleteHTML(inputValue, this.autoCompleteData);
  },
  showTitle() {
    this.searchTabTitle.classList.remove(CLASS_LIST.HIDDEN);
  },
  hiddenTitle() {
    this.searchTabTitle.classList.add(CLASS_LIST.HIDDEN);
  },
  moveUpList() {
    if (this.currentIdx - 1 < 0) {
      this.backUpInputValue();
      return;
    }
    this.searchInput.value = this.autoCompleteData[this.currentIdx];
    this.currentIdx--;
  },
  moveDownList() {
    if (this.currentIdx + 1 >= this.autoCompleteData.length) {
      this.backUpInputValue();
      return;
    }
    this.searchInput.value = this.autoCompleteData[this.currentIdx];
    this.currentIdx++;
  },
  backUpInputValue() {
    this.searchInput.value = this.orginInput;
    this.currentIdx = 0;
  },
};

export default SearchTab;
