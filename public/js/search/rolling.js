import { recommendParser } from '../util/parser.js';
import { URL } from '../util/data.js';
import { $search, $rollingKeywords, $recommendedKeyword } from '../util/ref.js';

const renderRecommendedKeywords = async () => {
  const recommendedKeywords = await fetch(URL.RECOMMEND)
    .then(res => res.json())
    .then(jsonData => jsonData.list.map(v => v.keyword));

  const renderedValue = recommendedKeywords.reduce((prev, curr, idx) => {
    return prev + `<li>${recommendedKeywords[idx]}</li>`
  }, '<ol>')
  $recommendedKeyword.innerHTML = renderedValue + '</ol>';
}

export { renderRecommendedKeywords }