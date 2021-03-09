import { dataManager } from './dataManager.js';
import { LoadItem } from './LoadItem.js';
import { Slider } from './Slider.js';
import { Search } from './Search.js';

const loadItems = (rawData) => {
  const loadItem = new LoadItem(rawData);
  loadItem.showImgContents();
  loadItem.onEvents();
};

const executeSlide = () => {
  const slider = new Slider();
  slider.onEvents();
  slider.slideAutomatically();
};

const executeSearch = () => {
  const search = new Search();
  search.onEvents();
  search.runKeyWordsRoll();
};

const main = () => {
  const rawData = dataManager(
    'http://localhost:3000',
    'data',
    'planningEvent.json'
  );
  loadItems(rawData);
  executeSlide();
  executeSearch();
};

main();
