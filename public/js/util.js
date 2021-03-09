const _ = {
  $: (selector) => document.querySelector(selector),
  $All: (selector) => document.querySelectorAll(selector),
  on: (el, action, callback) => el.addEventListener(action, callback),
  addClass: (el, className) => el.classList.add(className),
  rmClass: (el, className) => el.classList.remove(className),
  toggleClass: (el, className) => el.classList.toggle(className),
};

const delay = (data, time) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => resolve(data), time);
  });
};

export { _, delay };
