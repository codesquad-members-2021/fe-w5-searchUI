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
      const { check, toggleTarget } = toggle;
      if (check.contains(target)) {
        this.show(toggleTarget);
      } else {
        this.hidden(toggleTarget);
      }
    }
  }
  hidden(toggleTarget) {
    toggleTarget.classList.add(CLASS_LIST.HIDDEN);
  }
  show(toggleTarget) {
    toggleTarget.classList.remove(CLASS_LIST.HIDDEN);
  }
}

export default Toggle;
