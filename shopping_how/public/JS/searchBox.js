/* --------------------------------------------------------------------- */
/* ----------▶︎▶︎▶︎ searchBox.js : 페이지 상단 검색창 제어 관련 함수 저장 ◀︎◀︎◀︎--------*/
/* --------------------------------------------------------------------- */

/*
! 프로토타입으로 작성한다. 생성자 함수를 만들기. 인스턴스들끼리 공유하는 메소드는 생성자가 가질 수 있게 한다.
todo - [x] 인기쇼핑검색어 드롭다운 UI만들기
todo - [x] prototype으로 리팩토링하기
todo - [ ] setTimeout으로 구현한 함수들 async / await 으로 바꾸기
todo - [ ] 검색창에 focus가 들어오면 인기쇼핑검색어 노출하기.
todo - [ ] 검색창에 focus가 들어오면 border 빨간색으로 변경하기.
todo - [ ] 검색어 입력시 인기쇼핑검색어 컨텐츠가 사라지게 하기.
todo - [ ] 검색어 입력되면 자동완성결과 노출. 1초 지연은 debounce 활용.
todo - [ ] 최근 검색어 로컬스토리지에 저장하기
todo - [ ] 캐시 기능 알아보기(같은 요청이 들어올 때 캐시기능 사용할 수 있도록 하기)
*/
import utill from "./utill.js";

//---------------------------▶︎▶︎▶︎ Search UI: 최상위 객체 ◀︎◀︎◀︎---------------------------//
function SearchUI(dataObj) {
    this.searchBox = dataObj.searchBox;
}

SearchUI.prototype.addEvent = (node, event, callback) => node.addEventListener(event, callback);

SearchUI.prototype.addInterval = (fn, ms) => setInterval(fn, ms);

SearchUI.prototype.fetchTop10Keywords = (url, section) =>  fetch(`${url}/image?section=${section}`).then(res => res.json());

//-----------------------------▶︎▶︎▶︎ 키워드 rolling ◀︎◀︎◀︎-------------------------------//
//SearchUI 프로토타입 상속
Slider.prototype = Object.create(SearchUI.prototype);
Slider.prototype.constructor = Slider;

function Slider (refObj) {
    this._ = utill;
    this.window = refObj.window;
    this.container = refObj.container;
}

Slider.prototype.activateSlider = function (dataObj) {
    this.getKeywordData(dataObj.URL, dataObj.section);
    this.addInterval(this.rollSlider.bind(this, dataObj.numOfItems), 2000);
}

Slider.prototype.getKeywordData = function (URL, section) {
    this.fetchTop10Keywords(URL, section)
    .then(data => this.makeTemplate(data))
    .then(template => this.renderKeywords(template))
    .catch(err => alert(err));
}

Slider.prototype.makeTemplate = function (keywords) {
    const itemTemplate = keywords.reduce((acc, item, i) => acc += `<li class="slider_item">${i + 1}&nbsp;&nbsp; ${item}</li>`, ``);
    return itemTemplate;
}

Slider.prototype.renderKeywords = function (template) {
    this.container.innerHTML = template;
}

Slider.prototype.rollSlider = function (numOfItems) {
    const container = this.container;
    container.style.transitionDuration = "500ms";
    container.style.transform = `translateY(-${100 / numOfItems}%)`;
    container.ontransitionend = () => this.reorganizeItems(container);
}

Slider.prototype.reorganizeItems = function (parentNode) {
    this._.removeTransform(parentNode, 'style');
    parentNode.appendChild(parentNode.firstElementChild);
}

//--------------------------▶︎▶︎▶︎ 안가쇼팡키워드 노출 드롭다운 ◀︎◀︎◀︎---------------------------//
//SearchUI 프로토타입 상속
DropDown.prototype = Object.create(SearchUI.prototype);
DropDown.prototype.constructor = DropDown;

function DropDown (refObj) {
    this._ = utill;
    SearchUI.call(this, refObj);
    this.input = refObj.searchBoxInput;
    this.dropDown = refObj.dropDown;
}

DropDown.prototype.addClickEvent = function (dataObj) {
    this.addEvent(this.searchBox, 'click', this.activateDropDown.bind(this, dataObj));
}

DropDown.prototype.activateDropDown = function (dataObj) {
    this.input.focus();
    console.log("focus 이벤트 발생");
    this.fetchTop10Keywords(dataObj.URL, dataObj.section);
    this.showDropDown();
    this.changeColor();
}

DropDown.prototype.showDropDown = function () {
    const dropDown = this.dropDown;

}

DropDown.prototype.changeColor = function () {

}

//---------------------------------▶︎▶︎▶︎ 검색어 자동완성 ◀︎◀︎◀︎------------------------------//
function KeywordMatcher () {

}

export { SearchUI, Slider, DropDown, KeywordMatcher }