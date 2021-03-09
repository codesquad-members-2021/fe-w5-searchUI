import '../scss/app.scss';
import { _ } from './util.js';
import { SearchBarView } from './search-bar/SearchBarView.js';

document.addEventListener('DOMContentLoaded', main);

function main() {
  const $mainContainer = _.$('.main-cont');
  const searchBarView = new SearchBarView();
  $mainContainer.appendChild(searchBarView.createEl());
}
