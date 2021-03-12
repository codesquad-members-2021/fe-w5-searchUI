import { times } from "../utils/states.js";
import Keyword from "./keyword.js";

export default function Roller(searchingInput, rollings) {
  const { rollingKeywordHtml, rollingContainer } = rollings;
  Keyword.call(this, searchingInput, rollingKeywordHtml);
  this.rollingContainer = rollingContainer;
  this.itemCount = 0;
}

Roller.prototype = Object.create(Keyword.prototype);

Roller.prototype.init = async function (className) {
  this.popularWords = await this.getTopten();
  this.topTenWords = this.createTemplate(this.popularWords, className) + this.createTemplate(this.popularWords.slice(0, 2), className);
  this.itemCount = this.popularWords.length;
  this.rollingContainer.innerHTML = this.topTenWords;
};

Roller.prototype.roll = async function () {
  await this.init("rolling__items");
  this.rollInterval();
};

Roller.prototype.rollInterval = async function () {
  while (this.currIndex <= this.itemCount) {
    await delay(times.rolling);
    this.rollDown(++this.currIndex);
    if (this.currIndex > this.itemCount) {
      this.rollFinish();
      await delay(times.init);
      this.rollDown(++this.currIndex);
    }
  }
};

Roller.prototype.rollDown = function (index) {
  this.rollingContainer.style.transition = `${times.transition}ms`;
  this.rollingContainer.style.transform = `translateY(-${index * times.transform}px)`;
};

Roller.prototype.rollFinish = function () {
  this.rollingContainer.style.transition = `${times.init}ms`;
  this.rollingContainer.style.transform = `translateY(${times.init}px)`;
  this.currIndex = 0;
};

function delay(ms) {
  return new Promise((resolve) =>
    setTimeout(() => {
      resolve();
    }, ms)
  );
}
