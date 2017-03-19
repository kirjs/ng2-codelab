import {search} from './search';
import {generateItForFunction} from '../common';


const createIt = generateItForFunction(search);
describe('first thing', () => {
  createIt([42], true);
  createIt([12], false);
  createIt([1, 2, 3, 4, 5], false);
  createIt([-1, 42], true);
  createIt([1, 5, 42, 12, 38, 92, 22, 11, 4, 23, 3], true);
});
