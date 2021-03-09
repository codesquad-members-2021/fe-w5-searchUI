import { _ } from './util.js';

export function Search() {
  this.searchForm = _.$('.nav-search-bar');
  this.searchInput = _.$('.search-bar');
  this.suggestion = _.$('.search-suggestion');
  this.keywordsToroll = _.$('.nav-search-rank');
  this.moveY = -2.5;
  this.timer;
  this.rollKeyword = _.$('.search-rollkeywords');
}

Search.prototype.init = function () {
  this.onEvents();
  this.runKeyWordsRoll();
};

Search.prototype.onEvents = function () {
  _.on(this.searchInput, 'focus', this.focusHandler.bind(this));
  _.on(this.searchForm, 'focusout', this.focusoutHandler.bind(this));
};

Search.prototype.focusHandler = function ({ target }) {
  if (this.isNotTarget(target)) return;
  _.addClass(this.suggestion, 'suggestion-visible');
  this.stopRolling();
  this.hideRollKeyword();
};

Search.prototype.focusoutHandler = function ({ target }) {
  if (this.isNotTarget(target)) return;
  _.rmClass(this.suggestion, 'suggestion-visible');
  this.runKeyWordsRoll();
  this.showRollKeyword();
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

Search.prototype.fetchKeywords = async function () {
  await fetch(
    `https://completion.amazon.com/api/2017/suggestions?session-id=141-6040242-7044009&customer-id=&request-id=7ZD2PSMEE2JF3CVEXGZF&page-type=Gateway&lop=en_US&site-variant=desktop&client-info=amazon-search-ui&mid=ATVPDKIKX0DER&alias=aps&b2b=0&fresh=0&ks=undefined&prefix=${value}&event=onFocusEmptySearchTerm&limit=11&fb=1&suggestion-type=KEYWORD&suggestion-type=WIDGET&_=1615301215702`,
    {
      headers: {
        accept: 'application/json, text/javascript, */*; q=0.01',
        'accept-language': 'ko-KR,ko;q=0.9,en-US;q=0.8,en;q=0.7',
        'cache-control': 'no-cache',
      },
    }
  );
};
