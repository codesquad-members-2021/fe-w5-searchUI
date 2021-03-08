import {
   _
} from "./util.js";
const searchWindow = _.$('.search_input');
const searchBox = _.$('.search_box');
const searchArea = _.$('.search');
const hotKeywordBox=_.$('.hot_keyword_tpl');
const getData = (url) => {
   fetch(url)
   .then((response) => {
      return response.json();
   }).then((json) => {
      return json.list;
   }).then((arr)=>{
      return arr.map(el=>el.keyword)
   }).then((arr)=>{
      renderKeywordBox(arr)
      renderRollingKeyword(arr)
   })
}

const rollupKeyword =(tempBox)=>{
   setInterval(()=>{
      tempBox.style.transform+='translateY(-50px)';
   }, 2500)
}

const makeTpl = (originArr, arr, startNumber, pasteArea)=>{
   const tempBox = _.create('div');
   arr.forEach((v, idx)=>{
      const tempDiv = _.create('div');
      tempDiv.innerHTML = 
      `<a href="#">
         <span class="kwd_number">${idx+startNumber}</span>
         <span>${originArr[idx+startNumber-1]}</span>
      </a>`
      tempBox.insertAdjacentElement('beforeEnd', tempDiv)
   });
   pasteArea.insertAdjacentElement('beforeEnd', tempBox);
}

const renderRollingKeyword = (arr)=>{
   makeTpl(arr, arr, 1, searchArea);
   searchArea.lastElementChild.className="rolling_keyword";
   const rollingPage = _.$('.rolling_keyword');
   rollupKeyword(rollingPage);
}

const renderKeywordBox = (arr)=>{
  
   const tempTitle = _.create('div');
   tempTitle.innerText='인기 쇼핑 키워드';
   hotKeywordBox.insertAdjacentElement('afterBegin', tempTitle);
   
   const originArr = arr.slice(0,arr.length-2)
   const halfArr =originArr.filter((v,i)=>i<originArr.length/2)
 
   makeTpl(originArr, halfArr, 1, hotKeywordBox);
   makeTpl(originArr, halfArr, 6,  hotKeywordBox);
  
}

const hideHotkeyword = () => {
   hotKeywordBox.classList.remove("show");
   searchBox.classList.remove("show");
}
const showHotkeyword = () => {
   hotKeywordBox.classList.add("show");
   searchBox.classList.add("show");
   searchArea.addEventListener("mouseleave", ()=>setTimeout(()=>hideHotkeyword(), 200));
}


export const searchInit = ()=>{
   searchWindow.addEventListener('click', showHotkeyword);
   getData('https://shoppinghow.kakao.com/v1.0/shophow/top/recomKeyword.json?_=1615192416887');

}