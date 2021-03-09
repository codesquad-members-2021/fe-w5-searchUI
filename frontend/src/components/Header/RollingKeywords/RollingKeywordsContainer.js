import RollingKeywordsPresentational from "./RollingKeywordsPresentational.js";
import API from "../../../util/api.js"; // root를 alias하는 방법을 찾아보는 중입니다.
import "./rollingKeywords.scss";

class RollingKeywordsContainer {
  constructor({ $target }) {
    this.$target = $target;
    this.$RollingKeywordsPresentational = null;
    this.API = API;

    // state
    this.keywords = [];
    this.init();
  }

  async init() {
    const response = await this.API.get.hottestInfo();
    this.setState(response.hottest);
    
  }
  
  async setState(state) {
    const stateIsNotEqual = this.keywords.every((keyword, idx) => {
      return keyword !== state[idx];
    });
    if (stateIsNotEqual) {
      this.keywords = state;
      this.$RollingKeywordsPresentational = new RollingKeywordsPresentational({ $target: this.$target, keywords: this.keywords });
    } else {
      console.log("nothing to set");
    }
    
  }
}

export default RollingKeywordsContainer;
