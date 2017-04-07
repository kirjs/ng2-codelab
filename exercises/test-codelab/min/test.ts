import {min} from './min';
import {generateItForFunction} from '../common';

const createIt = generateItForFunction(min);
describe('first thing', () => {
  createIt([12], 12);
  createIt([1, 2, 3, 4, 5], 1);
  createIt([-1, -2, -3], -3);
  createIt([5, 27, 12, 38, 92, 22, 11, 4, 23, 33], 4);
});
