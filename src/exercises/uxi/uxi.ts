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


function bootstrap(moduleName, template, solution) {
  return {
    bootstrap: true,
    excludeFromTesting: true,
    type: 'typescript',
    path: moduleName + '/' + moduleName + '.ts',
    template,
    moduleName: moduleName,
    solution
  };
}

export const UxiConfig: CodelabConfigTemplate = {
  name: 'Loops test',
  id: 'uxi',
  defaultRunner: 'Angular',
  milestones: [{
    name: 'Intro to TypeScript',
    exercises: [
      {
        name: "Title",
        description: `
        Hi
          `,
        files: [
          exercise('app.component', require('!raw-loader!./app.component'), require('!raw-loader!./app.component')),
          exercise('app.module', require('!raw-loader!./app.module'), require('!raw-loader!./app.module')),
          bootstrap('bootstrap', require('!raw-loader!./main.ts'), require('!raw-loader!./main.ts'))
        ]
      }
    ]
  }]
};
