const urls = {
  topRecomKey:
    "https://shoppinghow.kakao.com/v1.0/shophow/top/recomKeyword.json?_=1615183888074",

  moreList:
    "https://shoppinghow.kakao.com/v1.0/shophow/top/planningEvent.json?_=1615454214929",

  requestSearchJsonp: (word, callback) => {
    const script = document.createElement("script");
    script.src = `https://suggest-bar.daum.net/suggest?callback=${callback}&limit=10&mode=json&code=utf_in_out&q=${word}&id=shoppinghow_suggest`;
    document.body.append(script);
  },
};

export default urls;
