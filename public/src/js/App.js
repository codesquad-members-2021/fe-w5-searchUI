import Component from "./core/Component.js";
import Header from "./Components/Header.js";
import { _ } from "./utils/dom.js";

export default function App($target, props) {
  Component.call(this, $target, props);
}
App.prototype = Object.create(Component.prototype);
App.prototype.setup = function () {
  this.state = {
    onSearch: false,
    isSearching: false,
  };
};
// 상태값 설정, 일단 App에서 모든 상태를 관리한다.
//최하위 컴포넌트까지 props로 계속 전달하더라도
App.prototype.getTemplate = function () {
  return /*html*/ `
        <header id ="header"></header>
    `;
};
App.prototype.mount = function () {
  new Header(_.$("#header"), {});
};
App.prototype.setEvents = function () {
  this.addEvent();
};
