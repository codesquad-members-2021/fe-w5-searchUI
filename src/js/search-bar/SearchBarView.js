import '../../scss/SearchBarView.scss';
import { _ } from '../util.js';
import { SuggestionView } from './SuggestionView.js';
// import { SERVER_URL, SUGGESTION_PATH } from '../app.js';

export function SearchBarView({ carouselView, suggestionView, serverUrl } = {}) {
  this.$target;
  this.$input;
  this.$button;
  this.carauselView = carouselView;
  this.suggestionView = suggestionView;
  this.serverUrl = serverUrl;
  this.init();
}

SearchBarView.prototype.init = function () {
  this.$target = this.createEl();
  this.$inner = _.$('.search-bar__inner', this.$target);
  this.$input = _.$('.search-bar__inner__input', this.$target);
  this.$button = _.$('.search-bar__inner__btn', this.$target);
  this.$target.appendChild(this.suggestionView.getEl());
  this.onEvents();
};

SearchBarView.prototype.createEl = function () {
  return _.genEl('DIV', {
    classNames: ['search-bar'],
    template: this.template(),
  });
};

SearchBarView.prototype.getEl = function () {
  return this.$target;
};

SearchBarView.prototype.onEvents = function () {
  this.$target.addEventListener('mouseleave', this.onMouseleave.bind(this));
  this.$target.addEventListener('focus', this.onFocus.bind(this), true);
  this.$input.addEventListener('input', this.onInput.bind(this));
};

SearchBarView.prototype.onMouseleave = function () {
  if (this.$target.contains(document.activeElement)) document.activeElement.blur();
  this.$inner.classList.remove('on-focus');
  this.suggestionView.hide();
};

SearchBarView.prototype.onFocus = function () {
  this.$inner.classList.add('on-focus');

  if (this.suggestionView.getMode() !== SuggestionView.MODE__NOT_FOUND) this.suggestionView.show();
};

SearchBarView.prototype.onInput = async function () {
  if (this.$input.value) {
    const suggestionData = await this.fetchSuggestionData(this.$input.value);

    if (!suggestionData) {
      this.suggestionView.setMode(SuggestionView.MODE__NOT_FOUND);
      this.suggestionView.hide();
      return;
    }

    this.suggestionView.setData(suggestionData);
    this.suggestionView.setMode(SuggestionView.MODE__SUGGESTION_FROM_INPUT);
    this.suggestionView.show();
  } else {
    this.suggestionView.setMode(SuggestionView.MODE__POPULAR_KEYWORD);
    this.suggestionView.show();
  }
};

SearchBarView.prototype.fetchSuggestionData = async function (inputData) {
  return fetch(this.serverUrl + `/${inputData}`)
    .then(res => res.json())
    .catch(() => {});
};

SearchBarView.prototype.template = function () {
  return `<div class="search-bar__inner">
            <input type="text" class="search-bar__inner__input"></input>
            <button class="search-bar__inner__btn">
              <img class="btn__ic"/>
            </button>
          <div>`;
};
