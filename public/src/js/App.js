import Component from "./core/Component.js";
import Header from "./Components/Header.js";
import { _ } from "./utils/dom.js";

export default function App($target, props) {
  Component.call(this, $target, props);
}

App.prototype = Object.create(Component.prototype);
App.prototype.setup = function () {
  this.state = { test: 1 };
};
App.prototype.getTemplate = function () {
  return /*html*/`
        <header id ="header"></header>
    `;
};
App.prototype.mount = function () {
  new Header(_.$("#header"), {});
};
App.prototype.setEvents = function () {};
