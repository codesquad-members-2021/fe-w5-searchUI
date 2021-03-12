import '@babel/polyfill';
import { delay } from './util';
import { _ } from './const';

export default class RollingKeywords {
  constructor(data) {
    this.data = data;
    this.lists = _.$('.list_rollkeywords');
    this.searchBar = _.$('.search-bar');
    this.keyword = _.$$('.list_keyword');
    this.rankNumber = 1;
    this.input = _.$('.search-bar--keyword');
    this.suggestion = _.$('.wrap_suggestion');
    this.mouseLeaveTimer;
    this.rollingTimer;
  }

  addEvent() {
    this.searchBar.addEventListener('click', this.openSuggestionBox.bind(this));
    this.searchBar.addEventListener('mouseover', this.clearMouseLeaveTimer);
    this.searchBar.addEventListener('mouseleave', this.closeSuggestionBox);
    this.input.addEventListener('input', this.toggleKeywordBox.bind(this));
  }

  clearMouseLeaveTimer() {
    clearTimeout(this.mouseLeaveTimer);
  }

  openSuggestionBox(e) {
    const currentDom = (event, className) => event.currentTarget.querySelector(className);
    const rollKeywords = currentDom(e, '.wrap_rollkeywords');
    const searchBox = currentDom(e, '.box_search');
    const suggestion = currentDom(e, '.wrap_suggestion');
    const input = currentDom(e, '#qTop');

    if (rollKeywords) {
      rollKeywords.style.display = 'none';
      searchBox.style.borderColor = '#f95139';
      suggestion.style.display = 'block';
      input.focus();
      clearInterval(this.rollingTimer);
      return;
    }
  }

  closeSuggestionBox(e) {
    const currentDom = (event, className) => event.currentTarget.querySelector(className);
    const rollKeywords = currentDom(e, '.wrap_rollkeywords');
    const searchBox = currentDom(e, '.box_search');
    const suggestion = currentDom(e, '.wrap_suggestion');
    const input = currentDom(e, '#qTop');

    this.mouseLeaveTimer = setTimeout(() => {
      if (input.value.length === 0) {
        rollKeywords.style.display = 'block';
      }
      searchBox.style.borderColor = '#cecfd1';
      suggestion.style.display = 'none';
      input.blur();
    }, 300);
    return;
  }

  drawRollingKeywords() {
    this.lists.insertAdjacentHTML('beforeend', this.getKeywordList());
  }

  getKeywordList() {
    let numRank = 1;
    const keywordList = this.data.list.reduce((acc, cur) => {
      const list = `<li><span class="num_rank">${numRank}</span>${cur.keyword}</li>`;
      acc += list;
      numRank++;
      return acc;
    }, ``);
    return keywordList;
  }

  drawSuggestionBox() {
    this.keyword[0].insertAdjacentHTML('afterbegin', this.getSuggestionBoxData(0, 5));
    this.keyword[1].insertAdjacentHTML('beforeend', this.getSuggestionBoxData(5, 10));
  }

  getSuggestionBoxData(start, last) {
    const ol = this.data.list.slice(start, last);
    const keywordList = ol.reduce((acc, cur) => {
      const list = `
      <li>
        <a href=${acc.imgurl} class="link_keyword _GC_" data-gg="{o1:1}"> <span class="num_rank">${this.rankNumber}</span>${cur.keyword} </a>
      </li>`;
      acc += list;
      this.rankNumber++;
      return acc;
    }, ``);
    return keywordList;
  }

  startRolling() {
    const ANIMATION_DURATION = 300;
    const ROLLING_INTERVAL = 3000;
    const rollingAnimation = (ms) =>
      // new Promise((resolve) =>
      setTimeout(() => {
        this.lists.insertBefore(this.lists.firstElementChild, null);
        this.lists.classList.replace('list_rollkeywords--rolling', 'list_rollkeywords');
      }, ms);
    // );

    this.rollingTimer = setInterval(() => {
      this.lists.classList.replace('list_rollkeywords', 'list_rollkeywords--rolling');
      rollingAnimation(ANIMATION_DURATION);
    }, ROLLING_INTERVAL);
  }

  hideSuggestKeyword() {
    this.suggestion.querySelector('.inner_suggestion').style.display = 'none';
    this.suggestion.querySelector('.group_suggestion').style.display = 'block';
  }

  hideSimilarKeyword() {
    this.suggestion.querySelector('.inner_suggestion').style.display = 'block';
    this.suggestion.querySelector('.group_suggestion').style.display = 'none';
  }

  async toggleKeywordBox() {
    const isValue = () => this.input.value.length > 0;
    await delay(300);
    if (isValue()) {
      return this.hideSuggestKeyword();
    }
    return this.hideSimilarKeyword();
  }

  moveCursor() {}

  requestExtraData() {}
}
