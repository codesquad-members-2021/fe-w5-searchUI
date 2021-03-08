export default class Carousel {
  constructor(data) {
    this.data = data;
    this.promotionDiv = document.querySelector('.main--center__upper--promo');
    this.promoImg = document.querySelector('.upper--img--inner');
    this.IMG_WIDTH = 485;
    this.init();
  }

  init() {
    this.promotionDiv.addEventListener('transitionend', () => {
      this.handleLastItem();
    });
    this.promotionDiv.addEventListener('click', (event) => {
      this.checkEvent(event);
    });
    // this.moveAutomatically();
  }

  checkEvent(event) {
    const { target } = event;
    const targetName = target.className;
    if (targetName === 'main--center__upper--next') {
      this.movePage('next');
    } else if (targetName === 'main--center__upper--prev') {
      this.movePage('prev');
    }
    //페이지 선택에 따른 처리
  }

  movePage(direction) {
    if (direction === 'next') {
      this.promoImg.style.justifyContent = 'flex-start';
      this.promoImg.style.transform = `translate(-${this.IMG_WIDTH}px)`;
    } else if (direction === 'prev') {
      this.promoImg.style.justifyContent = 'flex-end';
      this.promoImg.style.transform = `translate(${this.IMG_WIDTH}px)`;
    }
  }

  handleLastItem() {
    if (this.promoImg.style.transform === `translate(-${this.IMG_WIDTH}px)`) {
      this.promoImg.appendChild(this.promoImg.firstElementChild);
    } else if (
      this.promoImg.style.transform === `translate(${this.IMG_WIDTH}px)`
    ) {
      this.promoImg.prepend(this.promoImg.lastElementChild);
    }

    this.promoImg.style.transition = 'none';
    this.promoImg.style.transform = 'translate(0)';
    setTimeout(() => {
      this.promoImg.style.transition = 'all 0.5s';
    });
  }

  moveAutomatically() {
    setTimeout(() => {
      this.movePage('next');
      this.moveAutomatically();
    }, 3000);
  }
}
