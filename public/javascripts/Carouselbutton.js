import { _, DOM, CLASS_LIST } from "./utill.js";

DOM.RIGHT.addEventListener('click', (e) => {
    _.addClass(DOM.CAROUSEL_SLIDE,CLASS_LIST.TRANS_RIGHT,CLASS_LIST.ON);
    setTimeout(() => {
        _.removeClass(DOM.CAROUSEL_SLIDE,CLASS_LIST.TRANS_RIGHT,CLASS_LIST.ON);
        DOM.CAROUSEL_SLIDE.insertBefore(DOM.CAROUSEL_SLIDE.firstElementChild, null);
    },300)
});


DOM.LEFT.addEventListener("click", () => {
    _.addClass(DOM.CAROUSEL_SLIDE,CLASS_LIST.TRANS_LEFT,CLASS_LIST.ON);
    setTimeout(() => {
        _.removeClass(DOM.CAROUSEL_SLIDE,CLASS_LIST.TRANS_LEFT,CLASS_LIST.ON);
        DOM.CAROUSEL_SLIDE.insertBefore(DOM.CAROUSEL_SLIDE.lastElementChild,DOM.CAROUSEL_SLIDE.firstElementChild);
    },300)
});