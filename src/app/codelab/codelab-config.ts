import {CodelabConfig} from "../codelab-config";

function testFile() {
  return {
    filename: 'Test.ts',
    type: 'ts',
    ui: false,
    test: true,
    bootstrap: true,
    before: 'mochaBefore();',
    after: 'mochaAfter();',
    hidden: true
  };
}

function htmlFile(file: string, extensions?) {
  return Object.assign({
    filename: `${file}.html`, type: 'html'
  }, extensions)
}

function tsFile(file, extensions?) {
  return Object.assign({
    filename: `${file}.ts`, type: 'ts', after: `
    export function evalJs( js ){
      return eval(js);
    }
`
  }, extensions)
}

function appComponent(extensions?) {
  return tsFile('AppComponent', extensions);
}

function appModule(extensions?) {
  return tsFile('AppModule', extensions);
}

function sharedApiFile(extensions?) {
  return sharedTsFile('Api', extensions);
}

function sharedTsFile(file, extensions?) {
  return tsFile(file, Object.assign({path: 'shared'}, extensions));
}


function sharedVideoInterface(extensions?) {
  return tsFile('VideoItem', Object.assign({path: 'shared'}, extensions));
}


function appBootstrap(extensions?) {
  return Object.assign(tsFile('AppModule'), {
    filename: 'Bootstrap.ts',
    type: 'ts',
    ui: true,
    bootstrap: true,
  }, extensions)
}

function sharedAppBootstrap(extensions?) {
  return Object.assign(appBootstrap(), {path: 'shared'}, extensions)
}

export const codelabConfig: CodelabConfig = {
  name: 'Angular2 codelab',
  selectedMilestoneIndex: 6,
  milestones: [
    {
      /**
       * See the interface.
       */
      name: 'Intro to TypeScript',
      selectedExerciseIndex: 0,
      exercises: [
        {
          name: 'Intro to typescript',
          path: '0-intro',
          description: `
          <h1>This is an intro!!</h1>
          <p>Intro to TypeScript</p>
          <img src = "assets/images/puppy.jpg" class = "img" width = 400>
         
        `,
          fileTemplates: [],
          tests: [],
          messageNext: `Let's start`
        },
        {
          name: 'Basics of typescript',
          path: '0-intro',
          description: `
          Let's create our first typescript module. 
        `,
          fileTemplates: [
            tsFile('Dog'),
            tsFile('BarkingBroadcastingService'),
            tsFile('Main'),
            testFile()
          ]
        },
        {
          name: `Congrats, now you know the basics of TypeScript, and you're ready to start the codelab`,
          path: '0-intro',
          description: `
          <h1>All done</h1>
          <p>Done done</p>
          <img src = "assets/images/puppy.jpg" class = "img" width = 400>
        `,
          fileTemplates: [],
          tests: [],
          messageNext: `You're done with the first milestone!`
        },

      ]
    },
    {
      name: 'Bootstrapping your app',
      selectedExerciseIndex: 0,
      exercises: [
        {
          name: 'Hello, welcome to milestone one.',
          path: '1-bootstrap/intro',
          description: `
          <h1>This is an intro!!</h1>
          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquam atque deleniti dicta eos est excepturi magnam, quia quos recusandae rem repudiandae similique? Iusto labore maiores nesciunt quasi quia tenetur ullam?</p>
          <img src = "assets/images/puppy.jpg" class = "img" width = 400>
          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquam atque deleniti dicta eos est excepturi magnam, quia quos recusandae rem repudiandae similique? Iusto labore maiores nesciunt quasi quia tenetur ullam?</p>
        `,
          fileTemplates: [],
          tests: [],
          messageNext: `Let's start`
        },
        {
          name: 'Creating your first component',
          path: '1-bootstrap/0-component',
          description: `
        Let's create our first component!
        For this exercise we'll create module and bootstrap everything. Just make sure the component looks right.`,
          fileTemplates: [
            appComponent(),
            appModule({hidden: true}),
            appBootstrap({hidden: true}),
            testFile()
          ]
        }, {
          name: 'Creating a module',
          path: '1-bootstrap/1-module',
          description: `
        Now we got the component, but we need to wrap it in a module. For this exercise we'll bootstrap the module for you.`,
          fileTemplates: [
            appModule(),
            appComponent({readonly: true}),
            appBootstrap({hidden: true}),
            testFile()
          ]
        },
        {
          name: 'Bootstrapping your app',
          path: '1-bootstrap/2-bootstrap',
          description: `Now we got module and component ready, let's bootstrap it!!!`,
          fileTemplates: [
            appBootstrap(),
            appModule({readonly: true}),
            appComponent({readonly: true}),
            testFile()
          ]
        }
      ]
    }, {
      name: 'Templates',
      selectedExerciseIndex: 0,
      exercises: [
        {
          name: 'Set up the page',
          description: `Basic stuff`,
          path: '2-templates/header-input',
          fileTemplates: [
            htmlFile('app'),
            appComponent({readonly: true}),
            appBootstrap({hidden: true}),
            testFile()
          ],
          tests: []
        }, {
          name: 'Making search almost work',
          description: `todo`,
          path: '2-templates/no-videos',
          fileTemplates: [
            htmlFile('app'),
            appComponent(),
            appBootstrap({hidden: true}),
            testFile()
          ],
          tests: []
        }, {
          name: 'Displaying all videos',
          description: `todo`,
          path: '2-templates/all-videos',
          fileTemplates: [
            htmlFile('app'),
            appComponent(),
            appBootstrap({hidden: true}),
            testFile()
          ],
          tests: []
        }
      ]
    },
    {
      name: 'Dependency Injection',
      selectedExerciseIndex: 0,
      exercises: [{
        name: 'Service injection',
        description: `let's inject our first service`,
        path: '3-dependency-injection',
        fileTemplates: [
          tsFile('VideoService'),
          tsFile('AppModule'),
          tsFile('AppComponent'),
          htmlFile('app'),
          tsFile('Api'),
          appBootstrap(),
          testFile()
        ],
        tests: []
      }]
    },
    {
      name: 'Component Tree',
      selectedExerciseIndex: 0,
      exercises: [
        {
          // TODO: See if we can maybe bootstrap only video component, not the whole app for this one.
          name: 'Create a separate component to display a video.',
          description: `Todo`,
          path: '4-component-tree/0-add-video-component',
          fileTemplates: [
            htmlFile('video'),
            tsFile('VideoComponent'),
            htmlFile('app', {hidden: true}),
            tsFile('AppComponent', {hidden: true}),
            tsFile('AppModule'),
            sharedTsFile('VideoService', {hidden: true}),
            sharedApiFile({hidden: true}),
            sharedAppBootstrap({hidden: true}),
            testFile(),
            sharedVideoInterface()
          ],
          tests: []
        },
        {

          name: 'Use the component you have just created.',
          // TODO: Write the description
          description: `Todo`,
          path: '4-component-tree/1-use-video-component',
          fileTemplates: [
            htmlFile('app'),
            htmlFile('video', {readonly: true}),
            tsFile('AppModule'),
            tsFile('VideoComponent', {readonly: true}),
            tsFile('AppComponent', {hidden: true}),
            sharedTsFile('VideoService', {hidden: true}),
            sharedApiFile({hidden: true}),
            sharedAppBootstrap({hidden: true}),
            testFile(),
            sharedVideoInterface()
          ],
          tests: []
        }]
    }, {
      name: 'Content projection',
      selectedExerciseIndex: 0,
      exercises: [
        {
          // TODO: See if we can maybe bootstrap only video component, not the whole app for this one.
          name: 'Create a separate component to display a video.',
          description: `Todo`,
          path: '5-content-projection/0-add-toggle-panel-component',
          fileTemplates: [
            // TODO: Figure out how to actually use dashes and periods in the component.
            htmlFile('togglepanel'),
            tsFile('TogglePanelComponent'),
            tsFile('AppModule', {hidden: true}),
            tsFile('WrapperComponent'),
            sharedAppBootstrap({hidden: true}),
            sharedVideoInterface({hidden: true}),
            testFile(),
          ],
          tests: []
        },
        {
          // TODO: See if we can maybe bootstrap only video component, not the whole app for this one.
          name: 'Create a separate component to display a video.',
          description: `Todo`,
          path: '5-content-projection/1-use-toggle-panel',
          fileTemplates: [
            // TODO: Figure out how to actually use dashes and periods in the component.
            tsFile('AppModule', {hidden: true}),
            htmlFile('video'),
            tsFile('VideoComponent', {readonly: true}),
            htmlFile('app', {hidden: true}),
            htmlFile('togglepanel'),
            tsFile('TogglePanelComponent'),
            tsFile('AppComponent', {hidden: true}),
            sharedAppBootstrap({hidden: true}),
            sharedVideoInterface({hidden: true}),
            sharedTsFile('VideoService'),
            sharedApiFile({hidden: true}),
            testFile(),
          ],
          tests: []
        }]
    },
    {
      name: 'Parent-container',
      selectedExerciseIndex: 0,
      exercises: [
        {
          name: 'Create a separate component to display a video.',
          description: `Todo`,
          path: '6-children',
          fileTemplates: [
            tsFile('ContextComponent'),
            htmlFile('context'),
            htmlFile('video'),
            tsFile('ContextService', {readonly: true}),
            tsFile('AppModule'),
            tsFile('VideoComponent', {readonly: true}),
            htmlFile('app', {hidden: true}),
            htmlFile('togglepanel', {hidden: true}),
            sharedTsFile('TogglePanelComponent', {hidden: true}),
            tsFile('AppComponent', {hidden: true}),
            sharedAppBootstrap({hidden: true}),
            sharedVideoInterface({hidden: true}),
            sharedTsFile('VideoService'),
            sharedApiFile({hidden: true}),
            testFile(),
          ],
          tests: []
        }]
    },
    {
      name: 'Pipes',
      selectedExerciseIndex: 0,
      exercises: [{
        name: 'Setup the pipe',
        description: 'todo',
        path: '7-pipes/0-create-pipe',
        fileTemplates: [
          tsFile('FuzzyPipe'),
          testFile()
        ],
        tests: []
      }]
    },
    {
      name: 'Test',
      selectedExerciseIndex: 0,
      exercises: [{
        name: 'Exercise',
        description: 'Just testing things',
        path: 'test',
        fileTemplates: [
          tsFile('Main'),
          tsFile('Dog')
        ],
        tests: []
      }]
    }
  ]
};

