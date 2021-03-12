export const _ = {
  $: function (selector, base = document) {
    return base.querySelector(selector);
  },
  $All: function (selector, base = document) {
    return base.querySelectorAll(selector);
  },
};

export const getData = (url) => fetch(url).then((res) => res.json());

export const createDom = (tag) => ({ value, classes }) => `<${tag} class='${classes.join(' ')}'>${value}</${tag}>`;

export const delay = (value, ms) => new Promise((resolve) => setTimeout(() => resolve(value), ms));

export const debounce = (fn, delay, timer) => {
  if (timer) clearTimeout(timer);
  timer = setTimeout(fn, delay);
  return timer;
};
