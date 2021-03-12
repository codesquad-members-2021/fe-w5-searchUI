import { SearchBarUI } from "./SearchBarUI";
import _ from "./util";

const SearchPopupUI = function (url, input) {
  this.url = url;
  this.$input = input;
  this.activeTimer;
  this.currentRelatedKeywordList = [];
  this.init();
};

SearchPopupUI.prototype = {
  constructor: SearchPopupUI,

  init() {
    this.$input.addEventListener("focus", this.showPopUpBox);
    this.$input.addEventListener("input", this.showRelatedKeyword.bind(this));
    window["getResponseJsonpData"] = this.getResponseJsonpData.bind(this);
  },

  async requestJson() {
    //중복 코드 제거 필요
    const res = await fetch(this.url);
    this.result = await res.json();
    return this.result.upkeyword;
  },

  async renderPopupBox() {
    const keywordList = await this.requestJson();
    const innerTemplate = keywordList.reduce((acc, list, idx) => {
      let template;
      switch (idx) {
        case 4:
          template = `<li><span class="list__text">${
            idx + 1
          }</span>${list}</li></ol><ol class="inner__keyword-list">`;
          break;
        case 9:
          template = `<li><span class="list__text">${
            idx + 1
          }</span>${list}</li></ol>`;
          break;
        default:
          template = `<li><span class="list__text">${
            idx + 1
          }</span>${list}</li>`;
      }
      return acc + template;
    }, `<ol class="inner__keyword-list">`);

    const outerTemplate = `<div class="popup-search-wrap__inner">
      <strong>인기 쇼핑 키워드</strong> ${innerTemplate}
    </div>`;

    _.$(".popup-search-wrap").insertAdjacentHTML("afterbegin", outerTemplate);
  },

  showPopUpBox() {
    _.$(".popup-search-wrap").style.display = "block";
    _.$(".roll-search-wrap").style.display = "none";
  },

  hidePopUpBox() {
    _.$(".popup-search-wrap").style.display = "none";
  },

  requestJsonp(word, callbackName) {
    const script = document.createElement("script");
    script.src = `https://suggest-bar.daum.net/suggest?callback=${callbackName}&limit=10&mode=json&code=utf_in_out&q=${word}&id=shoppinghow_suggest`;
    document.body.append(script);
  },

  getResponseJsonpData(data) {
    this.currentRelatedKeywordList = data.items.map(x =>
      x.replace(/\|.+/g, "")
    );
  },

  drawRelatedKeywordBox() {
    const $popupWrap = _.$(".popup-search-wrap__inner");
    const innerTemplate = this.currentRelatedKeywordList.reduce((acc, cur) => {
      return acc + ` <li>${cur}</li>`;
    }, "");

    const outerTemplate = `<ol class="inner__keyword-list">${innerTemplate}</ol>`;
    $popupWrap.innerHTML = outerTemplate;
    _.$(".inner__keyword-list").style.display = "block";
  },

  getInputData() {
    const currentKeyword = _.$(".search-form__input").value;
    this.requestJsonp(currentKeyword, "getResponseJsonpData");
  },

  async showRelatedKeyword() {
    await this.getInputValue();
    this.drawRelatedKeywordBox();
  },

  getInputValue() {
    if (!this.activeTimer) {
      this.activeTimer = _.debounce(this.getInputData.bind(this), 500);
    }
    this.activeTimer();
  },

  colorKeyword() {
    //검색어와 일치하는 list 문자에 coloring
  },
};

export { SearchPopupUI };
