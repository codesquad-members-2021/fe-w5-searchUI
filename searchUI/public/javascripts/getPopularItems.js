import { _ } from './util.js';

const fetchURL =
  'https://shoppinghow.kakao.com/v1.0/shophow/top/recomKeyword.json?_=1615214614503';

async function fetchPopularItemsJSON() {
  const response = await fetch(fetchURL);
  const popularItemdata = await response.json();
  return popularItemdata.list;
}

function renderItemintoSearchBar(json) {
  const $popularItems = _.$('header--search--input');

  async function run() {
    for (let v of json) {
      await delay('', 2000);
      $popularItems.innerHTML = 'hi';
    }
  }
}

const delay = (data, ms) =>
  new Promise((resolve) => setTimeout(() => resolve(data), ms));

// async function run() {
//   const res = await fetch('https://jsonplaceholder.typicode.com/todos/1');
//   const data = await res.json();
//   await delay('',1000);
//   console.log(data)
//   await delay('',2000)
//   return data;
// }
