import { _, setStyle } from "./util";
import RollingUI from "./rollingUI";

export class SearchDropDownUI extends RollingUI {
    constructor(el) {
        super(el);
        this.timer;
        this.suggestions;
        this.defaultInputValue;
        this.inputSelector = _.$("#search--input");
        this.autoCompleteUI = _.$("#input--autoCompleteUI");
        this.autoCompleteLists = _.$("#autoCompleteLists");
        this.directionKeyCnt = -1;
    }
}

SearchDropDownUI.prototype.eventHandler = async function (el) {
    _.on(el, "click", this.focusHandler.bind(this));
    _.on(el, "blur", this.blurHandler.bind(this));
    _.on(el.parentNode, "mouseout", this.mouseoutHandler.bind(this));
    _.on(el.parentNode, "mouseover", this.mouseoverHandler.bind(this));
    _.on(el, "keyup", this.keyupHandler.bind(this));
};

SearchDropDownUI.prototype.focusHandler = function () {
    this.inputSelector.style.opacity = "1";
    this.el.style.visibility = "visible";
    this.autoCompleteUI.style.visibility = "visible";

    if (this.autoCompleteUI.style.display === "block") {
        this.el.style.display = "none";
        this.el.parentNode.style.border = "1px solid red";
        return
    }
    this.el.style.display = "block";
    this.el.parentNode.style.border = "1px solid red";
};

SearchDropDownUI.prototype.blurHandler = function () {
    this.el.style.display = "none";
    this.inputSelector.style.opacity = "0";
    this.el.parentNode.style.border = "1px solid #cecfd1";
}

SearchDropDownUI.prototype.mouseoutHandler = function () {
    this.debouncer(this.changeToDefaultStyle.bind(this), 1000)
};

SearchDropDownUI.prototype.mouseoverHandler = function () {
    clearTimeout(this.timer);
};

SearchDropDownUI.prototype.changeToDefaultStyle = function () {
    this.el.parentNode.style.border = "1px solid #cecfd1";
    this.el.style.visibility = "hidden";
    this.autoCompleteUI.style.visibility = "hidden";
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

SearchDropDownUI.prototype.keyupHandler = async function ({ keyCode }) {
    await this.pickSeenScreen(this.inputSelector);
    await this.initAutoComplete(this.autoCompleteLists, keyCode);
    this.directionKeyEventHandler(keyCode);
}

SearchDropDownUI.prototype.pickSeenScreen = function (inputSelector) {
    if (inputSelector.value.length === 0) {
        this.el.style.display = "block";
        _.$("#input--autoCompleteUI").style.display = "none";
        return
    }
    this.el.style.display = "none";
    _.$("#input--autoCompleteUI").style.display = "block";
};

SearchDropDownUI.prototype.initAutoComplete = function (el, keyCode) {
    if (keyCode === 38 || keyCode === 40) return
    this.defaultInputValue = this.inputSelector.value;
    const makeAutoCompleteData = async () => {
        let url = `https://completion.amazon.com/api/2017/suggestions?session-id=133-4736477-7395454&customer-id=&request-id=4YM3EXKRH1QJB16MSJGT&page-type=Gateway&lop=en_US&site-variant=desktop&client-info=amazon-search-ui&mid=ATVPDKIKX0DER&alias=aps&b2b=0&fresh=0&ks=71&prefix=${this.inputSelector.value}&event=onKeyPress&limit=11&fb=1&suggestion-type=KEYWORD`
        const data = await this.loadAutoCompleteData(url);
        const giveHighlight = await this.giveHighlight(data);
        const makeLists = this.makeAutoCompleteLists(giveHighlight);

        await this.clearLists(el);
        el.insertAdjacentHTML("beforeend", makeLists)
    }
    this.debouncer(makeAutoCompleteData, 300)
}

SearchDropDownUI.prototype.loadAutoCompleteData = async function (url) {
    const data = await fetch(url);
    const json = await data.json();
    const suggestions = json.suggestions.map((v) => v.value);
    this.suggestions = suggestions;
    return suggestions.length === 0 ? "" : suggestions
};

SearchDropDownUI.prototype.makeAutoCompleteLists = function (data) {
    let innerHTML = "";
    if (data.length === 0) return ""
    for (let i = 0; i < data.length; i++) {
        if (i >= 10) break;
        innerHTML += `<li>${data[i]}</li>`
    }
    return innerHTML
};

SearchDropDownUI.prototype.clearLists = function (el) {
    while (el.hasChildNodes()) {
        el.removeChild(el.firstChild);
    }
}

SearchDropDownUI.prototype.debouncer = function (fn, ms) {
    this.timer = setTimeout(() => { fn() }, ms)
};

SearchDropDownUI.prototype.giveHighlight = function (lists) {
    if (lists.length === 0) return ""
    let highlightedLists = [];
    lists.map((idx) => {
        let regex = new RegExp(this.inputSelector.value, "g");
        highlightedLists.push(idx.replace(regex, `<span class='highlight'>${this.inputSelector.value}</span>`))
    })
    return highlightedLists
};

SearchDropDownUI.prototype.directionKeyEventHandler = function (keyCode) {
    const lists = this.autoCompleteLists.childNodes;

    lists.forEach(list => _.removeClass("background", list));
    if (keyCode === 38) {
        this.directionKeyCnt--;
        if (this.directionKeyCnt <= -1) {
            this.inputSelector.value = this.defaultInputValue;
            this.directionKeyCnt = -1;
            setStyle({ el: this.autoCompleteUI, styleRef: { opacity: "0" } })
            return
        }
    }
    else if (keyCode === 40) {
        this.directionKeyCnt++;
        if (this.directionKeyCnt >= lists.length) {
            this.inputSelector.value = this.defaultInputValue;
            this.directionKeyCnt = lists.length;
            setStyle({ el: this.autoCompleteUI, styleRef: { opacity: "0" } })
            return
        }
    }
    setStyle({ el: this.autoCompleteUI, styleRef: { opacity: "1" } })
    _.addClass("background", lists[this.directionKeyCnt]);
    this.inputValueHandler(this.directionKeyCnt)
};

SearchDropDownUI.prototype.inputValueHandler = function (cnt) {
    this.inputSelector.value = this.suggestions[cnt];
};