import { _ } from "./util"

export const carouselUIManager = (el) => {
    const leftBtn = _.$('.carouselUI--leftBtn');
    const rightBtn = _.$('.carouselUI--rightBtn');
    const defaultX = -485;
    const carouselNum = 3;
    const transitionMs = 300;
    let moveX = defaultX;

    el.forEach(v => v.style.transform = `translate3d(${moveX}px,0,0)`);

    leftBtn.addEventListener('click', function () {
        if (moveX === defaultX * carouselNum) {
            setTimeout(function () {
                moveX = defaultX;
                el.forEach(v => v.style.transition = "0ms");
                el.forEach(v => v.style.transform = `translate3d(${moveX}px,0,0)`);
            }, transitionMs)
        }
        moveX += defaultX;
        el.forEach(v => v.style.transition = `${transitionMs}ms`);
        el.forEach(v => v.style.transform = `translate3d(${moveX}px,0,0)`);
    });

    rightBtn.addEventListener('click', function () {
        if (moveX === defaultX) {
            setTimeout(function () {
                moveX = defaultX * carouselNum;
                el.forEach(v => v.style.transition = "0ms");
                el.forEach(v => v.style.transform = `translate3d(${moveX}px,0,0)`);
            }, transitionMs)
        }
        moveX -= defaultX;
        el.forEach(v => v.style.transition = `${transitionMs}ms`);
        el.forEach(v => v.style.transform = `translate3d(${moveX}px,0,0)`);
    });
};