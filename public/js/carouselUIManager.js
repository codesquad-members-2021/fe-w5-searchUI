import { _, setStyle } from "./util"

export default class CarouselUIManager {
    constructor(el) {
        this.el = el;
        this.leftBtn = _.$('.carouselUI--leftBtn');
        this.rightBtn = _.$('.carouselUI--rightBtn');
        this.defaultX = -485;
        this.carouselNum = 3;
        this.transitionMs = 300;
        this.moveX = this.defaultX;
        this.pageStyle = { transition: `${this.transitionMs}ms`, transform: `translateX(${this.moveX}px)` }
        this.lastPageStyle = { transition: "0ms", transform: `translateX(${this.moveX}px)` }
    }
}

CarouselUIManager.prototype.init = function () {
    this.el.forEach((v) => setStyle({ el: v, styleRef: this.pageStyle }))
}

CarouselUIManager.prototype.eventHandler = function () {
    _.on(this.leftBtn, "click", this.leftMoveHandler.bind(this));
    _.on(this.rightBtn, "click", this.rightMoveHandler.bind(this));
};

CarouselUIManager.prototype.leftMoveHandler = function () {
    if (this.moveX === this.defaultX * this.carouselNum) {
        setTimeout(() => {
            this.moveX = this.defaultX;
            this.lastPageStyle = { transition: "0ms", transform: `translateX(${this.moveX}px)` }
            this.el.forEach((v) => setStyle({ el: v, styleRef: this.lastPageStyle }))
        }, this.transitionMs)
    }
    this.moveX += this.defaultX;
    this.pageStyle = { transition: `${this.transitionMs}ms`, transform: `translateX(${this.moveX}px)` }
    this.el.forEach(v => setStyle({ el: v, styleRef: this.pageStyle }));
};

CarouselUIManager.prototype.rightMoveHandler = function () {
    if (this.moveX === this.defaultX) {
        setTimeout(() => {
            this.moveX = this.defaultX * this.carouselNum;
            this.lastPageStyle = { transition: "0ms", transform: `translateX(${this.moveX}px)` }
            this.el.forEach((v) => setStyle({ el: v, styleRef: this.lastPageStyle }))
        }, this.transitionMs)
    }
    this.moveX -= this.defaultX;
    this.pageStyle = { transition: `${this.transitionMs}ms`, transform: `translateX(${this.moveX}px)` }
    this.el.forEach((v) => setStyle({ el: v, styleRef: this.pageStyle }))
};




















// export const carouselUIManager = (el) => {
//     const leftBtn = _.$('.carouselUI--leftBtn');
//     const rightBtn = _.$('.carouselUI--rightBtn');
//     const defaultX = -485;
//     const carouselNum = 3;
//     const transitionMs = 300;
//     let moveX = defaultX;

//     let pageStyle = { transition: "300ms", transform: `translateX(${moveX}px)` }
//     let lastPageStyle = { transition: "0ms", transform: `translateX(${moveX}px)` }

//     el.forEach((v) => setStyle({ el: v, styleRef: pageStyle }))

//     leftBtn.addEventListener('click', () => {
//         if (moveX === defaultX * carouselNum) {
//             setTimeout(function () {
//                 moveX = defaultX;
//                 el.forEach((v) => setStyle({ el: v, styleRef: lastPageStyle }))
//             }, transitionMs)
//         }
//         moveX += defaultX;
//         el.forEach(v => setStyle({ el: v, styleRef: pageStyle }));
//     });

//     rightBtn.addEventListener('click', function () {
//         if (moveX === defaultX) {
//             setTimeout(function () {
//                 moveX = defaultX * carouselNum;
//                 el.forEach((v) => setStyle({ el: v, styleRef: lastPageStyle }))
//             }, transitionMs)
//         }
//         moveX -= defaultX;
//         el.forEach((v) => setStyle({ el: v, styleRef: pageStyle }))
//     });
// };