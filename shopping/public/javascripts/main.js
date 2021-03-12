import Slider from "./slider.js";
import Morebtn from "./more.js";
import RollingList from "./rollingList.js";
import SuggestionList from "./SuggestionList.js";
import inputEvent from "./inputEvent.js";
import Banner from "./banner.js";
import _ from "./utils/utils.js";
import $ from "./utils/DOMselector.js";
import urls from "./utils/urls.js";

window["responseJsonpData"] = function (data) {
  inputevent.inputValue(
    data.items.map((value) => value.substr(0, value.length - 2))
  );
};

await fetch(urls.moreList)
  .then((res) => res.json())
  .then((json) => {
    const banner = new Banner(json.event, json.mileageList, $.banner);
    const morebtn = new Morebtn(json.mallEventList, $.moreBtn, $.moreContainer);
    morebtn.init();
    banner.init();
  });

fetch(urls.topRecomKey)
  .then((res) => res.json()) //
  .then((d) => {
    const _rollinglist = new RollingList(d.list, $.keyword);
    const _suggestionlist = new SuggestionList(d.list, $.suggestionKeywords);
    _rollinglist.init();
    _suggestionlist.init();
  });

const inputevent = new inputEvent($.input, $.suggestion, $.keyword);
const slider = new Slider($.banner);
inputevent.init();
slider.init();
