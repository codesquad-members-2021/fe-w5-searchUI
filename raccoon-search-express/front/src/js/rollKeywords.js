const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

export default class RollingKeywords {
  constructor(data) {
    this.data = data;
    this.lists = $('.list_rollkeywords');
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
}
