class RollingKeywordsPresentational {
  constructor({ $target, keywords }) {
    this.isAbleToRoll = true;
    this.rollingIntervalFuncId = undefined;
    this.rollingIntervalFunc = rollingFunc.bind(this);

    this.$target = $target;
    this.$SearchInput = document.createElement("input");
    this.$SearchInput.className = "search-input";
    this.$target.appendChild(this.$SearchInput);

    this.$RollingKeywords = document.createElement("ul");
    
    this.init(keywords);
    
  }
  
  init(keywords) {
    this.mount(keywords);

    this.$SearchInput.addEventListener("focus", () => {
      this.stopRolling();
      // 하단 팝업 열리게
    });
    
    this.$SearchInput.addEventListener("blur", () => {
      this.startRolling();
      // 하단 팝업 닫히게
    });

    this.render();
  }
  
  mount(keywords) {
    const $keywords = keywords.map((keyword, idx) => {
      return `<li>${idx+1}. ${keyword}</li>`
    }).join(" ");

    this.$RollingKeywords.insertAdjacentHTML("beforeend", $keywords);
  }
  
  render() {
    this.$target.appendChild(this.$RollingKeywords);
    this.startRolling();
  }

  stopRolling() {
    this.isAbleToRoll = false;
    this.$RollingKeywords.style.display = "none";
    
    clearInterval(this.rollingIntervalFuncId);
    
    return this.isAbleToRoll;
  }

  startRolling() {
    this.isAbleToRoll = true;
    this.$RollingKeywords.style.display = "block";
    
    const rollingIntervalFuncId = setInterval(this.rollingIntervalFunc, 2000);
    this.rollingIntervalFuncId = rollingIntervalFuncId;
    return this.isAbleToRoll;
  }
}

RollingKeywordsPresentational.prototype.rolling = function () {
  
  const rollingBindedFunc = rollingFunc.bind(this);
  const rollingIntervalFuncId = setInterval(rollingBindedFunc, 2000);
  
  if (!this.rollingIntervalFuncId) {
    this.rollingIntervalFuncId = rollingIntervalFuncId; 
  }   
}

let count = 0;
function rollingFunc() {
  count = count % 10;
  this.$RollingKeywords.style.transform = `translateY(${-38*count}px)`;
  count += 1;
  
  if (!this.isAbleToRoll) {
    clearInterval(this.rollingIntervalFuncId);
  } //포커스가 들어가면, 으로 고칠 수 있게
    
}

export default RollingKeywordsPresentational;