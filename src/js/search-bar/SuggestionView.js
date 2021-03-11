import '../../scss/SuggestionView.scss';
import { _ } from '../util.js';

SuggestionView.MODE__POPULAR_KEYWORD = 0;
SuggestionView.MODE__SUGGESTION_FROM_INPUT = 1;

export function SuggestionView(data) {
  this.$target;
  this.data = data;
  this.mode = SuggestionView.MODE__POPULAR_KEYWORD;
  this.popularKeywordView;
  this.suggestionFromInputView;
  this.init();
}

SuggestionView.prototype.show = function () {
  this.$target.hidden = false;
};
SuggestionView.prototype.hide = function () {
  this.$target.hidden = true;
};

SuggestionView.prototype.updateView = function () {
  switch (this.mode) {
    case SuggestionView.MODE__POPULAR_KEYWORD:
      this.popularKeywordView.getEl().hidden = true;
      this.suggestionFromInputView.getEl().hidden = false;
      break;
    case SuggestionView.MODE__SUGGESTION_FROM_INPUT:
      this.popularKeywordView.getEl().hidden = false;
      this.suggestionFromInputView.getEl().hidden = true;
      break;
    default:
      throw new Error('not reached!');
  }
};

SuggestionView.prototype.init = function () {
  this.$target = this.createEl();
  this.popularKeywordView = new PopularKeywordView({
    title: '인기 쇼핑 키워드',
    list: this.data.list,
    listCnt: 2,
    maxListItemCnt: 5,
  });
  this.suggestionFromInputView = new SuggestionFromInputView();

  this.$target.appendChild(this.popularKeywordView.getEl());
  this.$target.appendChild(this.suggestionFromInputView.getEl());
};

SuggestionView.prototype.createEl = function () {
  return _.genEl('DIV', {
    classNames: ['suggestion'],
    attributes: { hidden: true },
  });
};

SuggestionView.prototype.getEl = function () {
  return this.$target;
};

SuggestionView.prototype.setMode = function (mode) {
  this.mode = mode;
  this.updateView();
};

SuggestionView.prototype.setData = function (data) {
  // if (!SuggestionView.MODE__SUGGESTION) throw new Error('not reached!');

  this.suggestionFromInputView.setData(data);
};

function PopularKeywordView({ title, list, listCnt, maxListItemCnt } = { listCnt: 1 }) {
  this.$target;
  this.title = title;
  this.list = list;
  this.listCnt = listCnt;
  this.maxListItemCnt = maxListItemCnt;
  this.init();
}

PopularKeywordView.prototype.init = function () {
  this.$target = this.createEl();
  this.appendLists();
};

PopularKeywordView.prototype.createEl = function () {
  return _.genEl('DIV', {
    classNames: ['popular-keyword'],
    template: this.template(),
  });
};

PopularKeywordView.prototype.appendLists = function () {
  const $listContainer = _.$('.popular-keyword__list-cont', this.$target);
  const listSize = this.maxListItemCnt ?? Math.ceil(this.list.length / this.listCnt);

  for (let i = 0; i < this.listCnt; i++) {
    const beginIdx = i * listSize;
    const list = new PopularKeywordList({
      list: this.list.slice(beginIdx, beginIdx + listSize),
      start: beginIdx + 1,
      maxListItemCnt: this.maxListItemCnt,
    });
    $listContainer.appendChild(list.getEl());
  }
};

PopularKeywordView.prototype.getEl = function () {
  return this.$target;
};

PopularKeywordView.prototype.template = function () {
  return `<div class="popular-keyword__tit">${this.title}</div><div class="popular-keyword__list-cont"></div>`;
};

function PopularKeywordList({ list, start } = { start: 1 }) {
  this.$target;
  this.list = list;
  this.start = start;
  this.init();
}

PopularKeywordList.prototype.init = function () {
  this.$target = this.createEl();
  this.appendListItems();
};

PopularKeywordList.prototype.createEl = function () {
  return _.genEl('OL', {
    classNames: ['popular-keyword__list'],
    // attributes: { start: this.start },
  });
};

PopularKeywordList.prototype.appendListItems = function () {
  this.list.forEach((itemData, idx) => {
    const li = new PopularKeywordListItem({
      data: itemData,
      rank: idx + this.start,
    });
    this.$target.appendChild(li.getEl());
  });
};

PopularKeywordList.prototype.getEl = function () {
  return this.$target;
};

function PopularKeywordListItem({ data, rank }) {
  this.$target;
  this.data = data;
  this.rank = rank;
  this.init();
}

PopularKeywordListItem.prototype.init = function () {
  this.$target = this.createEl();
};

PopularKeywordListItem.prototype.createEl = function () {
  return _.genEl('LI', {
    classNames: ['popular-keyword__list__item'],
    template: this.template(),
  });
};

PopularKeywordListItem.prototype.getEl = function () {
  return this.$target;
};

PopularKeywordListItem.prototype.template = function () {
  return `<a href="${this.data.linkurl}">
            <span class="popular-keyword__list__item__rank">${this.rank}</span>
            ${this.data.keyword}
          </a>`;
};

function SuggestionFromInputView(data) {
  this.$target;
  this.data = data;
  this.init();
}

SuggestionFromInputView.prototype.init = function () {
  this.$target = this.createEl();
  this.list;
};

SuggestionFromInputView.prototype.createEl = function () {
  return _.genEl('DIV', {
    classNames: ['suggestion-from-input'],
  });
};

SuggestionFromInputView.prototype.appendList = function () {
  this.list = new SuggestionFromInputList(this.data);
  this.$target.appendChild(this.list.getEl());
};

SuggestionFromInputView.prototype.updateList = function () {
  this.$target.remove(this.list.getEl());
  this.appendList();
};

SuggestionFromInputView.prototype.getEl = function () {
  return this.$target;
};

SuggestionFromInputView.prototype.setData = function (data) {
  this.data = data;
  this.updateList();
};

function SuggestionFromInputList(data) {
  this.$target;
  this.data = data;
  this.init();
}

SuggestionFromInputList.prototype.init = function () {
  this.$target = this.createEl();
};

SuggestionFromInputList.prototype.createEl = function () {
  return _.genEl('UL', {
    classNames: ['suggestion-from-input__list'],
  });
};

SuggestionFromInputList.prototype.appendListItems = function () {
  this.data.items.forEach(itemData => {
    const li = new SuggestionFromInputListItem({
      data: itemData,
      markStr: this.data.q,
    });
    this.$target.appendChild(li.getEl());
  });
};

SuggestionFromInputList.prototype.updateMarks = function () {};

function SuggestionFromInputListItem({ data, markStr }) {
  this.$target;
  this.data = data;
  this.markStr = markStr.slice(0, markStr.lastIndexOf('|'));
}

SuggestionFromInputListItem.prototype.init = function () {
  this.$target = this.createEl();
};

SuggestionFromInputListItem.prototype.createEl = function () {
  return _.genEl('LI', {
    classNames: ['suggestion-from-input__list__item'],
    template: this.template(),
  });
};

SuggestionFromInputListItem.prototype.template = function () {
  return `${this.data.markStr}<span class="suggestion-from-input__list__item__mark"></span>`;
};
