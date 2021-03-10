import 'regenerator-runtime/runtime';
import { _, delay } from "./util"
import CarouselUI from "./carouselUI";
import { carouselUIManager } from "./carouselUIManager";
import RollingUI from "./rollingUI";
import RollingUIManager from "./rollingUIManager";
import { test } from "./searchDropdownUI";

const init = () => {
    const carouselUI = new CarouselUI(_.$('.carouselUI'));
    const rollingUI = new RollingUI(_.$("#rolledList"));
    const rollingUIManager = new RollingUIManager(_.$("#rolledList"));

    carouselUI.insertDom();
    setTimeout(() => carouselUIManager(_.$All(".carouselUI--img")), 300)
    rollingUI.init();
    rollingUIManager.eventHandler(_.$("#rollingUI--input"));
    rollingUIManager.moveRollingList();
};
init();