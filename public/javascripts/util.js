const _ = {
  $: (selector, base = document) => base.querySelector(selector),
  $All: (selector, base = document) => base.querySelectorAll(selector),
  delay: (data, ms) =>
    new Promise(resolve => setTimeout(() => resolve(data), ms)),

  debounce: (func, delay) => {
    let timer;
    return function () {
      if (timer) clearTimeout(timer);
      timer = setTimeout(() => func.call(this), delay);
    };
  },
};

export default _;
