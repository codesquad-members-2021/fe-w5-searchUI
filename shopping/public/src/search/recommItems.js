import { searchToggle } from "../utils/states.js";
import { _ } from "../utils/selector.js";
import request from "../utils/request.js";
import { urls } from "../utils/urls.js";
import { times } from "../utils/states.js";

// request recommededWords related to inputValue
// const searchingInput = _.$(".searchBar__input");
// const recommendedWordsToggle = _.$(".searchBar__toggle");
// let timer;
// let recommendations = [];
// let currIndex = -1;

export const RecommItems = function (searchState) {
  const { currIndex, searchingInput, recommWordsToggle, timer, recommendations, topTenWords } = searchState;
  this.currIndex = currIndex; // 연관검색어 - 현재 방향키가 있는 검색어의 인덱스
  this.currElement = null; // 연관검색어 - 현재 방향키가 있는 검색어
  this.coloredElement = null; // 연관검색어 - 검색어 색깔
  this.searchingInput = searchingInput;
  this.recommWordsToggle = recommWordsToggle;
  this.timer = timer;
  this.recommendations = recommendations;
  this.topTenWords = topTenWords;
};

RecommItems.prototype.initToggle = async function () {
  const topTenWordsJson = await request(urls.topTenWords);
  const { popularWords } = topTenWordsJson;
  this.topTenWords =
    Object.entries(popularWords[0]).reduce((acc, item) => {
      const [num, product] = item;
      acc += `<span class="popularWords__rank" data-id=${num}>${num}</span>
      <span class="popularWords__product" data-id=${num}>${product}</span>`;
      return acc;
    }, `<div class="popularWords">`) + `</div>`;
  this.recommWordsToggle.innerHTML = this.topTenWords;
};

RecommItems.prototype.registerEvent = async function () {
  await this.initToggle();
  this.searchingInput.addEventListener("focus", this.focusEvent.bind(this));
  this.searchingInput.addEventListener("input", this.inputEvent.bind(this));
  this.searchingInput.addEventListener("keydown", (e) => this.keydownEvent(e));
};

RecommItems.prototype.keydownEvent = function ({ key }) {
  if (!this.recommWordsToggle.classList.contains("visible")) this.recommWordsToggle.classList.add("visible");
  if (!key.includes("Arrow")) return;
  // const colorOn = () => {
  //   this.currElement = _.$All(".recommended__item")[this.currIndex];
  //   if (this.coloredElement) {
  //     this.coloredElement.classList.remove("colorGray");
  //     this.coloredElement.classList.add("colorBlack");
  //   }
  //   // = "#000";
  //   this.currElement.classList.add("colorGray");
  //   // = "#ddd";
  //   this.coloredElement = this.currElement;
  // };
  // const colorOff = () => {
  //   if (!this.coloredElement) return;
  //   // if (this.coloredElement) {
  //   this.coloredElement.classList.remove("colorGray");
  //   this.coloredElement.classList.add("colorBlack");
  //   this.coloredElement = null;
  //   this.currElement = null;
  //   // }
  // };
  if (key === "ArrowUp") {
    if (this.currIndex - 1 >= 0) {
      this.currIndex--;
      this.colorOn();
    }
    if (this.currIndex < 0) {
      this.colorOff();
      this.recommWordsToggle.style.visibility = "hidden";
    }
  }
  if (key === "ArrowDown") {
    if (this.currIndex + 1 < this.recommendations.length) {
      this.currIndex++;
      this.colorOn();
    }
    if (this.currIndex >= this.recommendations.length - 1) {
      this.colorOff();
      this.recommWordsToggle.style.visibility = "hidden";
    }
  }
};

RecommItems.prototype.colorOn = function () {
  this.currElement = _.$All(".recommended__item")[this.currIndex];
  if (this.coloredElement) {
    this.coloredElement.classList.remove("colorGray");
    this.coloredElement.classList.add("colorBlack");
  }
  console.log(this.currIndex);
  // = "#000";
  this.currElement.classList.add("colorGray");
  // = "#ddd";
  this.coloredElement = this.currElement;
  // this.currElement = _.$All(".recommended__item")[this.currIndex];
  // if (this.coloredElement) this.coloredElement.classList.add("colorBlack");
  // this.currElement.classList.add("colorGray");
  // return this.currElement;
  // this.coloredElement = this.currElement;
  // debugger;
};

RecommItems.prototype.colorOff = function () {
  if (!this.coloredElement) return;
  // if (this.coloredElement) {
  this.coloredElement.classList.remove("colorGray");
  this.coloredElement.classList.add("colorBlack");
  this.coloredElement = null;
  this.currElement = null;
  // if (!this.coloredElement) return;
  // this.coloredElement.classList.add("colorBlack");
};

RecommItems.prototype.focusEvent = function (e) {
  this.recommWordsToggle.classList.add("visible");
};

RecommItems.prototype.resetTimer = function () {
  if (this.timer) clearTimeout(this.timer);
};

RecommItems.prototype.loadRelatedWords = async function (inputValue) {
  const data = await request(urls.recommendedWords, inputValue);
  const { suggestions } = data;
  const tempSuggestions = suggestions.map((item) => item.value);
  const set = [...new Set(tempSuggestions)]; // 중복값 제거
  // this.recommendations = [...set];
  console.log(set);
  const tempRecommendations = set.reduce((acc, item, i) => acc + `<span class="recommended__item" data-id="${i}">${item}</span>`, ``);
  return [tempRecommendations, set];
  // this.recommWordsToggle.innerHTML = tempRecommendations;
  // this.recommWordsToggle.classList.add("visible");
};

RecommItems.prototype.inputEvent = function (e) {
  const inputValue = e.target.value;
  console.log("input", inputValue);
  // this.resetTimer.bind(this)();
  if (this.timer) clearTimeout(this.timer);
  if (inputValue === ``) this.recommWordsToggle.innerHTML = this.topTenWords;
  if (inputValue !== ``) {
    console.log(1);
    this.timer = setTimeout(function () {
      const [tempRecommendations, set] = this.loadRelatedWords(inputValue);
      //this.loadRelatedWords is not a function or its return value is not iterable
      // error is occurred
      this.recommendations = set;
      this.recommWordsToggle.innerHTML = tempRecommendations;
      this.recommWordsToggle.classList.add("visible");
    }, times.debounce);
    // debugger;
  }
};
