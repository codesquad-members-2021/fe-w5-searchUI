import { _ } from "../utils/selector.js";
import request from "../utils/request.js";
import { urls } from "../utils/urls.js";
import { times } from "../utils/states.js";
import Roller from "./roller.js";

// 지금은 일단 하나에 다 합쳐봄
// 상속으로 나누든가.. 하자.. 너무 더럽
// 연결고리
// - focusin 이벤트 -> roller's display: none
// - focusout -> roller's display: block

// 1. 공통적인 부분 찾기 - 공통 컴포넌트
// 2. 작은 단위로 나누기 - 그렇다면 공통으로 사용하는 프로퍼티들은 어떻게 할까

export default function RecommItems(searchState, rollings) {
  const { currIndex, searchingInput, recommWordsToggle, timer, recommendations, topTenWords } = searchState;
  const { rollingKeywordHtml, rollingContainer } = rollings;
  this.currIndex = currIndex; // 연관검색어 - 현재 방향키가 있는 검색어의 인덱스
  this.currElement = null; // 연관검색어 - 현재 방향키가 있는 검색어
  this.coloredElement = null; // 연관검색어 - 검색어 색깔
  this.searchingInput = searchingInput;
  this.recommWordsToggle = recommWordsToggle;
  this.timeOutTimer = timer;
  this.recommendations = recommendations;
  this.topTenWords = topTenWords; // 인기검색어
  this.isOutOfToggle = false;
  this.rollingKeywordHtml = rollingKeywordHtml;
  this.rollingContainer = rollingContainer;
  this.itemCount = 0; // roller
  this.currItem = null; // roller
  this.rollingTopTenWords = null;
}

// 이런식으로 담을까 고민중
// 이게 좀 더 깔끔하게 보일 것 같기도
RecommItems.prototype = {
  getTopten,
};

// RecommItems.prototype.getTopten =
async function getTopten() {
  const topTenWordsJson = await request(urls.topTenWords);
  const { popularWords } = topTenWordsJson;
  return popularWords;
}

RecommItems.prototype.initToggle = async function (className) {
  const popularWords = await this.getTopten();
  const popularWordsArr = Object.entries(popularWords[0]);
  this.topTenWords = this.createTemplate(popularWordsArr, className);
  this.recommWordsToggle.innerHTML = this.topTenWords;
};

RecommItems.prototype.createTemplate = function (array, className) {
  return array.reduce((acc, item) => {
    const [num, product] = item;
    acc += `<div class="${className}"><span class="${className}__rank" data-id=${num}>${num}</span>
      <span class="popularWords__product" data-id=${num}>${product}</span></div>`;
    return acc;
  }, ``);
};

RecommItems.prototype.initRoller = async function (className) {
  const popularWords = await this.getTopten();
  const popularWordsArr = Object.entries(popularWords[0]);
  this.rollingTopTenWords = this.createTemplate(popularWordsArr, className) + this.createTemplate(popularWordsArr.slice(0, 2), className);
  this.rollingContainer.innerHTML = this.rollingTopTenWords;
  this.itemCount = popularWordsArr.length;
  this.rollInterval();
};

RecommItems.prototype.rollInterval = function () {
  const intervalTimer = setInterval(() => {
    if (this.currItem >= 0 && this.currItem <= this.itemCount) {
      this.rollingContainer.style.transition = `${times.transition}ms`;
      this.rollingContainer.style.transform = `translateY(-${++this.currItem * times.transform}px)`;
      if (this.currItem > this.itemCount) {
        this.currItem = 0;
        this.rollingContainer.style.transition = `${times.init}ms`;
        this.rollingContainer.style.transform = `translateY(-${this.currItem * times.transform}px)`;
      }
    }
  }, times.rolling);
};

RecommItems.prototype.registerEvent = async function () {
  await this.initToggle("popularWords__rank");
  await this.initRoller("rolling__items");
  this.searchingInput.addEventListener("focusin", this.focusinEvent.bind(this));
  this.searchingInput.addEventListener("focusout", this.focusoutEvent.bind(this));
  this.searchingInput.addEventListener("input", this.inputEvent.bind(this));
  this.searchingInput.addEventListener("keydown", this.keydownEvent.bind(this));
};

RecommItems.prototype.keydownEvent = function (e) {
  const { key } = e;
  if (!key.includes("Arrow") || this.isOutOfToggle) return;
  if (!this.recommWordsToggle.classList.contains("visible")) this.recommWordsToggle.classList.add("visible");
  if (key === "ArrowUp") {
    e.preventDefault();
    this.moveUp();
  }
  if (key === "ArrowDown") {
    e.preventDefault();
    this.moveDown();
  }
};

RecommItems.prototype.moveUp = function () {
  if (this.currIndex > 0) {
    this.currIndex--;
    this.colorOn();
  } else if (this.currIndex - 1 < 0) {
    this.toggle();
    this.colorOff();
    this.isOutOfToggle = true;
  }
};

RecommItems.prototype.moveDown = function () {
  if (this.currIndex + 1 < this.recommendations.length) {
    this.currIndex++;
    this.colorOn();
  } else if (this.currIndex === this.recommendations.length - 1) {
    this.toggle();
    this.colorOff();
    this.currIndex--;
    this.isOutOfToggle = true;
  }
};

RecommItems.prototype.colorOn = function () {
  this.currElement = _.$All(".recommended__item")[this.currIndex];
  if (this.coloredElement) {
    this.coloredElement.classList.remove("colorGray");
    this.coloredElement.classList.add("colorBlack");
  }
  this.currElement.classList.add("colorGray");
  this.coloredElement = this.currElement;
};

RecommItems.prototype.colorOff = function () {
  if (!this.coloredElement) return;
  this.coloredElement.classList.remove("colorGray");
  this.coloredElement.classList.add("colorBlack");
  this.coloredElement = null;
  this.currElement = null;
};

RecommItems.prototype.focusinEvent = function (e) {
  this.rollingKeywordHtml.classList.add("none");
  this.recommWordsToggle.classList.add("visible");
};

RecommItems.prototype.focusoutEvent = function (e) {
  this.rollingKeywordHtml.classList.remove("none");
  this.recommWordsToggle.classList.remove("visible");
};

RecommItems.prototype.toggle = function () {
  this.recommWordsToggle.classList.toggle("visible");
};

RecommItems.prototype.resetTimer = function () {
  if (this.timeOutTimer) clearTimeout(this.timeOutTimer);
};

RecommItems.prototype.loadRelatedWords = async function (inputValue) {
  const data = await request(urls.recommendedWords, inputValue);
  const { suggestions } = data;
  const tempSuggestions = suggestions.map((item) => item.value);
  const set = [...new Set(tempSuggestions)]; // 중복값 제거
  const tempRecommendations = set.reduce((acc, item, i) => acc + `<span class="recommended__item" data-id="${i}">${item}</span>`, ``);
  this.recommWordsToggle.innerHTML = tempRecommendations;
  this.recommendations = set;
  this.recommWordsToggle.classList.add("visible");
};

RecommItems.prototype.resetToggleStatus = function () {
  this.currIndex = -1;
  this.isOutOfToggle = false;
};

RecommItems.prototype.inputEvent = function (e) {
  // 글자 하이라이트 하는거 추가하기
  this.resetToggleStatus();
  const inputValue = e.target.value;
  this.resetTimer();

  if (inputValue === ``) {
    this.recommWordsToggle.innerHTML = this.topTenWords;
  }
  if (inputValue !== ``) {
    this.timeOutTimer = setTimeout((_) => this.loadRelatedWords(inputValue), times.debounce);
  }
};
