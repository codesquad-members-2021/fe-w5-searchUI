import Component from "../core/Component.js";
import SearchBar from "./SearchBar.js";
import { _ } from "../utils/dom.js";

export default function RollingKeywords($target, props) {
  Component.call(this, $target, props);
}

RollingKeywords.prototype = Object.create(Component.prototype);
RollingKeywords.prototype.setup = function () {
  this.state = { test: 1 };
};
RollingKeywords.prototype.getTemplate = function () {
  return /*html*/ `
    <ol class="rollingKeywords">
      <li>테스트</li>
      <li>테스트</li>
      <li>테스트</li>
      <li>테스트</li>
      <li>테스트</li>
    </ol>
    `;
};
RollingKeywords.prototype.mount = function () {};
RollingKeywords.prototype.setEvents = function () {};
