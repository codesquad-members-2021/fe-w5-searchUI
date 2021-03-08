import "./banner.scss";

class BannerPresentational {
  constructor({ $target, ...props }) {
    this.$target = $target;
    this.$self = document.createElement("div");
    this.$self.className = "banner";
    
    // props
    this.imgSrc = props.fixedImage;
    
    this.init();
  }

  init() { 
    this.$target.innerHTML = ""; // 먼저 타겟돔을 지우고 나서 마운트 준비
    this.componentWillMount();
  }
  
  // mount
  componentWillMount() {
    const $Banner = /* html */ `
      <div class="container">
        <div class="wrapper">
          <div class="contents left"> 
            <a href="#"> 
              <img src="${this.imgSrc}" />
            </a>
          </div>
          <div class="contents right"> 
            <img src="http://shop4.daumcdn.net/shophow/sib/0_210219175151_tbehDsXzWnJKZNGWJxRuYhONIcINMfri" /> <!-- 임시 -->
            <div id="banner-carousel"></div>
          </div>
        </div>
      </div>
    `;
    this.$self.insertAdjacentHTML('beforeend', $Banner); // string -> HTMLDOMElement
    this.render();
  }

  render() {    
    this.$target.appendChild(this.$self); // DOM -> DOM
  }

}

export default BannerPresentational;