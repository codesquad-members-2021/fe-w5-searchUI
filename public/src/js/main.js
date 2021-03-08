import { getData, _ } from './util/util.js';
import { moreParser, slideParser, hotDealParser, recommendParser } from './util/parser.js';
import BannerSlider from './slider/bannerSlider.js';
import MoreButtonView from './moreBtn/moreBtn.js';
import HotDealSlider from './slider/hotDealSlider.js';
import RecommendRolling from './search/rolling.js';
import { URL } from './util/data.js';

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
const recommendList = _.$('.placeholder-list');
const recommendSelector = { recommendList };
const rollingAnimation = { oneStep: 54, transition: 'all 1s' };

//슬라이더
getData(URL.SLIDE).then((res) => {
  const { mileageList: slideData, mallEventList: hotDealData } = res;

  const parsedBannerdata = slideParser(slideData);
  const bannerSlider = new BannerSlider(parsedBannerdata, BannerSelector, BannerAnimation);
  bannerSlider.init();

  const parsedHotDealData = hotDealParser(hotDealData);
  const hotDealSlider = new HotDealSlider(parsedHotDealData, hotDealSelector, hotDealAnimation);
  hotDealSlider.init();
});

// 더보기
getData(URL.MORE).then((res) => {
  const { contents: moreData } = res;
  const parsedMoreData = moreParser(moreData);
  const moreButtonView = new MoreButtonView(parsedMoreData, moreSelectors);
  moreButtonView.init();
});

//추천 search
getData(URL.RECOMMEND).then((res) => {
  const { list: recommendList } = res;
  const recommendData = recommendParser(recommendList);
  const recommendRolling = new RecommendRolling({
    data: recommendData,
    selector: recommendSelector,
    animation: rollingAnimation,
  });
  recommendRolling.init();
});
