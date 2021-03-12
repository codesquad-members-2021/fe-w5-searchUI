import API from './api.js';

const api = new API();

export default function Search({ keywordTarget, searchTarget, searchBarTarget, searchTextTarget, rollKeywordTarget, keywords }) {
  this.keywordTarget = keywordTarget;
  this.searchTarget = searchTarget;
  this.searchBarTarget = searchBarTarget;
  this.searchTextTarget = searchTextTarget;
  this.rollKeywordTarget = rollKeywordTarget;
  this.keywords = keywords;
  this.timeOut = null;
};

Search.prototype = {
  init,
  renderKeywordList,
  getKeywordBlock,
  getTitleBlock,
  createKeywordEvent,
  clickKeyword,
  createSearchTextEvent,
  handleSearchTextEvent,
  selectSearchTargetItem,
  searchText,
  getSearchList,
  renderSearchList,
  createSearchBarEvent,
  leaveSearchBarEvent,
  handleList,
  focusInSearchText,
  focusOutSearchText
}

Search.constructor = Search;

function init() {
  this.renderKeywordList();
  this.createKeywordEvent();
  this.createSearchTextEvent();
  this.createSearchBarEvent();
}

function renderKeywordList() {
  const list = this.keywords.reduce((acc, item, i) => acc += this.getKeywordBlock(item, i), '');
  this.keywordTarget.insertAdjacentHTML('afterbegin', this.getTitleBlock());
  this.keywordTarget.querySelector('ul').innerHTML = list;
}

function getKeywordBlock(item, i) {
  return `<li data-value="${item}"><span class="keyword__rank">${i + 1}</span><span>${item}</span></li>`
}

function getTitleBlock() {
  return '<p class="keyword__label">인기 쇼핑 키워드</p>';
}

function createKeywordEvent() {
  this.keywordTarget.addEventListener('click', ({ target }) => this.clickKeyword(target));
}

function clickKeyword(target) {
  if(target.tagName === 'SPAN') {
    const value = target.closest('li').dataset.value;
    this.searchTextTarget.value = value;
    this.focusInSearchText();
  }
};

function createSearchTextEvent() {
  const { searchTextTarget } = this;
  searchTextTarget.addEventListener('focusin', () => this.handleList('in'));
  searchTextTarget.addEventListener('focusout', () => this.handleList('out'));
  searchTextTarget.addEventListener('keydown', e => this.handleSearchTextEvent(e));
}

function handleSearchTextEvent(event) {
  switch(event.key) {
    case 'ENTER': break; // 로컬스토리지로 캐시 구현
    case 'ArrowUp': this.selectSearchTargetItem(event, 'up'); break;
    case 'ArrowDown': this.selectSearchTargetItem(event, 'down'); break;
    default: this.searchText(event.target); break;
  }
}

function searchText(target) {
  if(this.timeOut) clearTimeout(this.timeOut);
  this.timeOut = setTimeout(() => this.getSearchList(target.value), 1000);
};

function selectSearchTargetItem(event, type) {
  const { searchList } = this;
  if(!searchList) return;

  event.preventDefault();

  const activeIndex = +(searchList.dataset.active || -1);
  if(activeIndex !== -1)
    searchList.childNodes[activeIndex].classList.remove('active');
  let nextActiveIndex = activeIndex + (type === 'up' ? -1 : 1);
  if(nextActiveIndex < 0)
    nextActiveIndex = searchList.childNodes.length - 1;
  if(nextActiveIndex > searchList.childNodes.length - 1)
    nextActiveIndex = 0;
  searchList.dataset.active = nextActiveIndex;
  searchList.childNodes[nextActiveIndex].classList.add('active');
}

async function getSearchList(value) {
  if(value !== '') {
    const data = await api.getSearchList(value);
    this.renderSearchList(data.list, value);
  } else {
    this.renderSearchList([]);
  }
};

function renderSearchList(list, value) {
  const {
    searchTarget,
    keywordTarget,
  } = this;
  this.searchList = null;
  const ul = searchTarget.querySelector('ul');
  if(list.length < 1) {
    ul.innerHTML = '';
    searchTarget.classList.add('hidden');
    keywordTarget.classList.remove('hidden');
    return;
  }
  const str = list.reduce((acc, cur, i) => {
    acc += `<li data-value="${cur}"><a target="_blank" href="https://www.amazon.com/s?k=${encodeURI(cur)}&sprefix=${encodeURI(cur)}"><span>${cur.replace(value, `<span class="highlight-color">${value}</span>`)}</span></a></li>`;
    return acc;
  }, '');
  ul.innerHTML = str;
  this.searchList = ul;
  searchTarget.classList.remove('hidden');
  keywordTarget.classList.add('hidden');
}

function createSearchBarEvent() {
  this.searchBarTarget.addEventListener('mouseleave', () => this.leaveSearchBarEvent());
}

function leaveSearchBarEvent() {
  const {
    searchTarget,
    searchTextTarget, 
    keywordTarget,
  } = this;
  searchTarget.classList.add('hidden');
  keywordTarget.classList.add('hidden');
  searchTextTarget.classList.remove('active');
  searchTextTarget.blur();
}

function handleList(type) {
  if(type === 'in') {
    this.focusInSearchText();
  } else {
    this.focusOutSearchText();
  }
}

function focusInSearchText() {
  const {
    searchTarget,
    searchTextTarget, 
    keywordTarget,
    rollKeywordTarget
  } = this;
  if(searchTarget.querySelector('li')) {
    searchTarget.classList.remove('hidden');
  } else {
    keywordTarget.classList.remove('hidden');
  }
  rollKeywordTarget.classList.add('hidden');
  searchTextTarget.classList.add('active');
}

function focusOutSearchText() {
  const {
    searchTextTarget, 
    rollKeywordTarget
  } = this;
  setTimeout(() => {
    if(searchTextTarget.value === '') {
      rollKeywordTarget.classList.remove('hidden');
    }
  }, 100);
}
