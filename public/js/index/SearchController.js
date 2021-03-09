import _ from "../util.js";

const SearchController = function(searchWrapper) {
    this.searchWrapper = searchWrapper;
    this.searchBarWrapper = _.$('.search__bar', this.searchWrapper);
    this.searchSuggestWrapper = _.$('.search__suggestion', this.searchWrapper);
    this.searchSuggestSimilarWrapper = _.$('.search__suggestion__similarwords', this.searchSuggestionWrapper);
    this.searchSuggestInnerWrapper = _.$('.search__suggestion__inner', this.searchSuggestionWrapper);  
};

SearchController.prototype.init = function () {
    this.setSearchBarClickEvent(this.searchBarWrapper);
    this.setSearchBarKeyUpEvent(this.searchBarWrapper);
};

// 검색창 클릭 시, 인기 쇼핑 키워드 창 노출
SearchController.prototype.setSearchBarClickEvent = function (searchBarWrapper) {     
    _.addEvent(searchBarWrapper, 'click', (e) => this.searchBarClickEventHandler(e));
};

SearchController.prototype.searchBarClickEventHandler = function ({target}) {
    // console.log(_.closestSelector(target, '.search__bar'))   // 안씀
    if (target.tagName === "INPUT") {
        _.classToggleForce(this.searchSuggestWrapper, 'visibility--hidden', false);
        _.classToggleForce(this.searchSuggestInnerWrapper, 'display--none', false);
        _.classToggleForce(this.searchSuggestSimilarWrapper, 'display--none', true);
    }
};

// 검색창 입력 시, 자동완성 결과 및 인기 쇼핑 키워드 창 보일 시 숨김
SearchController.prototype.setSearchBarKeyUpEvent = function (searchBarWrapper) {     
    _.addEvent(searchBarWrapper, 'keyup', (e) => this.searchBarKeyUpEventHandler(e));    
};

SearchController.prototype.searchBarKeyUpEventHandler = function ({target}) {
    if (target.value) {
        _.classToggleForce(this.searchSuggestInnerWrapper, 'display--none', true);        
        _.classToggleForce(this.searchSuggestSimilarWrapper, 'display--none', false);
    } else {
        _.classToggleForce(this.searchSuggestInnerWrapper, 'display--none', false);        
        _.classToggleForce(this.searchSuggestSimilarWrapper, 'display--none', true);
    }
};

export default SearchController;