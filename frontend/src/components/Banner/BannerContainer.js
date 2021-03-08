import BannerPresentational from './BannerPresentational.js';
import CarouselContainer from '../Carousel/CarouselContainer.js';

import API from "../../util/api.js"; // root를 alias하는 방법을 찾아보는 중입니다.

class BannerContainer {
  constructor({ $target }) {
    this.$target = $target;
    this.$BannerPresentational = null;
    
    // this.$BannerCarousel = document.createElement("div");
    // this.$BannerCarousel.class = "banner-carousel";
    this.$BannerCarousel = null;
    
    this.$cached = {
      fixedImage: {}, 
      carouselImages: {}
    }; // for caching DOM

    // 상태
    this.fixedImage = "";
    this.bannerCarouselContainer = null;
    
    // let $target = this.$BannerPresentational.$target.querySelector("#banner-slide");
    // new BannerCarouselContainer({ $target: this.$BannerCarousel, carouselImages: data.mileageList });

    this.init();
    window.bc = this;

  }

  init() {
    API.get.bannerInfo().then((data) => {
      this.setState({ fixedImage: data.event.imgurl });
    });
  }
  
  // 상태 업데이트 영역
  setState(state) {
    this.setFixedImages(state.fixedImage);
    
    this.componentWillMount();
    const stateObj = {type: Object.keys(state).pop(), prop: state.fixedImage};
    if (this.shouldComponentUpdate(stateObj) ) {
      this.loadIntoCache({...stateObj, $dom: this.$BannerPresentational });
    }
  }

  setFixedImages(fixedImage) {
    this.fixedImage = fixedImage;
  }

  // 최적화 영역 
  // 리액트의 그것과는 조금 다른 형태로 진행합니다. 단순히 props와 state의 비교가 아닌, 지금까지 렌더된 객체들을 대상으로 비교를 진행합니다.
  shouldComponentUpdate({type, prop}) {
    return !this.$cached[type].hasOwnProperty(prop) ? true : false;
  }

  isCacheHit({type, prop}) {
    return this.$cached[type][prop];
  }
  
  loadIntoCache({type, prop, $dom}) {
    this.$cached[type][prop] = $dom;
  }

  // 마운트 리액트에서는 deprecated가 되었지만, Constructor를 오염시키고 싶지 않아서 사용
  componentWillMount() {
    if (this.shouldComponentUpdate({ type: "fixedImage", prop: this.fixedImage })) {
      this.$BannerPresentational = new BannerPresentational({ $target: this.$target, fixedImage: this.fixedImage });
      // this.$BannerPresentational.$self.querySelector("#banner-carousel").appendChild(this.$BannerCarousel); // 배너 캐로셀 추가 예정
    } else { // cache hit
      this.$BannerPresentational = this.isCacheHit({ type: "fixedImage", prop: this.fixedImage });
      this.render();
    }
  }

  // 렌더
  render() { 
    this.$target.innerHTML = "";
    this.$BannerPresentational.render();
  }
  
}

export default BannerContainer;