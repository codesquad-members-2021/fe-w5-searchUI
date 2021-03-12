import { _ } from "./util.js";
import { Search } from "./search.js";

const selectors = {
	searchBar: _.$(".header__search-bar"),
	searchInput: _.$(".search-bar__input"),
	popular: _.$(".search-bar__popular"),
	autocomplete: _.$(".search-bar__autocomplete"),
	rollItems: _.$(".search-bar__roll-items"),
};
new Search(selectors);
