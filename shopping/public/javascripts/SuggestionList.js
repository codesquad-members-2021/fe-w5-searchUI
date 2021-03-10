import _ from "./utils.js";

const SuggestionList = function (List, ListParents) {
  this.List = List.map((v) => v.keyword);
  this.ListParents = ListParents;
  this.length = this.List.length;
};

SuggestionList.prototype = {
  init() {
    this.List.forEach((v, index) => {
      this.inserlist(this.ListParents, v, index);
    });
  },

  inserlist(Parents, keyword, index) {
    Parents.innerHTML += `<li><span class="num">${
      index + 1
    }.</span> ${keyword}</li>`;
  },

  constructor: SuggestionList,
};

export default SuggestionList;
