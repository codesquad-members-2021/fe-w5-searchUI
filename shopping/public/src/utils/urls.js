const server = (json) => `http://localhost:3000${json}`;

export const urls = {
  event: server("/event.json"),
  mileageList: server("/mileageList.json"),
  mallEventList: server("/mallEventList.json"),
  hotdeal: server("/hotdeal.json"),
  keyword: server("/keyword.json"),
  howRelate: server("/how__relate.json"),
  howSame: server("/how__same.json"),
  partners: server("/partners.json"),
  // topTenWords: server("/popularShoppingKeyword.json"),
  topTenWords: "https://shoppinghow.kakao.com/v1.0/shophow/top/recomKeyword.json?_=1615183888074",
  // recommendedWords: (inputValue) => `https://completion.amazon.com/api/2017/suggestions?mid=ATVPDKIKX0DER&alias=aps&suggestion-type=KEYWORD&prefix=${inputValue}`,
  recommendedWords: (inputValue) => `https://completion.amazon.com/api/2017/suggestions?page-type=Gateway&site-variant=desktop&client-info=amazon-search-ui&mid=ATVPDKIKX0DER&alias=aps&b2b=0&fresh=0&ks=69&prefix=${inputValue}&event=onKeyPress&limit=11&fb=1&suggestion-type=KEYWORD&suggestion-type=WIDGET&_=1615167756813`,
  // session-id 무슨일?
};
