import { CLASS_LIST } from '../util/data';
import { li } from '../util/htmlTemplate';

class RecommendRolling {
  constructor({ data, selector, animation }) {
    this.rollingData = data;
    this.rollingList = selector.rollingList;
    this.step = 0;
    this.oneStep = animation.oneStep;
    this.transition = animation.transition;
  }
  init() {
    this.render();
    this.autoRolling();
  }
  autoRolling() {
    if (this.step === 11) {
      this.render();
      this.step = 0;
    }
    setTimeout(() => {
      this.rolling();
      this.autoRolling();
    }, 3000);
  }
  rolling() {
    this.step++;
    this.setRollingAnimation({ moveY: this.oneStep * this.step * -1, transition: 'all 1s' });
  }
  getrollingHTML() {
    const { PLACEHOLDER_ITEM } = CLASS_LIST;
    let rollingHTML = this.rollingData.reduce(
      (acc, cur, idx) => acc + li({ value: `${idx + 1}. ${cur}`, classes: [PLACEHOLDER_ITEM] }),
      ''
    );
    rollingHTML += li({ value: `1. ${this.rollingData[0]}`, classes: [PLACEHOLDER_ITEM] });
    return rollingHTML;
  }
  render() {
    this.setRollingAnimation({ moveY: 0, transition: 'none' });
    const rollingHTML = this.getrollingHTML();
    this.rollingList.innerHTML = rollingHTML;
  }
  setRollingAnimation({ moveY = 0, transition = '' }) {
    this.rollingList.style.transition = transition;
    this.rollingList.style.transform = `translateY(${moveY}px`;
  }
}

export default RecommendRolling;
