export default class RollingUI {
    constructor(el) {
        this.el = el;
    }

    async init(lists) {
        let url = "https://shoppinghow.kakao.com/v1.0/shophow/top/recomKeyword.json?_=1615268669995";
        const data = await this.loadData(url);
        const makeLists = this.makeLists(data);

        lists.insertAdjacentHTML("beforeend", makeLists)
    }

    async loadData(url) {
        const data = await fetch(url);
        const json = await data.json();
        return json.list.map(v => v.keyword);
    }

    makeLists(data) {
        let innerHTML = "";
        for (let i = 0; i <= 11; i++) {
            innerHTML += `<li>${(i % 10 + 1)}. ${data[i % 10]} </li>`;
        }
        return innerHTML
    }
}