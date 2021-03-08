import RollingKeywordsContainer from "./RollingKeywords/RollingKeywordsContainer.js"

import "./header.scss";

class Header {
  constructor({ $target }) {
    this.$target = $target; // 부모 돔
    this.$self = document.createElement("header"); // 자신 돔
    this.rollingKeywords = null;

    this.init();
  }
  init() {
    this.componentWillMount();
    // 롤링 키워드 initialize
    
    let $target = this.$target.querySelector("div#rolling-keywords");
    this.rollingKeywords = new RollingKeywordsContainer({ $target });
    
  }

  // 마운트
  componentWillMount() {
    const $Header = /* html */ `
      <section class="logo-and-search-area">
        <div class="container">
          <div class="wrapper">
            <div class="logo">
              <a href="#">
                <img src="https://search1.daumcdn.net/search/cdn/simage/shopping/v2/common/nav/logo_shw.png" />
              </a>
            </div>
            <div class="search-bar">
              <div id="rolling-keywords" class="rolling-keywords-input">
                <!-- <input type="text" /> <!-- 임시 , 향후 컴포넌트 형태로 변경 됨. -->
              </div>
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
    this.render();
  }
  
  // 렌더
  render() {
    this.$target.append(this.$self);
  }
}

export default Header;
