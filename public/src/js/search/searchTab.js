import { CLASS_LIST, URL, KEYCODE } from '../util/data';
import { makeAutoCompleteItem, makeRecommendItem, ul } from '../util/htmlTemplate';
import { autoCompleteParser } from '../util/parser';
import { getData, _, debounce } from '../util/util';

const MAX_AUTOCOMPLETE = 10;
// 자동완성 기능에서 화살표를 사용해 움직일 때 input박스에 있는 상태는 index -1로 설정
const INITIAL_INDEX = -1;

function SearchTab({ data, selector }) {
  this.recommendData = data;
  this.searchTab = selector.searchTab;
  this.searchInput = selector.searchInput;
  this.searchTabTitle = selector.searchTabTitle;
  this.currentIdx = INITIAL_INDEX;
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
  handleInput({ target: { value } }) {
    debounce(this.render.bind(this, value), 1000);
  },
  handleKeydown({ keyCode }) {
    if (keyCode === KEYCODE.UP) this.moveUpList();
    else if (keyCode === KEYCODE.DOWN) this.moveDownList();
  },
  _isBetween(target, start, end) {
    return start <= target && target < end;
  },
  _makeRecommendListHTML(start, end) {
    const recommendListHTML = this.recommendData
      .map((item, idx) => (this._isBetween(idx, start, end) ? { idx: idx + 1, value: item } : ''))
      .map((value) => (value ? makeRecommendItem(value) : ''));

    return recommendListHTML.join('');
  },
  getRecommendHTML() {
    const { SEARCH_TAB_LIST } = CLASS_LIST;
    const dataLength = this.recommendData.length;
    const firstList = this._makeRecommendListHTML(0, dataLength / 2);
    const secondList = this._makeRecommendListHTML(dataLength / 2, dataLength);
    const recommendHTML =
      ul({ value: firstList, classes: [SEARCH_TAB_LIST] }) + ul({ value: secondList, classes: [SEARCH_TAB_LIST] });
    return recommendHTML;
  },
  getAutoCompleteHTML() {
    const { AUTOCOMPLETE_ITEM, AUTOCOMPLETE_LIST, CURRENT_VALUE } = CLASS_LIST;
    const autoCompleteList = this.autoCompleteData
      .map((item, idx) =>
        idx === this.currentIdx
          ? { value: item, keyword: this.orginInput, classArgs: [AUTOCOMPLETE_ITEM, CURRENT_VALUE] }
          : { value: item, keyword: this.orginInput }
      )
      .map((value) => makeAutoCompleteItem(value))
      .reduce((acc, cur) => acc + cur);

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
  async render(inputValue) {
    this.initAutoCompleteIdx();
    this.orginInput = inputValue;
    await this.setAutoCompleteData(inputValue);
    if (!this.autoCompleteData.length) this.renderSearchTab();
    else this.renderAutoComplete();
  },
  async setAutoCompleteData(inputValue) {
    const autoCompleteData = await getData(URL.autoComplete(inputValue));
    this.autoCompleteData = autoCompleteParser(autoCompleteData.suggestions).slice(0, MAX_AUTOCOMPLETE);
  },
  showTitle() {
    this.searchTabTitle.classList.remove(CLASS_LIST.HIDDEN);
  },
  hiddenTitle() {
    this.searchTabTitle.classList.add(CLASS_LIST.HIDDEN);
  },
  moveUpList() {
    if (this._isLastAutoCompleteIdx()) {
      this.backUpInputValue();
    } else {
      this.currentIdx--;
      this.searchInput.value = this.autoCompleteData[this.currentIdx];
    }
    this.renderAutoComplete();
  },
  moveDownList() {
    if (this._isLastAutoCompleteIdx()) {
      this.backUpInputValue();
    } else {
      this.currentIdx++;
      this.searchInput.value = this.autoCompleteData[this.currentIdx];
    }
    this.renderAutoComplete();
  },
  _isFirstAutoCompleteIdx() {
    this.currentIdx - 1 < 0;
  },
  _isLastAutoCompleteIdx() {
    return this.currentIdx + 1 >= this.autoCompleteData.length;
  },
  backUpInputValue() {
    this.searchInput.value = this.orginInput;
    this.initAutoCompleteIdx();
  },
  initAutoCompleteIdx() {
    this.currentIdx = INITIAL_INDEX;
  },
};

export default SearchTab;
