// main.js에서 캐러셀 만들 부분에 캐러셀 세팅해주는 함수

import { carouselState, longClickState } from "../utils/states.js";
import Carousel from "../slides/carousel.js";

const setCarousel = (spec) => (isLongClick, needPagination) => (paginationClassName, pageDotClassName) => {
  const c_state = Object.assign({}, carouselState);
  if (!isLongClick) {
    const carousel = new Carousel(c_state);
    carousel.create(spec, isLongClick)(needPagination, paginationClassName, pageDotClassName);
  }
  if (isLongClick) {
    const l_state = Object.assign({}, longClickState);
    const carousel = new Carousel(c_state, l_state);
    carousel.create(spec, isLongClick)(needPagination, paginationClassName, pageDotClassName);
  }
};

export { setCarousel };
