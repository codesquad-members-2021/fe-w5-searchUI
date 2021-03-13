import Component from "../core/Component.js";
import { _ } from "../utils/dom.js";
import { debounce, pipe } from "../utils/fns.js";
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
    hotKeywords: (await getHotKeywords()).slice(0, 10),
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
  <div class="wrap_rollingKeywords" style="display:block;"></div>
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
  this.addEvent("focusin", "#input_search", () => {
    this.handlerOfFocusInOut();
  });
  this.addEvent("focusout", "#input_search", () => {
    this.handlerOfFocusInOut();
  });
  const handlerOfInputKeyword = debounce(
    this.handlerOfInputKeyword.bind(this),
    200
  );
  this.addEvent("input", "#input_search", handlerOfInputKeyword);
  this.addEvent("input", "#input_search", ({ target }) => {
    this.switchSuggestion(target);
  });
};

SearchBar.prototype.handlerOfFocusInOut = function () {
  const toggle = pipe(
    this.toggleHotKeywords.bind(this),
    this.toggleWrapSuggestion,
    this.toggleRollingKeywords.bind(this)
  );
  toggle();
};

SearchBar.prototype.handlerOfInputKeyword = function ({ target }) {
  const len = target.value.length;
  // if (len < 2) return;
  console.log("input!");
};

SearchBar.prototype.toggleWrapSuggestion = function (onSearch) {
  _.$(".wrap_suggestion").style.display = onSearch ? "block" : "none";
  return onSearch;
};

SearchBar.prototype.switchSuggestion = function (target) {
  const len = target.value.length;
  if (len > 1) return;

  const { searching } = this.state;
  !searching || !len
    ? searching
      ? this.onHotKeywords()
      : this.onAutoKeywords()
    : "null";
};
SearchBar.prototype.onHotKeywords = function () {
  _.$(".suggestion_hot").style.display = "block";
  _.$(".suggestion_auto").style.display = "none";
  this.setState({ searching: false }, false);
};

SearchBar.prototype.onAutoKeywords = function () {
  _.$(".suggestion_auto").style.display = "block";
  _.$(".suggestion_hot").style.display = "none";
  this.setState({ searching: true }, false);
};

SearchBar.prototype.toggleHotKeywords = function () {
  let { onSearch, searching } = this.state;
  onSearch = !onSearch;
  this.setState({ onSearch }, false);

  _.$(".suggestion_hot").style.display =
    onSearch && !searching ? "block" : "none";

  return onSearch;
};

SearchBar.prototype.toggleRollingKeywords = function (onSearch) {
  _.$(".wrap_rollingKeywords").style.display =
    !onSearch && this.isEmpty() ? "block" : "none";
};

SearchBar.prototype.isEmpty = function () {
  return _.$("#input_search").value === "" ? true : false;
};
