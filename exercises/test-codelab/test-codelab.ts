import {CodelabConfigTemplate} from '../ng2ts/ng2ts';
import {polyglot} from '../../src/i18n/polyglot';


function exercise(moduleName, template, solution) {
  return {
    bootstrap: false,
    excludeFromTesting: false,
    type: 'typescript',
    path: moduleName + '.ts',
    template,
    moduleName: moduleName,
    solution
  };
}
function test(moduleName, template) {
  return {
    path: moduleName + '/test.ts',
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
          name: polyglot.t(`test`),
          description: `
          <h1>${polyglot.t('Test codelab CodeLab!')}</h1>
          <p>${polyglot.t('This is a test codelab')}</p>
          `,
          files: [
            exercise('max', require('!raw-loader!./max/template.ts'), require('!raw-loader!./max/max.ts')),
            test('max', require('!raw-loader!./max/test.ts'))
          ]
        },
        {
          name: polyglot.t(`Intro`),
          slide: true,
          description: `
          <h1>${polyglot.t('Test codelab CodeLab!')}</h1>
          <p>${polyglot.t('This is a test codelab')}</p>
          `
        }
      ]
    }]
  };
