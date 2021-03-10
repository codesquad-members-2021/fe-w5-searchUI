import { _ } from "./util";

export default class RollingUIManager {
    constructor(el) {
        this.el = el;
        this.defaultY = -10;
        this.moveY = this.defaultY;
        this.listsNum = 10;
        this.listPixel = 30;
        this.transitionMs = 700;
        this.intervalTime = 2000;
    }
}

RollingUIManager.prototype.moveRollingList = function () {
    this.el.addEventListener("transitionend", () => {
        if (this.moveY == this.defaultY - (this.listPixel * this.listsNum)) {
            this.el.style.transition = "0ms";
            this.moveY = this.defaultY;
            this.el.style.transform = `translateY(${this.moveY}px)`;
        }
    })

    this.el.style.transition = `${this.transitionMs}ms`
    this.el.style.transform = `translateY(${this.moveY}px)`;

    this.timer = setInterval(() => {
        this.moveY -= this.listPixel;
        this.el.style.transition = `${this.transitionMs}ms`
        this.el.style.transform = `translateY(${this.moveY}px)`;
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
    this.el.style.transition = "0ms";
    this.el.style.opacity = "0";
};

RollingUIManager.prototype.blurHandler = function () {
    this.moveRollingList();
    this.el.style.transition = "0ms";
    this.el.style.opacity = "1";
}