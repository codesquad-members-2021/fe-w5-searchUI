import { CLASS_LIST } from '../util/data';
import { li } from '../util/htmlTemplate';
import { delay } from '../util/util.js';

function RecommendRolling({ data, selector, animation }) {
  this.rollingData = data;
  this.rollingList = selector.rollingList;
  this.searchInput = selector.searchInput;
  this.step = 0;
  this.oneStep = animation.oneStep;
  this.transition = animation.transition;
}

RecommendRolling.prototype = {
  constructor: RecommendRolling,
  init() {
    this.render();
    this.autoRolling();
  },
  async autoRolling() {
    if (this.step > this.rollingData.length) {
      this.render();
      this.step = 0;
      //render,rolling 둘다 element.style을 다루기 때문에 render먼저 완료 하기 위해 delay추가
      await delay(0);
    } else {
      await delay(3000);
    }
    this.rolling();
    this.autoRolling();
  },
  rolling() {
    this.step++;
    this.setRollingAnimation({ moveY: this.oneStep * this.step * -1, transition: this.transition });
  },
  getrollingHTML() {
    const { PLACEHOLDER_ITEM } = CLASS_LIST;
    let rollingHTML = this.rollingData.reduce(
      (acc, cur, idx) => acc + li({ value: `${idx + 1}. ${cur}`, classes: [PLACEHOLDER_ITEM] }),
      ''
    );
    rollingHTML += li({ value: `1. ${this.rollingData[0]}`, classes: [PLACEHOLDER_ITEM] });
    return rollingHTML;
  },
  render() {
    this.setRollingAnimation({ moveY: 0, transition: 'none' });
    const rollingHTML = this.getrollingHTML();
    this.rollingList.innerHTML = rollingHTML;
  },
  setRollingAnimation({ moveY = 0, transition = '' }) {
    this.rollingList.style.transition = transition;
    this.rollingList.style.transform = `translateY(${moveY}px`;
  },
};

export default RecommendRolling;
