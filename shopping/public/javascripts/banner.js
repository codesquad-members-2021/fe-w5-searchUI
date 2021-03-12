import _ from "./utils/utils.js";
import html from "./utils/HtmlTemplete.js";

export default class Banner {
  constructor(bannerData, sliderData, banner) {
    this.mainBanner = _.$(".banner__left");
    this.$slider = _.$(".banner__slider", banner);
    this.bannerImg = bannerData.imgurl;
    this.sliderData = sliderData;
  }

  init() {
    this.rander();
  }

  rander() {
    this.mainBanner.innerHTML = html.bannerHTML(this.bannerImg);
    this.$slider.innerHTML = this.sliderData
      .map((v) => html.sliderHTML(v.imgurl))
      .reduce((acc, cur) => (acc += cur));
  }
}
