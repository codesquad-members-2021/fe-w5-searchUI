import request from "../utils/request";
import { urls } from "../utils/urls";

export default function Keyword(searchingInput, rollingKeywordHtml) {
  this.currIndex = 0;
  this.timer = null;
  this.topTenWords = null;
  this.popularWords = null;
  this.searchingInput = searchingInput;
  this.rollingKeywordHtml = rollingKeywordHtml;
}

Keyword.prototype = {
  constructor: Keyword,
  getTopten,
  createTemplate,
  init,
};

async function getTopten() {
  const topTenWordsJson = await request(urls.topTenWords);
  const { list } = topTenWordsJson;
  const popularWords = list.reduce((acc, val) => {
    acc.push(val.keyword);
    return acc;
  }, []);
  return popularWords;
}

function createTemplate(array, className) {
  return array.reduce((acc, item, idx) => {
    acc += `<div class="${className}"><span class="${className}__rank" data-id=${idx + 1}>${idx + 1}</span>
        <span class="popularWords__product" data-id=${idx + 1}>${item}</span></div>`;
    return acc;
  }, ``);
}

function init() {}
