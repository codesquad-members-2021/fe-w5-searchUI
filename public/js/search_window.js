import {
   _, getData
} from "./util.js";




export function SearchUI(){ 
   this.searchWindow = _.$('.search_input');   
   this.searchBox = _.$('.search_box'); 
   this.searchArea = _.$('.search');  
   this.hotKeywordBox=_.$('.hot_keyword_tpl');
   this.popularSearchTerm;
   this.rollingPage;
   this.init();
}

SearchUI.prototype.init = function(){
   this.getInitialData();
   this.inputSearchTerm();
   this.realtimeSearch();
}

SearchUI.prototype.getInitialData = async function(){
   const url = 'https://shoppinghow.kakao.com/v1.0/shophow/top/recomKeyword.json?_=1615192416887';
   const initialData = await getData(url);
   this.popularSearchTerm = initialData.list.map(el=>el.keyword);
  
   this.renderRollingKeyword();
   this.renderKeywordBox();
}

SearchUI.prototype.inputSearchTerm = function(){
   const clickArea = this.searchBox.firstElementChild.closest('.search_box');
   clickArea.addEventListener('click',()=>{
      this.hideRolling();
      this.showHotkeyword();
   })
}

SearchUI.prototype.showHotkeyword = function(){
   this.showTarget(this.hotKeywordBox);
   this.showTarget(this.searchBox);

   this.searchArea.addEventListener("mouseleave", ()=>setTimeout(()=>{
      if(this.searchWindow.value==='') this.showRolling()
      this.hideTarget(this.hotKeywordBox)
      this.hideTarget(this.searchBox)
   }, 200));

}

SearchUI.prototype.hideRolling = function(){
   this.rollingPage.classList.add('off');
}

SearchUI.prototype.showRolling = function(){
   this.rollingPage.classList.remove('off');
}

SearchUI.prototype.hideTarget = function(target){
   target.classList.remove("show");
}

SearchUI.prototype.showTarget = function(target){
   target.classList.add("show");
}

SearchUI.prototype.realtimeSearch = function(){
   let timer;
   this.searchWindow.addEventListener('input', (e)=>{
      if (timer)  clearTimeout(timer);
      timer = setTimeout(async ()=>{
         const searchingWord = this.searchWindow.value;
         const relatedLink = `https://completion.amazon.com/api/2017/suggestions?mid=ATVPDKIKX0DER&alias=aps&suggestion-type=KEYWORD&prefix=${searchingWord}`;
         const relatedTermData = await getData(relatedLink);
         const relatedTermArr = relatedTermData.suggestions.map(el=>el.value)
         this.renderRelatedTerm(relatedTermArr);
      }, 1000);
   })
}

SearchUI.prototype.renderRollingKeyword = function(){
   this.makeTpl(this.popularSearchTerm, 1, this.searchWindow, 'beforeBegin');
   this.searchBox.firstElementChild.className="rolling_keyword";
   
   this.rollingPage = _.$('.rolling_keyword');
   this.rollupKeyword();
}

SearchUI.prototype.renderKeywordBox= function(){
   const tempTitle = `<div>인기 쇼핑 키워드</div>`;
   this.hotKeywordBox.insertAdjacentHTML('afterBegin', tempTitle);

   const halfArr =this.popularSearchTerm.filter((v,i)=>i<this.popularSearchTerm.length/2)
 
   this.makeTpl(halfArr, 1, this.hotKeywordBox,'beforeEnd');
   this.makeTpl(halfArr, 6,  this.hotKeywordBox, 'beforeEnd');
}

SearchUI.prototype.rollupKeyword= function(){
 
   setInterval(()=>{
      this.rollingPage.style.transition = '1s';
      this.rollingPage.style.transform =`translateY(-50px)`;
     setTimeout(() => {
         const first = this.rollingPage.firstElementChild;
         this.rollingPage.appendChild(first);
         this.rollingPage.style.transition ='none';
         this.rollingPage.style.transform ='translateY(0px)';
      },1000)
   }, 2500)
 
}

SearchUI.prototype.renderRelatedTerm = function(resArray){
   const relatedTermBox = _.$('.related_term_tpl');

   while(relatedTermBox.firstChild) {
      relatedTermBox.removeChild(relatedTermBox.firstChild); 
   }
   
   resArray.forEach(el=> {
      const divEl = `<div>${el}</div>`;
      relatedTermBox.insertAdjacentHTML('beforeEnd', divEl);
   });

  
   this.showTarget(relatedTermBox);
   this.hideTarget(this.hotKeywordBox);

   relatedTermBox.addEventListener("mouseleave", ()=>setTimeout(()=>{
      if(this.searchWindow.value==='') this.showRolling();
      this.hideTarget(relatedTermBox);
      this.showTarget(this.hotKeywordBox);
   }, 200));
}

SearchUI.prototype.makeTpl = function(arr, startNumber, pasteArea, place){
   const tempBox = _.create('div');
   
   arr.forEach((v, idx)=>{
      const tempDiv = 
      `<div><ul>
         <span class="kwd_number">${idx+startNumber}</span>
         <span>${this.popularSearchTerm[idx+startNumber-1]}</span>
      </ul></div>`;
      tempBox.insertAdjacentHTML('beforeEnd', tempDiv)
   });
   pasteArea.insertAdjacentElement(place, tempBox);
}