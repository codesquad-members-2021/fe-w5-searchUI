import '../scss/app.scss';
import { _ } from './util.js';
import { SearchBarView } from './search-bar/SearchBarView.js';
import { SuggestionView } from './search-bar/SuggestionView.js';
import { CarouselView } from './search-bar/CarouselView.js';

const SERVER_URL = 'http://localhost:3000';
const SUGGESTION_URL = SERVER_URL + '/json/suggest';
const RECOMMAND_KEYWORD_URL = SERVER_URL + '/json/recomKeyword.json';

const CAROUSEL_INTERVAL = 2000;

document.addEventListener('DOMContentLoaded', initViews);

async function initViews() {
  const $mainContainer = _.$('.main-cont');
  const [carouselView, suggestionView] = await fetch(RECOMMAND_KEYWORD_URL)
    .then(res => res.json())
    .then(json => [
      new CarouselView({ data: json.list.slice(0, 10), interval: CAROUSEL_INTERVAL }),
      new SuggestionView(json.list.slice(0, 10)),
    ]);

  const searchBarView = new SearchBarView({
    carouselView,
    suggestionView,
    serverUrl: SUGGESTION_URL,
  });

  $mainContainer.appendChild(searchBarView.getEl());
}
