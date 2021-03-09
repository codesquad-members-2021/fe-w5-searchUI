import { _, delay } from "./util"
import CarouselUI from "./carouselUI";
import { carouselUIManager } from "./carouselUIManager";
import RollingUI from "./rollingUI";
import RollingUIManager from "./rollingUIManager";

const init = () => {
    new CarouselUI().insertDOM();
    setTimeout(() => carouselUIManager(_.$All('.carouselUI--img')), 300);
    new RollingUI(_.$("#rolledList")).init();
    new RollingUIManager().rollingList();
};
init();