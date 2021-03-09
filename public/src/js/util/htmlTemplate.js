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

export const makeRecommendItem = (idx, value) => `<li><strong>${idx}</strong>    ${value}</li>`;

export const li = createDom('li');

export const ul = createDom('ul');

export const ol = createDom('ol');
