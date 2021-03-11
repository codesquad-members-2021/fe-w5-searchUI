import Component from "../core/Component.js";
import { _ } from "../utils/dom.js";
import { debounce } from "../utils/fns.js";
import { getHotKeywords } from "../utils/requestKeyword.js";
import AutoComplete from "./AutoComplete.js";
import RollingKeywords from "./RollingKeywords.js";

export default function SearchBar($target, props) {
  Component.call(this, $target, props);
}

SearchBar.prototype = Object.create(Component.prototype);
SearchBar.prototype.setup = async function () {
  this.state = {
    onSearch: false,
    searching: false,
    hotKeywords: await getHotKeywords(),
  };
};
SearchBar.prototype.getTemplate = function () {
  const { hotKeywords, onSearch, searching } = this.state;
  return /*html*/ `
  <h2 class="hidden">검색</h2>
  <form action="" class="form_search">
    <fieldset>
      <legend class="hidden">쇼핑하우 검색</legend>
      <div class="box_search">
        <label for="input_search"></label>
        <input type="text" id="input_search" ${onSearch && "autofocus"}/>
        <button id="btn_search"></button>
      </div>
    </fieldset>
  </form>
  <div class="wrap_rollingKeywords"></div>
  <div class="wrap_suggestion">
    <div class="suggestion_hot" >
      <div>
        <strong>인기 쇼핑 키워드</strong>
      </div>
      <ol>
      ${hotKeywords
        .map((keyword, i) => `<li><span>${i + 1}</span> ${keyword}</li>`)
        .join("")}
      </ol>
    </div>
    <div class="suggestion_auto" style="${
      onSearch && searching && "display: block"
    }"></div>
  </div>
    `;
};
SearchBar.prototype.mount = function () {
  const { hotKeywords } = this.state;
  new RollingKeywords(_.$(".wrap_rollingKeywords"), {
    hotKeywords,
  });
  new AutoComplete(_.$(".suggestion_auto"), {});
};
SearchBar.prototype.setEvents = function () {
  const toggleHotKeywords = ({ target }) => {
    const { onSearch } = this.state;
    this.setState({ onSearch: !onSearch }, false);
    const $suggestionHot = _.$(".suggestion_hot");
    $suggestionHot.style.display = !onSearch ? "block" : "none";
  };
  const inputKeyword = () => {};
  this.addEvent("focusin", "#input_search", toggleHotKeywords);
  this.addEvent("focusout", "#input_search", toggleHotKeywords);
  // this.addEvent("input", "#input_search", debounce(inputKeyword, 1000));
};
