import { SearchPopupUI } from "./SearchPopupUI";
import _ from "./util";

const SearchBarUI = function (url) {
  this.url = url;
  this.$rollingSearchList = _.$(".roll-search-list");
  this.rollSize = 0;
};

SearchBarUI.prototype = {
  constructor: SearchBarUI,

  async getJson() {
    const res = await fetch(this.url);
    this.result = await res.json();
    return this.result.upkeyword;
  },

  async renderKeywordList() {
    const keywordList = await this.getJson();
    const keywordListTemplate = keywordList.reduce((acc, list, idx) => {
      const template = `<li><span class="list-rank">${
        idx + 1
      }</span>${list}</li>`;
      return acc + template;
    }, "");
    this.$rollingSearchList.insertAdjacentHTML(
      "afterbegin",
      keywordListTemplate
    );

    const keywordFirstChild = this.$rollingSearchList.firstElementChild.cloneNode(
      true
    );
    this.$rollingSearchList.appendChild(keywordFirstChild);
  },

  setToRepeatRoll() {
    const timer = setInterval(this.roll.bind(this), 1000);
  },

  async roll() {
    if (this.rollSize === 11) {
      this.$rollingSearchList.style.transition = "";
      this.$rollingSearchList.style.transform = "";
      this.$rollingSearchList.style.top = 0;
      this.rollSize = 0;
    } else {
      this.$rollingSearchList.style.transition = "transform 0.3s ease-in-out";
      this.$rollingSearchList.style.transform =
        "translateY(" + -32 * this.rollSize + "px)";
      this.rollSize++;
    }
  },
};

export { SearchBarUI };
