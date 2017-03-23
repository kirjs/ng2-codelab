import {CodelabConfigTemplate} from '../ng2ts/ng2ts';
import {FileConfig} from '../../app/codelab/file-config';


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
  name: 'Loops test',
  id: 'scripted',
  defaultRunner: 'Angular',
  milestones: [{
    name: 'Intro to TypeScript',
    exercises: [
      {
        name: "Hello",
        description: `
          <h1>Hi, welcome to Doogle!</h1>
          <h2>We write some serious software here!</h2>
          <p>Welcome to Doogle engineering rotation program, here you'll have an opportunity to solve problems best dog minds have been working on.</p>
          <p>Hit the "1" tab above to get to your first assignment.</p>
          <img src="/assets/images/dogs/puppy-coding.jpg" alt="Puppy coding">
    `,
        slide: true
      },
      {
        name: "1",
        description: `
          <h1>Get minimum value</h1>
          <p>So we've just had a running competition, and timed ourselves, but since we are dogs we don't know which of us is the fastest.</p>
          <p>Write a <b>function</b> which takes an array of numbers (in seconds) and returns <b>the smallest number.</b></p>
          <img src="/assets/images/dogs/running.jpg" style="width:300px"  alt="Puppies">
          `,
        files: [
          exercise('min', require('!raw-loader!./min/template.ts'), require('!raw-loader!./min/min.ts')),
          test('min', require('!raw-loader!./min/test.ts')),
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
