import { _ } from "./util";

export default class RollingUIManager {
    constructor() {
        this.el = _.$("#rolledList");
        this.Y = -10;
    }
}

RollingUIManager.prototype.rollingList = function () {
    this.el.ontransitionend = () => {
        if (this.Y == -310) {
            this.el.style.transition = "0ms";
            this.Y = -10;
            this.el.style.transform = `translateY(${this.Y}px)`;
        }
    }
    this.el.style.transition = "700ms";
    this.el.style.transform = `translateY(${this.Y}px)`;

    setInterval(() => {
        this.Y -= 30;
        this.el.style.transition = "700ms";
        this.el.style.transform = `translateY(${this.Y}px)`;
    }, 1000)
}
