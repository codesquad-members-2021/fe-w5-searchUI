import '../../scss/SearchBarView.scss';
import { _ } from '../util.js';

export function SearchBarView() {
  this.$target;

  this.createEl = () => {
    return (this.$target = _.genEl('DIV', {
      classNames: ['search-bar'],
      template: this.template,
    }));
  };

  this.getTargetEl = () => {
    return this.$target;
  };
}

SearchBarView.prototype.template = `<input type="text" class="search-bar__input"></input><div class="search-bar__btn-cont"><img class="search-bar__btn-cont__ic"/></div>`;
