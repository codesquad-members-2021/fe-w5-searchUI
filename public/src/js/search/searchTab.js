import { makeRecommendItem, ol } from '../util/htmlTemplate';

class SearchTab {
  constructor({ data, selector }) {
    this.recommendData = data;
    this.searchTab = selector.searchTab;
    this.searchTabContainer = selector.searchTabContainer;
    this.searchInput = selector.searchInput;
  }
  init() {
    this.onEvent();
  }
  onEvent() {
    this.searchInput.addEventListener('click', this.handleClick.bind(this));
    this.searchInput.addEventListener('input', this.handleInput.bind(this));
  }
  handleClick({ target: { value } }) {
    if (!value) this.renderSearchTab();
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
      ol({ value: firstList, classes: ['search-tab__list'] }) +
      ol({ value: secondList, classes: ['search-tab__list'] });
    return recommendHTML;
  }
  renderSearchTab() {
    this.searchTab.innerHTML = this.getRecommendHTML();
    if (this.searchTabContainer.classList.contains('hidden')) {
      this.searchTabContainer.classList.remove('hidden');
    }
  }
}

export default SearchTab;
