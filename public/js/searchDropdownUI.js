import { _ } from "./util";
import RollingUI from "./rollingUI";

export class SearchDropDownUI extends RollingUI {
    constructor(el) {
        super(el);
    }
}

SearchDropDownUI.prototype.eventHandler = function (el) {
    _.on(el, "focus", this.focusHandler.bind(this));
    _.on(el, "blur", this.blurHandler.bind(this));
    _.on(el, "keyup", this.keyupHandler.bind(this, _.$("#search--input")));
};

SearchDropDownUI.prototype.focusHandler = function () {
    this.el.style.visibility = "visible";
    this.el.parentNode.style.border = "1px solid red";
};

SearchDropDownUI.prototype.blurHandler = function () {
    this.el.style.visibility = "hidden";
    this.el.parentNode.style.border = "1px solid #cecfd1";
}

SearchDropDownUI.prototype.makeLists = function (data) {
    let innerHTML = "";
    for (let i = 0; i <= 9; i++) {
        if (i % 5 === 0) {
            innerHTML += `
            <ul class="lists--keywords">
                <li>
                    <span class="numRank">${i + 1}.</span>
                    <span>${data[i]}</span>
                </li>`;
        }
        else if (i % 5 === 4) {
            innerHTML += `
                <li>
                    <span class="numRank">${i + 1}.</span>
                    <span>${data[i]}</span>
                </li>
            </ul>`;
        }
        else {
            innerHTML += `
            <li>
                <span class="numRank">${i + 1}.</span>
                <span>${data[i]}</span>
            </li>`;
        }
    }
    return innerHTML
};

SearchDropDownUI.prototype.keyupHandler = function (inputSelector) {
    const childNodes = [...(this.el.childNodes)].filter(v => v.nodeName !== "#text");
    if (inputSelector.value.length === 0) {
        childNodes.forEach(v => v.style.opacity = "1");
        return
    }
    childNodes.forEach(v => v.style.opacity = "0");
}