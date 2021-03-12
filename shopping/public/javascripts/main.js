import Slider from "./slider.js";
import Morebtn from "./more.js";
import RollingList from "./rollingList.js";
import SuggestionList from "./SuggestionList.js";
import inputEvent from "./inputEvent.js";
import _ from "./utils/utils.js";
import $ from "./utils/DOMselector.js";
import urls from "./utils/urls.js";
const slider = new Slider($.banner);
const inputevent = new inputEvent($.input, $.suggestion, $.keyword);

slider.init();
inputevent.init();

window["responseJsonpData"] = function (data) {
  
  inputevent.inputValue(data.items.map((value) => value.substr(0, value.length-2)));
};

fetch(urls.moreList)
  .then((res) => res.json())
  .then((json) => {
    const morebtn = new Morebtn(json.mallEventList, $.moreBtn, $.moreContainer);
    morebtn.init();
  });

fetch(urls.topRecomKey)
  .then((data) => new Promise((res) => res(data.json()))) //
  .then((d) => {
    const _rollinglist = new RollingList(d.list, $.keyword);
    const _suggestionlist = new SuggestionList(d.list, $.suggestionKeywords);
    _rollinglist.init();
    _suggestionlist.init();
  });
