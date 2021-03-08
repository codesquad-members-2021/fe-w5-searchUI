const _ = {
  $: (selector, element = document) => element.querySelector(selector),
  $All: (selector, element = document) => element.querySelectorAll(selector),
};

export { _ };
