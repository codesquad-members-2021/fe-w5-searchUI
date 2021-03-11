import { _ } from "./util.js";
export const Search = function (selectors) {
	this.selectors = selectors;
	this.init();
	this.rollTimer;
	this.debounceTimer; //util함수의 debounce를 쓰기위한 timer
	this.currentIndex = 0; //selectSuggestion()에 쓰이는 state
	this.currentLength = 0; //현재 suggestions 길이
};

Search.prototype.init = function () {
	this.roll();
	this.addEvent();
};

Search.prototype.roll = function (index = 0, delay = 1000) {
	const itemLength = 11;
	const itemHeight = 1.5;
	this.rollTimer = setTimeout(() => {
		this.selectors.rollItems.style.transform = `translate3d(0,-${index * itemHeight}rem,0)`;
		this.selectors.rollItems.style.transition = "300ms";
		this.roll(index >= itemLength - 1 ? 1 : ++index, delay);
	}, delay);
};

Search.prototype.resetRoll = function ({ target }) {
	const itemLength = 11;
	const itemHeight = 1.5;
	if (target.style.transform === `translate3d(0px, -${(itemLength-1)*itemHeight}rem, 0px)`) {
		target.style.transform = "translate3d(0px, 0rem, 0px)";
		target.style.transition = "0ms";
	}
};

Search.prototype.debounce = function (func, delay = 1000) {
	clearTimeout(this.debounceTimer);
	this.debounceTimer = setTimeout(func, delay);
};

Search.prototype.addEvent = function () {
	_.E(document, "click", this.hideSuggestions.bind(this));
	_.E(this.selectors.searchBar, "click", this.makeInputFocused.bind(this));
	_.E(this.selectors.searchInput, "focus", this.revealSuggestions.bind(this));
	_.E(this.selectors.searchInput, "input", () => this.debounce(this.getSuggestions.bind(this), 1000));

	// _.E(this.selectors.searchInput, "input", () => _.debounce(this.getSuggestions.bind(this), 1000, this.debounceTimer));

	_.E(this.selectors.searchInput, "keydown", this.selectSuggestion.bind(this));
	_.E(this.selectors.rollItems, "transitionend", this.resetRoll);
};

Search.prototype.makeInputFocused = function () {
	this.selectors.searchInput.focus();
};

Search.prototype.revealSuggestions = function () {
	clearTimeout(this.rollTimer);
	this.rollTimer = 0;
	this.currentIndex = 0;
	_.CA(this.selectors.rollItems, "unseen");
	_.CA(this.selectors.searchBar, "focused");
	_.CR(this.selectors.suggestionHot, "unseen");
	_.CA(this.selectors.suggestionRecommend, "unseen");
};

Search.prototype.getSuggestions = async function () {
	const response = await fetch(`https://completion.amazon.com/api/2017/suggestions?session-id=139-3675547-2577611&customer-id=&request-id=J08DEQRH25DHAR0AFK3M&page-type=Gateway&lop=en_US&site-variant=desktop&client-info=amazon-search-ui&mid=ATVPDKIKX0DER&alias=aps&b2b=0&fresh=0&ks=49&prefix=${this.selectors.searchInput.value}&event=onKeyPress&limit=11&fb=1&suggestion-type=KEYWORD&suggestion-type=WIDGET&_=1615257159716`);
	const { suggestions, prefix } = await response.json();
	suggestions.length > 0 ? this.renderSuggestions(suggestions, prefix) : this.revealSuggestions();
};

Search.prototype.hideSuggestions = function (e) {
	if (e.target.closest(".header__search-bar") !== null) return;
	if (!this.rollTimer) this.roll();
	_.CR(this.selectors.rollItems, "unseen");
	_.CR(this.selectors.searchBar, "focused");
	_.CA(this.selectors.suggestionHot, "unseen");
	_.CA(this.selectors.suggestionRecommend, "unseen");
	this.selectors.searchInput.value = "";
};

Search.prototype.renderSuggestions = function (suggestions, prefix) {
	this.currentLength = suggestions.length;
	let html = "<ol>";
	suggestions.forEach(({ value }) => (html += `<li>${this.addHighLight(value, prefix)}</li>`));
	html += "</ol>";
	this.selectors.suggestionRecommend.innerHTML = html;
	_.CR(this.selectors.suggestionRecommend, "unseen");
	_.CA(this.selectors.suggestionHot, "unseen");
};
//prettier-ignore
Search.prototype.selectSuggestion = function (e) {
	if(e.keyCode !== 38 && e.keyCode !== 40) return
	const list = this.selectors.suggestionRecommend.querySelectorAll("li");
	this.currentIndex = e.keyCode === 38
		? this.currentIndex <= 0 ? 0 : --this.currentIndex
		: this.currentIndex >= this.currentLength - 1 ? this.currentLength - 1 : ++this.currentIndex
	this.selectors.searchInput.value = this.removeHighLight(list[this.currentIndex].innerHTML);
};

Search.prototype.addHighLight = function (text, target) {
	return text.replace(new RegExp(target, "g"), `<span class="orange">${target}</span>`);
};

Search.prototype.removeHighLight = function (text) {
	return text.replace(/<span class="orange">/g, "").replace(/<\/span>/g, "");
};
