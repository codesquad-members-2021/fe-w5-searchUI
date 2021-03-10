import { urls } from "../utils/urls.js";
import request from "../utils/request.js";
import RecommItems from "./recommItems.js";
import { rollings, times } from "../utils/states.js";

export default function Roller({ topTenWords }, { rollingContainer }) {
  //   debugger;
  RecommItems.call(this, topTenWords);
  //   const { rollingContainer } = rollings;
  //   this.rollingKeywordHtml = rollingKeywordHtml;
  this.rollingContainer = rollingContainer;
  this.itemCount = 0; // roller
  this.currItem = null; // roller
  //   this.rollingTopTenWords = null;
}

Roller.prototype = Object.create(RecommItems.prototype);

Roller.prototype.initRoller = async function (className) {
  const popularWords = await this.getTopten();
  const popularWordsArr = Object.entries(popularWords[0]);
  this.topTenWords = this.createTemplate(popularWordsArr, className) + this.createTemplate(popularWordsArr.slice(0, 2), className);
  this.rollingContainer.innerHTML = this.topTenWords;
  this.itemCount = popularWordsArr.length;
  this.rollInterval();
};

Roller.prototype.rollInterval = function () {
  const intervalTimer = setInterval(() => {
    if (this.currItem >= 0 && this.currItem <= this.itemCount) {
      this.rollingContainer.style.transition = `${times.transition}ms`;
      this.rollingContainer.style.transform = `translateY(-${++times.currItem * times.transform}px)`;
      if (this.currItem > this.itemCount) {
        this.currItem = 0;
        this.rollingContainer.style.transition = `${times.init}ms`;
        this.rollingContainer.style.transform = `translateY(-${this.currItem * times.transform}px)`;
      }
    }
  }, times.rolling);
};
