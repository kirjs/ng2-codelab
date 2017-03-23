import {some} from './some';
import {generateItForFunction} from '../common';

const createIt = generateItForFunction(some);
describe('first thing', () => {
  createIt([96], false);
  createIt([98], true);
  createIt([96.5, 97.1, 95.9, 96.8, 96, 9, 96, 8], true);
  createIt([96.5, 96.1, 95.9, 96.8, 96, 9, 96, 8], false);
});
