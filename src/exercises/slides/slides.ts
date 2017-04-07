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

export const SlidesConfig: CodelabConfigTemplate = {
  name: 'Loops test',
  id: 'slides',
  defaultRunner: 'Angular',
  milestones: [{
    name: 'Intro to TypeScript',
    exercises: [
      {
        slide: true,
        name: "Title",
        description: `
        <h1>Hi</h1>
        <p>Hello</p>
          `
      }
    ]
  }]
};
