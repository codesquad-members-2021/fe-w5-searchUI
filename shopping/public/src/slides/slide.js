export default class Slide {
  constructor(carouselState) {
    const { slideList, currIndex, currSlide, currDot, slidePagination, pageDots } = carouselState;
    this.slideList = slideList;
    this.currIndex = currIndex;
    this.currSlide = currSlide;
    this.currDot = currDot;
    this.slidePagination = slidePagination;
    this.pageDots = pageDots;
  }

  initCarouselState(startNum, slideContents) {
    this.currIndex = startNum;
    this.currSlide = slideContents[this.currIndex];
    this.currSlide.classList.add("slide_active");
  }

  setTotalWidth(slideWidth, slideLen) {
    // console.log(this.slideList);
    this.slideList.style.width = `${slideWidth * (slideLen + 2)}px`;
  }

  cloneChildren(slideList) {
    return new Promise((resolve, reject) => {
      const firstChild = slideList.firstElementChild;
      const lastChild = slideList.lastElementChild;
      const clonedFirst = firstChild.cloneNode(true);
      const clonedLast = lastChild.cloneNode(true);
      resolve({ clonedFirst, clonedLast });
    });
  }

  addClones(children) {
    const { clonedFirst, clonedLast } = children;
    this.slideList.appendChild(clonedFirst);
    this.slideList.insertBefore(clonedLast, this.slideList.firstElementChild);
  }

  transform(slideWidth, value) {
    this.slideList.style.transform = `translateX(-${slideWidth * value}px)`;
  }

  transition(ms) {
    this.slideList.style.transition = `${ms}ms`;
  }
}
