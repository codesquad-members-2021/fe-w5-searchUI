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
  topTenWords: server("/popularShoppingKeyword.json"),
  recommendedWords: (inputValue) => `https://completion.amazon.com/api/2017/suggestions?session-id=143-7282527-1203953&customer-id=&request-id=8RSH7H2971TF4M9DSSK8&page-type=Gateway&lop=en_US&site-variant=desktop&client-info=amazon-search-ui&mid=ATVPDKIKX0DER&alias=aps&b2b=0&fresh=0&ks=69&prefix=${inputValue}&event=onKeyPress&limit=11&fb=1&suggestion-type=KEYWORD&suggestion-type=WIDGET&_=1615167756813`,
};
