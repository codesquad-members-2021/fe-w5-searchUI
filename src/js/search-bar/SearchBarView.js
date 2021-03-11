import '../../scss/SearchBarView.scss';
import { _ } from '../util.js';
import { SuggestionView } from './SuggestionView.js';
import { SERVER_URL, SUGGESTION_PATH } from '../app.js';

export function SearchBarView({ carouselView, suggestionView } = {}) {
  this.$target;
  this.$input;
  this.$button;
  this.carauselView = carouselView;
  this.suggestionView = suggestionView;
  this.init();
}

SearchBarView.prototype.init = function () {
  this.$target = this.createEl();
  this.$inner = _.$('.search-bar__inner', this.$target);
  this.$input = _.$('.search-bar__input', this.$target);
  this.$button = _.$('.search-bar__btn', this.$target);
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
  this.$target.addEventListener('focus', this.onFocus.bind(this), true);
  this.$target.addEventListener('blur', this.onBlur.bind(this), true);
  this.$input.addEventListener('input', this.onInput.bind(this));
};

SearchBarView.prototype.onFocus = function () {
  this.$target.classList.add('on-focus');
  this.suggestionView.show();
};

SearchBarView.prototype.onBlur = function () {
  this.$target.classList.remove('on-focus');
  this.suggestionView.hide();
};

SearchBarView.prototype.onInput = async function () {
  if (this.$input.value) {
    const suggestionData = await this.fetchSuggestionData(this.$input.value);
    this.suggestionView.setData(suggestionData);
    this.suggestionView.setMode(SuggestionView.MODE__SUGGESTION_FROM_INPUT);
  } else {
    this.suggestionView.setMode(SuggestionView.MODE__POPULAR_KEYWORD);
  }
};

SearchBarView.prototype.fetchSuggestionData = async function (inputData) {
  return fetch(SERVER_URL + SUGGESTION_PATH + `?q=${inputData}`).then(res => res.json);
};

SearchBarView.prototype.template = function () {
  return `<div class="search-bar__inner">
            <input type="text" class="search-bar__input"></input>
            <button class="search-bar__btn">
              <img class="search-bar__btn__ic"/>
            </button>
          <div>`;
};
