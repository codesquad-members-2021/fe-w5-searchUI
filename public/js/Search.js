import { _ } from './util.js';

export function Search() {
  this.searchForm = _.$('.nav-search-bar');
  this.searchInput = _.$('.search-bar');
  this.suggestion = _.$('.search-suggestion');
  this.keywordsToroll = _.$('.nav-search-rank');
  this.moveY = -2.5;
  this.timer;
}

Search.prototype.onEvents = function () {
  _.on(this.searchInput, 'focus', this.focusHandler.bind(this));
  _.on(this.searchForm, 'focusout', this.focusoutHandler.bind(this));
};

Search.prototype.focusHandler = function ({ target }) {
  if (this.isNotTarget(target)) return;
  _.addClass(this.suggestion, 'suggestion-visible');
  clearInterval(this.timer);
};

Search.prototype.focusoutHandler = function ({ target }) {
  if (this.isNotTarget(target)) return;
  _.rmClass(this.suggestion, 'suggestion-visible');
};

Search.prototype.isNotTarget = function (target) {
  if (!target.closest('.search-bar')) return false;
};

Search.prototype.animateKeywords = function (move, start, end) {
  this.keywordsToroll.style.transform = `translate3d(0,${move}rem,0)`;
  this.keywordsToroll.ontransitionend = () => {
    if (this.moveY === end) {
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
  this.timer = setInterval(() => {
    this.animateKeywords(this.moveY, startMove, endMove);
    this.moveY += -2.5;
  }, 1000);
};
