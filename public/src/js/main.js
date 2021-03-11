import { getData, _ } from './util/util.js';
import { moreParser, slideParser, hotDealParser, recommendParser, bundleArg } from './util/parser.js';
import BannerSlider from './slider/bannerSlider.js';
import MoreButtonView from './moreBtn/moreBtn.js';
import HotDealSlider from './slider/hotDealSlider.js';
import RecommendRolling from './search/rolling.js';
import { URL } from './util/data.js';
import SearchTab from './search/searchTab.js';
import Toggle from './util/toggle.js';

//슬라이드 DOM
const slideContainer = _.$('.slide');
const slideList = _.$('.slide-list');
const bannerSlideBtn = _.$('.slide-event__btn');
const pagingBtn = _.$('.slide-event__paging');
const BannerSelector = { container: slideContainer, slideList, slideBtn: bannerSlideBtn, pagingBtn };
const BannerAnimation = { oneStep: 515, transition: 'all 0.3s' };

//더보기 DOM
const moreContainer = _.$('.more-container');
const moreBtn = _.$('.more-text-container');
const moreSelectors = { container: moreContainer, moreBtn };

//핫딜 슬라이드 DOM
const hotDealContainer = _.$('.hot-deal__container');
const hotDealSlideList = _.$('.hot-deal-list');
const hotDealBtn = _.$('.hot-deal .slide-event__btn');
const hotDealSelector = { container: hotDealContainer, slideList: hotDealSlideList, slideBtn: hotDealBtn };
const hotDealAnimation = { oneStep: 260.6, transition: 'all 0.3s' };

//추천 리스트 rolling
const rollingContainer = _.$('.placeholder-container');
const rollingList = _.$('.placeholder-list');
const rollingSelector = { rollingList };
const rollingAnimation = { oneStep: 54, transition: 'all 1s' };

//추천 리스트 search-tab
const searchTabContainer = _.$('.search-tab-container');
const searchTab = _.$('.search-tab');
const searchInput = _.$('.box_search>input');
const searchTabTitle = _.$('.search-tab__title');
const searchTabSelector = { searchTab, searchInput, searchTabTitle };

//토글
const toggleList = [{ check: searchInput, show: rollingContainer, hidden: searchTabContainer }];

//슬라이더
async function init() {
  const slideOriginData = await getData(URL.SLIDE);
  const { mileageList: slideData, mallEventList: hotDealData } = slideOriginData;

  const parsedBannerdata = slideParser(slideData);
  const bannerArg = bundleArg({ data: parsedBannerdata, selector: BannerSelector, animation: BannerAnimation });
  const bannerSlider = new BannerSlider(bannerArg);
  bannerSlider.init();

  const parsedHotDealData = hotDealParser(hotDealData);
  const hotDealArg = bundleArg({ data: parsedHotDealData, selector: hotDealSelector, animation: hotDealAnimation });
  const hotDealSlider = new HotDealSlider(hotDealArg);
  hotDealSlider.init();

  // 더보기
  const moreOriginData = await getData(URL.MORE);
  const { contents: moreData } = moreOriginData;
  const parsedMoreData = moreParser(moreData);
  const moreBtnArg = bundleArg({ data: parsedMoreData, selector: moreSelectors });
  const moreButtonView = new MoreButtonView(moreBtnArg);
  moreButtonView.init();

  //추천 search - rolling
  const recommendOriginData = await getData(URL.RECOMMEND);
  const { list: recommendList } = recommendOriginData;
  const recommendData = recommendParser(recommendList);
  const rollingArg = bundleArg({
    data: recommendData,
    selector: rollingSelector,
    animation: rollingAnimation,
  });
  const recommendRolling = new RecommendRolling(rollingArg);
  recommendRolling.init();

  //추천 search - searchTab
  const searchTabArg = bundleArg({ data: recommendData, selector: searchTabSelector });
  const searchTab = new SearchTab(searchTabArg);
  searchTab.init();
}

//토글
const toggle = new Toggle(toggleList);
toggle.init();

init();
