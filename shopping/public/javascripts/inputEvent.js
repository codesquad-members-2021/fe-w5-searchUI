import _ from "./utils.js";

const inputEvent = function (input, suggestionList, rollingList) {
  this.input = input;
  this.suggestionList = suggestionList;
  this.rollingList = rollingList;
};

inputEvent.prototype = {
  init() {
    this.onEvent();
  },

  onEvent() {
    _.on(this.input, "focusin", () =>
      this.FocusEventHandler(this.suggestionList, this.rollingList)
    );
    _.on(this.input, "focusout", () =>
      this.FocusEventHandler(this.rollingList, this.suggestionList)
    );
    _.on(this.input, "input", ({ target }) =>
      this.inputEventHandler(target.value)
    );
  },

  FocusEventHandler(target1, target2) {
    _.remove(target1, "none");
    _.add(target2, "none");
  },
  requestJsonp(word, callback) {
    const script = document.createElement("script");
    script.src = `https://suggest-bar.daum.net/suggest?callback=${callback}&limit=10&mode=json&code=utf_in_out&q=${word}&id=shoppinghow_suggest`;
    document.body.append(script);
  },

  inputEventHandler(value) {
    this.requestJsonp(value, "responseJsonpData");
  },

  constructor: inputEvent,
};

export default inputEvent;
