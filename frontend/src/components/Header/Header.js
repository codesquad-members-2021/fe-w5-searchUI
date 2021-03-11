import RollingKeywordsContainer from "./RollingKeywords/RollingKeywordsContainer.js"
import SearchBarModalContainer from "./SearchBarModal/SearchBarModalContainer.js";
import SearchInput from "./SearchInput/SearchInput.js";

import API from "../../util/api.js";

import "./header.scss";

class Header {
  constructor({ $target }) {
    this.$target = $target; // 부모 돔
    this.$self = document.createElement("header"); // 자신 돔
    
    // Child Components
    this.searchInput = null;
    this.rollingKeywords = null;
    this.searchBarModal = null;

    this.init();
  }

  init() {
    this.render();
  }

  ModePopularKeywords() {
    this.searchBarModal.setState({mode: "POPULAR"});
  }
  ModeRecommend() {
    this.searchBarModal.setState({mode: "RECOMMEND"});
  }
  
  // 렌더
  render() {
    const $Header = /* html */ `
      <section class="logo-and-search-area">
        <div class="container">
          <div class="wrapper">
            <div class="logo">
              <a href="#">
                <img src="https://search1.daumcdn.net/search/cdn/simage/shopping/v2/common/nav/logo_shw.png" />
              </a>
            </div>
            <div id="search-bar" class="search-bar">
              <div id="rolling-keywords" class="rolling-keywords-input"></div>
              <!-- <div class="bottom-modal"></div> -->
            </div>
          </div>
        </div>
      </section>
      <section class="nav-area">
        <div class="container">
          <nav class="wrapper">
            <div class="contents left">
              카테고리
            </div>
            <div class="contents center">
              <ul>
                <li>핫딜</li>
                <li>베스트100</li>
                <li>할인특가</li>
                <li>기획전</li>
              </ul>
            </div>
            <div class="contents right">
              <ul>
                <li>로그인</li>
                <li>최근본 상품</li>
              </ul>
            </div>
          </nav>
        </div>
      </section>
    `;
    this.$self.insertAdjacentHTML('beforeend', $Header);
    this.$target.append(this.$self);
    
    let $target = this.$target.querySelector("div#search-bar");
    this.searchInput = new SearchInput({ 
      $target, 
      onSearchInputFocus: this.onSearchInputFocus.bind(this), 
      onSearchInputBlur: this.onSearchInputBlur.bind(this),
      onSearchInputChange: this.onSearchInputChange.bind(this) 
    });
    // this.searchBarModal = new SearchBarModalContainer({ $target });
    
    $target = this.$target.querySelector("div#rolling-keywords");
    this.rollingKeywords = new RollingKeywordsContainer({ $target });
    this.componentDidMount();
  }

  componentDidMount(){
    console.log("Header is Mounted !");
  }

  onSearchInputFocus() {
    console.log("onSearchInputFocus");
    this.rollingKeywords.$RollingKeywordsPresentational.stopRolling();
    // 하단 팝업 열리게
  } 
  onSearchInputBlur() {
    console.log("onSearchInputBlur")
    this.rollingKeywords.$RollingKeywordsPresentational.startRolling();
    // 하단 팝업 닫히게
  }
  async onSearchInputChange(value) {
    console.log("onSearchInputChange", value);
    // API call 향후 위치 변경 예정.
    const response = await API.post.recommendKeywordsInfo(value);

    const responseData = response.response;
    const parsedResponseData = JSON.parse(responseData.slice(responseData.indexOf("{"), responseData.indexOf(")")));
    
    console.log(parsedResponseData); // 향후 state 업데이트 하는 형태로 전환 예정
    // const newState = responseData.list.map((item) => {
    //   return item.keyword;
    // })
    
  }
}

export default Header;
