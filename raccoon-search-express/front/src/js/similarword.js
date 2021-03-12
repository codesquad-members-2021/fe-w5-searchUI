import { _ } from './const';
import FetchAPI from './fetchAPI';

export default function Similarword() {
  this.input = _.$('.search-bar--keyword');
  this.similarwordList = _.$('.list_similarwords');
  this.fetchAPI = new FetchAPI();
}

Similarword.prototype = {
  constructor: Similarword,
  addEvent: function () {
    this.input.addEventListener('keyup', this.requestData.bind(this));
  },
  requestData: function () {
    return this.fetchAPI.getSimilarword(this.input.value, similarword);
  },
  getGroupSuggestion: function (data) {
    const groupSuggestion = data.items.reduce((acc, cur) => {
      acc += `
      <li>
        <a href="/" class="link_keyword">${cur.slice(0, -2)}</a>
      </li>
    `;
      return acc;
    }, ``);
    return groupSuggestion;
  },
  drawGroupSuggestion: function (data) {
    console.log(this.similarwordList);
    this.similarwordList.innerHTML = `${this.getGroupSuggestion(data)}`;
  },
};

window.similarword = function similarword(data) {
  const groupSuggestion = new Similarword();
  return groupSuggestion.drawGroupSuggestion.call(groupSuggestion, data);
};
