import _ from "./utils/utils.js";

const SuggestionList = function (List, ListParents) {
  this.List = List.map((v) => v.keyword);
  this.ListParents = ListParents;
  this.length = this.List.length;
};

SuggestionList.prototype = {
  init() {
    this.insertHTML(this.ListParents);
  },

  insertHTML(Parents) {
    Parents.innerHTML = this.makeTitleHTML();
  },

  makeListHTML(keyword,index){
    return `<li><span class="num">${
      index +1
    }.</span> ${keyword}</li>`
  },

  makeTitleHTML() {
    let listHTML = this.List.map((keyword,index) => this.makeListHTML(keyword,index))
    .reduce((acc,curr)=> acc += curr);
    return `<strong class="tit__suggestion">인기 쇼핑 키워드</strong>
    <ol class="suggestion__items">` + listHTML +`</ol>`
  },

  constructor: SuggestionList,
};

export default SuggestionList;
