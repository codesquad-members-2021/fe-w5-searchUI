class Toggle {
  constructor({ toggleCheckList, toggleList }) {
    this.toggleCheckList = toggleCheckList;
    this.toggleList = toggleList;
  }
  init() {
    this.onEvent();
  }
  onEvent() {
    document.addEventListener('click', this.handleClick.bind(this));
  }
  handleClick({ target }) {
    if (this.isInclude(target)) this.toggleHidden();
  }
  isInclude(target) {
    for (const toggleTarget of this.toggleCheckList) {
      if (!toggleTarget.contains(target)) return true;
    }
    return false;
  }
  toggleHidden() {
    this.toggleList.forEach((v) => {
      v.classList.add('hidden');
    });
  }
}

export default Toggle;
