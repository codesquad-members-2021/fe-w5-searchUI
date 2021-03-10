import FetchAPI from './fetchAPI';
import { initHotDealList } from '../../main';
import { _ } from './const';

export default class RequestHotDealData extends FetchAPI {
  constructor(page, items, current) {
    super();
    this.page = page;
    this.items = items;
    this.current = current;
    this.target = _.$('.more-item__button');
  }

  addEvent() {
    this.target.addEventListener('click', initHotDealList);
  }

  requestData() {
    const requestItems = this.page * this.items;
    const data = this.getHotDealList(this.current, requestItems);
    this.current = requestItems;
    this.page++;
    return data;
  }
}
