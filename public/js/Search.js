import { _, insertTemplate, debounce } from './util.js';
import { similarWordsTemplate } from './HTMLTemplate.js';

export function Search() {
  this.searchForm = _.$('.nav-search-bar');
  this.searchInput = _.$('.search-bar');
  this.suggestion = _.$('.search-suggestion');
  this.keywordsToroll = _.$('.nav-search-rank');
  this.rollKeyword = _.$('.search-rollkeywords');
  this.durationTime = 700;
  this.moveY = -2.5;
  this.debouncer = this.getKeywordsDebounce();
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
  _.on(this.searchInput, 'keydown', this.keydownHandler.bind(this));
};

Search.prototype.focusHandler = function ({ target }) {
  if (this.isNotTarget(target)) return;
  if (target.value) {
    this.hideSuggestion();
    this.showSimilarWords();
  }
  if (!target.value) this.showSuggestion();

  this.stopRolling();
  this.hideRollKeyword();
};

Search.prototype.focusoutHandler = function ({ target }) {
  if (this.isNotTarget(target)) return;

  this.hideSuggestion();
  this.hideSimilarWords();
  this.runKeyWordsRoll();

  if (!this.searchInput.value) {
    this.showRollKeyword();
  }
};

Search.prototype.inputHandler = function ({ target }) {
  if (target.value) {
    const text = target.value;
    this.hideSuggestion();
    this.debouncer(text);
  }

  if (!target.value) {
    this.hideSimilarWords();
    this.showSuggestion();
  }
};

Search.prototype.keydownHandler = function ({ code }) {
  const similarWords = _.$All('.similar-words');
  if (similarWords.length === 0) return;
  if (code !== 'ArrowDown' && code !== 'ArrowUp') return;

  const wordfocused = _.$('.word-focused');
  const wordsContainer = {
    words: similarWords,
    wordfocused,
  };

  this.pressArrow(code, wordsContainer);
  if (!this.searchInput.value) this.hideSimilarWords();
};

Search.prototype.pressArrow = function (code, wordsContainer) {
  if (code === 'ArrowDown') {
    return this.pressArrowDown(wordsContainer);
  }

  if (code === 'ArrowUp') {
    return this.pressArrowUp(wordsContainer);
  }
};

Search.prototype.pressArrowDown = function ({ words, wordfocused }) {
  this.showSimilarWords();
  if (!wordfocused) {
    words[0].classList.add('word-focused');
    return this.printFocusedWord(words[0]);
  }
  _.rmClass(wordfocused, 'word-focused');
  _.addClass(wordfocused.nextElementSibling, 'word-focused');
  this.printFocusedWord(wordfocused.nextElementSibling);

  if (!wordfocused.nextElementSibling) return this.hideSimilarWords();
};

Search.prototype.pressArrowUp = function ({ wordfocused }) {
  if (!wordfocused?.previousElementSibling) return this.toggleSimilarWords();
  _.rmClass(wordfocused, 'word-focused');
  _.addClass(wordfocused?.previousElementSibling, 'word-focused');
  this.printFocusedWord(wordfocused.previousElementSibling);
};

Search.prototype.printFocusedWord = function (currentWordFocused) {
  if (!currentWordFocused) return (this.searchInput.value = '');

  this.searchInput.value = currentWordFocused.textContent;
};

Search.prototype.getKeywordsDebounce = function () {
  const ms = 600;
  return debounce(this.fetchKeywords.bind(this), ms);
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
  this.keywordsToroll.style.transitionDuration = `${this.durationTime}ms`;
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

Search.prototype.toggleSimilarWords = function () {
  const similarWords = _.$('.search-similar-words-wrap');
  _.toggleClass(similarWords, 'visible');
};

Search.prototype.fetchKeywords = async function (text) {
  if (!text) return this.hideSimilarWords();
  try {
    const data = await fetch(
      `https://completion.amazon.com/api/2017/suggestions?session-id=141-6040242-7044009&customer-id=&request-id=7ZD2PSMEE2JF3CVEXGZF&page-type=Gateway&lop=en_US&site-variant=desktop&client-info=amazon-search-ui&mid=ATVPDKIKX0DER&alias=aps&b2b=0&fresh=0&ks=81&prefix=${text}&event=onKeyPress&limit=11&fb=1&suggestion-type=KEYWORD&suggestion-type=WIDGET&_=1615307516261`
    ).then((res) => res.json());
    const keywordData = await data.suggestions;
    await this.renderSimilarWords(keywordData, text);
  } catch (err) {
    alert(err);
  }
};

Search.prototype.renderSimilarWords = function (suggestions, searchText) {
  if (this.hasNoSimilarWords(suggestions)) return this.hideSimilarWords();

  const wordsContainer = _.$('.similar-word-lists');
  wordsContainer.innerHTML = ``;
  const listOfSimilarWords = suggestions
    .map((suggestion) => suggestion.value)
    .reduce((prev, words) => {
      const wordMatched = this.highlightText(searchText);
      const wordNotMatched = this.excludeInputText(words, searchText);
      const reassembledText = this.reassembleText(wordMatched, wordNotMatched);
      return prev + `<li class="similar-words">${reassembledText}</li>`;
    }, '');

  insertTemplate(wordsContainer, 'beforeend', listOfSimilarWords);
  return this.showSimilarWords();
};

Search.prototype.highlightText = function (searchText) {
  return `<span class="word-matched">${searchText}</span>`;
};

Search.prototype.excludeInputText = function (words, searchText) {
  return `${words.slice(searchText.length)}`;
};

Search.prototype.reassembleText = function (highlightText, restText) {
  return highlightText + restText;
};

Search.prototype.hasNoSimilarWords = function (suggestions) {
  if (suggestions.length === 0) return true;
};
