import Component from "../core/Component.js";
import { _ } from "../utils/dom.js";

export default function AutoComplete($target, props) {
  Component.call(this, $target, props);
}

AutoComplete.prototype = Object.create(Component.prototype);
AutoComplete.prototype.setup = function () {
  this.state = { test: 1 };
};
AutoComplete.prototype.getTemplate = function () {
  return /*html*/`
        <header id ="header"></header>
    `;
};
AutoComplete.prototype.mount = function () {};
AutoComplete.prototype.setEvents = function () {};
