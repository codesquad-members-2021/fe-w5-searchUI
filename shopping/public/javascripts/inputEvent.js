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
  },

  FocusEventHandler(target1, target2) {
    _.remove(target1, "none");
    _.add(target2, "none");
  },

  constructor: inputEvent,
};

export default inputEvent;
