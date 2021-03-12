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

function createTemplate() {}

function init() {}
