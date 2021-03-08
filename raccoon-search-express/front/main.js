import FetchAPI from './src/js/fetchAPI';
import EventSlider from './src/js/eventSlider';
import MallEventSlider from './src/js/mallEventSlider';
import RequestData from './src/js/requestData';
import { RollingKeywords } from './src/js/rollKeywords';

const PAGE = 2;
const ITEMS = 5;
const CURRENT = 0;

const $mileageEventSlide = document.querySelector('.event--slide');
const $buttonGroup = document.querySelectorAll('.button-group');

const fetchAPI = new FetchAPI();
const eventSlider = new EventSlider($mileageEventSlide);
const mallEventSlider = new MallEventSlider($buttonGroup);
const requestData = new RequestData(PAGE, ITEMS, CURRENT);
const rollingKeywords = new RollingKeywords();

fetchAPI.getMileageList();
fetchAPI.getMallEventList();
fetchAPI.getRollingKeyword();
requestData.requestData();

eventSlider.addEvent();
mallEventSlider.addEvent();
rollingKeywords.addEvent();
requestData.addEvent();

export { PAGE };
