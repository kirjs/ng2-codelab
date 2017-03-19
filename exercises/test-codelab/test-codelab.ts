import {CodelabConfigTemplate} from '../ng2ts/ng2ts';
import {FileConfig} from '../../src/app/codelab/file-config';


function exercise(moduleName, template, solution): FileConfig {
  return {
    bootstrap: false,
    excludeFromTesting: false,
    type: 'typescript',
    path: moduleName + '/' + moduleName + '.ts',
    template,
    moduleName: moduleName,
    solution
  };
}
function common() {
  const code = require('!raw-loader!./common.ts');
  const result = exercise('common', code, code);
  result.hidden = true;
  return result;
}
function test(moduleName, template): FileConfig {
  return {
    path: moduleName + '/' + moduleName + '/test.ts',
    type: "typescript",
    template,
    moduleName: moduleName + 'Test',
    excludeFromTesting: false,
    test: true,
    bootstrap: true,
    before: 'mochaBefore();',
    after: 'mochaAfter();',
    hidden: true,
  };
}


export const testCodelabConfig: CodelabConfigTemplate = {
  name: 'Test codelab',
  id: 'test',
  defaultRunner: 'Angular',
  milestones: [{
    name: 'Intro to TypeScript',
    exercises: [
      {
        name: "1",
        description: `
          <h1>Get maximum value</h1>
          <p>Write a function which takes an array of numbers, and return the largest number.</p>
          `,
        files: [
          exercise('max', require('!raw-loader!./max/template.ts'), require('!raw-loader!./max/max.ts')),
          test('max', require('!raw-loader!./max/test.ts')),
          common()
        ]
      },
      {
        name: "2",
        description: `
          <h1>Searching for 42</h1>
          <p>Write a function which takes an array of numbers, and returns true if it contains number 42</p>
          `,
        files: [
          exercise('search', require('!raw-loader!./search/template.ts'), require('!raw-loader!./search/search.ts')),
          test('search', require('!raw-loader!./search/test.ts')),
          common()
        ]
      },
      {
        name: "3",
        description: `
          <h1>Less than 7</h1>
          <p>Write a function which takes an array of numbers, and returns all numbers that are less than 7</p>
          `,
        files: [
          exercise('lessThan7', require('!raw-loader!./lessThan7/template.ts'), require('!raw-loader!./lessThan7/lessThan7.ts')),
          test('lessThan7', require('!raw-loader!./lessThan7/test.ts')),
          common()
        ]
      },
      {
        name: "4",
        description: `
          <h1>Anyone with temperature higher than 97</h1>
          <p>Write a function which takes an array of numbers, and returns true if ANY ONE of the numbers is greater than 97</p>
          `,
        files: [
          exercise('some', require('!raw-loader!./some/template.ts'), require('!raw-loader!./some/some.ts')),
          test('some', require('!raw-loader!./some/test.ts')),
          common()
        ]
      },
      {
        name: "5",
        description: `
          <h1>Anyone with temperature higher than 97</h1>
          <p>Write a function which takes an array of numbers, and returns true if ANY ONE of the numbers is greater than 97</p>
          `,
        files: [
          exercise('every', require('!raw-loader!./every/template.ts'), require('!raw-loader!./every/every.ts')),
          test('every', require('!raw-loader!./every/test.ts')),
          common()
        ]
      },
      {
        name: "6",
        description: `
          <h1>Reverse an array</h1>
          <p>Write a function which takes an array of numbers, and returns the same array reverved.</p>
          `,
        files: [
          exercise('reverse', require('!raw-loader!./reverse/template.ts'), require('!raw-loader!./reverse/reverse.ts')),
          test('reverse', require('!raw-loader!./reverse/test.ts')),
          common()
        ]
      }
    ]
  }]
};
