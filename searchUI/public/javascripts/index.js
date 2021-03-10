import Carousel from './carousel.js';
import SearchBar from './searchBar.js';
import { _ } from './util.js';

const getJsonData = () => {
  const jsonData = {};
  const fileURL = './data/planningEvent.json';

  fetch(fileURL)
    .then((res) => res.json())
    .then((data) => {
      jsonData.bestsellingJson = data.event;
      jsonData.promotionJson = data.mileageList;
      jsonData.mdPickJson = data.mallEventList;
    })
    .then(() => {
      const $promotionImg = document.querySelector('.main--center__upper--img');
      const IMGCOUNT_PROMO = 3;

      const promotionHtml = jsonData.promotionJson
        .slice(0, IMGCOUNT_PROMO)
        .map((i) => `<img src="${i.imgurl}"/>`)
        .join('');
      $promotionImg.innerHTML = `<div class="upper--img--inner">${promotionHtml}</div>`;

      const $Paging = document.querySelector('.main--center__upper--page');
      const PagingHtml = `<img src="./images/page.png" alt="" class="" />`;
      $Paging.innerHTML = `<ul> ${PagingHtml.repeat(3)} </ul>`;

      const $mdPickImg = document.querySelector('.main--center__mdPick');
      const IMGCOUNT_MDPICK = 5;
      const mdPickHtml = jsonData.mdPickJson
        .slice(0, IMGCOUNT_MDPICK)
        .map(
          (i) => `<li>
        <img src="${i.imgurl}"/>
        <strong>${i.text}</strong>
        <span>${i.text2}</span>
        <img class="main--center__mdPick--icon" src="./images/theme.png" alt="">
        </li>`
        )
        .join('');
      $mdPickImg.innerHTML = `<ul> ${mdPickHtml} </ul>`;
    })
    .then(() => {
      const carousel = new Carousel(jsonData.promotionJson);
      const searchBar = new SearchBar();
    });
};

getJsonData();

const fetchURL =
  'https://shoppinghow.kakao.com/v1.0/shophow/top/recomKeyword.json?_=1615214614503';

async function fetchPopularItemsJSON() {
  const response = await fetch(fetchURL);
  const popularItemdata = await response.json();
  const popularItemdataList = popularItemdata.list;
  return setItemsIntoSearchBar(popularItemdataList);
}

function setItemsIntoSearchBar(json) {
  const $popularItems = _.$('.header--search--keyword');
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
  $popularItems.innerHTML = `<ol> ${pupularItemHTML} </ol>`;

  $popularItems.style.justifyContent = 'flex-start';
  $popularItems.style.top = `-42px`;

  // if ($popularItems.style.top === `-42px`) {
  const $foo = _.$('.header--search--keyword > ol');
  $foo.appendChild($foo.firstElementChild);
  console.log($foo.firstElementChild);
  // }

  $popularItems.style.transition = 'none';
  $popularItems.style.transform = 'translate(0)';
  setTimeout(() => {
    $popularItems.style.transition = 'all 0.5s';
  });

  $foo.addEventListener('transitionend', () => {
    handleLastItem();
  });
}

fetchPopularItemsJSON();
