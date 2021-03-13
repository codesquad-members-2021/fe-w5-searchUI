import '../../scss/SuggestionView.scss';
import { _ } from '../util.js';

SuggestionView.MODE__POPULAR_KEYWORD = 0;
SuggestionView.MODE__SUGGESTION_FROM_INPUT = 1;
SuggestionView.MODE__NOT_FOUND = 2;

export function SuggestionView(data) {
  this.$target;
  this.data = data;
  this.mode = SuggestionView.MODE__POPULAR_KEYWORD;
  this.changeable = true;
  this.popularKeywordView;
  this.suggestionFromInputView;
  this.init();
}

SuggestionView.prototype.init = function () {
  this.$target = this.createEl();
  this.popularKeywordView = new PopularKeywordView({
    title: '인기 쇼핑 키워드',
    list: this.data,
    listCnt: 2,
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

SuggestionView.prototype.updateView = function () {
  switch (this.mode) {
    case SuggestionView.MODE__POPULAR_KEYWORD:
      this.suggestionFromInputView.hide();
      this.popularKeywordView.show();
      this.changeable = true;
      break;
    case SuggestionView.MODE__SUGGESTION_FROM_INPUT:
      this.popularKeywordView.hide();
      this.suggestionFromInputView.show();
      break;
    case SuggestionView.MODE__NOT_FOUND:
      this.popularKeywordView.hide();
      this.suggestionFromInputView.hide();
      break;
    default:
      throw new Error('not reached!');
  }
};

SuggestionView.prototype.selectUp = function () {
  this.suggestionFromInputView.selectUp();
  this.changeable = !this.suggestionFromInputView.isSelectedSomething();
};

SuggestionView.prototype.selectDown = function () {
  this.suggestionFromInputView.selectDown();
  this.changeable = !this.suggestionFromInputView.isSelectedSomething();
};

SuggestionView.prototype.getSelectedItem = function () {
  return this.suggestionFromInputView.getSelectedItem();
};

SuggestionView.prototype.isChangeable = function () {
  return this.changeable;
};

SuggestionView.prototype.show = function () {
  this.$target.hidden = false;
};
SuggestionView.prototype.hide = function () {
  this.$target.hidden = true;
};

SuggestionView.prototype.getEl = function () {
  return this.$target;
};

SuggestionView.prototype.getMode = function () {
  return this.mode;
};

SuggestionView.prototype.setMode = function (mode) {
  this.mode = mode;
  this.updateView();
};

SuggestionView.prototype.setData = function (data) {
  this.suggestionFromInputView.setData(data);
};

function PopularKeywordView({ title, list, listCnt }) {
  this.$target;
  this.title = title;
  this.list = list;
  this.listCnt = listCnt;
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
  const listSize = Math.ceil(this.list.length / this.listCnt);
  for (let i = 0; i < this.listCnt; i++) {
    const beginIdx = i * listSize;
    const list = new PopularKeywordList({
      list: this.list.slice(beginIdx, beginIdx + listSize),
      start: beginIdx + 1,
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

PopularKeywordView.prototype.show = function () {
  this.$target.classList.remove('hide');
};

PopularKeywordView.prototype.hide = function () {
  this.$target.classList.add('hide');
};

function PopularKeywordList({ list, start }) {
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
  this.list;
  this.data = data;
  this.changeable = true;
  this.init();
}

SuggestionFromInputView.prototype.init = function () {
  this.$target = this.createEl();
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
  this.list?.getEl().remove();
  this.appendList();
};

SuggestionFromInputView.prototype.selectUp = function () {
  this.list?.selectUp();
};

SuggestionFromInputView.prototype.selectDown = function () {
  this.list?.selectDown();
};

SuggestionFromInputView.prototype.getSelectedItem = function () {
  return this.list?.getSelectedItem();
};

SuggestionFromInputView.prototype.isSelectedSomething = function () {
  return this.currIdx !== -1;
};

SuggestionFromInputView.prototype.show = function () {
  this.$target.classList.remove('hide');
};

SuggestionFromInputView.prototype.hide = function () {
  this.$target.classList.add('hide');
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
  this.currIdx = -1;
  this.init();
}

SuggestionFromInputList.prototype.init = function () {
  this.$target = this.createEl();
  this.appendListItems();
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

SuggestionFromInputList.prototype.selectUp = function () {
  if (this.currIdx === -1) return;

  this.$target.children[this.currIdx].classList.remove('select');
  if (--this.currIdx !== -1) this.$target.children[this.currIdx].classList.add('select');
};

SuggestionFromInputList.prototype.selectDown = function () {
  if (this.currIdx !== -1) {
    this.$target.children[this.currIdx].classList.remove('select');
  }

  if (this.currIdx === this.$target.children.length - 1) {
    this.currIdx = -1;
    return;
  }

  this.$target.children[++this.currIdx].classList.add('select');
};

SuggestionFromInputList.prototype.getSelectedItem = function () {
  return this.currIdx === -1
    ? null
    : this.data.items[this.currIdx].slice(0, this.data.items[this.currIdx].lastIndexOf('|'));
};

SuggestionFromInputList.prototype.getEl = function () {
  return this.$target;
};

function SuggestionFromInputListItem({ data, markStr }) {
  this.$target;
  this.data = data.slice(0, data.lastIndexOf('|'));
  this.markStr = markStr;
  this.begin;
  this.mid = '';
  this.end;
  this.init();
}

SuggestionFromInputListItem.prototype.init = function () {
  this.initParts();
  this.$target = this.createEl();
};

SuggestionFromInputListItem.prototype.initParts = function () {
  [this.begin, this.end] = this.data.split(this.markStr);
  this.end = this.end ?? '';
  if (this.begin.length + this.end.length < this.data.length) this.mid = this.markStr;
};

SuggestionFromInputListItem.prototype.createEl = function () {
  return _.genEl('LI', {
    classNames: ['suggestion-from-input__list__item'],
    template: this.template(),
  });
};

SuggestionFromInputListItem.prototype.getEl = function () {
  return this.$target;
};

SuggestionFromInputListItem.prototype.template = function () {
  return `<a class="suggestion-from-input__list__item__link" href="">
            ${this.begin}<span class="link__mark">${this.mid}</span>${this.end}
          </a>`;
};
