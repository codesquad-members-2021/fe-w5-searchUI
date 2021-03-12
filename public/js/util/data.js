const URL = {
  // MORE: 'http://localhost:8080/moreItem',
  // SLIDE: 'https://shoppinghow.kakao.com/v1.0/shophow/top/planningEvent.json?_=1614221190473',
  RECOMMEND: 'https://shoppinghow.kakao.com/v1.0/shophow/top/recomKeyword.json',
  autoComplete: function (keyword) {
    return `https://completion.amazon.com/api/2017/suggestions?session-id=136-7196080-8943745&customer-id=&request-id=64K2NCH8DSXF305XB5GB&page-type=Gateway&lop=en_US&site-variant=desktop&client-info=amazon-search-ui&mid=ATVPDKIKX0DER&alias=aps&b2b=0&fresh=0&ks=78&prefix=${keyword}&event=onKeyPress&limit=11&fb=1&suggestion-type=KEYWORD&suggestion-type=WIDGET&_=1615428578330`;
  },
};

const KEYCODE = {
  UP: 38,
  DOWN: 40,
};

export { URL, KEYCODE }