import RollingKeywordsPresentational from "./RollingKeywordsPresentational.js";
import API from "../../../util/api.js"; // root를 alias하는 방법을 찾아보는 중입니다.
import "./rollingKeywords.scss";

class RollingKeywordsContainer {
  constructor({ $target }) {
    this.$target = $target;
    this.$RollingKeywordsPresentational = null;

    // state
    this.keywords = [];

    this.init();
  }
  
  init() {
    // 컨테이너 컴포넌트라서 바로 렌더를 부름.
    this.render();
  } 
  
  async setState(state) {
    console.log(this.keywords, state)
    if (RollingKeywordsContainer.getDerivedStateFromProps({
        originalState:this.keywords, newState: state
      })
    ) {
      this.keywords = state;
      this.render();
    } else {
      console.log("nothing to set");
    }
  }

  static getDerivedStateFromProps({originalState, newState}) {
    if (originalState.length === 0) {
      return newState;
    }
    const comparisonValues = originalState.every((element, idx) => {
      return element !== newState[idx];
    }); // 전체를 함수형으로 다 비교하는 것 보다 못생겼어도 for of로 return을 중간에 주는게 낫지 않을까?
    return comparisonValues.length ? newState : null;
  }
  
  render() {
    this.$RollingKeywordsPresentational = new RollingKeywordsPresentational({ 
      $target: this.$target, 
      keywords: this.keywords 
    });
    this.ComponentDidMount();
  }
  
  async ComponentDidMount() {
    /*
    // 주의. 이 시점에서 갱신될 수 있는 상태는 비동기로 불러오는 상태에 한정해야 한다.
    // 왜냐하면 이미 redner()통해서 DOM이 렌더트리에 올라간 시점이라
    // 상태 갱신에 따른 리렌더링을 최대한 방지해야하기 때문이다.
    */
    const response = await API.get.hottestInfo();
    const responseData = JSON.parse(response.response);
    
    const newState = responseData.list.map((item) => {
      return item.keyword;
    })
    
    this.setState(newState);
  }

}

export default RollingKeywordsContainer;
