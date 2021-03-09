class RollingKeywords {
  constructor({ $target, keywords }) {
    this.$target = $target;
    this.$RollingKeywords = document.createElement("ul");
    
    this.init(keywords)
  }
  
  init(keywords) {
    this.mount(keywords)
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
    let count = 0;
    setInterval(() => {
      count = count % 10;
      this.$RollingKeywords.style.transform = `translateY(${-38*count}px)`;
      count += 1;
    }, 1000);
  }
}

export default RollingKeywords;