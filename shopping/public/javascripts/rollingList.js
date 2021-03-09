const RolingList = function (List, ListParents) {
  this.List = List.map((v) => v.keyword);
  this.ListParents = ListParents;
};

RolingList.prototype.init = function () {
  this.List.forEach((v, index) => {
    
    this.inserlist(this.ListParents, v, index);
  });
};

RolingList.prototype.inserlist = function (Parents, keyword, index) {
let currHTML = Parents.innerHTML;
  Parents.innerHTML = currHTML + `<li>${index+1}. ${keyword}</li>`;
};

export default RolingList;
