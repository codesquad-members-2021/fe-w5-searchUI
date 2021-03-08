import CarouselUI from "./carouselUI";

const carouselUI = new CarouselUI();
carouselUI.insertDOM();

function test() {
    const leftBtn = document.querySelector('.carouselUI--leftBtn');
    const rightBtn = document.querySelector('.carouselUI--rightBtn');
    const ui = document.querySelectorAll('.carouselUI--img');
    let x = -485;
    ui.forEach(v => v.style.transform = `translate3d(${x}px,0,0)`);

    leftBtn.addEventListener('click', function () {
        if (x == -1455) {
            setTimeout(function () {
                x = -485;
                ui.forEach(v => v.style.transition = "0ms");
                ui.forEach(v => v.style.transform = `translate3d(${x}px,0,0)`);
            }, 300)
        }
        x -= 485;
        ui.forEach(v => v.style.transition = "300ms");
        ui.forEach(v => v.style.transform = `translate3d(${x}px,0,0)`);
    });

    rightBtn.addEventListener('click', function () {
        if (x == -485) {
            setTimeout(function () {
                x = -1455;
                ui.forEach(v => v.style.transition = "0ms");
                ui.forEach(v => v.style.transform = `translate3d(${x}px,0,0)`);
            }, 300)
        }
        x += 485;
        ui.forEach(v => v.style.transition = "300ms");
        ui.forEach(v => v.style.transform = `translate3d(${x}px,0,0)`);
    });
}
setTimeout(test, 100)