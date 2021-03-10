import Component from "../core/Component.js";
import { _ } from "../utils/dom.js";

export default function SearchBar($target, props) {
  Component.call(this, $target, props);
}

SearchBar.prototype = Object.create(Component.prototype);
SearchBar.prototype.setup = function () {
  this.state = { test: 1 };
};
SearchBar.prototype.getTemplate = function () {
  return /*html*/ `
        <h2>검색</h2>
        <form></form>
    `;
};
SearchBar.prototype.mount = function () {};
SearchBar.prototype.setEvents = function () {};
