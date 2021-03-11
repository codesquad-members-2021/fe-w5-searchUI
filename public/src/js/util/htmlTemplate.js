import { CLASS_LIST } from './data.js';
import { createDom } from './util.js';

export const makeSlideItem = (imgurl) => `
<div class="slide-item">
    <img src="${imgurl}"/>
</div>
`;

export const makeItemList = ({ imgurl, title, info }) => `
<li class='event-item'>
  <a href='#'>
    <div class='item-img'>
      <img src="${imgurl}"/>
    </div>
    <div class='item-title'>${title}</div>
    <div class='item-info'>${info}</div>
    <div class='item-theme'>테마</div>
  </a>
</li>                        
`;

export const makeMoreBtn = ({ now, total, fold = false }) => `
<span>${fold ? '접기' : '더보기'}</span>
<span class="more-index">(${now}/${total})</span>
<span><i class="fas fa-angle-${fold ? 'up' : 'down'}"></i></span>
`;

export const makeRecommendItem = (idx, value) => `<li><span><strong>${idx}</strong></span><span>${value}</span></li>`;

export const makeAutoCompleteItem = ({ value, keyword }) => {
  if (value.indexOf(keyword) < 0) return li({ value, classes: [CLASS_LIST.AUTOCOMPLETE_ITEM] });
  else {
    const keywordLength = keyword.length;
    const keywordIdx = value.indexOf(keyword);
    const newValue =
      value.slice(0, keywordIdx) +
      span({ value: keyword, classes: ['text-red'] }) +
      value.slice(keywordIdx + keywordLength);
    return li({ value: newValue, classes: [CLASS_LIST.AUTOCOMPLETE_ITEM] });
  }
};

const span = createDom('span');

export const li = createDom('li');

export const ul = createDom('ul');
