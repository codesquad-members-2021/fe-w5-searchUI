import {keywordRollingDiv, hotKeywordBox, inputBox, loadKeyword} from './main.js';
import {ul} from './getTextData.js';
// const inputBox = document.querySelector('.input-box__input');
function displayHotKeywordBox(keywords) {
    const keywordsInfoArr = keywords.map(e => ({title: e.title, rank: e.rank}));
    hotKeywordBox.innerHTML = '<ul>';
    for(let i =0; i<10; i++) {
        // console.log(keywordsInfo[i].title)
        hotKeywordBox.innerHTML += `<li>${keywordsInfoArr[i].rank}. ${keywordsInfoArr[i].title}</li>`;
    }
    hotKeywordBox.innerHTML+= '</ul>';
}

loadKeyword()
.then(keywords => {
    displayHotKeywordBox(keywords);
})
document.addEventListener('click', ({target}) => {
    console.log(target);
    let rollingViewBox = target.closest('div');
    if(!rollingViewBox) return;
    let containDiv = rollingViewBox.classList.contains('front__search-keyword');
    // console.log(containUl)
    if(containDiv) {
        ul.classList.add('remove');
        keywordRollingDiv.classList.add('remove');
        inputBox.focus();
        hotKeywordBox.classList.add('focus');
    }
})

inputBox.addEventListener('keyup', (e) =>removeHotKeywordBox(e));

function removeHotKeywordBox(e) {
    let inputText = e.target.value;
    console.log(inputText)
    if(inputText === '') {
        return hotKeywordBox.classList.add('focus');
    }
    hotKeywordBox.classList.remove('focus');
}
