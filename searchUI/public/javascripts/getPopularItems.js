import { _ } from './util.js';

export default class SearchBar {
  constructor() {
    this.$popularItems = _.$('.header--search--keyword');
    this.$searchInput = _.$('.header--search--input');
    this.init();
  }
}

SearchBar.prototype.init = async function () {
  _.addEvent(
    this.$popularItems,
    'transitionend',
    this.handleLastItem.bind(this)
  );
  _.addEvent(this.$searchInput, 'click', this.handleSearchBar.bind(this));
  const $popularItems = _.$('.header--search--keyword');
  const json = await this.fetchPopularItemsJSON();
  const html = await this.makeItemListHTML(json);
  this.setValueInItem($popularItems, html);
  this.automateItemMove();
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
  const pupularItemHTML = json
    .slice(0, ITEM_COUNT)
    .map(
      (v, i) =>
        `<li>
        <span>${i + 1}</span>
        ${v.keyword}
         </li>`
    )
    .join(' ');
  return `<ol> ${pupularItemHTML} </ol>`;
};

SearchBar.prototype.setValueInItem = function (domClass, htmlTemplate) {
  return (domClass.innerHTML = htmlTemplate);
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

SearchBar.prototype.handleSearchBar = function () {
  const dropDownPopularItemList = _.$('.header--popular-item');
  dropDownPopularItemList.style.setProperty('visibility', 'visible');
};
