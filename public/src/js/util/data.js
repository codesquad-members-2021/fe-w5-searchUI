export const CLASS_LIST = {
  HIDDEN: 'hidden',
  CURRENT_PAGE: 'current-page',
  PREV_BTN: 'btn-prev',
  NEXT_BTN: 'btn-next',
  PREV_ICON: 'fa-chevron-left',
  NEXT_ICON: 'fa-chevron-right',
  MORE_LIST: 'event-item-list',
  PLACEHOLDER_ITEM: 'placeholder-item',
};

export const URL = {
  MORE: 'http://localhost:8080/moreItem',
  SLIDE: 'https://shoppinghow.kakao.com/v1.0/shophow/top/planningEvent.json?_=1614221190473',
  RECOMMEND: 'https://shoppinghow.kakao.com/v1.0/shophow/top/recomKeyword.json?_=1615182066924',
  autoComplete: function (keyword) {
    return `https://completion.amazon.com/api/2017/suggestions?session-id=136-7196080-8943745&customer-id=&request-id=64K2NCH8DSXF305XB5GB&page-type=Gateway&lop=en_US&site-variant=desktop&client-info=amazon-search-ui&mid=ATVPDKIKX0DER&alias=aps&b2b=0&fresh=0&ks=78&prefix=${keyword}&event=onKeyPress&limit=11&fb=1&suggestion-type=KEYWORD&suggestion-type=WIDGET&_=1615428578330`;
  },
};
