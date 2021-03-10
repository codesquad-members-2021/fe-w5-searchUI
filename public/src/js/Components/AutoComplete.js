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
    <ol>
        <li>자동 검색</li>
        <li>자동 검색</li>
        <li>자동 검색</li>
        <li>자동 검색</li>
        <li>자동 검색</li>
        <li>자동 검색</li>
        <li>자동 검색</li>
        <li>자동 검색</li>
        <li>자동 검색</li>
        <li>자동 검색</li>
    </ol>
    `;
};
AutoComplete.prototype.mount = function () {};
AutoComplete.prototype.setEvents = function () {};
