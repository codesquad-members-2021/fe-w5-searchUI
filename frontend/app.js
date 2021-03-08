import Header from "./src/components/Header/Header.js"
import BannerContainer from "./src/components/Banner/BannerContainer.js";

import "./app.scss";

class App {
  constructor({ $target }) {
    this.$target = $target;
    
    // SPA areas
    this.header = null;
    this.banner = null;
  }
  
  init() {
    let $target = null;
    
    $target = this.$target.querySelector("div#header");
    this.header = new Header({ $target });
    
    $target = this.$target.querySelector("div#banner");
    this.banner = new BannerContainer({ $target });

    // hottestInfo
  }
}

export default App;