const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

class RollingKeywords {
  constructor(data) {
    this.data = data;
    this.lists = $('.list_rollkeywords');
    this.target = $('.search-bar');
  }

  addEvent() {
    this.target.addEventListener('click', this.hideKeywords);
  }

  hideKeywords(e) {
    const currentDom = (event, className) => event.currentTarget.querySelector(className);

    if (currentDom(e, '.wrap_rollkeywords')) {
      const rollKeywords = currentDom(e, '.wrap_rollkeywords');
      const searchBox = currentDom(e, '.box_search');
      const suggestion = currentDom(e, '.wrap_suggestion');
      rollKeywords.style.display = 'none';
      searchBox.style.borderColor = '#f95139';
      suggestion.style.display = 'block';
    }
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

    setInterval(() => {
      this.lists.classList.replace('list_rollkeywords', 'list_rollkeywords--rolling');
      rollingAnimation(ANIMATION_DURATION);
    }, ROLLING_INTERVAL);
  }
}

export { RollingKeywords };
