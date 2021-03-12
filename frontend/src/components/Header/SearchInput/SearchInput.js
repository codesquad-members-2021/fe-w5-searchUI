import "./SearchInput.scss";

class SearchInput {
  constructor({ $target, onSearchInputFocus, onSearchInputBlur, onSearchInputChange }) {
    this.$target = $target;
    this.handleOnFocus = onSearchInputFocus;
    this.handleOnBlur = onSearchInputBlur;
    this.handleOnChange = onSearchInputChange;
    
    this.$SearchInput = null;
    
    this.lastDebouncedKeyupFuncId = null;
    this.lastKeyupTime = null;
    
    this.init();  
  }

  init() {
    this.render();
  }

  render(){
    this.$SearchInput = document.createElement("input");
    this.$SearchInput.className = "search-input";

    this.$target.appendChild(this.$SearchInput);
    this.componentDidMount();
  }

  componentDidMount() {
    this.$SearchInput.addEventListener("focus", () => {
      this.handleOnFocus();
    });
    
    this.$SearchInput.addEventListener("blur", () => {
      this.handleOnBlur();
      this.$SearchInput.value = "";
    });
    this.$SearchInput.addEventListener("keyup", ({ target }) => {
      this.handleOnKeyup(target.value);
    })
  }

  handleOnKeyup(value) {
    const now = Date.parse(new Date());
    if (!this.lastKeyupTime) {
      this.lastKeyupTime = now;
    }

    if (now - this.lastKeyupTime <= 1000 ) {
      
      clearTimeout(this.lastDebouncedKeyupFuncId);
      const lastDebouncedKeyupFuncId = setTimeout(() => {
        this.handleOnChange(value);
        this.lastKeyupTime = null;
      }, 1000);
      
      this.lastDebouncedKeyupFuncId = lastDebouncedKeyupFuncId;
      this.lastKeyupTime = now;
    } 
  }

}

export default SearchInput;