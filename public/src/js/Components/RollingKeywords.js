import Component from "../core/Component.js";
import SearchBar from "./SearchBar.js";
import { _ } from "../utils/dom.js";

export default function RollingKeywords($target, props) {
  Component.call(this, $target, props);
}

RollingKeywords.prototype = Object.create(Component.prototype);
RollingKeywords.prototype.setup = function () {};
RollingKeywords.prototype.getTemplate = function () {
  const { hotKeywords } = this.props;
  const lastKeyword = hotKeywords.pop();

  return /*html*/ `
  <div class="box_rolling">
    <ol class="rollingKeywords">
      <li><span>10 </span> ${lastKeyword}</li>
      ${hotKeywords
        .map((keyword, i) => `<li><span>${i + 1} </span> ${keyword}</li>`)
        .join("")}
    </ol>
  </div>
    `;
};
RollingKeywords.prototype.mount = function () {};
RollingKeywords.prototype.setEvents = function () {
  const moveFirstToLast = ({ target }) => {
    const parent = target.closest(".rollingKeywords");
    parent.appendChild(target);
    target.removeAttribute("style");
    this.rolling();
  };
  this.addEvent("transitionend", ".rollingKeywords>li", moveFirstToLast);
  this.rolling();
};
RollingKeywords.prototype.pauseRolling = function (rolling) {
  clearTimeout(rolling);
};
RollingKeywords.prototype.rolling = function () {
  setTimeout(() => {
    const firstKeyword = _.$(".rollingKeywords>li");
    firstKeyword.style.height = 0;
  }, 1000);
};
