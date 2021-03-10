import { _ } from './util.js';

export default class SearchBar {
  constructor() {
    this.$dropDownPopularItemList = _.$('.header--popular-item');
    this.$popularItems = _.$('.header--search--keyword');
    this.$searchInput = _.$('.header--search--input');
    this.init();
  }
}

SearchBar.prototype.init = async function () {
  const $popularItems = _.$('.header--search--keyword');
  const json = await this.fetchPopularItemsJSON();
  const html = this.makeItemListHTML(json);
  this.setValueOnDom($popularItems, html);
  this.automateItemMove();

  _.addEvent(
    this.$popularItems,
    'transitionend',
    this.handleLastItem.bind(this)
  );
  _.addEvent(this.$searchInput, 'click', this.handleSearchBar.bind(this, html));
};

SearchBar.prototype.fetchPopularItemsJSON = async function () {
  const fetchURL =
    'https://shoppinghow.kakao.com/v1.0/shophow/top/recomKeyword.json?_=1615298253634';
  const response = await fetch(fetchURL);
  const popularItemdata = await response.json();
  const popularItemdataList = popularItemdata.list;
  return popularItemdataList;
};

SearchBar.prototype.makeItemListHTML = function (json) {
  const ITEM_COUNT = 10;
  const pupularItemInnerHTML = (v, i) => {
    return `<li>
        <span>${i + 1}</span>
        ${v.keyword}
         </li>`;
  };
  return `<ol> ${this.template(json, ITEM_COUNT, pupularItemInnerHTML)} </ol>`;
};

SearchBar.prototype.template = function (json, maxCount, innerHTML) {
  const html = json
    .slice(0, maxCount)
    .map((v, i) => innerHTML(v, i))
    .join(' ');
  return html;
};

SearchBar.prototype.setValueOnDom = function (domClass, htmlTemplate) {
  domClass.innerHTML = htmlTemplate;
};

SearchBar.prototype.scrollUp = function () {
  this.$popularItems.style.justifyContent = 'flex-start';
  this.$popularItems.style.transform = `translateY(-42px)`;
};

SearchBar.prototype.handleLastItem = function () {
  const $itemList = _.$('.header--search--keyword > ol');
  $itemList.appendChild($itemList.firstElementChild);

  this.$popularItems.style.setProperty('transition', 'none');
  this.$popularItems.style.setProperty('transform', 'translate(0)');
  setTimeout(() => {
    this.$popularItems.style.setProperty('transition', 'all 0.5s');
  });
};

SearchBar.prototype.automateItemMove = function () {
  setTimeout(() => {
    this.scrollUp();
    this.automateItemMove();
  }, 3000);
};

SearchBar.prototype.romoveDomTarget = function (target) {
  target.style.setProperty('visibility', 'hidden');
};

SearchBar.prototype.handleSearchBar = function (html) {
  const $dropDownPopularItemList = _.$('.header--popular-item');
  const dropDownHtml = `<p>인기쇼핑키워드</p> ${html}`;

  this.romoveDomTarget(this.$popularItems);
  $dropDownPopularItemList.style.setProperty('visibility', 'visible');

  this.setValueOnDom($dropDownPopularItemList, dropDownHtml);

  _.addEvent(
    this.$searchInput,
    'keyup',
    this.romoveDomTarget.bind(this, this.$dropDownPopularItemList)
  );
};
