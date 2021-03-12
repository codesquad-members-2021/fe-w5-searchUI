import _ from "./utils/utils.js";
import html from "./utils/HtmlTemplete.js";
import urls from "./utils/urls.js";
const inputEvent = function (input, suggestionList, rollingList) {
  this.input = input;
  this.suggestionList = suggestionList;
  this.rollingList = rollingList;
  this.selectedIndex = -1;
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
      this.KeydownEventHandeler(e.keyCode, this.suggestionInner)
    );
  },

  FocusEventHandler(target1, target2) {
    _.remove(target1, "none");
    _.add(target2, "none");
  },

  inputEventHandler(value) {
    urls.requestSearchJsonp(value, "responseJsonpData");
  },

  KeydownEventHandeler(keyCode, Parents) {
    const list = _.$A("li", Parents);
    switch (keyCode) {
      case 38:
        if (this.selectedIndex >= 0) {
          this.selectedIndex -= 1;
        }
        break;

      case 40:
        if (this.selectedIndex < list.length - 1) {
          this.selectedIndex += 1;
        }
        break;
    }
    this.SelecteList(list);
  },

  insertHTML(Parents) {
    Parents.innerHTML = this.makeTitleHTML();
  },

  inputValue(value) {
    this.suggestionInner.innerHTML = value
      .map((keyword) => html.inputListHTML(keyword))
      .reduce((acc, cur) => (acc += cur));
  },

  SelecteList(List) {
    if (this.selectedIndex >= 0) {
      List.forEach((v) => _.remove(v, "selected"));
      _.add(List[this.selectedIndex], "selected");
    }
  },

  constructor: inputEvent,
};

export default inputEvent;
