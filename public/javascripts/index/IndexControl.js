import _ from '../util.js';
import DataManager from './DataManager.js'; // 추후 제거, 여기서 작업하기 편하게 넣어놓은것.

class IndexControl {
    /**
     * @param {DataManager} dataManager
     */

    constructor(dataManager, indexWrappers, controlItems, options) {
        this.dataManager = dataManager;
        const {
            mainBestWrapper,
            mainCarouselWrapper,
            moreWrapper,
            hotCarouselWrapper,
        } = indexWrappers;
        const {
            mainSlideItems,
            mainSlidePagingInnerList,
            mainBestItemImg,
            moreViewBtn,
            moreViewFrame,
            hotSlideItems,
        } = controlItems;
        const {
            mainCarouselAnimateInterval,
            mainCarouselAnimateDirection,
            mainCarouselTransitionDuration,
            hotCarouselTransitionDuration,
        } = options;

        this.mainBestWrapper = mainBestWrapper;
        this.mainCarouselWrapper = mainCarouselWrapper;
        this.moreWrapper = moreWrapper;
        this.hotCarouselWrapper = hotCarouselWrapper;

        this.mainSlideItems = mainSlideItems;        
        this.mainSlidePagingInnerList = mainSlidePagingInnerList;
        this.mainBestItemImg = mainBestItemImg;
        this.moreViewBtn = moreViewBtn;
        this.moreViewFrame = moreViewFrame;
        this.hotSlideItems = hotSlideItems;

        this.mainCarouselAnimateInterval = mainCarouselAnimateInterval;
        this.mainCarouselAnimateDirection = mainCarouselAnimateDirection;
        this.mainCarouselTransitionDuration = mainCarouselTransitionDuration;
        this.hotCarouselTransitionDuration = hotCarouselTransitionDuration;

        this.hotCarouselMousedownTimer = null;
        this.hotCarouselMousedownRunCnt = 1;
    }

    init() {
        this._insertDataBestItem(this.mainBestItemImg);
        this._insertDataMainCarousel(this.mainSlideItems);
        this._insertDataHotCarousel(this.hotSlideItems);

        this._setMoreWrapperClickEvent(this.moreWrapper);
        this._setMainCarouselClickEvent(this.mainCarouselWrapper, this.mainSlideItems);
        this._setMainCarouselMouseoverEvent(this.mainCarouselWrapper, this.mainSlideItems);
        this._setHotCarouselMousedownEvent(this.hotCarouselWrapper);
        this._setHotCarouselMouseupEvent(this.hotCarouselWrapper, this.hotSlideItems);

        this._setMainCarouselInterval(
            this.mainCarouselAnimateDirection,
            this.mainSlideItems,
            this.mainCarouselAnimateInterval,
        );

        this._createMoreViewItemsExecute(this.moreViewBtn, this.moreViewFrame);
    }

    _setMainCarouselInterval(direction, mainSlideItems, timeout) {
        setInterval(
            () => this._updateMainCarouselAnimation(direction, mainSlideItems),
            timeout,
        );
    }

    // [1] 더보기 Wrapper (content__more) Click 이벤트 등록
    _setMoreWrapperClickEvent(moreWrapper) {
        _.addEvent(moreWrapper, 'click', (e) =>
            this._moreWrapperClickEventHandler(e),
        );
    }

    _moreWrapperClickEventHandler(e) {
        const { target } = e;

        if (target === this.moreViewBtn)
            this._createMoreViewItemsExecute(target, this.moreViewFrame);
    }

    // 더보기 데이터가 들어갈 틀 생성 (실행)
    _createMoreViewItemsExecute(moreBtn, moreViewFrame) {
        this.dataManager.getMoreData(moreBtn.value)
            .then((moreData) => this._createMoreViewItems(moreData, moreViewFrame))            
            .then(() => this._updateMoreBtnInnerText(moreBtn))
            .catch((error) => console.error(error.message));     
    }

    // 더보기 버튼의 InnexText 갱신
    _updateMoreBtnInnerText(moreBtn) {
        this.dataManager.getAllMoreData()
            .then(
                (moreAlldata) =>
                    (moreBtn.innerText = `더보기(${moreBtn.value * 5}/${
                        moreAlldata.length
                    }건)`),
            )
            .then(() => moreBtn.value++)
            .catch((err) => console.error(err));
    }

    _createMoreViewItems(moreData, moreViewFrame) {
        const frame = moreViewFrame;

        moreData.forEach((data, i) => {
            const { eventContent: { title, subtitle, imgurl } } = data;

            const li = _.createElement('li');
            if (i === moreData.length-1)
                _.classAdd(li, 'noBorder');

            const a = this._createTagAndSetAttribute('a', 'href', '/');
            const img = this._createTagAndSetAttribute('img', 'src', `https:${imgurl}`);
            const div = _.createElement('div');

            const spanBold = this._createTagAndTextClassName('span', title, 'txt-bold');
            const spanInfo = this._createTagAndTextClassName('span', subtitle, 'txt-info');
            const spanTheme = _.createElement('span');
            _.classAdd(spanTheme, "i-theme");

            _.appendChildren(a, img, div);
            _.appendChildren(div, spanBold, spanInfo, spanTheme);
            _.appendChild(li, a);
            _.appendChild(frame, li);
        });
    }

    _createTagAndSetAttribute(strTag, attrKey, attrValue) {
        const tag = _.createElement(strTag);
        _.setAttr(tag, attrKey, attrValue);
        return tag;
    }

    _createTagAndTextClassName(strTag, text, className) {
        const tag = _.createElement(strTag);
        _.appendChild(tag, _.createTextNode(text));
        _.classAdd(tag, className);
        return tag;
    }
    // --

    // [2] 상단 캐러셀 (content__main__carousel)
    // 첫 로딩 시 상단 왼쪽 (BestItem)에 들어갈 정보 서버에서 불러옴
    _insertDataBestItem(mainBestItemImg) {
        this.dataManager.getMainBestData().then((data) => {
            _.setAttr(mainBestItemImg, 'src', data.imgurl);
        }).catch((err) => console.error(err.message));
    }

    // 첫 로딩 시 상단 오른쪽 캐러셀에 들어갈 정보 서버에서 불러옴
    _insertDataMainCarousel(mainSlideItems) {
        this.dataManager
            .getMainCarouselData()
            .then((data) => {
                mainSlideItems.forEach((item, i) => {
                    const itemImgTag = _.$('img', item);
                    _.setAttr(itemImgTag, 'src', data[i].imgurl);
                });
            })
            .catch((err) => console.error(err.message));
    }

    // 상단 캐러셀 이벤트 등록 (이전, 다음)
    _setMainCarouselClickEvent(mainCarouselWrapper, mainSlideItems) {
        _.addEvent(mainCarouselWrapper, 'click', (e) =>
            this._mainCarouselClickEventHandler(e, mainSlideItems),
        );
    }

    _mainCarouselClickEventHandler({target}, mainSlideItems) {        
        const pagingBtn =
            _.closestSelector(target, '.paging--prev') ||
            _.closestSelector(target, '.paging--next');
        this._updateMainCarouselAnimationExecute(pagingBtn, mainSlideItems);
    }

    // 상단 캐러셀 동작 (이전, 다음 btn) (실행)
    _updateMainCarouselAnimationExecute(pagingBtn, mainSlideItems) {
        if (!pagingBtn) return;
        const exType = pagingBtn.className.indexOf('prev') > -1 ? 'prev' : 'next';        
        this._updateMainCarouselAnimation(exType, mainSlideItems);
    }

    _updateMainCarouselAnimation(exType, itemList, animateOpacity = false) {
        
        const invisibleFirstValue = -1;
        const invisibleLastValue = 1;
        const plusValue = 1;
        const visibleValue = 0;

        const transitionDuration = this.mainCarouselTransitionDuration;


        itemList.forEach((item, itemIdx) => {            
            const transformClassName = item.className.split(" ").find((v) => (v.indexOf('transformX__') > -1));            

            let transformValue = Number(transformClassName.replace('transformX__', ''));
            let opacity = false;

            if (exType === 'prev') {
                if (transformValue === invisibleLastValue) {
                    transformValue = invisibleFirstValue;
                    opacity = true;
                } else transformValue += plusValue;      
            } else {
                if (transformValue === invisibleFirstValue) {
                    transformValue = invisibleLastValue;
                    opacity = true;
                } else transformValue -= plusValue;                                
            }
        
            (transformValue === visibleValue) && this._updateMainCarouselPagingSpan(itemIdx, this.mainSlidePagingInnerList);                        

            if (animateOpacity) 
                item.style.transition = 'opacity ' + transitionDuration;
            else
                item.style.transition = opacity ? `opacity ${transitionDuration}` : `transform ${transitionDuration}`;
                
            _.classReplace(item, transformClassName, `transformX__${transformValue}`)
        });
    }

    // 상단의 작은 span들 [- - -] 상태 업데이트
    _updateMainCarouselPagingSpan(animationItemIdx, pagingInnerSpanList) {        
        const findPrevCurrent = [...pagingInnerSpanList].find((span) => _.classContains(span, 'current'));
        _.classRemove(findPrevCurrent, 'current');
        _.classAdd(pagingInnerSpanList[animationItemIdx], 'current');
    }

    // 상단 캐러셀 mouseover 이벤트 등록
        // 작은 span (.paging__inner > span)에서 동작
    _setMainCarouselMouseoverEvent(mainCarouselWrapper, itemList) {
        _.addEvent(mainCarouselWrapper, 'mouseover', (e) => this._mainCarouselMouseoverEventHandler(e, itemList));        
    }

    _mainCarouselMouseoverEventHandler({target}, itemList) {        
        const overSpan = _.closestSelector(target, '.paging__inner > span');        
        if (!overSpan) return;
        
        const pagingInnerSpanList = [...overSpan.parentElement.children];            
        const currStatusSpan = pagingInnerSpanList.find((span) => _.classContains(span, 'current'));

        const overSpanIdx = pagingInnerSpanList.indexOf(overSpan);
        const currStatusSpanIdx = pagingInnerSpanList.indexOf(currStatusSpan);

        const abs = Math.abs(currStatusSpanIdx-overSpanIdx);
        
        if (overSpanIdx > currStatusSpanIdx) {
            [...Array(abs)].forEach((_) => this._updateMainCarouselAnimation('next', itemList, true))
        } else if (overSpanIdx < currStatusSpanIdx) {
            [...Array(abs)].forEach((_) => this._updateMainCarouselAnimation('prev', itemList, true))
        } else return;        
    }
    
    // [3] 하단 캐러셀 (content__hot__carousel)
    // 첫 로딩 시 하단 캐러셀에 들어갈 정보 서버에서 불러옴
    _insertDataHotCarousel(hotCarouselItemList) {        
        this.dataManager.getHotCarouselData()
            .then((planningData) => {
                hotCarouselItemList.forEach((item, i) => {
                    const img = _.$('a > img', item);
                    const spanBold = _.$('.txt-bold', item);
                    const spanInfo = _.$('.txt-info', item);
                    _.setAttr(img, 'src', planningData[i].imgurl);                    
                    _.appendChild(spanBold, _.createTextNode(planningData[i].text));
                    _.appendChild(spanInfo, _.createTextNode(planningData[i].text2));                    
                })
            })
            .catch((error) => console.error(error.message));          
    }

    // 하단 캐러셀 이벤트 등록 (mousedown / mouseup) (이전, 다음 (1개씩 or 2개씩))
    // mousedown
    _setHotCarouselMousedownEvent(hotCarouselWrapper) {        
        _.addEvent(hotCarouselWrapper, 'mousedown', () =>
            this._hotCarouselMousedownEventHandler()
        );
    }

    _hotCarouselMousedownEventHandler() {                
        this.hotCarouselMousedownTimer = setInterval(() => {            
            if (this.hotCarouselMousedownRunCnt <= 1) {            
                this.hotCarouselMousedownRunCnt++;
            }            
        }, 1000);
    }
    
    // mouseup
    _setHotCarouselMouseupEvent(hotCarouselWrapper, hotSlideItems) {        
        _.addEvent(hotCarouselWrapper, 'mouseup', (e) =>
            this._hotCarouselMouseupEventHandler(e, hotSlideItems),
        );
    }

    _hotCarouselMouseupEventHandler({target}, itemList) {
        clearInterval(this.hotCarouselMousedownTimer);

        const pagingBtn =
            _.closestSelector(target, '.carousel__special--prev') ||
            _.closestSelector(target, '.carousel__special--next');    
        
        this._updateHotCarouselAnimationExecute(pagingBtn, itemList, this.hotCarouselMousedownRunCnt);
        this.hotCarouselMousedownRunCnt = 1;
    }



    // 하단 캐러셀 동작 (이전, 다음 btn) (실행)
    _updateHotCarouselAnimationExecute(pagingBtn, itemList, runCnt = 1) {
        if (!pagingBtn) return;
        const exType = pagingBtn.className.indexOf('prev') > -1 ? 'prev' : 'next';        
        
        for (let i = 0; i < runCnt; i++) 
            this._updateHotCarouselAnimation(exType, itemList)        
    }

    _updateHotCarouselAnimation(exType, itemList) {

        const plusValue = 1;
        const invisibleFirstValue = -2;
        const invisibleLastValue = 7;

        const transitionDuration = this.hotCarouselTransitionDuration;

        itemList.forEach((item) => {
            let transformValue = Number(item.className.replace('transformX__', ''));
            let opacity = false;

            if (exType === 'prev') {
                if (transformValue === invisibleLastValue) {
                    transformValue = invisibleFirstValue;
                    opacity = true;
                } else transformValue += plusValue;      
            } else {
                if (transformValue === invisibleFirstValue) {
                    transformValue = invisibleLastValue;
                    opacity = true;
                } else transformValue -= plusValue;                                
            }

            item.style.transition = opacity ? `opacity ${transitionDuration}` : `transform ${transitionDuration}`;
            _.classReplace(item, item.className, `transformX__${transformValue}`)
        });
    }    
}

export default IndexControl;
