const getJsonpData = (data) => console.log(data);
const getSuggestData = (strValue, callbackFn) => {     
    // const script = _.createElement('script');
    const script = document.createElement('script');
    script.src = `https://suggest-bar.daum.net/suggest?callback=${callbackFn.name}&limit=10&mode=json&code=utf_in_out&q=${strValue}&id=shoppinghow_suggest`;     
    document.body.appendChild(script);
    console.log(script.innerText);
    
    // _.appendChild(document.body, script);    
};

getSuggestData(1, getJsonpData);


/* 
    module은 사용할수 없고, text/javascript 타입만 가능하고.. 
    SearchController에서 불러와야하는데 불러올수도 없고
    무조건 JSONP는 전역으로 처리해야하나? 그러면 방법은?
*/