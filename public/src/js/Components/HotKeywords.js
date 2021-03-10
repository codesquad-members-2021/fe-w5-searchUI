import Component from "../core/Component.js";
import { _ } from "../utils/dom.js";

export default function HotKeywords($target, props) {
  Component.call(this, $target, props);
}

HotKeywords.prototype = Object.create(Component.prototype);
HotKeywords.prototype.setup = function () {
  this.state = { test: 1 };
};
HotKeywords.prototype.getTemplate = function () {
  return /*html*/`
        <div class ="HotKeywords"></div>
        
    `;
};
HotKeywords.prototype.mount = function () {};
HotKeywords.prototype.setEvents = function () {};
