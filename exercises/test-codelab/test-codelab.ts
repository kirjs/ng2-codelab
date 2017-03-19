import {CodelabConfigTemplate} from '../ng2ts/ng2ts';
import {polyglot} from '../../src/i18n/polyglot';
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
        name: polyglot.t(`1`),
        description: `
          <h1>${polyglot.t('Maximum value')}</h1>
          <p>${polyglot.t('Write a function which takes an array of numbers, and return the largest number.')}</p>
          `,
        files: [
          exercise('max', require('!raw-loader!./max/template.ts'), require('!raw-loader!./max/max.ts')),
          test('max', require('!raw-loader!./max/test.ts')),
          common()
        ]
      },
      {
        name: polyglot.t(`2`),
        description: `
          <h1>${polyglot.t('Searching for 42')}</h1>
          <p>${polyglot.t('Write a function which takes an array of numbers, and returns true if it contains number 42')}</p>
          `,
        files: [
          exercise('search', require('!raw-loader!./search/template.ts'), require('!raw-loader!./search/search.ts')),
          test('search', require('!raw-loader!./search/test.ts')),
          common()
        ]
      }
    ]
  }]
};
