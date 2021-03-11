import Component from "../core/Component.js";
import { _ } from "../utils/dom.js";
import { getHotKeywords } from "../utils/requestKeyword.js";
import AutoComplete from "./AutoComplete.js";
import RollingKeywords from "./RollingKeywords.js";

export default function SearchBar($target, props) {
  Component.call(this, $target, props);
}

SearchBar.prototype = Object.create(Component.prototype);
SearchBar.prototype.setup = async function () {
  const keyword = await getHotKeywords();
  console.log(keyword);
};
SearchBar.prototype.getTemplate = function () {
  return /*html*/ `
  <h2 class="hidden">검색</h2>
  <form action="" class="form_search">
    <fieldset>
      <legend class="hidden">쇼핑하우 검색</legend>
      <div class="box_search">
        <label for="input_search"></label>
        <input type="text" id="input_search" value="테스트" />
        <button id="btn_search"></button>
      </div>
    </fieldset>
  </form>
  <div class="wrap_rollingKeywords"></div>
  <div class="wrap_suggestion">
    <div class="suggestion_hot">
      <div>
        <strong>인기 쇼핑 키워드</strong>
      </div>
      <ol>
        <li><span>1</span>키워드</li>
        <li><span>1</span>키워드</li>
        <li><span>1</span>키워드</li>
        <li><span>1</span>키워드</li>
        <li><span>1</span>키워드</li>
        <li><span>1</span>키워드</li>
        <li><span>1</span>키워드</li>
        <li><span>1</span>키워드</li>
        <li><span>1</span>키워드</li>
        <li><span>1</span>키워드</li>
      </ol>
    </div>
    <div class="suggestion_auto"></div>
  </div>
    `;
};
SearchBar.prototype.mount = function () {
  new RollingKeywords(_.$(".wrap_rollingKeywords"), {});
  new AutoComplete(_.$(".suggestion_auto"), {});
};
SearchBar.prototype.setEvents = function () {};
