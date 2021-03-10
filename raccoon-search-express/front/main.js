import FetchAPI from './src/js/fetchAPI';
import EventSlider from './src/js/eventSlider';
import MallEventSlider from './src/js/mallEventSlider';
import RequestHotDealData from './src/js/requestHotDealData';
import { RollingKeywords } from './src/js/rollKeywords';
import MallEventSection from './src/js/mallEventSection';
import HotDealSection from './src/js/hotDealSection';
import MileageEventCarousel from './src/js/mileageEventCarousel';

const PAGE = 2;
const ITEMS = 5;
const CURRENT = 0;

const $mileageEventSlide = document.querySelector('.event--slide');
const $buttonGroup = document.querySelectorAll('.button-group');

const fetchAPI = new FetchAPI();
const eventSlider = new EventSlider($mileageEventSlide);
const mallEventSlider = new MallEventSlider($buttonGroup);
const requestHotDealData = new RequestHotDealData(PAGE, ITEMS, CURRENT);

function init() {
  initRollingKeywords();
  initMilieageCarousel();
  initMallEventList();
  initHotDealList();
}

async function createRollingKeyword() {
  const getRollingKeywordData = await fetchAPI.getRollingKeyword();
  return new RollingKeywords(getRollingKeywordData);
}

async function initRollingKeywords() {
  const rollingKeywords = await createRollingKeyword();
  rollingKeywords.drawRollingKeywords();
  rollingKeywords.drawSuggestionBox();
  rollingKeywords.startRolling();
  rollingKeywords.addEvent();
}

async function createMileageCarousel() {
  const getMileageCarouselData = await fetchAPI.getMileageList();
  return new MileageEventCarousel(getMileageCarouselData);
}

async function initMilieageCarousel() {
  const milieageCarousel = await createMileageCarousel();
  milieageCarousel.setMileageEventContents();
}

async function createMallEventList() {
  const getMallEventListData = await fetchAPI.getMallEventList();
  return new MallEventSection(getMallEventListData);
}

async function initMallEventList() {
  const EVENT_BOX = 3;
  const mallEventList = await createMallEventList();
  for (let i = 0; i < EVENT_BOX; i++) {
    mallEventList.getMallEventPanel();
  }
}

async function createHotDealList() {
  const getHodDealListData = await requestHotDealData.requestData();
  requestHotDealData.addEvent();
  return new HotDealSection(getHodDealListData);
}

async function initHotDealList() {
  const hotDealSection = await createHotDealList();

  if (requestHotDealData.page === PAGE + 1) {
    hotDealSection.draw();
    hotDealSection.updateMoreListNumber(requestHotDealData.current, hotDealSection.data.dataLength);
    return;
  }
  hotDealSection.drawExtraList();
  hotDealSection.updateMoreListNumber(requestHotDealData.current, hotDealSection.data.dataLength);
  return;
}

eventSlider.addEvent();
mallEventSlider.addEvent();

init();

export { initHotDealList };
