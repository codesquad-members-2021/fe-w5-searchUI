import '../../scss/SuggestionView.scss';
import { _ } from '../util.js';

export function SuggestionView({ title, list, listCnt, maxListItemCnt } = { listCnt: 1 }) {
  this.$target;
  this.title = title;
  this.list = list;
  this.listCnt = listCnt;
  this.maxListItemCnt = maxListItemCnt;
  this.init();
}

SuggestionView.prototype.init = function () {
  this.$target = this.createEl();
  this.appendLists();
};

SuggestionView.prototype.createEl = function () {
  return _.genEl('DIV', {
    classNames: ['suggestion'],
    template: this.template(),
  });
};

SuggestionView.prototype.getEl = function () {
  return this.$target;
};

SuggestionView.prototype.appendLists = function () {
  const $listContainer = _.$('.suggestion__list-cont', this.$target);
  const listSize = this.maxListItemCnt ?? Math.ceil(this.list.length / this.listCnt);

  for (let i = 0; i < this.listCnt; i++) {
    const beginIdx = i * listSize;
    const list = new SuggestionList({
      list: this.list.slice(beginIdx, beginIdx + listSize),
      start: beginIdx + 1,
      maxListItemCnt: this.maxListItemCnt,
    });
    $listContainer.appendChild(list.getEl());
  }
};

SuggestionView.prototype.template = function () {
  return `<div class="suggestion__tit">${this.title}</div><div class="suggestion__list-cont"></div>`;
};

function SuggestionList({ list, start } = { start: 1 }) {
  this.$target;
  this.list = list;
  this.start = start;
  this.init();
}

SuggestionList.prototype.init = function () {
  this.$target = this.createEl();
  this.appendListItems();
};

SuggestionList.prototype.createEl = function () {
  return _.genEl('OL', {
    classNames: ['suggestion__list'],
    // attributes: { start: this.start },
  });
};

SuggestionList.prototype.appendListItems = function () {
  this.list.forEach((itemData, idx) => {
    const li = new SuggestionListItem({
      data: itemData,
      rank: idx + this.start,
    });
    this.$target.appendChild(li.getEl());
  });
};

SuggestionList.prototype.getEl = function () {
  return this.$target;
};

function SuggestionListItem({ data, rank }) {
  this.$target;
  this.data = data;
  this.rank = rank;
  this.init();
}

SuggestionListItem.prototype.init = function () {
  this.$target = this.createEl();
};

SuggestionListItem.prototype.createEl = function () {
  return _.genEl('LI', {
    classNames: ['suggestion__list__item'],
    template: this.template(),
  });
};

SuggestionListItem.prototype.getEl = function () {
  return this.$target;
};

SuggestionListItem.prototype.template = function () {
  return `<a href="${this.data.linkurl}">
            <span class="suggestion__list__item__rank">${this.rank}</span>
            ${this.data.keyword}
          </a>`;
};
