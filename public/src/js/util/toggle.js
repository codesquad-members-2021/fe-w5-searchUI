class Toggle {
  constructor({ toggleCheckList, showList, hiddenList }) {
    this.toggleCheckList = toggleCheckList;
    this.showList = showList;
    this.hiddenList = hiddenList;
  }
  init() {
    this.onEvent();
  }
  onEvent() {
    document.addEventListener('click', this.handleClick.bind(this));
  }
  handleClick({ target }) {
    if (this.isInclude(target)) {
      this.hidden();
      this.show();
    }
  }
  isInclude(target) {
    for (const toggleTarget of this.toggleCheckList) {
      if (!toggleTarget.contains(target)) return true;
    }
    return false;
  }
  hidden() {
    this.hiddenList.forEach((v) => {
      v.classList.add('hidden');
    });
  }
  show() {
    this.showList.forEach((v) => {
      if (v.classList.contains('hidden')) v.classList.remove('hidden');
    });
  }
}

export default Toggle;
