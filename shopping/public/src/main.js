import { api } from "./utils/api.js";
import { urls } from "./utils/urls.js";
import { _ } from "./utils/selector.js";
import { keywordState, rollings } from "./utils/states.js";
import { setHtmls, insertAdjacent, insertContents } from "./setters/setHtmls.js";
import * as htmlMaker from "./utils/htmlMaker.js";
import { setCarousel } from "./setters/setCarousel.js";
// import RecommendedItem from "./search/recommItems.js";
import RecommItems from "./search/recommItems.js";
import Roller from "./search/roller.js";

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
// 2. 리팩토링
// 3. 3주차 코드도 리팩토링

keywordState.searchingInput = _.$(".searchBar__input");
keywordState.recommWordsToggle = _.$(".searchBar__toggle");

rollings.rollingContainer = _.$(".rolling__container");
rollings.rollingKeywordHtml = _.$(".rolling__keyword");

const recommItems = new RecommItems(keywordState, rollings);
const roller = new Roller(keywordState.searchingInput, rollings);
recommItems.registerEvent();
roller.roll();
