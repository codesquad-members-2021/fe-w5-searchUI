import 'regenerator-runtime/runtime';
import { _ } from "./util"
import CarouselUI from "./carouselUI";
import CarouselUIManager from "./carouselUIManager";
import RollingUI from "./rollingUI";
import RollingUIManager from "./rollingUIManager";
import { SearchDropDownUI } from "./searchDropdownUI";

const init = async () => {
    const carouselUI = new CarouselUI(_.$('.carouselUI'));
    const rollingUI = new RollingUI(_.$("#rollingList"));
    const rollingUIManager = new RollingUIManager(_.$("#rollingList"));
    const searchDropdownUI = new SearchDropDownUI(_.$(".search--dropdown"));

    await carouselUI.init();

    const carouselUIManager = new CarouselUIManager(_.$All(".carouselUI--img"));
    carouselUIManager.init();
    carouselUIManager.eventHandler();

    await rollingUI.init(_.$("#rollingList"));
    rollingUIManager.moveRollingList();
    rollingUIManager.eventHandler(_.$("#search--input"));

    await searchDropdownUI.init(_.$(".dropdown--lists"));
    searchDropdownUI.eventHandler(_.$("#search--input"));
};
init();