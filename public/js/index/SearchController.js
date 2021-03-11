import _, {delay, fetchData} from "../util.js";

const SearchController = function(allWrapper) {
    this.allWrapper = allWrapper;
    this.searchWrapper = _.$('.search', this.allWrapper);
    this.searchBarWrapper = _.$('.search__bar', this.searchWrapper);
    this.searchBarRollingWrapper = _.$('.search__bar__rolling', this.searchBarWrapper);
    this.searchSuggestWrapper = _.$('.search__suggestion', this.searchWrapper);
    this.searchSuggestSimilarWrapper = _.$('.search__suggestion__similarwords', this.searchSuggestionWrapper);
    this.searchSuggestInnerWrapper = _.$('.search__suggestion__inner', this.searchSuggestionWrapper);
    
    this.autoCompleteData = null;
    window.setAutoCompleteData = (data) => this.autoCompleteData = data;
};

// [1] 실행
SearchController.prototype.init = function () {
    this.setAllWrapMouseoverEvent(this.allWrapper);

    this.setSearchBarClickEvent(this.searchBarWrapper);
    this.setSearchBarKeyDownEvent(this.searchBarWrapper);
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
    const url = 'https://shoppinghow.kakao.com/v1.0/shophow/top/recomKeyword.json';
    try {
        const data = await fetchData(url);        
        const result = data.list.map((v) => v.keyword).splice(0, 10);
        return result;
    } catch (error) {
        console.error(error);
    }
};

// createAutoCompleteData, 자동완성 데이터 생성 (JSONP 활용) 
SearchController.prototype.createAutoCompleteData = function (callbackName, inputValue) {
    const script = _.createElement('script');
    script.src = `https://suggest-bar.daum.net/suggest?callback=${callbackName}&limit=10&mode=json&q=${inputValue}&id=shoppinghow_suggest`;    
    _.appendChild(document.body, script); 
    return delay(1000, this.autoCompleteData);
};

// ========================

// [3] 공통 function
// 롤링 visible 제어
SearchController.prototype.visibleRollingControl = function (inputTag = null) {
    const inputValue = inputTag ? inputTag.value : _.$('input', this.searchBarWrapper).value;        
    if (inputValue) 
        _.forceToggleClass(this.searchBarRollingWrapper, 'visibility--hidden', true);
    else
        _.forceToggleClass(this.searchBarRollingWrapper, 'visibility--hidden', false);
}
// ========================


// [4] 이벤트 등록
// AllWrapper Mouseover
SearchController.prototype.setAllWrapMouseoverEvent = function (allWrapper) { 
    _.addEvent(allWrapper, 'mouseover', (e) => this.allWrapMouseoverEventHandler(e));
};

SearchController.prototype.allWrapMouseoverEventHandler = async function ({target}) { 
    const closestTarget = _.closestSelector(target, '.search');        
    if (closestTarget) return;    

    _.forceToggleClass(this.searchSuggestWrapper, 'visibility--hidden', true);
    this.visibleRollingControl();

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
    _.addEvent(input, 'focusin', () => this.searchBarFocusoutEventHandler());
};
SearchController.prototype.searchBarFocusinEventHandler = function (e) {    
    this.visibleRollingControl();
};

// 2) focusout
SearchController.prototype.setSearchInputFocusoutEvent = function (searchBarWrapper) { 
    const input = _.$('input', searchBarWrapper);
    _.addEvent(input, 'focusout', () => this.searchBarFocusoutEventHandler());
};
SearchController.prototype.searchBarFocusoutEventHandler = function (e) {    
    this.visibleRollingControl();    
};

// 검색창 입력

// 1) keydown
SearchController.prototype.setSearchBarKeyDownEvent = function (searchBarWrapper) {     
    _.addEvent(searchBarWrapper, 'keydown', (e) => this.searchBarKeyDownEventHandler(e));    
};
SearchController.prototype.searchBarKeyDownEventHandler = async function ({target}) {
    this.visibleRollingControl(target);     
    const testData = await this.createAutoCompleteData('setAutoCompleteData', target.value);    
    console.log(testData)
};

// 2) keyup
SearchController.prototype.setSearchBarKeyUpEvent = function (searchBarWrapper) {     
    _.addEvent(searchBarWrapper, 'keyup', (e) => this.searchBarKeyUpEventHandler(e));    
};
SearchController.prototype.searchBarKeyUpEventHandler = function ({target}) {
    this.visibleRollingControl(target);

    // 자동완성 결과 및 인기 쇼핑 키워드 창 보일 시 숨김 (분리 필요)
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

        arrDatas.forEach((data, i) => {
            (i === arrDatas.length-1) && 
                rollingListWrapper.insertAdjacentHTML('afterbegin', `<li>${i+1} ${data}</li>`);            
            rollingListWrapper.insertAdjacentHTML('beforeend', `<li>${i+1} ${data}</li>`);
        });  
    } catch (error) {
        console.error(error);
    } 
};

// 검색창 롤링 애니메이션 실행
SearchController.prototype.runRollingSearchBar = function (searchBarRollingWrapper, ms = 3000) {
    setTimeout(async () => {
        const rollingListWrapper = _.$('.rolling-list', searchBarRollingWrapper);
        const rollingTopInfoClassName =
            rollingListWrapper.className.split(' ').find((className) => className.indexOf('top') > -1);

        const currentPos = Number(rollingTopInfoClassName.replace('top52__', ''));
        const endPos = -10;        

        if ((currentPos-1) < endPos)
            this.initRollingPos(rollingListWrapper, rollingTopInfoClassName)        
        else    
            this.changeRollingPos(rollingListWrapper, rollingTopInfoClassName, currentPos);
                            
        this.runRollingSearchBar(searchBarRollingWrapper);
    }, ms);    
};

SearchController.prototype.initRollingPos = async function (rollingListWrapper, rollingTopInfoClassName) {    
    _.replaceClass(rollingListWrapper, 'transition__duration__500', 'transition__duration__0'); 
    _.replaceClass(rollingListWrapper, rollingTopInfoClassName, `top52__0`);
    await delay(20); 
    _.replaceClass(rollingListWrapper, 'transition__duration__0', 'transition__duration__500');
    _.replaceClass(rollingListWrapper, 'top52__0', 'top52__-1'); 
};

SearchController.prototype.changeRollingPos = function (rollingListWrapper, rollingTopInfoClassName, currentPos) {
    _.replaceClass(rollingListWrapper, 'transition__duration__0', 'transition__duration__500');
    _.replaceClass(rollingListWrapper, rollingTopInfoClassName, `top52__${ (currentPos-1)}`);
}

// ========================



export default SearchController;