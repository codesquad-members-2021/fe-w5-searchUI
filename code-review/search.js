export const Search = function (selectors) {
    this.selectors = selectors;
    this.init()
    this.rollTimer;
    this.debounceTimer;
    this.currentIndex = 0; //upDownEvent()에 쓰일 state
    this.currentLength; //현재 suggestion 길이
}

Search.prototype.init = function () {
    this.roll()
    this.addEvent()
}

Search.prototype.debounce = function (func, delay = 1000) {
    if (this.debounceTimer) clearTimeout(this.debounceTimer)
    this.debounceTimer = setTimeout(func, delay)
}

Search.prototype.roll = function (index = 0, delay = 1000) {
    const itemLength = 10;
    const itemHeight = 1.5;
    this.rollTimer = setTimeout(() => {
        this.selectors.rollItems.style.transform = `translate3d(0,-${index * itemHeight}rem,0)`
        this.selectors.rollItems.style.transition = '300ms'
        this.roll(index >= itemLength - 1 ? 0 : ++index)
    }, delay)
}

Search.prototype.addEvent = function () {
    document.addEventListener('click', this.hideEvent.bind(this))
    this.selectors.searchBar.addEventListener('click', this.clickEvent.bind(this))
    this.selectors.searchInput.addEventListener('focus', this.focusEvent.bind(this))
    this.selectors.searchInput.addEventListener('input', () => this.debounce(this.changeEvent.bind(this), 1000))
    this.selectors.searchInput.addEventListener('keydown', this.upDonwEvent.bind(this))
}

Search.prototype.clickEvent = function () {
    this.selectors.searchInput.focus()
}

Search.prototype.focusEvent = function () {
    clearTimeout(this.rollTimer)
    this.selectors.rollItems.classList.add('unseen')
    this.selectors.searchBar.classList.add('focused')
    this.selectors.suggestionHot.classList.remove('unseen')
    this.selectors.suggestionRecommend.classList.add('unseen')
}


Search.prototype.changeEvent = function () {
    fetch(`https://completion.amazon.com/api/2017/suggestions?session-id=139-3675547-2577611&customer-id=&request-id=J08DEQRH25DHAR0AFK3M&page-type=Gateway&lop=en_US&site-variant=desktop&client-info=amazon-search-ui&mid=ATVPDKIKX0DER&alias=aps&b2b=0&fresh=0&ks=49&prefix=${this.selectors.searchInput.value}&event=onKeyPress&limit=11&fb=1&suggestion-type=KEYWORD&suggestion-type=WIDGET&_=1615257159716`)
        .then(response => response.json())
        .then(({ suggestions, prefix }) => suggestions.length > 0 ? this.render(suggestions, prefix) : this.focusEvent())

}

Search.prototype.hideEvent = function (e) {
    if (e.target.closest('.header__search-bar') !== null) return
    this.roll()
    this.selectors.rollItems.classList.remove('unseen')
    this.selectors.searchBar.classList.remove('focused')
    this.selectors.suggestionHot.classList.add('unseen')
    this.selectors.suggestionRecommend.classList.add('unseen')
    this.selectors.searchInput.value = ''
}

Search.prototype.upDonwEvent = function (e) {
    const list = this.selectors.suggestionRecommend.querySelectorAll('li')
    if (e.keyCode === 38) {// 방향키 위 입력
        this.currentIndex = this.currentIndex <= 0 ? 0 : --this.currentIndex;
        this.selectors.searchInput.value = list[this.currentIndex].innerHTML.replace('<span class="orange">', '').replace('</span>', '')
    }
    else if (e.keyCode === 40) {// 방향키 위 입력
        this.currentIndex = this.currentIndex >= this.currentLength - 1 ? this.currentLength - 1 : ++this.currentIndex
        this.selectors.searchInput.value = list[this.currentIndex].innerHTML.replace('<span class="orange">', '').replace('</span>', '')
    }
}

Search.prototype.render = function (suggestions, prefix) {
    this.currentLength = suggestions.length;
    let html = '<ol>'
    suggestions.forEach(({ value }) => {
        html += `<li>${value}</li>`
    })
    html += '</ol>'
    const regex = new RegExp(prefix, 'g')
    this.selectors.suggestionRecommend.innerHTML = html.replace(regex, `<span class="orange">${prefix}</span>`);
    this.selectors.suggestionRecommend.classList.remove('unseen')
    this.selectors.suggestionHot.classList.add('unseen')
}
