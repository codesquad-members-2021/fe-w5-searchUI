import {loadKeyword} from './main.js';
import {keywordRollingDiv} from './main.js';

const ul = document.createElement("ul");
function displayKeywordRolling(keywords) {
    ul.className = "search-keyword__bundle";
    const keywordsInfoArr = keywords.map(e => ({title: e.title, rank: e.rank}))
    for(let i=0; i<10; i++) {
        const li = document.createElement("li");
        const liInnerText = document.createTextNode(`${keywordsInfoArr[i].rank}. ${keywordsInfoArr[i].title}`);
        li.className = "search-keyword__list";
        li.appendChild(liInnerText);
        ul.appendChild(li);
    }
    keywordRollingDiv.appendChild(ul);
    moveKeywordRolling();
}

function moveKeywordRolling() {
    setInterval(function() {
        ul.classList.toggle('move');
        setTimeout(() => {
            ul.appendChild(ul.firstElementChild);
            ul.classList.toggle('move');
        }, 300);
        }, 2000);
}

loadKeyword()
.then(keywords => {
    displayKeywordRolling(keywords);
})


export {ul}