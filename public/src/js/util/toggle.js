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
      const { check, show, hidden, showOption } = toggle;
      if (check.contains(target)) {
        this.show(hidden);
        this.hidden(show);
      } else {
        if (!showOption.value) this.show(show);
        this.hidden(hidden);
      }
    }
  }
  hidden(target) {
    target.classList.add(CLASS_LIST.HIDDEN);
  }
  show(target) {
    target.classList.remove(CLASS_LIST.HIDDEN);
  }
}

export default Toggle;
