import '@babel/polyfill';
import { delay } from './util';

const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

class RollingKeywords {
  constructor(data) {
    this.data = data;
    this.lists = $('.list_rollkeywords');
    this.searchBar = $('.search-bar');
    this.keyword = $$('.list_keyword');
    this.rankNumber = 1;
    this.input = $('.search-bar--keyword');
    this.suggestion = $('.wrap_suggestion');
    this.mouseLeaveTimer;
    this.rollingTimer;
  }

  addEvent() {
    this.searchBar.addEventListener('click', this.openSuggestionBox.bind(this));
    this.searchBar.addEventListener('mouseover', this.mouseLeaveTimerCleaner);
    this.searchBar.addEventListener('mouseleave', this.closeSuggestionBox);
    this.input.addEventListener('input', this.toggleKeywordBox.bind(this));
  }

  mouseLeaveTimerCleaner() {
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
      console.log(this.rollingTimer);
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
      let list = `<li><span class="num_rank">${numRank}</span>${cur.keyword}</li>`;
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
      let list = `
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

  // 1. 글자를 입력하기기 시작하면 suggestion이 사라진다.
  // 2. suggetion이 사라지면서 유사 검색어가 나타난다.
  //  2-1. 유사 검색어 data요청
  //  2-2. 돔 그리기 / data입력
  // 3. cursor를 위아래로 움직이면 css가 바뀐다.
  // 4. 1초 이상 아무 입력이 없으면 서버에서 데이터를 받아온다???
  // 추가미션. 최근 검색어 기능

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

  fetchSimilarword() {}

  getSimilarword() {}

  drawSimilarword() {}

  moveCursor() {}

  requestExtraData() {}
}

export { RollingKeywords };
