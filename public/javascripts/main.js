import "regenerator-runtime/runtime";
import TopCarouselUI from "./TopCarouselUI.js";
import BottomCarouselUI from "./BottomCarouselUI.js";
import ViewMoreUI from "./ViewMoreUI.js";
import _ from "./util.js";
import { SearchBarUI } from "./SearchBarUI.js";
import { SearchPopupUI } from "./SearchPopupUI.js";

const API = "https://shoppinghow.kakao.com/v3/m/search/extends.json";
const $input = _.$(".search-form__input");

const topCarouselUI = new TopCarouselUI();
const viewMoreUI = new ViewMoreUI();
const bottomCarouselUI = new BottomCarouselUI();

const searchBarUI = new SearchBarUI(API);
const searchPopupUI = new SearchPopupUI(API, $input);
searchBarUI.getJson();
searchBarUI.renderKeywordList();
searchBarUI.setToRepeatRoll();
searchPopupUI.renderPopupBox();
