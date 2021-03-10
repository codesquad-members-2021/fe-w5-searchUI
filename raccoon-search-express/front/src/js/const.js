const _ = {
  $: document.querySelector.bind(document),
  $$: document.querySelectorAll.bind(document),
  reqNum: {
    PAGE: 2,
    ITEMS: 5,
    CURRENT: 0,
  },
  className: {
    eventSlider: {
      slideButtonPrev: '.slide--button--prev',
      slideButtonNext: '.slide--button--next',
      pagingIndex: 'paging--index',
      dataIndex: 'data-index',
      icoPrev: '.ico--prev',
      icoNext: '.ico--next',
    },
  },
  id: {
    eventSlider: {
      mileageSlidePage: '#mileageSlidePage',
      topMileageSlide: '#topMileageSlide',
    },
  },
  event: {
    MOUSE_OVER: 'mouseover',
    MOUSE_OUT: 'mouseout',
    CLICK: 'click',
  },
};

export { _ };

// const CLASS_NAME = {
//   HIDDEN: {  prefix: '.', value: 'hidden' },
// }
// const setClassName = function(prefix, value) {
//   this.prefix = prefix;
//   this.value = value;
//   this.full = prefix + value;
// }

// const LIST = [['.', 'hidden'], ['#', 'target']];

// const CLASS_NAME = {};
// LIST.forEach(v => {
//   CLASS_NAME[v[1].toLocaleUpperCase()] = new setClassName(v[0], v[1]);
// });
// console.log(CLASS_NAME);
