import 'regenerator-runtime/runtime';

export default class RollingUI {
    constructor(el) {
        this.el = el;
    }

    async init() {
        const data = await this.loadData();
        const makeLists = this.makeLists(data);

        this.el.insertAdjacentHTML("beforeend", makeLists)
    }

    async loadData() {
        const data = await fetch("https://shoppinghow.kakao.com/v1.0/shophow/top/recomKeyword.json?_=1615268669995")
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