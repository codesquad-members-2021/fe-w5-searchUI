import _ from "./utils/utils.js";
import html from "./utils/HtmlTemplete.js";
import urls from "./utils/urls.js";
const inputEvent = function (input, suggestionList, rollingList) {
  this.input = input;
  this.suggestionList = suggestionList;
  this.rollingList = rollingList;
  this.suggestionInner = _.$(".suggestionKeywords", suggestionList);
};

inputEvent.prototype = {
  init() {
    this.onEvent();
  },

  onEvent() {
    _.on(this.input, "focusin", () =>
      this.FocusEventHandler(this.suggestionList, this.rollingList)
    );
    _.on(this.input, "focusout", ({ target }) => {
      if (target.value) {
        _.add(this.rollingList, "none");
        _.add(this.suggestionList, "none");
      } else {
        this.FocusEventHandler(this.rollingList, this.suggestionList);
      }
    });
    _.on(this.input, "input", ({ target }) =>
      this.inputEventHandler(target.value)
    );
    _.on(this.input, "keydown", (e) =>
      this.KeydownEventHandeler(e.keyCode, e.target.value, this.suggestionList)
    );
  },

  FocusEventHandler(target1, target2) {
    _.remove(target1, "none");
    _.add(target2, "none");
  },

  inputEventHandler(value) {
    urls.requestSearchJsonp(value, "responseJsonpData");
  },

  KeydownEventHandeler(keyCode, inputValue, Parents) {
    switch (keyCode) {
      case 38:
        console.log("up");
        break;

      case 40:
        console.log("down");
        break;
    }
  },

  insertHTML(Parents) {
    Parents.innerHTML = this.makeTitleHTML();
  },

  inputValue(value) {
    this.suggestionInner.innerHTML = value
      .map((keyword) => html.inputListHTML(keyword))
      .reduce((acc, cur) => (acc += cur));
  },

  constructor: inputEvent,
};

export default inputEvent;
