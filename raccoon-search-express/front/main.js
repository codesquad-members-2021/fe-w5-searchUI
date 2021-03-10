import RaccoonShopping from './src/js/raccoonShopping';
import { _ } from './src/js/const';

const raccoonShopping = new RaccoonShopping(_.reqNum.PAGE, _.reqNum.ITEMS, _.reqNum.CURRENT);
raccoonShopping.init();

export { raccoonShopping };
