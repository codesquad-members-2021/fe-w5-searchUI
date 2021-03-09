const rolingList = function (List, ListParents) {
  this.List = List.map((v) => v.keyword);
  this.ListParents = ListParents;
};

rolingList.prototype.init = function () {
  this.List.forEach((v) => this.inserlist(this.ListParents, v));
};

rolingList.prototype.inserlist = function (Parents, keyword) {
  Parents.innerHTML = `<li>${keyword}</li>`;
};

export default rolingList;
