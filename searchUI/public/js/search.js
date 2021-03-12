import { _ } from "./util.js";
export const Search = function (selectors) {
	this.selectors = selectors;
	this.rollTimer;
	this.rollIndex = 1;
	this.rollLength = _.$A('li',this.selectors.rollItems).length
	this.rollHeight = _.$('li',this.selectors.rollItems).offsetHeight // 왜 .style에 정보가 없을까
	this.suggestionIndex = 0;
	this.suggestionsLength = 0;
	this.init();
};

Search.prototype.init = function () {
	this.roll();
	this.addEvent();
};

Search.prototype.roll = function (delay = 1000) {
	this.rollTimer = setTimeout(() => {
		this.selectors.rollItems.style.transform = `translate3d(0,-${this.rollIndex * this.rollHeight}px,0)`;
		this.selectors.rollItems.style.transition = "300ms";
		this.rollIndex = this.rollIndex >= this.rollLength - 1 ? 1 : ++this.rollIndex;
		this.roll(delay);
	}, delay);
};

Search.prototype.resetRoll = function ({ target }) {
	if (target.style.transform === `translate3d(0px, -${(this.rollLength - 1) * this.rollHeight}px, 0px)`) {
		target.style.transform = "translate3d(0px, 0px, 0px)";
		target.style.transition = "0ms";
	}
};

Search.prototype.addEvent = function () {
	_.E(this.selectors.searchBar, "click", this.makeInputFocused.bind(this));
	_.E(this.selectors.searchInput, "focus", this.revealPopular.bind(this));
	_.E(this.selectors.searchInput, "blur", this.hideSuggestions.bind(this));
	_.E(this.selectors.searchInput, "input", _.debounce(this.getAutocomplete.bind(this), 1000));
	_.E(this.selectors.searchInput, "keydown", this.selectAutocomplete.bind(this));
	_.E(this.selectors.rollItems, "transitionend", this.resetRoll.bind(this));
};

Search.prototype.makeInputFocused = function () {
	this.selectors.searchInput.focus();
};

Search.prototype.revealPopular = function () {
	clearTimeout(this.rollTimer);
	this.rollTimer = 0;
	this.suggestionIndex = 0;
	_.CA(this.selectors.rollItems, "unseen");
	_.CA(this.selectors.searchBar, "focused");
	_.CR(this.selectors.popular, "unseen");
	_.CA(this.selectors.autocomplete, "unseen");
};

Search.prototype.getAutocomplete = async function () {
	const response = await fetch(`https://completion.amazon.com/api/2017/suggestions?session-id=139-3675547-2577611&customer-id=&request-id=J08DEQRH25DHAR0AFK3M&page-type=Gateway&lop=en_US&site-variant=desktop&client-info=amazon-search-ui&mid=ATVPDKIKX0DER&alias=aps&b2b=0&fresh=0&ks=49&prefix=${this.selectors.searchInput.value}&event=onKeyPress&limit=11&fb=1&suggestion-type=KEYWORD&suggestion-type=WIDGET&_=1615257159716`);
	const { suggestions, prefix } = await response.json();
	suggestions.length > 0 ? this.renderAutocomplete(suggestions, prefix) : this.revealPopular();
};

Search.prototype.hideSuggestions = function () {
	this.roll();
	_.CR(this.selectors.rollItems, "unseen");
	_.CR(this.selectors.searchBar, "focused");
	_.CA(this.selectors.popular, "unseen");
	_.CA(this.selectors.autocomplete, "unseen");
	this.selectors.searchInput.value = "";
};

Search.prototype.renderAutocomplete = function (suggestions, prefix) {
	this.suggestionsLength = suggestions.length;
	let html = "<ol>";
	suggestions.forEach(({ value }) => (html += `<li>${this.addHighLight(value, prefix)}</li>`));
	html += "</ol>";
	this.selectors.autocomplete.innerHTML = html;
	_.CR(this.selectors.autocomplete, "unseen");
	_.CA(this.selectors.popular, "unseen");
};
//prettier-ignore
Search.prototype.selectAutocomplete = function (e) {
	if(e.keyCode !== 38 && e.keyCode !== 40) return
	const list = this.selectors.autocomplete.querySelectorAll("li");
	this.suggestionIndex = e.keyCode === 38
		? this.suggestionIndex <= 0 ? 0 : --this.suggestionIndex
		: this.suggestionIndex >= this.suggestionsLength - 1 ? this.suggestionsLength - 1 : ++this.suggestionIndex
	this.selectors.searchInput.value = this.removeHighLight(list[this.suggestionIndex].innerHTML);
};

Search.prototype.addHighLight = function (text, target) {
	return text.replace(new RegExp(target, "g"), `<span class="orange">${target}</span>`);
};

Search.prototype.removeHighLight = function (text) {
	return text.replace(/<span class="orange">/g, "").replace(/<\/span>/g, "");
};
