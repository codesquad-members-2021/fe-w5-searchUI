import { _ } from './const';
import FetchAPI from './fetchAPI';

export default function Similarword() {
  this.input = _.$('.search-bar--keyword');
  this.fetchAPI = new FetchAPI();
}

Similarword.prototype.addEvent = function () {
  this.input.addEventListener('keyup', this.requestData.bind(this));
};

Similarword.prototype.requestData = function () {
  return this.fetchAPI.getSimilarword(this.input.value, similarword);
};

window['similarword'] = function similarword(data) {
  return data;
};
