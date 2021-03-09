import request from "../utils/request.js";

// request recommededWords related to inputValue
const searchingInput = _.$(".searchBar__input");
const recommendedWordsToggle = _.$(".searchBar__toggle");
let timer;
let recommendations = [];
let currIndex = -1;

searchingInput.addEventListener("input", (e) => {
  currIndex = -1;
  if (timer) clearTimeout(timer);
  timer = setTimeout(() => {
    recommendedWordsToggle.style.visibility = "visible";
    const inputValue = e.target.value;
    const data = request(inputValue);
    data.then(({ suggestions }) => {
      recommendations = suggestions.map((item) => item.value);
      const set = new Set([...recommendations]); // 다시 값을 입력했는데 가습기가 두번 나옴
      recommendations = [...set];
      const tempRecommendations = recommendations.reduce((acc, item, i) => acc + `<span class="recommended__item" data-id="${i}">${item}</span>`, ``);
      recommendedWordsToggle.innerHTML = tempRecommendations;
    });
  }, times.debounce);
});

// register event of direction-key to select the related word of recommendations

let coloredElement = null;
let currElement = null;
searchingInput.addEventListener("keydown", ({ key }) => {
  if (key.includes("Arrow")) {
    if (key === "ArrowUp") {
      if (currIndex >= 0) {
        currIndex--;
        currElement = _.$All(".recommended__item")[currIndex];
        if (coloredElement) coloredElement.style.color = "#000";
        currElement.style.color = "#ddd";
        coloredElement = currElement;
      }
      if (currIndex < 0) {
        if (coloredElement) {
          coloredElement.style.color = "#000";
          coloredElement = null;
          currElement = null;
        }
        recommendedWordsToggle.style.visibility = "hidden";
      }
    }
    if (key === "ArrowDown") {
      if (currIndex < recommendations.length) {
        currIndex++;
        currElement = _.$All(".recommended__item")[currIndex];
        if (coloredElement) coloredElement.style.color = "#000";
        currElement.style.color = "#ddd";
        coloredElement = currElement;
      }
      if (currIndex >= recommendations.length) {
        if (coloredElement) {
          coloredElement.style.color = "#000";
          coloredElement = null;
          currElement = null;
        }
        recommendedWordsToggle.style.visibility = "hidden";
      }
    }
  }
});
