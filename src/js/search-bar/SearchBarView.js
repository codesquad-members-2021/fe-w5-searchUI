import '../../scss/SearchBarView.scss';
import { _ } from '../util.js';

export function SearchBarView({ carouselView, suggestionView } = {}) {
  this.$target;
  this.$input;
  this.$button;
  this.carauselView = carouselView;
  this.suggestionView = suggestionView;

  this.init = function () {
    this.$target = this.createEl();
    this.$input = _.$('.search-bar__input', this.$target);
    this.$button = _.$('.search-bar__btn', this.$target);
    this.onEvents();
  };

  this.createEl = function () {
    return _.genEl('DIV', {
      classNames: ['search-bar'],
      template: this.template(),
    });
  };

  this.getEl = function () {
    return this.$target;
  };

  this.onEvents = function () {
    this.$input.addEventListener('change', this.onChangeInput.bind(this));
  };

  this.onChangeInput = function ({ target }) {
    // TODO: trigger suggestion view
  };

  this.init();
}

SearchBarView.prototype.template = function () {
  return `<input type="text" class="search-bar__input"></input>
          <button class="search-bar__btn">
            <img class="search-bar__btn__ic"/>
          </button>`;
};
