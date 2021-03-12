/* --------------------------------------------------------------------- */
/* ------▶︎▶︎▶︎ smallCarosel 클래스: 페이지 우측 상단의 작은 캐러셀을 만든다. ◀︎◀︎◀︎------*/
/* --------------------------------------------------------------------- */

/*
- [ ] 이미지 하단 언더바에 마우스에 호버링 이벤트 넣기 : 호버 시 이미지 바꿈. (로직 설계 필요 - data-Index 사용할 방법 생각해보기)
*/

export default class smallCarousel {
    constructor(_, reference){
        this._ = _;
        this.ref = reference;
        this.prevButton = reference.prevButton;
        this.nextButton = reference.nextButton;
        this.slide = reference.slide;
    }

    addEvent(dataObj){
        this.prevButton.addEventListener('click', this.translateSlide.bind(this, 1, dataObj.numOfPanel));
        this.nextButton.addEventListener('click', this.translateSlide.bind(this, -1, dataObj.numOfPanel));
    }

    translateSlide(direction, numOfPanel){
        const selectedBtn = (direction === 1) ? 'prev' : 'next';
        this.slide.style.transitionDuration = "300ms";
        this.slide.style.transform = `translateX(${direction * (100 / numOfPanel)}%)`;
        this.slide.ontransitionend = () => this.reorganizeEl(selectedBtn);
    }

    reorganizeEl(selectedBtn) {
        const slide = this.slide;
        this._.removeTransform(slide, 'style');
        (selectedBtn === 'prev') ?
        slide.insertBefore(slide.lastElementChild, slide.firstElementChild):
        slide.appendChild(slide.firstElementChild);
    }

}