import FetchAPI from './fetchAPI';
import EventSlider from './eventSlider';
import MallEventSlider from './mallEventSlider';
import RequestHotDealData from './requestHotDealData';
import RollingKeywords from './rollKeywords';
import MallEventSection from './mallEventSection';
import HotDealSection from './hotDealSection';
import MileageEventCarousel from './mileageEventCarousel';
import Similarword from './similarword';
import { _ } from './const';

export default class RaccoonShopping {
  constructor(page, items, current) {
    this.page = page;
    this.items = items;
    this.current = current;
    this.slide = _.$('.event--slide');
    this.button = _.$$('.button-group');
    this.fetchAPI = new FetchAPI();
    this.eventSlider = new EventSlider(this.slide);
    this.mallEventSlider = new MallEventSlider(this.button);
    this.requestHotDealData = new RequestHotDealData(this.page, this.items, this.current);
    this.similarword = new Similarword();
  }

  init() {
    this.initRollingKeywords();
    this.initMilieageCarousel();
    this.initMallEventList();
    this.initHotDealList();
    this.addEvent();
  }

  addEvent() {
    this.eventSlider.addEvent();
    this.mallEventSlider.addEvent();
    this.requestHotDealData.addEvent();
    this.similarword.addEvent();
  }

  async createRollingKeyword() {
    const getRollingKeywordData = await this.fetchAPI.getRollingKeyword();
    return new RollingKeywords(getRollingKeywordData);
  }

  async initRollingKeywords() {
    const rollingKeywords = await this.createRollingKeyword();
    rollingKeywords.drawRollingKeywords();
    rollingKeywords.drawSuggestionBox();
    rollingKeywords.startRolling();
    rollingKeywords.addEvent();
  }
  async initMilieageCarousel() {
    const milieageCarousel = await this.createMileageCarousel();
    milieageCarousel.setMileageEventContents();
  }
  async initMallEventList() {
    const EVENT_BOX = 3;
    const mallEventList = await this.createMallEventList();
    for (let i = 0; i < EVENT_BOX; i++) {
      mallEventList.getMallEventPanel();
    }
  }
  async initHotDealList() {
    const hotDealSection = await this.createHotDealList();
    if (this.requestHotDealData.page === _.reqNum.PAGE + 1) {
      hotDealSection.draw();
      hotDealSection.updateMoreListNumber(this.requestHotDealData.current, hotDealSection.data.dataLength);
      return;
    }
    hotDealSection.drawExtraList();
    hotDealSection.updateMoreListNumber(this.requestHotDealData.current, hotDealSection.data.dataLength);
    return;
  }

  async createMileageCarousel() {
    const getMileageCarouselData = await this.fetchAPI.getMileageList();
    return new MileageEventCarousel(getMileageCarouselData);
  }

  async createMallEventList() {
    const getMallEventListData = await this.fetchAPI.getMallEventList();
    return new MallEventSection(getMallEventListData);
  }

  async createHotDealList() {
    const getHodDealListData = await this.requestHotDealData.requestData();
    return new HotDealSection(getHodDealListData);
  }
}
