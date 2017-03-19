import {lessThan7} from './lessThan7';
import {generateItForFunction} from '../common';


const createIt = generateItForFunction(lessThan7);

describe('first thing', () => {
  createIt([1], [1]);
  createIt([3, 12], [3]);
  createIt([1, 22, 23, 4, 5], [1, 4, 5]);
  createIt([-1, 42], [-1]);
  createIt([1, 5, 42, 12, 38, 92, 22, 11, 4, 23, 3], [1, 5, 4, 3]);
});
