import { _ } from "./util.js";
import { Search } from "./search.js";

const selectors = {
	searchBar: _.$(".header__search-bar"),
	searchInput: _.$(".search-bar__input"),
	suggestionHot: _.$(".search-bar__suggestion-hot"),
	suggestionRecommend: _.$(".search-bar__suggestion-recommend"),
	rollItems: _.$(".search-bar__roll-items"),
};
new Search(selectors);
