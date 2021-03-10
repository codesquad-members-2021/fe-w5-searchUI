import Component from "../core/Component.js";
import { _ } from "../utils/dom.js";

export default function RecentKeywords($target, props) {
  Component.call(this, $target, props);
}

RecentKeywords.prototype = Object.create(Component.prototype);
RecentKeywords.prototype.setup = function () {
  this.state = { test: 1 };
};
RecentKeywords.prototype.getTemplate = function () {
  return /*html*/ `
        <div class ="recentKeywords"></div>
    `;
};
RecentKeywords.prototype.mount = function () {};
RecentKeywords.prototype.setEvents = function () {};
