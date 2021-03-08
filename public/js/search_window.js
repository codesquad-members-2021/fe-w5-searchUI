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
   }).then((arr)=>renderKeywordBox(arr))
   
   // return resultArr;
}
const hotKeywords = getData('https://shoppinghow.kakao.com/v1.0/shophow/top/recomKeyword.json?_=1615192416887');

const renderKeywordBox = (arr)=>{
   
   const tempTitle = _.create('div');
   tempTitle.innerText='인기 쇼핑 키워드';
   hotKeywordBox.insertAdjacentElement('afterBegin', tempTitle);
   
   const temp1to5 = _.create('div');
   arr = arr.slice(0,arr.length-2)
   const halfArr =arr.filter((v,i)=>i<arr.length/2)
   halfArr.forEach((v, idx)=>{
      const tempDiv = _.create('div');
      tempDiv.innerHTML = `<a href="#">${idx+1}  ${arr[idx]}</a>`
      temp1to5.insertAdjacentElement('beforeEnd', tempDiv)
   })
   const temp6to10 = _.create('div');
   halfArr.forEach((v, idx)=>{
      const tempDiv = _.create('div');
      tempDiv.innerHTML = `<a href="#">${idx+6}  ${arr[idx+5]}</a>`
      temp6to10.insertAdjacentElement('beforeEnd', tempDiv)
   })
   hotKeywordBox.insertAdjacentElement('beforeEnd', temp1to5)
   hotKeywordBox.insertAdjacentElement('beforeEnd', temp6to10)
  
  
}

const hideHotkeyword = () => {
   hotKeywordBox.classList.remove("show");
   searchBox.classList.remove("show");
}
const showHotkeyword = () => {
   hotKeywordBox.classList.add("show");
   searchBox.classList.add("show");
   //searchArea.addEventListener("mouseleave", ()=>setTimeout(()=>hideHotkeyword(), 200));
}


export const searchInit = ()=>{
   searchWindow.addEventListener('click', showHotkeyword)
   // const searchWindow = _.$('.search_input');
   // const HotKeyword = function(searchWindow){
   //    this.target = searchWindow;
   // }

   // Hotkeyword.prototype.showWindow = function(){
   // console.log('open the window')
   // }

   // const initSearch = new HotKeyword(searchWindow);
   // initSearch.showWindow();
}