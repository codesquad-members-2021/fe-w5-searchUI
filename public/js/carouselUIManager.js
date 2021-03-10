import { _ } from "./util"

export const carouselUIManager = (el) => {
    const leftBtn = _.$('.carouselUI--leftBtn');
    const rightBtn = _.$('.carouselUI--rightBtn');
    let x = -485;

    el.forEach(v => v.style.transform = `translate3d(${x}px,0,0)`);

    leftBtn.addEventListener('click', function () {
        if (x == -1455) {
            setTimeout(function () {
                x = -485;
                el.forEach(v => v.style.transition = "0ms");
                el.forEach(v => v.style.transform = `translate3d(${x}px,0,0)`);
            }, 300)
        }
        x -= 485;
        el.forEach(v => v.style.transition = "300ms");
        el.forEach(v => v.style.transform = `translate3d(${x}px,0,0)`);
    });

    rightBtn.addEventListener('click', function () {
        if (x == -485) {
            setTimeout(function () {
                x = -1455;
                el.forEach(v => v.style.transition = "0ms");
                el.forEach(v => v.style.transform = `translate3d(${x}px,0,0)`);
            }, 300)
        }
        x += 485;
        el.forEach(v => v.style.transition = "300ms");
        el.forEach(v => v.style.transform = `translate3d(${x}px,0,0)`);
    });
};