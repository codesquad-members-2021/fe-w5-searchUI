const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

class RollingKeywords {
  constructor(data) {
    this.data = data;
    this.lists = $('.list_rollkeywords');
    this.searchBar = $('.search-bar');
    this.keyword = $$('.list_keyword');
    this.rankNumber = 1;
    this.timer;
  }

  addEvent() {
    this.searchBar.addEventListener('click', this.openSuggestionBox);
    this.searchBar.addEventListener('mouseover', this.timerCleaner);
    this.searchBar.addEventListener('mouseleave', this.closeSuggestionBox);
  }

  timerCleaner() {
    clearTimeout(this.timer);
  }

  openSuggestionBox(e) {
    const currentDom = (event, className) => event.currentTarget.querySelector(className);
    const rollKeywords = currentDom(e, '.wrap_rollkeywords');
    const searchBox = currentDom(e, '.box_search');
    const suggestion = currentDom(e, '.wrap_suggestion');

    if (rollKeywords) {
      rollKeywords.style.display = 'none';
      searchBox.style.borderColor = '#f95139';
      suggestion.style.display = 'block';
      return;
    }
  }

  closeSuggestionBox(e) {
    const currentDom = (event, className) => event.currentTarget.querySelector(className);
    const rollKeywords = currentDom(e, '.wrap_rollkeywords');
    const searchBox = currentDom(e, '.box_search');
    const suggestion = currentDom(e, '.wrap_suggestion');

    this.timer = setTimeout(() => {
      rollKeywords.style.display = 'block';
      searchBox.style.borderColor = '#cecfd1';
      suggestion.style.display = 'none';
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
    this.keyword[0].insertAdjacentHTML('afterbegin', this.getSuggestionBoxData(0, 5))
    this.keyword[1].insertAdjacentHTML('beforeend', this.getSuggestionBoxData(5, 10))
  }

  getSuggestionBoxData(start, last) {
    const ol = this.data.list.slice(start, last)
    console.log(ol)
    const keywordList = ol.reduce((acc, cur) => {
      let list = `
      <li>
        <a href=${acc.imgurl} class="link_keyword _GC_" data-gg="{o1:1}"> <span class="num_rank">${this.rankNumber}</span>${cur.keyword} </a>
      </li>`
      acc += list;
      this.rankNumber++;
      return acc
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
    // addEventListner('transitionend', cb) from dd
    // setInterval -> delay -> rolling
    setInterval(() => {
      this.lists.classList.replace('list_rollkeywords', 'list_rollkeywords--rolling');
      rollingAnimation(ANIMATION_DURATION);
    }, ROLLING_INTERVAL);
  }
}

export { RollingKeywords };
