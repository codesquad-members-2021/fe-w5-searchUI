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
  this.createObserver();
  this.addEvent("transitionend", ".rollingKeywords>li", ({ target }) => {
    this.moveFirstToLast(target);
  });
  this.rolling();
};
RollingKeywords.prototype.createObserver = function () {
  const moveFirstToLast_bind = this.moveFirstToLast.bind(this);
  const config = { attributes: true };
  
  const observer = new MutationObserver(callback);
  observer.observe(this.$target, config);

  function isTarget(mutation) {
    return mutation.target.attributes.style.value.includes("block");
  }
  function callback(mutationsList) {
    for (let mutation of mutationsList) {
      if (mutation.type === "attributes" && isTarget(mutation)) {
        const target = mutation.target.querySelector("li");
        moveFirstToLast_bind(target);
      }
    }
  }
};
RollingKeywords.prototype.moveFirstToLast = function (target) {
  const parent = target.closest(".rollingKeywords");
  parent.appendChild(target);
  target.removeAttribute("style");
  this.rolling();
};
RollingKeywords.prototype.rolling = function () {
  setTimeout(() => {
    const firstKeyword = _.$(".rollingKeywords>li");
    firstKeyword.style.height = 0;
  }, 1000);
};
