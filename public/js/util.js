const _ = {
  $: (selector, base = document) => base.querySelector(selector),
  $All: (selector, base = document) => base.querySelectorAll(selector)
}

const pipe = (...fns) => arg => fns.reduce((arg, fn) => fn(arg), arg);

export { _, pipe }
