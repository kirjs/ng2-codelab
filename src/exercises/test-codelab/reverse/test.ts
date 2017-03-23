import {reverse} from './reverse';
import {generateItForFunction} from '../common';

const createIt = generateItForFunction(reverse);
describe('first thing', () => {
  createIt([96], [98]);
  createIt([1, 2, 3], [3, 2, 1]);
  createIt([4, 4, 5], [5, 4, 4]);
});
