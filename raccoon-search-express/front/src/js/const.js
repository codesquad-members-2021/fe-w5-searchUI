const _ = {
  $: document.querySelector.bind(document),
  $$: document.querySelectorAll.bind(document),
  reqNum: {
    PAGE: 2,
    ITEMS: 5,
    CURRENT: 0,
  },
};

export { _ };
