import _, {delay} from "../util.js";

const SearchController = function(searchWrapper) {
    this.searchWrapper = searchWrapper;
    this.searchBarWrapper = _.$('.search__bar', this.searchWrapper);
    this.searchBarRollingWrapper = _.$('.search__bar__rolling', this.searchBarWrapper);
    this.searchSuggestWrapper = _.$('.search__suggestion', this.searchWrapper);
    this.searchSuggestSimilarWrapper = _.$('.search__suggestion__similarwords', this.searchSuggestionWrapper);
    this.searchSuggestInnerWrapper = _.$('.search__suggestion__inner', this.searchSuggestionWrapper);  
};

SearchController.prototype.init = function () {
    this.setSearchBarClickEvent(this.searchBarWrapper);
    this.setSearchBarKeyUpEvent(this.searchBarWrapper);

    this.runRollingSearchBar(this.searchBarRollingWrapper);
};

// 검색창 클릭 시, 인기 쇼핑 키워드 창 노출
SearchController.prototype.setSearchBarClickEvent = function (searchBarWrapper) {     
    _.addEvent(searchBarWrapper, 'click', (e) => this.searchBarClickEventHandler(e));
};

SearchController.prototype.searchBarClickEventHandler = function ({target}) {
    const closestTarget = _.closestSelector(target, '.search__bar');

    if (closestTarget !== this.searchBarWrapper) return;
    _.forceToggleClass(this.searchSuggestWrapper, 'visibility--hidden', false);
    _.forceToggleClass(this.searchSuggestInnerWrapper, 'display--none', false);
    _.forceToggleClass(this.searchSuggestSimilarWrapper, 'display--none', true);    
};

// 검색창 입력 시, 자동완성 결과 및 인기 쇼핑 키워드 창 보일 시 숨김
SearchController.prototype.setSearchBarKeyUpEvent = function (searchBarWrapper) {     
    _.addEvent(searchBarWrapper, 'keyup', (e) => this.searchBarKeyUpEventHandler(e));    
};

SearchController.prototype.searchBarKeyUpEventHandler = function ({target}) {
    if (target.value) {
        _.forceToggleClass(this.searchSuggestInnerWrapper, 'display--none', true);        
        _.forceToggleClass(this.searchSuggestSimilarWrapper, 'display--none', false);
    } else {
        _.forceToggleClass(this.searchSuggestInnerWrapper, 'display--none', false);        
        _.forceToggleClass(this.searchSuggestSimilarWrapper, 'display--none', true);
    }
};

// 검색창 롤링 실행
SearchController.prototype.runRollingSearchBar = function (searchBarRollingWrapper, ms = 2000) {
    setTimeout(async () => {
        const rollingListWrapper = _.$('.rolling-list', searchBarRollingWrapper);
        const rollingTopInfoClassName =    // css의 top을 변경함으로써 롤링되게 하기 위함.
            rollingListWrapper.className.split(' ').find((className) => className.indexOf('top') > -1);

        const endPos = -9;
        const currentPos = Number(rollingTopInfoClassName.replace('top48__', ''));        

        // (리팩토링 예정)
        if ((currentPos-1) < endPos) {
            _.replaceClass(rollingListWrapper, 'transition__duration__500', 'transition__duration__0');
            _.replaceClass(rollingListWrapper, rollingTopInfoClassName, 'top48__1');
            await delay(20);
            _.replaceClass(rollingListWrapper, 'transition__duration__0', 'transition__duration__500');
            _.replaceClass(rollingListWrapper, 'top48__1', 'top48__0');

        } else {
            _.replaceClass(rollingListWrapper, 'transition__duration__0', 'transition__duration__500');
            _.replaceClass(rollingListWrapper, rollingTopInfoClassName, `top48__${ (currentPos-1)}`);
        }
        // =-------------
                    
        this.runRollingSearchBar(searchBarRollingWrapper);
    }, ms);    
};

export default SearchController;