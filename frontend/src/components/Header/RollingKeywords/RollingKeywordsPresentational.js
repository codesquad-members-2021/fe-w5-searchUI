class RollingKeywordsPresentational {
  
  constructor({ $target, keywords }) {    
  
    this.$UnorderedListKeywords = null;
    
    // render에 무관한 state;
    this.isAbleToRoll = true;
    this.rollingIntervalFuncId = undefined;
    this.intervalResetCount = 1;

    this.init({ $target, keywords });
  }

  init({ $target, keywords }) { 
    this.render({$target, keywordsData: keywords});
  }

  render({ $target, keywordsData }) {
    $target.innerHTML = ""; // 초기화

    this.$UnorderedListKeywords = document.createElement("ul");
    $target.appendChild(this.$UnorderedListKeywords);

    if (keywordsData.length === 0) {
      this.$UnorderedListKeywords.insertAdjacentHTML("beforeend", `<li>now loading...</li>`);
      return;
    }

    const $keywords = keywordsData.map((keyword, idx) => {
      return `<li>${idx+1}. ${keyword}</li>`
    }).join(" ");

    this.$UnorderedListKeywords.insertAdjacentHTML("beforeend", $keywords);
    
    this.componentDidMount();
  }

  componentDidMount() {
    this.startRolling();
  }

  stopRolling() {
    this.isAbleToRoll = false;
    this.$UnorderedListKeywords.style.display = "none";
    
    clearInterval(this.rollingIntervalFuncId);
    
    return this.isAbleToRoll;
  }

  startRolling() {
    this.isAbleToRoll = true;
    this.$UnorderedListKeywords.style.display = "block";
    
    const rollingIntervalFunc = () => {
      this.intervalResetCount %= 10;
      this.$UnorderedListKeywords.style.transform = `translateY(${-38*this.intervalResetCount}px)`;
      this.intervalResetCount += 1;
    }
    
    const rollingIntervalFuncId = setInterval(rollingIntervalFunc, 1000);
    this.rollingIntervalFuncId = rollingIntervalFuncId;
    
    return this.isAbleToRoll;
  }
}

export default RollingKeywordsPresentational;