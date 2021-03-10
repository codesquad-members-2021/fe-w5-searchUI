export const _ = {
  // select util
  $: (selector, target = document) => target.querySelector(selector),
  $$: (selector, target = document) => target.querySelectorAll(selector),
  closest: (selector, target) => target.closest(selector),
  // update utill
  addClass: (className, target) => target.classList.add(className),
  removeClass: (className, target) => target.classList.remove(className),
  toggleClass: (className, target) => target.classList.toggle(className),
  isContainsClass: (className, target) => target.classList.contains(className),
  replaceClass: (className, target) => target.classList.replace(className),
  addClass: (className, target) => target.classList.add(className),
  createEl: (tagName, { classNames, attributes }) => {
    const $el = document.createElement(tagName);
    if (classNames) $el.classList.add(...classNames);
    if (attributes)
      Object.entries().forEach(([k, v]) => $el.setAttribute(k, v));
    return $el;
  },
};

// inner Functions

