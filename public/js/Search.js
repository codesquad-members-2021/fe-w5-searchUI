import { _, delay } from './util.js';

export function Search() {
  this.searchBar = _.$('.nav-search-bar');
  this.suggestion = _.$('.search-suggestion');
  this.keywordsToroll = _.$('.nav-search-rank');
  this.moveY = -2.5;
}

Search.prototype.onEvents = function () {
  _.on(this.searchBar, 'click', this.clickHandler.bind(this));
  _.on(this.searchBar, 'focusout', this.focusoutHandler.bind(this));
};

Search.prototype.clickHandler = function ({ target }) {
  if (this.isNotTarget(target)) return;
  _.addClass(this.suggestion, 'suggestion-visible');
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
    if (this.moveY !== end) return;
    this.keywordsToroll.style.transitionDuration = '0ms';
    this.keywordsToroll.style.transform = 'translate3d(0, 0, 0)';
    this.moveY = start;
  };
  this.keywordsToroll.style.transitionDuration = '700ms';
};

Search.prototype.runKeywordsRoll = async function () {
  const startMove = -2.5;
  const endMove = -27.5;
  const runRoll = this.animateKeywords(this.moveY, startMove, endMove);
  await delay(runRoll, 1000);
  this.runKeywordsRoll();
  this.moveY += -2.5;
};
