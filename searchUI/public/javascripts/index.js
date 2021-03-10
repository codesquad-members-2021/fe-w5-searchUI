import Carousel from './carousel.js';
import SearchBar from './getPopularItems.js';
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
