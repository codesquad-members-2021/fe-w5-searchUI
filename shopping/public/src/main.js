import { api } from "./utils/api.js";
import { urls } from "./utils/urls.js";
import { _ } from "./utils/selector.js";
import { times, searchToggle } from "./utils/states.js";
import { setHtmls, insertAdjacent, insertContents } from "./setters/setHtmls.js";
import * as htmlMaker from "./utils/htmlMaker.js";
import { setCarousel } from "./setters/setCarousel.js";
// import RecommendedItem from "./search/recommItems.js";
import { RecommItems } from "./search/recommItems.js";

// event 상품
const eventItemHtml = document.querySelector(".event__item");
const eventItem = api(urls.event)(setHtmls, htmlMaker.eventItem, insertContents)(eventItemHtml);

// mileage 상품 - 캐러셀 3개 with pagination
const slideList = document.querySelector(".slide_list");
const pagination = document.querySelector(".slide_pagination");
const mileageItems = api(urls.mileageList)(setHtmls, htmlMaker.mileageListHtml, insertContents)(slideList);
mileageItems
  .then(() => htmlMaker.paginationHtml(pagination))
  .then((contents) => {
    const paginationClassName = "slide_pagination";
    const pageDotClassName = "btn_paging";
    const buttonsClassName = "buttons_pagination";
    const spec = { slideContents: contents, slideList, slideWidth: 485, slideSpeed: 300, startNum: 0, buttonsClassName };
    setCarousel(spec)(false, true)(paginationClassName, pageDotClassName);
  });

// mallEvent 상품 - 더보기 클릭시 item 불러오기
const mallEventSlideHtml = document.querySelector("#mallEventSlide");
const mallEventItems = api(urls.mallEventList)(setHtmls, htmlMaker.mallEventListHtml, insertContents)(mallEventSlideHtml, 5);

const readmoreButton = document.querySelector("#mallEventList_more");
readmoreButton.addEventListener("click", () => api(urls.mallEventList)(insertAdjacent, htmlMaker.mallEventListHtml)(mallEventSlide).catch((err) => insertContents(readmoreButton)("마지막")));

// hotdeal 상품 - 캐러셀 5개 with longClick
const hotDealItemHtml = document.querySelector(".content_hotDeal");
const hotdealItems = api(urls.hotdeal)(setHtmls, htmlMaker.homeContentsList, insertContents)(hotDealItemHtml, "hotDeal");
hotdealItems.then(() => {
  const slideContents = document.querySelectorAll(".hotDeal_item");
  const hotdealList = document.querySelector(".content_hotDeal");
  const buttonsClassName = "buttons_hotDeal";
  const spec = { slideContents, slideList: hotdealList, slideWidth: 252, slideSpeed: 300, buttonsClassName, startNum: 0 };
  setCarousel(spec)(true, false)();
});

// keyword 상품
const keywordItemHtml = document.querySelector(".content_keyword");
const keywordItems = api(urls.keyword)(setHtmls, htmlMaker.homeContentsList, insertContents)(keywordItemHtml, "keyword");

// how - relate 상품
const howRelateItemHtml = document.querySelector(".how__relate");
const howRelateItems = api(urls.howRelate)(setHtmls, htmlMaker.homeContentsList, insertContents)(howRelateItemHtml, "how");

// how - same category 상품
const howSameHtml = document.querySelector(".how__same");
const howSameItems = api(urls.howSame)(setHtmls, htmlMaker.homeContentsList, insertContents)(howSameHtml, "how");

// partners
const contPartnerHtml = document.querySelector(".cont_partner");
const partners = api(urls.partners)(setHtmls, htmlMaker.partnerList, insertContents)(contPartnerHtml);

/*********************************** w5 - searchUi *****************************************/
// 여기서부터 이번주 미션 시작
// 개략적인 계획
// 1. 일단 "작동"에 집중한 기능 구현
// 2. 리팩토링
// 3. 3주차 코드도 리팩토링

const searchingInput = _.$(".searchBar__input");
const recommendedWordsToggle = _.$(".searchBar__toggle");
searchToggle.searchingInput = searchingInput;
searchToggle.recommWordsToggle = recommendedWordsToggle;
const recommItems = new RecommItems(searchToggle);
recommItems.registerEvent();
// console.log(recommendedWordsToggle);
// const recommendedItem = new RecommendedItem(searchingInput, recommendedWordsToggle);
// recommendedItem.init();

// amazon-search test
// async function request(inputValue) {
//   const response = await fetch(urls.recommendedWords(inputValue));
//   const data = await response.json();
//   return data;
// }

// request recommededWords related to inputValue

// let timer;
// let recommendations = [];
// let currIndex = -1;
// let popularShoppingKeyword = null;

// const words = fetch(urls.topTenWords).then((res) => res.json());
// words
//   .then(({ popularWords }) => {
//     recommendedWordsToggle.innerHTML = ``;
//     popularShoppingKeyword =
//       Object.entries(popularWords[0]).reduce((acc, item) => {
//         const [num, product] = item;
//         acc += `<span class="popularWords__rank" data-id=${num}>${num}</span>
//           <span class="popularWords__product" data-id=${num}>${product}</span>`;
//         return acc;
//       }, `<div class="popularWords">`) + `</div>`;
//     return popularShoppingKeyword;
//   })
//   .then((words) => (recommendedWordsToggle.innerHTML = words));

// // when user focus on the input
// searchingInput.addEventListener("focus", (e) => {
//   console.log("hello");
//   console.log(e.target.value);
//   recommendedWordsToggle.style.visibility = "visible";
//   // innnerText = top 10 popular words
// });

// // when user type the value on the input
// searchingInput.addEventListener("input", (e) => {
//   const inputValue = e.target.value;
//   if (inputValue === ``) {
//     if (timer) clearTimeout(timer);
//     recommendedWordsToggle.innerHTML = popularShoppingKeyword;
//   }
//   currIndex = -1;
//   if (inputValue !== ``) {
//     if (timer) clearTimeout(timer);
//     timer = setTimeout(() => {
//       const data = request(urls.recommendations, inputValue);
//       data.then(({ suggestions }) => {
//         recommendations = suggestions.map((item) => item.value);
//         const set = new Set([...recommendations]); // 다시 값을 입력했는데 가습기가 두번 나옴
//         recommendations = [...set];
//         const tempRecommendations = recommendations.reduce((acc, item, i) => acc + `<span class="recommended__item" data-id="${i}">${item}</span>`, ``);
//         recommendedWordsToggle.innerHTML = tempRecommendations;
//         recommendedWordsToggle.style.visibility = "visible";
//       });
//     }, times.debounce);
//   }
// });

// // register event of direction-key to select the related word of recommendations

// let coloredElement = null;
// let currElement = null;

// searchingInput.addEventListener("keydown", (e) => {
//   const { key } = e;
//   if (recommendedWordsToggle.style.visibility === "hidden") {
//     recommendedWordsToggle.style.visibility = "visible";
//   }
//   if (key.includes("Arrow")) {
//     if (key === "ArrowUp") {
//       if (currIndex >= 0) {
//         currIndex--;
//         currElement = _.$All(".recommended__item")[currIndex];
//         if (coloredElement) coloredElement.style.color = "#000";
//         currElement.style.color = "#ddd";
//         coloredElement = currElement;
//       }
//       if (currIndex < 0) {
//         if (coloredElement) {
//           coloredElement.style.color = "#000";
//           coloredElement = null;
//           currElement = null;
//         }
//         recommendedWordsToggle.style.visibility = "hidden";
//       }
//     }
//     if (key === "ArrowDown") {
//       if (currIndex < recommendations.length) {
//         currIndex++;
//         currElement = _.$All(".recommended__item")[currIndex];
//         if (coloredElement) coloredElement.style.color = "#000";
//         currElement.style.color = "#ddd";
//         coloredElement = currElement;
//       }
//       if (currIndex >= recommendations.length) {
//         if (coloredElement) {
//           coloredElement.style.color = "#000";
//           coloredElement = null;
//           currElement = null;
//         }
//         recommendedWordsToggle.style.visibility = "hidden";
//       }
//     }
//   }
// });
