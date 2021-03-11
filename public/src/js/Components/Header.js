import Component from "../core/Component.js";
import SearchBar from "./SearchBar.js";
import { _ } from "../utils/dom.js";

export default function Header($target, props) {
  Component.call(this, $target, props);
}

Header.prototype = Object.create(Component.prototype);
Header.prototype.setup = function () {
  this.state = { test: 1 };
};
Header.prototype.getTemplate = function () {
  return /*html*/ `
        <div class="wrap_header">
          <h1 class="logo">
            <a href="#"
              ><img
                src="https://search1.daumcdn.net/search/cdn/simage/shopping/v2/common/nav/logo_shw.png"
                alt=""
            /></a>
          </h1>
          <div class="searchBar"></div>
        </div>
    `;
};
Header.prototype.mount = function () {
  new SearchBar(_.$(".searchBar"), {});
};
Header.prototype.setEvents = function () {};
