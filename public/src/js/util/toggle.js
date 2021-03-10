import { CLASS_LIST } from './data';

class Toggle {
  constructor(toggleList) {
    this.toggleList = toggleList;
  }
  init() {
    this.addEvent();
  }
  addEvent() {
    document.addEventListener('click', this.handleClick.bind(this));
  }
  handleClick({ target }) {
    this.toggle(target);
  }
  toggle(target) {
    for (const toggle of this.toggleList) {
      const { check, show, hidden, styleObj } = toggle;
      if (check.contains(target)) {
        this.show(hidden);
        this.hidden(show);
        this.addStyle(styleObj);
      } else {
        this.show(show);
        this.hidden(hidden);
        this.removeStyle(styleObj);
      }
    }
  }
  hidden(target) {
    target.classList.add(CLASS_LIST.HIDDEN);
  }
  show(target) {
    target.classList.remove(CLASS_LIST.HIDDEN);
  }
  addStyle(styleObj) {
    const { target, styleList } = styleObj;
    target.classList.add(...styleList);
  }
  removeStyle(styleObj) {
    const { target, styleList } = styleObj;
    target.classList.remove(...styleList);
  }
}

export default Toggle;
