export const Search = function (selectors) {
    this.selectors = selectors;
    this.init()
    this.rollTimer;
}

Search.prototype.init = function () {
    this.roll()
    this.addEvent()
}

Search.prototype.roll = function(index = 0, delay = 1000) {
    const itemLength = 10;
    const itemHeight = 1.5;
    this.rollTimer = setTimeout(() => {
        this.selectors.rollItems.style.transform = `translate3d(0,-${index * itemHeight}rem,0)`
        this.selectors.rollItems.style.transition = '300ms'
        this.roll(index >= itemLength-1 ? 0 : ++index)
    }, delay)
}

Search.prototype.addEvent = function() {
    this.selectors.searchBar.addEventListener('click', this.clickEvent.bind(this))
}

Search.prototype.clickEvent = function() {
    clearTimeout(this.rollTimer)
    this.selectors.rollItems.classList.add('unseen')
    this.selectors.searchBar.style.border = '1px solid orange'
    this.selectors.suggestion.classList.remove('unseen')
}

Search.prototype.focusEvent = function() {

}

Search.prototype.changeEvent = function() {

}