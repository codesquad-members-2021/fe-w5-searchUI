import Slider from "./slider.js";
import Morebtn from "./more.js";
import _ from "./utils.js";
const main = _.$(".main_section");
const banner = _.$(".banner__right", main);
const $moreBtn = _.$(".more_contents", main);
const $moreContainer = _.$(".shoppinglists", main);
const slider = new Slider(banner);

fetch("http://localhost:3000/moreItem.json")

let item = fetch("http://localhost:3000/moreItem.json")

  .then((res) => res.json())
  .then((json) => {
    const morebtn = new Morebtn(json.mallEventList, $moreBtn, $moreContainer);
    morebtn.init();
  });

fetch(
  "https://shoppinghow.kakao.com/v1.0/shophow/top/recomKeyword.json?_=1615183888074"
)
  .then((data) => new Promise((res) => res(data.json()))) //
  .then((d)=> console.log(d.list));

console.log("help");



slider.init();

