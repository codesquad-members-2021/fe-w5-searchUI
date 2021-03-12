import '../../scss/SearchBarView.scss';
import { _ } from '../util.js';
import { SuggestionView } from './SuggestionView.js';

export function SearchBarView({ carouselView, suggestionView, serverUrl } = {}) {
  this.$target;
  this.$inputContainer;
  this.$input;
  this.$button;
  this.carouselView = carouselView;
  this.suggestionView = suggestionView;
  this.serverUrl = serverUrl;
  this.init();
}

SearchBarView.prototype.init = function () {
  this.$target = this.createEl();
  this.$inner = _.$('.search-bar__inner', this.$target);
  this.$inputContainer = _.$('.search-bar__inner__input-cont', this.$target);
  this.$input = _.$('.search-bar__inner__input', this.$target);
  this.$button = _.$('.search-bar__inner__btn', this.$target);
  this.$inputContainer.appendChild(this.carouselView.getEl());
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
  this.$inputContainer.addEventListener('click', this.onClick.bind(this));
  this.$input.addEventListener('input', this.onInput.bind(this));
};

SearchBarView.prototype.onMouseleave = function () {
  this.$inner.classList.remove('on-focus');
  this.suggestionView.hide();

  if (!this.$input.value) {
    if (this.$target.contains(document.activeElement)) document.activeElement.blur();

    this.carouselView.show();
    this.carouselView.start();
  }
};

SearchBarView.prototype.onClick = function (evt) {
  evt.stopPropagation();
  this.$inner.classList.add('on-focus');
  this.carouselView.hide();
  this.carouselView.stop();
  this.$input.focus();

  if (this.suggestionView.getMode() !== SuggestionView.MODE__NOT_FOUND) this.suggestionView.show();
};

SearchBarView.prototype.onInput = async function () {
  if (this.$input.value) {
    const suggestionData = await this.fetchSuggestionData(this.$input.value);

    if (!suggestionData) {
      this.suggestionView.hide();
      this.suggestionView.setMode(SuggestionView.MODE__NOT_FOUND);
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

SearchBarView.prototype.fetchSuggestionData = function (inputData) {
  return fetch(this.serverUrl + `/${inputData}`)
    .then(res => res.json())
    .catch(() => {});
};

SearchBarView.prototype.template = function () {
  return `<div class="search-bar__inner">
            <div class="search-bar__inner__input-cont">
              <input type="text" class="search-bar__inner__input"></input>
            </div>
            <button class="search-bar__inner__btn">
              <div class="btn__ic"/>
            </button>
          <div>`;
};
