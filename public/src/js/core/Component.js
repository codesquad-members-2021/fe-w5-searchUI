import { _ } from "../utils/dom.js";

export default function Component($target, props) {
  this.$target = $target;
  this.props = props;
  this.setup();
  this.render();
  this.setEvents();
}
Component.prototype = {
  constructor: Component,
  setup,
  render,
  getTemplate,
  mount,
  setEvents,
  addEvent,
  setState,
};
// methods
function setup() {}
function render() {
  this.$target.innerHTML = this.getTemplate();
  this.mount();
}
function getTemplate() {}
function mount() {}
function setEvents() {}
function setState(newState) {
  this.state = { ...this.state, ...newState };
}
function addEvent(eventType, selector, callback) {
  const children = [...this.$target.querySelectorAll(selector)];
  this.$target.addEventListener(eventType, (event) => {
    if (!_isTarget(children, event.target)) return false;
    callback(event);
  });
}

function _isTarget(children, target) {
  return children.includes(target) || target.closest(selector);
}
