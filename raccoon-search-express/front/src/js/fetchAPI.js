export default class FetchAPI {
  constructor() {
    this.url = {
      mileageList: 'http://localhost:3000/api/mileageList',
      mallEventList: 'http://localhost:3000/api/mallEventList',
      hotDealList: 'http://localhost:3000/api/hotDealList',
      shoppingPartner: 'http://localhost:3000/api/shoppingPartner',
      rollingKeyword: 'https://shoppinghow.kakao.com/v1.0/shophow/top/recomKeyword.json',
    };
    this.req = {
      sucess: 'Request successful',
      failed: 'Request failed',
    };
  }

  getMileageList = () => fetch(this.url.mileageList).then((response) => response.json());
  getMallEventList = () => fetch(this.url.mallEventList).then((response) => response.json());

  getHotDealList = (start, count) => {
    const param = { start: start, count: count };
    const queryParam = new URLSearchParams(param);
    return fetch(`${this.url.hotDealList}/?${queryParam.toString()}`).then((response) => response.json());
  };

  getRollingKeyword = () => fetch(this.url.rollingKeyword).then((response) => response.json());
}
