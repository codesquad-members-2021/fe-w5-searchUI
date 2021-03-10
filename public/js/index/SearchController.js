import _, {delay, fetchData} from "../util.js";

const SearchController = function(allWrapper) {
    this.allWrapper = allWrapper;
    this.searchWrapper = _.$('.search', this.allWrapper);
    this.searchBarWrapper = _.$('.search__bar', this.searchWrapper);
    this.searchBarRollingWrapper = _.$('.search__bar__rolling', this.searchBarWrapper);
    this.searchSuggestWrapper = _.$('.search__suggestion', this.searchWrapper);
    this.searchSuggestSimilarWrapper = _.$('.search__suggestion__similarwords', this.searchSuggestionWrapper);
    this.searchSuggestInnerWrapper = _.$('.search__suggestion__inner', this.searchSuggestionWrapper);  
};

// [1] 실행
SearchController.prototype.init = function () {
    this.setAllWrapMouseoverEvent(this.allWrapper);

    this.setSearchBarClickEvent(this.searchBarWrapper);
    this.setSearchBarKeyUpEvent(this.searchBarWrapper);
    this.setSearchInputFocusinEvent(this.searchBarWrapper);
    this.setSearchInputFocusoutEvent(this.searchBarWrapper);

    this.makeSuggestionItem(this.searchSuggestInnerWrapper);
    this.makeRollingItem(this.searchBarRollingWrapper);
    this.runRollingSearchBar(this.searchBarRollingWrapper);    
};
// ========================

// [2] 데이터 관련
// getRecomKeywords, 인기 쇼핑 키워드 10위까지.
SearchController.prototype.getRecomKeywords = async function () {
    try {
        const data = await fetchData('https://shoppinghow.kakao.com/v1.0/shophow/top/recomKeyword.json');        
        const result = data.list.map((v) => v.keyword).splice(0, 10);
        return result;
    } catch (error) {
        console.error(error);
    }
};
// ========================

// [3] 이벤트 등록

// AllWrapper Mouseover
SearchController.prototype.setAllWrapMouseoverEvent = function (allWrapper) { 
    _.addEvent(allWrapper, 'mouseover', (e) => this.allWrapMouseoverEventHandler(e));
};

SearchController.prototype.allWrapMouseoverEventHandler = async function ({target}) { 
    const closestTarget = _.closestSelector(target, '.search');        
    if (closestTarget) return;
    await delay(500);
    _.forceToggleClass(this.searchSuggestWrapper, 'visibility--hidden', true);
    _.forceToggleClass(this.searchBarRollingWrapper, 'visibility--hidden', false);

    const focusInput = _.$('input:focus', this.searchBarWrapper);
    if (!focusInput) return;
    focusInput.blur();
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

// 검색창 input focus (input focus in -> 롤링 가림 / input focus out -> 롤링 활성)
// 1) focusin
SearchController.prototype.setSearchInputFocusinEvent = function (searchBarWrapper) { 
    const input = _.$('input', searchBarWrapper);
    _.addEvent(input, 'focusin', (e) => this.searchBarFocusinEventHandler(e));
};
SearchController.prototype.searchBarFocusinEventHandler = function (e) {    
    _.forceToggleClass(this.searchBarRollingWrapper, 'visibility--hidden', true);    
};

// 2) focusout
SearchController.prototype.setSearchInputFocusoutEvent = function (searchBarWrapper) { 
    const input = _.$('input', searchBarWrapper);
    _.addEvent(input, 'focusout', (e) => this.searchBarFocusoutEventHandler(e));
};
SearchController.prototype.searchBarFocusoutEventHandler = function (e) {    
    _.forceToggleClass(this.searchBarRollingWrapper, 'visibility--hidden', false);    
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

// 검색창 인기 쇼핑 키워드 아이템 생성
SearchController.prototype.makeSuggestionItem = async function (searchSuggestInnerWrapper) {
    try {
        const innerWrapper = _.$('.inner__list', searchSuggestInnerWrapper);    
        const arrDatas = await this.getRecomKeywords();
        arrDatas.forEach((data, i) => 
            innerWrapper.insertAdjacentHTML('beforeend', `<li><span>${i+1}</span> ${data}</li>`));
    } catch (error) {
        console.error(error);
    } 
};

// 검색창 롤링 아이템 생성
SearchController.prototype.makeRollingItem = async function (searchBarRollingWrapper) {
    try {
        const rollingListWrapper = _.$('.rolling-list', searchBarRollingWrapper);    
        const arrDatas = await this.getRecomKeywords();
        arrDatas.forEach((data, i) => 
            rollingListWrapper.insertAdjacentHTML('beforeend', `<li>${i+1} ${data}</li>`));
    } catch (error) {
        console.error(error);
    } 
};

// 검색창 롤링 애니메이션 실행 (initRollingPos, changeRollingPos 부분 추후 수정)
SearchController.prototype.runRollingSearchBar = function (searchBarRollingWrapper, ms = 2000) {
    setTimeout(async () => {
        const rollingListWrapper = _.$('.rolling-list', searchBarRollingWrapper);
        const rollingTopInfoClassName =
            rollingListWrapper.className.split(' ').find((className) => className.indexOf('top') > -1);

        const currentPos = Number(rollingTopInfoClassName.replace('top52__', ''));
        const endPos = -9;        

        if ((currentPos-1) < endPos)
            this.initRollingPos(rollingListWrapper, rollingTopInfoClassName)        
        else    
            this.changeRollingPos(rollingListWrapper, rollingTopInfoClassName, currentPos);
                            
        this.runRollingSearchBar(searchBarRollingWrapper);
    }, ms);    
};

SearchController.prototype.initRollingPos = async function (rollingListWrapper, rollingTopInfoClassName) {
    _.replaceClass(rollingListWrapper, rollingTopInfoClassName, `top52__-10`);
    _.replaceClass(rollingListWrapper, 'transition__duration__500', 'transition__duration__0'); 
    _.replaceClass(rollingListWrapper, 'top52__-10', 'top52__1'); 
    await delay(20); 
    _.replaceClass(rollingListWrapper, 'transition__duration__0', 'transition__duration__500');
    _.replaceClass(rollingListWrapper, 'top52__1', 'top52__0');
};

SearchController.prototype.changeRollingPos = function (rollingListWrapper, rollingTopInfoClassName, currentPos) {
    _.replaceClass(rollingListWrapper, 'transition__duration__0', 'transition__duration__500');
    _.replaceClass(rollingListWrapper, rollingTopInfoClassName, `top52__${ (currentPos-1)}`);
}

// ========================



export default SearchController;