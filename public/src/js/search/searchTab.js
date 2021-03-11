import { CLASS_LIST, URL, KEYCODE } from '../util/data';
import { li, makeAutoCompleteItem, makeRecommendItem, ul } from '../util/htmlTemplate';
import { autoCompleteParser } from '../util/parser';
import { getData, _ } from '../util/util';

function SearchTab({ data, selector }) {
  this.recommendData = data;
  this.searchTab = selector.searchTab;
  this.searchInput = selector.searchInput;
  this.searchTabTitle = selector.searchTabTitle;
  this.currentIdx = -1;
  this.orginInput;
  this.autoCompleteData;
  this.timer;
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
  handleInput({ target: { value } }) {
    if (this.timer) clearTimeout(this.timer);

    this.currentIdx = -1;
    this.orginInput = value;
    this.timer = setTimeout(async () => {
      const autoCompleteData = await getData(URL.autoComplete(value));
      this.autoCompleteData = autoCompleteParser(autoCompleteData);
      if (!this.autoCompleteData.length) this.renderSearchTab();
      else this.renderAutoComplete();
    }, 1000);
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
  getAutoCompleteHTML() {
    const { AUTOCOMPLETE_LIST } = CLASS_LIST;
    const autoCompleteList = this.autoCompleteData.reduce((acc, autoData, idx) => {
      if (idx === this.currentIdx)
        return acc + makeAutoCompleteItem({ value: autoData, keyword: this.orginInput, isCurrentValue: true });
      else return acc + makeAutoCompleteItem({ value: autoData, keyword: this.orginInput });
    }, '');
    const autoCompleteHTML = ul({ value: autoCompleteList, classes: [AUTOCOMPLETE_LIST] });
    return autoCompleteHTML;
  },
  renderSearchTab() {
    this.showTitle();
    this.searchTab.innerHTML = this.getRecommendHTML();
  },
  renderAutoComplete() {
    this.hiddenTitle();
    this.searchTab.innerHTML = this.getAutoCompleteHTML();
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
    } else {
      this.currentIdx--;
      this.searchInput.value = this.autoCompleteData[this.currentIdx];
    }
    this.renderAutoComplete();
  },
  moveDownList() {
    if (this.currentIdx + 1 >= this.autoCompleteData.length) {
      this.backUpInputValue();
    } else {
      this.currentIdx++;
      this.searchInput.value = this.autoCompleteData[this.currentIdx];
    }
    this.renderAutoComplete();
  },
  backUpInputValue() {
    this.searchInput.value = this.orginInput;
    this.currentIdx = -1;
  },
};

export default SearchTab;
