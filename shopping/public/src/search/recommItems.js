import { searchToggle } from "../utils/states.js";
import { _ } from "../utils/selector.js";
import request from "../utils/request.js";
import { urls } from "../utils/urls.js";
import { times } from "../utils/states.js";

// request recommededWords related to inputValue
// const searchingInput = _.$(".searchBar__input");
// const recommendedWordsToggle = _.$(".searchBar__toggle");
// let timer;
// let recommendations = [];
// let currIndex = -1;

const initToggle = () => {
  searchToggle.searchingInput = _.$(".searchBar__input");
  searchToggle.recommWordsToggle = _.$(".searchBar__toggle");
  const topTenWordsJson = request(urls.topTenWords);
  topTenWordsJson.then(({popularWords}) => {
    searchToggle.popularShoppingKeyword =  Object.entries(popularWords[0]).reduce((acc, item) => {
              const [num, product] = item;
              acc += `<span class="popularWords__rank" data-id=${num}>${num}</span>
                <span class="popularWords__product" data-id=${num}>${product}</span>`;
              return acc;
            }, `<div class="popularWords">`) + `</div>`;
    searchToggle.recommWordsToggle.innerHTML = searchToggle.popularShoppingKeyword
  })
  // searchToggle.recommWordsToggle.innerHTML = topTenWordsJson;
  // return recommWordsToggle;
};

const registerEvent = (element, eventType, fn) => {
  element.addEventListener(eventType, fn);
};

const focus = () => searchToggle.recommWordsToggle.classList.add("visible")

const input = (e) => {
  const inputValue = e.target.inputValue
  if(inputValue===``) {
    if(searchToggle.timer) clearTimeout(searchToggle.timer)
    searchToggle.recommWordsToggle.innerHTML = searchToggle.popularShoppingKeyword
  } 
  if(inputValue !== ``) {
    if(searchToggle.timer) clearTimeout(searchToggle.timer)
    searchToggle.timer = setTimeout(() => {
      const data = request(urls.recommendations, inputValue)
      data.then(({suggestions}) => {
        searchToggle.recommendations = suggestions.map(item => item.value)
        // main.js 125번까지 함 
      })
    }, times.debounce)
  }
}