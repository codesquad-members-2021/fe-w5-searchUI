import _ from "./utils.js";
<<<<<<< HEAD
<<<<<<< HEAD
import listHTML from "./HtmlTemplete.js";
=======
>>>>>>> 63d9730... [FEAT]make Morebtn class
=======
import listHTML from "./HtmlTemplete.js";
>>>>>>> 1931f10... [FEAT]Add moreBtn 기능 구

export default class Morebtn {
  constructor(data, moreBtn, container) {
    this.data = data;
    this.totalData = data.length;
    this.container = container;
    this.moreBtn = moreBtn;
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> 1931f10... [FEAT]Add moreBtn 기능 구
    this.currentIndex = 0;
  }

  init() {
    this.splitedData = this.splitData(4);
<<<<<<< HEAD
=======
  }

  init() {
>>>>>>> 63d9730... [FEAT]make Morebtn class
=======
>>>>>>> 1931f10... [FEAT]Add moreBtn 기능 구
    this.clickEvent();
  }

  clickEvent() {
    _.on(this.moreBtn, "click", this.clickHandler.bind(this));
  }
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> 1931f10... [FEAT]Add moreBtn 기능 구
  makeHTML() {
    return this.splitedData[this.currentIndex].reduce(
      (acc, cur) => acc + listHTML(cur.imgurl, cur.text, cur.text2),
      ""
    );
  }
<<<<<<< HEAD

  render() {
    this.container.innerHTML += this.makeHTML();
  }

  clickHandler() {
    this.currentIndex += 1;
    this.render();
  }
  splitData(num) {
    let splitedData = [];
    for (let i = 0; i < this.totalData; i += num) {
      splitedData.push(this.data.slice(i, i + num));
    }
    return splitedData;
=======
=======
>>>>>>> 1931f10... [FEAT]Add moreBtn 기능 구

  render() {
    this.container.innerHTML += this.makeHTML();
  }

  clickHandler() {
<<<<<<< HEAD
    console.log(this.data[0]);
>>>>>>> 63d9730... [FEAT]make Morebtn class
=======
    this.currentIndex += 1;
    this.render();
  }
  splitData(num) {
    let splitedData = [];
    for (let i = 0; i < this.totalData; i += num) {
      splitedData.push(this.data.slice(i, i + num));
    }
    return splitedData;
>>>>>>> 1931f10... [FEAT]Add moreBtn 기능 구
  }
}
