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
  this.inserlist(this.ListParents, this.List[0], 0);
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
  await _.delay(500);
  this.ListParents.removeAttribute("style");
  this.ListParents.style.transform = `translateY(${this.height}px)`;
  this.setinterval(1500, this.length);
};

RolingList.prototype.setinterval = async function (Time, length) {
  for (let i = 0; i < length; i++) {
    await _.delay(Time);
    this.silde(this.height);
    if (i === length - 1) {
      this.setintervalFinish();
    }
  }
};

export default RolingList;
