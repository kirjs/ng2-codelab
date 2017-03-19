import {max} from './max';
import {generateItForFunction} from '../common';

const createIt = generateItForFunction(max);
describe('first thing', () => {
  createIt([12], 12);
  createIt([1, 2, 3, 4, 5], 5);
  createIt([-1, -2, -3], -1);
  createIt([1, 5, 27, 12, 38, 92, 22, 11, 4, 23, 3], 92);
});
