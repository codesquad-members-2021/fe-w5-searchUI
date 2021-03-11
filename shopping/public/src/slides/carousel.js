import Slide from "./slide.js";

export default class Carousel extends Slide {
  constructor(carouselState, longClickState) {
    super(carouselState);
    if (longClickState) {
      const { isPressed, timer, isMoved } = longClickState;
      this.isPressed = isPressed;
      this.timer = timer;
      this.isMoved = isMoved;
    }
    this.create = (spec, longClick) => (needPagination, paginationClassName, pageDotClassName) => {
      const { slideContents, buttonsClassName, slideList, slideWidth, startNum, slideSpeed } = spec;
      const buttons = document.querySelector(`.${buttonsClassName}`);
      this.currIndex = startNum;
      this.slideList = slideList;
      const slideLen = slideContents.length;
      if (needPagination) {
        this.slidePagination = document.querySelector(`.${paginationClassName}`);
        this.pageDots = document.querySelectorAll(`.${pageDotClassName}`);
      }
      const slideMaterials = {
        slideSpeed,
        slideWidth,
        slideLen,
        slideContents,
        startNum,
      };

      this.setTotalWidth(slideWidth, slideLen);
      this.cloneChildren(this.slideList).then((children) => this.addClones(children));
      this.transform(slideWidth, startNum + 1);
      this.initCarouselState(startNum, slideContents);

      if (!longClick) this.basicClickEvent(buttons, slideMaterials, needPagination);
      if (longClick) this.longClickEvent(buttons, slideMaterials, needPagination);
      if (needPagination) this.slidePagination.addEventListener("click", (e) => this.movePagination(slideMaterials, e));
    };
  }

  moveSlide = (itemCnt) => (slideMaterials, isNext, isPagination) => (cond1, cond2) => {
    const { slideSpeed, slideWidth, slideLen, slideContents, startNum } = slideMaterials;
    const adjustLastSlide = () => {
      setTimeout(() => {
        this.transition(0);
        this.transform(slideWidth, isNext ? 1 : slideLen);
      }, slideSpeed);
    };

    if (cond1) {
      this.transition(slideSpeed);
      this.transform(slideWidth, isNext ? this.currIndex + 2 + (itemCnt > 1 ? 1 : 0) : this.currIndex + (itemCnt > 1 ? -1 : 0));
    }
    if (cond2) {
      adjustLastSlide();
      this.currIndex = isNext ? -1 : slideLen;
    }

    this.currSlide.classList.remove("slide_active");
    if (isPagination) {
      const currIndexStandard = isNext ? -1 : slideLen;
      const newIndex = isNext ? slideLen - 1 : startNum;
      this.pageDots[this.currIndex === currIndexStandard ? newIndex : this.currIndex].classList.remove("dot_active");
    }
    this.currSlide = slideContents[isNext ? (this.currIndex += itemCnt > 1 ? 2 : 1) : (this.currIndex -= itemCnt > 1 ? 2 : 1)];
    this.currSlide.classList.add("slide_active");
    if (isPagination) this.pageDots[this.currIndex].classList.add("dot_active");
  };

  movePagination(slideMaterials, { target }) {
    const { slideSpeed, slideWidth, slideContents } = slideMaterials;
    this.currDot = document.querySelector(".dot_active");
    this.currDot.classList.remove("dot_active");

    const thisNode = target.parentNode;
    this.currDot = thisNode;
    thisNode.classList.add("dot_active");

    this.currSlide.classList.remove("slide_active");
    this.currIndex = Number(thisNode.getAttribute("data-index"));

    this.currSlide = slideContents[this.currIndex];
    this.currSlide.classList.add("slide_active");
    this.transition(slideSpeed);
    this.transform(slideWidth, this.currIndex + 1);
  }

  basicClickEvent(buttons, slideMaterials, needPagination) {
    const { slideLen } = slideMaterials;

    buttons.addEventListener("click", ({ target }) => {
      const button = target.classList;
      if (button.contains("btn_prev")) this.moveSlide(1)(slideMaterials, true, needPagination)(this.currIndex <= slideLen - 1, this.currIndex === slideLen - 1);
      if (button.contains("btn_next")) this.moveSlide(1)(slideMaterials, false, needPagination)(this.currIndex >= 0, this.currIndex === 0);
    });
  }

  longClickEvent(buttons, slideMaterials, needPagination) {
    const { slideLen, startNum } = slideMaterials;

    const mouseUp = (buttonType, cond1, cond2) => {
      const isPrev = buttonType === "next" ? false : true;
      if (this.isPressed) clearInterval(this.timer[buttonType]);
      if (!this.isMoved[buttonType]) this.moveSlide(1)(slideMaterials, isPrev, needPagination)(cond1, cond2);
      this.isPressed = false;
      this.isMoved[buttonType] = false;
    };

    const mouseDown = (buttonType, cond1, cond2) => {
      const isPrev = buttonType === "next" ? false : true;
      this.isPressed = true;
      this.timer[buttonType] = setInterval(() => {
        this.moveSlide(2)(slideMaterials, isPrev, needPagination)(cond1, cond2);
        this.isMoved[buttonType] = true;
      }, 1800);
    };

    buttons.addEventListener("mouseup", ({ target }) => {
      const button = target.classList;
      if (button.contains("btn_next")) mouseUp("next", this.currIndex >= startNum, this.currIndex === startNum);
      if (button.contains("btn_prev")) mouseUp("prev", this.currIndex <= slideLen - 1, this.currIndex === slideLen - 1);
    });

    buttons.addEventListener("mousedown", ({ target }) => {
      const button = target.classList;
      if (button.contains("btn_next")) mouseDown("next", this.currIndex >= startNum, this.currIndex === startNum);
      if (button.contains("btn_prev")) mouseDown("prev", this.currIndex <= slideLen - 1, this.currIndex === slideLen - 1);
    });
  }
}
