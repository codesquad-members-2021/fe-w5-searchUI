import '../../scss/CarouselView.scss';
import { _ } from '../util';

const STYLE__LIST_ITEM_HEIGHT = 44; // px, margin-top + $list-item-height

export function CarouselView({ data, interval }) {
  this.$target;
  this.list;
  this.data = data;
  this.interval = interval;
  this.intervalHandler;
  this.currIdx = 0;
  this.init();
}

CarouselView.prototype.init = function () {
  this.$target = this.createEl();
  this.appendList();
  this.start();
  this.onEvents();
};

CarouselView.prototype.createEl = function () {
  return _.genEl('DIV', {
    classNames: ['carousel', 'on-slide'],
  });
};

CarouselView.prototype.appendList = function () {
  this.list = new CarouselList({ data: this.data, start: 1 });
  this.$target.appendChild(this.list.getEl());
};

CarouselView.prototype.slideUp = function () {
  if (!this.$target.classList.contains('on-slide')) this.$target.classList.add('on-slide');

  const currCssTop = parseInt(window.getComputedStyle(this.$target).top);
  this.$target.style.top = (currCssTop - STYLE__LIST_ITEM_HEIGHT).toString() + 'px';
  this.currIdx++;
};

CarouselView.prototype.onEvents = function () {
  this.$target.addEventListener('transitionend', this.onTransitionend.bind(this));
};

CarouselView.prototype.onTransitionend = function () {
  if (this.currIdx !== this.data.length) return;
  this.$target.classList.remove('on-slide');
  this.$target.style.top = '0px';
  this.currIdx = 0;
};

CarouselView.prototype.start = function () {
  if (this.intervalHandler) clearInterval(this.intervalHandler);

  this.intervalHandler = setInterval(() => {
    this.slideUp.call(this);
  }, this.interval);
};

CarouselView.prototype.stop = function () {
  clearInterval(this.intervalHandler);
};

CarouselView.prototype.show = function () {
  this.$target.classList.remove('hide');
};

CarouselView.prototype.hide = function () {
  this.$target.classList.add('hide');
};

CarouselView.prototype.getEl = function () {
  return this.$target;
};

function CarouselList({ data, start }) {
  this.$target;
  this.data = data;
  this.start = start;
  this.init();
}

CarouselList.prototype.init = function () {
  this.$target = this.createEl();
  this.appendListItems();
};

CarouselList.prototype.createEl = function () {
  return _.genEl('OL', {
    classNames: ['carousel__list'],
  });
};

CarouselList.prototype.appendListItems = function () {
  this.data.forEach((itemData, idx) => {
    const li = new CarouselListItem({
      data: itemData,
      rank: idx + this.start,
    });
    this.$target.appendChild(li.getEl());
  });
  this.$target.appendChild(this.$target.firstElementChild.cloneNode(true));
};

CarouselList.prototype.getEl = function () {
  return this.$target;
};

function CarouselListItem({ data, rank }) {
  this.$target;
  this.data = data;
  this.rank = rank;
  this.init();
}

CarouselListItem.prototype.init = function () {
  this.$target = this.createEl();
};

CarouselListItem.prototype.createEl = function () {
  return _.genEl('LI', {
    classNames: ['carousel__list__item'],
    template: this.template(),
  });
};

CarouselListItem.prototype.getEl = function () {
  return this.$target;
};

CarouselListItem.prototype.template = function () {
  return `<span class="carousel__list__item__rank">${this.rank}</span>${this.data.keyword}`;
};
