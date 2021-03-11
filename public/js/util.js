export const _ = {
   $: (selector, base = document) => base.querySelector(selector),
   $All: (selector, base = document) => base.querySelectorAll(selector),
   create: (selector, base = document) =>base.createElement(selector),
};

export const getData = async (url) => {
   const response = await fetch(url);
   const jsonData = await response.json();
   return jsonData;
}