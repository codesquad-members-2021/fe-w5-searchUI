import _ from "./utils.js";
const RolingList = function (List, ListParents) {
  this.List = List.map((v) => v.keyword);
  this.ListParents = ListParents;
  this.length = this.List.length;
  this.height = -38;
};

RolingList.prototype.init = function () {
  this.List.forEach((v, index) => {
    this.inserlist(this.ListParents, v, index);
  });
  this.ListParents.style.transitionDuration = `1s`;
  this.ListParents.style.transform = `translateY(${this.height}px)`;
  this.setinterval(1500, this.length);
};

RolingList.prototype.inserlist = function (Parents, keyword, index) {
  let currHTML = Parents.innerHTML;
  Parents.innerHTML = currHTML + `<li>${index + 1}. ${keyword}</li>`;
};

RolingList.prototype.silde = function (height) {
  let currHeight = parseInt(
    this.ListParents.style.transform.replace(/[a-z()]/gi, "")
  );

  this.ListParents.style.transform = `translateY(${height + currHeight}px)`;
};
RolingList.prototype.setintervalFinish = async function () {
    this.ListParents.style.transition = `none`;
    this.ListParents.style.transform = `translateY(0px)`;
    await _.delay(1500);
    debugger;
    this.ListParents.style.transitionDuration = `1s`;
    this.ListParents.style.transform = `translateY(${this.height}px)`;
    this.setinterval(1500, this.length);
  };

RolingList.prototype.setinterval = async function (Time, length) {
  for (let i = 0; i < length - 2; i++) {
    await _.delay(Time);
    this.silde(this.height);
    if (i === length - 3) {
      this.setintervalFinish();
    }
  }

};

export default RolingList;
