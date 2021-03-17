const _ = {
  $: (selector, base = document) => base.querySelector(selector),
  $All: (selector, base = document) => base.querySelectorAll(selector)
}

const pipe = (...fns) => arg => fns.reduce((arg, fn) => fn(arg), arg);
const createDom = (tag) => ({ value, classes }) => `<${tag} class='${classes.join(' ')}'>${value}</${tag}>`;
const getData = (url) => fetch(url).then((res) => res.json());
const delay = (value, ms) => new Promise((resolve) => setTimeout(() => resolve(value), ms));
const debounce = (fn, ms) => {
  let timeoutID;
  return function(...args) {
    if(timeoutID) {
      clearTimeout(timeoutID);
    }
    timeoutID = setTimeout(() => {
      fn(...args)
    }, ms)
  }
}

export { _, pipe, createDom, getData, delay, debounce }
