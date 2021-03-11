import { _, setStyle } from "./util";

export default class RollingUIManager {
    constructor(el) {
        this.el = el;
        this.defaultY = -10;
        this.moveY = this.defaultY;
        this.listsNum = 10;
        this.listPixel = 30;
        this.transitionMs = 700;
        this.intervalTime = 2000;
        this.styleRef = { transition: `${this.transitionMs}ms`, transform: `translateY(${this.moveY}px)` }
    }
}

RollingUIManager.prototype.moveRollingList = function () {
    this.el.addEventListener("transitionend", () => {
        if (this.moveY == this.defaultY - (this.listPixel * this.listsNum)) {
            this.moveY = this.defaultY;
            this.styleRef = { transition: "0ms", transform: `translateY(${this.moveY}px)` }
            setStyle({ el: this.el, styleRef: this.styleRef })
        }
    })
    setStyle({ el: this.el, styleRef: this.styleRef })

    this.timer = setInterval(() => {
        this.moveY -= this.listPixel;
        this.styleRef = { transition: `${this.transitionMs}ms`, transform: `translateY(${this.moveY}px)` }
        setStyle({ el: this.el, styleRef: this.styleRef })
    }, this.intervalTime)
}

RollingUIManager.prototype.stopRollingList = function () {
    clearInterval(this.timer);
};

RollingUIManager.prototype.eventHandler = function (el) {
    _.on(el, "focus", this.focusHandler.bind(this));
    _.on(el, "blur", this.blurHandler.bind(this));
};

RollingUIManager.prototype.focusHandler = function () {
    this.stopRollingList();
    setStyle({ el: this.el, styleRef: { transition: "0ms", opacity: "0" } })
};

RollingUIManager.prototype.blurHandler = function () {
    this.moveRollingList();
    setStyle({ el: this.el, styleRef: { transition: "0ms", opacity: "1" } })
}