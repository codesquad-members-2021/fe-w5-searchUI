import Slider from "./slider.js";
import Morebtn from "./more.js";
import RollingList from "./rollingList.js";
import SuggestionList from "./SuggestionList.js";
import inputEvent from "./inputEvent.js";
import _ from "./utils.js";
const body = _.$("body");
const main = _.$(".main_section", body);
const header = _.$("header", body);
const banner = _.$(".banner__right", main);
const $moreBtn = _.$(".more_contents", main);
const $moreContainer = _.$(".shoppinglists", main);
const $keyword = _.$(".header__keywords", header);
const $suggestionItems = _.$(".suggestion__items", header);
const $suggestion = _.$(".header__suggestion", header);
const $input = _.$("input", header);
const slider = new Slider(banner);
const inputevent = new inputEvent($input, $suggestion, $keyword);

fetch("http://localhost:3000/moreItem.json")
  .then((res) => res.json())
  .then((json) => {
    const morebtn = new Morebtn(json.mallEventList, $moreBtn, $moreContainer);
    morebtn.init();
  });

fetch(
  "https://shoppinghow.kakao.com/v1.0/shophow/top/recomKeyword.json?_=1615183888074"
)
  .then((data) => new Promise((res) => res(data.json()))) //
  .then((d) => {
    const _rollinglist = new RollingList(d.list, $keyword);
    const _suggestionlist = new SuggestionList(d.list, $suggestionItems);
    _rollinglist.init();
    _suggestionlist.init();
  });

slider.init();
inputevent.init();
