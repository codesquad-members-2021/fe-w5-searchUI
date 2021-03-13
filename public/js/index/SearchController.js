import _, {delay, fetchData, isKorEngNum, isPossibleInput} from "../util.js";

const SearchController = function(allWrapper) {
    this.allWrapper = allWrapper;
    this.searchWrapper = _.$('.search', this.allWrapper);
    this.searchBarWrapper = _.$('.search__bar', this.searchWrapper);
    this.searchBarRollingWrapper = _.$('.search__bar__rolling', this.searchBarWrapper);
    
    this.searchSuggestWrapper = _.$('.search__suggestion', this.searchWrapper);
    // Inner -> 인기 쇼핑 키워드 / Similar -> 자동완성
    this.searchSuggestSimilarWrapper = _.$('.search__suggestion__similarwords', this.searchSuggestionWrapper);    
    this.searchSuggestInnerWrapper = _.$('.search__suggestion__inner', this.searchSuggestionWrapper);

    this.debouncer = null;
};

// [1] 실행
SearchController.prototype.init = function () {
    this.setAllWrapMouseoverEvent(this.allWrapper);

    this.setSearchBarClickEvent(this.searchBarWrapper);
    this.setSearchBarKeyDownEvent(this.searchBarWrapper);
    this.setSearchBarKeyUpEvent(this.searchBarWrapper);
    
    this.setSearchInputFocusinoutEvent(this.searchBarWrapper);    

    this.setAutoCompleteChangeDetection(this.searchSuggestSimilarWrapper, this.searchBarWrapper);

    this.makeSuggestionInnerItems(this.searchSuggestInnerWrapper);
    this.makeRollingItems(this.searchBarRollingWrapper);
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

// getAutoCompleteData, 자동완성 데이터 생성 (아마존 데이터 가져옴) 
SearchController.prototype.getAutoCompleteData = async function (inputValue) {
    const url = `https://completion.amazon.com/api/2017/suggestions?client-info=amazon-search-ui&mid=ATVPDKIKX0DER&alias=aps&prefix=${inputValue}&limit=11&suggestion-type=KEYWORD`;
    try {
        const data = await fetchData(url);        
        const result = data.suggestions.map((v) => v.value);        
        return result;
    } catch (error) {
        console.error(error);
    }
};
// ========================

// [3] visible 제어
// 롤링 visible 제어
SearchController.prototype.visibleRollingControl = function (searchInput = null) {
    const inputValue = searchInput ? searchInput.value : _.$('.search__input', this.searchBarWrapper).value;
    _.forceToggleClass(this.searchBarRollingWrapper, 'visibility--hidden', inputValue);            
};

// 인기 쇼핑 키워드 Visible 제어
SearchController.prototype.visibleInnerControl = function (searchInput) {
    const similarWrapper = _.$('.similar__list', this.searchSuggestSimilarWrapper);

    const suggestVisibleFlag = searchInput.value && !similarWrapper.firstChild;
    _.forceToggleClass(this.searchSuggestWrapper, 'visibility--hidden', suggestVisibleFlag);
    _.forceToggleClass(this.searchSuggestInnerWrapper, 'display--none', searchInput.value);    
    _.forceToggleClass(this.searchSuggestSimilarWrapper, 'display--none', !searchInput.value);

};

// 자동완성 결과 및 인기 쇼핑 키워드 창 Visible 제어
SearchController.prototype.visibleSuggestionControl = function (searchInput) { 
    // 검색창에 검색어가 있을 시 인기 쇼핑 키워드 창 false
    // 검색창에 검색어가 없을 시 인기 쇼핑 키워드 창 true
    _.forceToggleClass(this.searchSuggestInnerWrapper, 'display--none', searchInput.value);
    _.forceToggleClass(this.searchSuggestSimilarWrapper, 'display--none', !searchInput.value);
};

// 검색창 자동완성 아이템 생성 / 제거 추적용 MutationObserver 설정 (init() 에서 설정해둠)
SearchController.prototype.setAutoCompleteChangeDetection = function (searchSuggestSimilarWrapper, searchBarWrapper) {
    const similarWrapper = _.$('.similar__list', searchSuggestSimilarWrapper);
    const searchInput = _.$('.search__input', searchBarWrapper);
    const observer = new MutationObserver(() => {               
        const suggestVisibleFlag = !(similarWrapper.childNodes.length > 0 || !searchInput.value);
        _.forceToggleClass(this.searchSuggestWrapper, 'visibility--hidden', suggestVisibleFlag);        
    });

    observer.observe(similarWrapper, {
        attributes: true,
        childList: true,
        characterData: true
    });
};
// ========================


// [4] 이벤트 등록
// AllWrapper Mouseover
SearchController.prototype.setAllWrapMouseoverEvent = function (allWrapper) { 
    _.addEvent(allWrapper, 'mouseover', (e) => this.allWrapMouseoverEventHandler(e));
};

SearchController.prototype.allWrapMouseoverEventHandler = function ({target}) {
    const closestTarget = _.closestSelector(target, '.search');
    if (closestTarget) return;

    _.forceToggleClass(this.searchSuggestWrapper, 'visibility--hidden', true);
    this.visibleRollingControl();

    const focusInput = _.$('.search__input:focus', this.searchBarWrapper);
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
    
    const searchInput = _.$('.search__input', this.searchBarWrapper);
    (searchInput !== target) && searchInput.focus();
    this.visibleInnerControl(searchInput);   
};

// 검색창 input focus (in & out) (input focus in -> 롤링 가림 / input focus out -> 롤링 활성)
SearchController.prototype.setSearchInputFocusinoutEvent = function (searchBarWrapper) { 
    const searchInput = _.$('.search__input', searchBarWrapper);
    _.addEvent(searchInput, 'focusin', this.visibleRollingControl());
    _.addEvent(searchInput, 'focusout', this.visibleRollingControl());
};

// 검색창 입력 (keydown, keyup)
// 1) keydown
SearchController.prototype.setSearchBarKeyDownEvent = function (searchBarWrapper) {     
    _.addEvent(searchBarWrapper, 'keydown', (e) => this.searchBarKeyDownEventHandler(e));    
};
SearchController.prototype.searchBarKeyDownEventHandler = function (e) {
    const {target, keyCode} = e;
    this.visibleRollingControl(target); 

    // keyDown의 경우 첫 입력은 없는 걸로 판별됨
    if (!target.value) 
        _.forceToggleClass(this.searchSuggestWrapper, 'visibility--hidden', true);

    // 방향키 (위 / 아래)에 따른 자동완성창 컨트롤
    if (keyCode === 38 || keyCode === 40)  
        this.runAutoCompleteArrowKeyControl(this.searchSuggestSimilarWrapper, keyCode);
};

// 2) keyup
SearchController.prototype.setSearchBarKeyUpEvent = function (searchBarWrapper) {     
    _.addEvent(searchBarWrapper, 'keyup', (e) => this.searchBarKeyUpEventHandler(e));    
};
SearchController.prototype.searchBarKeyUpEventHandler = function (e) {
    const { target, key, code } = e;
    
    this.visibleRollingControl(target);    
    this.visibleSuggestionControl(target);
    
    if (!isKorEngNum(key) || !isPossibleInput(code)) return;

    this.setBackupSearchInputValue(target);
    this.setDebouncer(() => {
        this.removeSuggestionSimilarItems(this.searchSuggestSimilarWrapper);        
        this.makeSuggestionSimilarItems(this.searchSuggestSimilarWrapper, target);  
    }, 800);   
};
// ========================


// [5] DOM 조작 관련

// 검색창 자동완성 전용 Debouncer 설정
SearchController.prototype.setDebouncer = function (callbackFn, ms) {
    if (this.debouncer) clearTimeout(this.debouncer);
    this.debouncer = setTimeout(() => callbackFn(), ms); 
};

// 검색창 자동완성 키보드 컨트롤 (방향키 위(code 38) / 아래(code 40) )
SearchController.prototype.runAutoCompleteArrowKeyControl = function (searchSuggestSimilarWrapper, keyCode) {
    const similarWrapper = _.$('.similar__list', searchSuggestSimilarWrapper);    
    const arrliList = Array.from(similarWrapper.children);   // li태그들
    if (arrliList.length <= 0) return;

    const params = {
        arrliList,
        currSelectedIndex: arrliList.findIndex((li) => _.containsClass(_.$('a', li), 'selected')),
        firstItem: arrliList[0],
        lastItem: arrliList[arrliList.length - 1],
        searchInput: _.$('.search__input', this.searchBarWrapper),
    };

    this.setClearSelectedTags(arrliList);
    keyCode === 38
        ? this.runAutoCompleteArrowUp(params)
        : this.runAutoCompleteArrowDown(params);
};

SearchController.prototype.runAutoCompleteArrowUp = function (params) {
    const {arrliList, currSelectedIndex, lastItem, searchInput} = params;
    
    const selectedTag = this.setSelectedTag(
        (currSelectedIndex < 0) ? lastItem : arrliList[currSelectedIndex - 1],
    );
    this.setSelectedTextAsInputText(selectedTag, searchInput);
};

SearchController.prototype.runAutoCompleteArrowDown = function (params) {
    const {arrliList, currSelectedIndex, firstItem, searchInput} = params;
    const selectedTag = this.setSelectedTag(
        (currSelectedIndex < 0) ? firstItem : arrliList[currSelectedIndex + 1],
    );
    this.setSelectedTextAsInputText(selectedTag, searchInput);
};

SearchController.prototype.setSelectedTag = function(liTag) {
    const aTag = _.$('a', liTag);
    _.addClass(aTag, 'selected'); 
    return aTag;
};

SearchController.prototype.setClearSelectedTags = function(arrliList) {
    arrliList
        .filter((li) => _.containsClass(_.$('a', li), 'selected'))
        .forEach((li) => _.removeClass(_.$('a', li), 'selected'));
};

SearchController.prototype.setSelectedTextAsInputText = function (selectedTag, searchInput) {
    if (!selectedTag.innerText)
        this.getBackupSearchInputValue(searchInput);
    else
        searchInput.value = selectedTag.innerText;        
};

// 자동완성 방향키 선택으로 SearchInput의 Value가 바뀜. 기존에 입력했던 값을 가져오거나 백업. 
SearchController.prototype.getBackupSearchInputValue = function (searchInput) {
    const hiddenSearchInput = _.$('.backup-value', this.searchBarWrapper);
    searchInput.value = hiddenSearchInput.value;
};

SearchController.prototype.setBackupSearchInputValue = function (searchInput) {
    const hiddenSearchInput = _.$('.backup-value', this.searchBarWrapper);
    hiddenSearchInput.value = searchInput.value;
};

// 검색창 자동완성 아이템 제거
SearchController.prototype.removeSuggestionSimilarItems = function (searchSuggestSimilarWrapper) {
    const similarWrapper = _.$('.similar__list', searchSuggestSimilarWrapper);   
    _.allRemoveChildren(similarWrapper);
};

// 검색창 자동완성 아이템 생성
SearchController.prototype.makeSuggestionSimilarItems = async function (searchSuggestSimilarWrapper, searchInput) {
    try {
        const similarWrapper = _.$('.similar__list', searchSuggestSimilarWrapper);    
        const arrDatas = await this.getAutoCompleteData(searchInput.value);

        arrDatas.forEach((data) =>
            similarWrapper.insertAdjacentHTML(
                'beforeend',
                `<li>
                    <a href="#">${data.replace(
                        searchInput.value,
                        `<span style="color: #FF4200;">${searchInput.value}</span>`,
                    )}</a>
                </li>`,
            ),
        );
    } catch (error) {
        console.error(error);
    } 
};


// 검색창 인기 쇼핑 키워드 아이템 생성
SearchController.prototype.makeSuggestionInnerItems = async function (searchSuggestInnerWrapper) {
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
SearchController.prototype.makeRollingItems = async function (searchBarRollingWrapper) {
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
};
// ========================


export default SearchController;