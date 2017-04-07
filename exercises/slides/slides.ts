import {CodelabConfigTemplate} from '../ng2ts/ng2ts';

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
