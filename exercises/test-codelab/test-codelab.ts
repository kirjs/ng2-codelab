import {CodelabConfigTemplate} from '../ng2ts/ng2ts';
import {polyglot} from '../../src/i18n/polyglot';

export const testCodelabConfig: CodelabConfigTemplate = {
  name: 'Test codelab',
  id: 'test',
  files: {a: 'a.ts'},
  preloadedFiles: {
    'a': `console.log('hi')`
  },
  overrides: {
    file: {},
    stage: {}
  },
  stages: ['one', 'two'],
  defaultRunner: 'Angular',
  milestones: [{
    name: 'Intro to TypeScript',
    exercises: [
      {
        name: polyglot.t(`Intro`),
        slide: true,
        description: `
          <h1>${polyglot.t('Test codelab CodeLab!')}</h1>
          <p>${polyglot.t('This is a test codelab')}</p>
          `
      }]
  }]
};
