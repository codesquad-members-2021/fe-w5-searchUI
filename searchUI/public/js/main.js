import { _ } from './util.js'
import { Slide } from './slide.js'
import { ImageLoader } from './image_loader.js'
import { Search } from './search.js'

const selectors = {
    wrapper: _.$('.slide--wrapper'),
    slideItems: _.$A('.slide--item'),
    leftButton: _.$('.left-button'),
    rightButton: _.$('.right-button'),
    scrollButtons: _.$A('.scroll-button'),
    seeMore: _.$('.main__see-more-button'),
    secondContent: _.$('.main__2nd-content'),
    searchBar: _.$('.header__search-bar'),
    suggestion: _.$('.search-bar__suggestion'),
    rollItems: _.$('.search-bar__roll-items')
}
new Search(selectors)

// fetch("http://localhost:3000/planningEvent.json")
//     .then(response => response.json())
//     .then(json => {
//         new ImageLoader(selectors, json)
//         new Slide(selectors)
//     });
