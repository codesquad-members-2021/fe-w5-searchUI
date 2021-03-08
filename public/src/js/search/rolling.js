import { CLASS_LIST } from '../util/data';
import { li } from '../util/htmlTemplate';

class RecommendRolling {
  constructor({ data, selector, animation }) {
    this.recommendData = data;
    this.recommendList = selector.recommendList;
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
  getRecommendHTML() {
    const { PLACEHOLDER_ITEM } = CLASS_LIST;
    let recommendHTML = this.recommendData.reduce(
      (acc, cur, idx) => acc + li({ value: `${idx + 1}. ${cur}`, classes: [PLACEHOLDER_ITEM] }),
      ''
    );
    recommendHTML += li({ value: `1. ${this.recommendData[0]}`, classes: [PLACEHOLDER_ITEM] });
    return recommendHTML;
  }
  render() {
    this.setRollingAnimation({ moveY: 0, transition: 'none' });
    const recommendHTML = this.getRecommendHTML();
    this.recommendList.innerHTML = recommendHTML;
  }
  setRollingAnimation({ moveY = 0, transition = '' }) {
    this.recommendList.style.transition = transition;
    this.recommendList.style.transform = `translateY(${moveY}px`;
  }
}

export default RecommendRolling;
