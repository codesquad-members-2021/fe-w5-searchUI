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
  topTenWords: "https://shoppinghow.kakao.com/v1.0/shophow/top/recomKeyword.json?_=1615183888074",
  recommendedWords: (inputValue) => `https://completion.amazon.com/api/2017/suggestions?session-id=143-7282527-1203953&customer-id=&request-id=8RSH7H2971TF4M9DSSK8&page-type=Gateway&lop=en_US&site-variant=desktop&client-info=amazon-search-ui&mid=ATVPDKIKX0DER&alias=aps&b2b=0&fresh=0&ks=69&prefix=${inputValue}&event=onKeyPress&limit=11&fb=1&suggestion-type=KEYWORD&suggestion-type=WIDGET&_=1615167756813%27`,
};

// session-id 무슨일?
// 데이터 보내줄 때 형식이 있는건가?
// session-id 있으면: 아[0] -> ㅇ
// session-id 없으면: 아[0] -> 아
// String.prototype.normalize() 와 같은 문제 아닐까? ㅇㅇ 마즘
// 데이터가 NFD로 와서 한글같은 경우 ㅎ,ㅏ,ㄴ,ㄱ,ㅡ,ㄹ 로 깨지는 것 같음
// 근데 공교롭게도 session-id를 빼면 NFC로 오는 것 같음
