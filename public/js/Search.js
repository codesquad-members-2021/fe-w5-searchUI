import { _, insertTemplate } from './util.js';
import { similarWordsTemplate } from './HTMLTemplate.js';

export function Search() {
  this.searchForm = _.$('.nav-search-bar');
  this.searchInput = _.$('.search-bar');
  this.suggestion = _.$('.search-suggestion');
  this.keywordsToroll = _.$('.nav-search-rank');
  this.rollKeyword = _.$('.search-rollkeywords');
  this.moveY = -2.5;
  this.timer;
  this.debouncer;
  this.CURRENT_CACHE = {};
}

Search.prototype.init = function () {
  this.load();
  this.onEvents();
  this.runKeyWordsRoll();
};

Search.prototype.load = function () {
  const wrap = similarWordsTemplate();
  insertTemplate(this.searchForm, 'beforeend', wrap);
};

Search.prototype.onEvents = function () {
  _.on(this.searchInput, 'focus', this.focusHandler.bind(this));
  _.on(this.searchForm, 'focusout', this.focusoutHandler.bind(this));
  _.on(this.searchInput, 'input', this.inputHandler.bind(this));
};

Search.prototype.focusHandler = function ({ target }) {
  if (this.isNotTarget(target)) return;
  target.value ? this.hideSuggestion() : this.showSuggestion();
  this.stopRolling();
  this.hideRollKeyword();
};

Search.prototype.focusoutHandler = function ({ target }) {
  if (this.isNotTarget(target)) return;
  this.hideSuggestion();
  this.runKeyWordsRoll();
  if (!this.searchInput.value) {
    this.showRollKeyword();
  }
};

Search.prototype.inputHandler = function ({ target }) {
  target.value ? this.hideSuggestion() : this.hideSimilarWords();
  const ms = 1000;
  const text = target.value;
  this.debounce(() => this.fetchKeywords(text), ms);
};

Search.prototype.debounce = function (fn, ms) {
  let timer = this.debouncer;
  if (timer) clearTimeout(timer);
  this.debouncer = setTimeout(() => {
    fn();
  }, ms);
};

Search.prototype.isNotTarget = function (target) {
  if (!target.closest('.search-bar')) return false;
};

Search.prototype.animateKeywords = function (move, start, end) {
  this.keywordsToroll.style.transform = `translate3d(0,${move}rem,0)`;
  this.keywordsToroll.ontransitionend = () => {
    if (this.moveY <= end) {
      this.keywordsToroll.style.transitionDuration = '0ms';
      this.keywordsToroll.style.transform = 'translate3d(0, 0, 0)';
      this.moveY = start;
    }
  };
  this.keywordsToroll.style.transitionDuration = '700ms';
};

Search.prototype.runKeyWordsRoll = function () {
  const startMove = -2.5;
  const endMove = -27.5;
  const eachMove = -2.5;
  this.timer = setInterval(() => {
    this.animateKeywords(this.moveY, startMove, endMove);
    // 이 값은 음수입니다.
    this.moveY += eachMove;
  }, 2000);
};

Search.prototype.stopRolling = function () {
  return clearInterval(this.timer);
};

Search.prototype.hideRollKeyword = function () {
  _.addClass(this.rollKeyword, 'search-rollkeyword-hidden');
};

Search.prototype.showRollKeyword = function () {
  _.rmClass(this.rollKeyword, 'search-rollkeyword-hidden');
};

Search.prototype.hideSuggestion = function () {
  _.rmClass(this.suggestion, 'visible');
};

Search.prototype.showSuggestion = function () {
  _.addClass(this.suggestion, 'visible');
};

Search.prototype.hideSimilarWords = function () {
  const similarWords = _.$('.search-similar-words-wrap');
  _.rmClass(similarWords, 'visible');
};

Search.prototype.showSimilarWords = function () {
  const similarWords = _.$('.search-similar-words-wrap');
  _.addClass(similarWords, 'visible');
};

Search.prototype.fetchKeywords = async function (text) {
  if (!text) return this.hideSimilarWords;
  const keywordData = await fetch(
    `https://completion.amazon.com/api/2017/suggestions?session-id=141-6040242-7044009&customer-id=&request-id=7ZD2PSMEE2JF3CVEXGZF&page-type=Gateway&lop=en_US&site-variant=desktop&client-info=amazon-search-ui&mid=ATVPDKIKX0DER&alias=aps&b2b=0&fresh=0&ks=81&prefix=${text}&event=onKeyPress&limit=11&fb=1&suggestion-type=KEYWORD&suggestion-type=WIDGET&_=1615307516261`
  )
    .then((res) => res.json())
    .then((data) => data.suggestions);
  this.renderSimilarWords(keywordData);
};

Search.prototype.renderSimilarWords = function (suggestions) {
  const wordsContainer = _.$('.similar-word-lists');
  wordsContainer.innerHTML = ``;
  const listOfSimilarWords = suggestions
    .map((suggestion) => suggestion.value)
    .reduce((prev, words) => {
      return (
        prev +
        `<li class="similar-words">${words}</li>
      `
      );
    }, '');
  insertTemplate(wordsContainer, 'beforeend', listOfSimilarWords);
  this.showSimilarWords();
};
