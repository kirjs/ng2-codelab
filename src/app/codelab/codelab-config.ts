import {CodelabConfig} from "../codelab-config";

function testFile() {
  return {
    filename: 'Test.ts',
    type: 'ts',
    excludeFromTesting: false,
    test: true,
    bootstrap: true,
    before: 'mochaBefore();',
    after: 'mochaAfter();',
    hidden: true
  };
}

function hide(...files) {
  return files.map(file => Object.assign({}, file, {hidden: true}))
}
function readOnly(...files) {
  return files.map(file => Object.assign({}, file, {readonly: true}))
}
function collapsed(...files) {
  return files.map(file => Object.assign({}, file, {collapsed: true}))
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
    excludeFromTesting: true,
    bootstrap: true,
  }, extensions)
}

function sharedAppBootstrap(extensions?) {
  return Object.assign(appBootstrap(), {path: 'shared'}, extensions)
}

export const codelabConfig: CodelabConfig = {
  name: 'Angular2 codelab',
  page: 'milestone',
  selectedMilestoneIndex: 2,
  milestones: [
    {
      /**
       * See the interface.
       */
      name: 'Intro to TypeScript',
      selectedExerciseIndex: 0,
      exercises: [
        {
          name: 'Intro',
          path: '0-intro',
          description: `
          <h1>Welcome to the typescript!</h1>
          <p>Intro to TypeScript</p>
          
         
        `,
          fileTemplates: [],
          tests: [],
          messageNext: `Let's start`
        },
        {
          name: 'Typescript',
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
          name: `Success`,
          path: '0-intro',
          description: `
         You're done with the first milestone, and should now understand the basics of TypeScript!
        `,
          fileTemplates: [],
          tests: [],
          messageNext: `Start on the app!`
        },

      ]
    },
    {
      name: 'Bootstrapping your app',
      selectedExerciseIndex: 0,
      exercises: [
        {
          name: 'Intro',
          path: '1-bootstrap/intro',
          description: `
          <h1>First Angular 2 app!</h1>
          <p>This is how it's going to look like</p>
          
          <div class = "inBrowser">
            <div class="smaller">
              <h1>Hello Angular 2!</h1>
            </div>
          </div>
          <p>3 simple steps: </p>
          <ol>
            <li>Create the component</li>
            <li>Create the module</li>
            <li>Bootstrap the module</li>
          </ol>
        `,
          fileTemplates: [],
          tests: [],
          messageNext: `I'm a ready, let's start!`
        },
        {
          name: 'Create a component',
          path: '1-bootstrap/0-component',
          description: `
            <p>Let's create our first component!</p>
            <p>For this exercise we'll create module and bootstrap everything.
             Just make sure the component looks right.</p>
`,
          fileTemplates: [
            appComponent(),
            appModule({
              hidden: true,
              excludeFromTesting: true,
              path: '1-bootstrap/1-module/solution'
            }),
            appBootstrap({hidden: true, path: '1-bootstrap/2-bootstrap/solution'}),
            testFile()
          ]
        }, {
          name: 'Create a module',
          path: '1-bootstrap/1-module',
          description: `
        Now we got the component, but we need to wrap it in a module. For this exercise we'll bootstrap the module for you.`,
          fileTemplates: [
            appModule(),
            appComponent({readonly: true, path: '1-bootstrap/0-component/solution'}),
            appBootstrap({hidden: true, path: '1-bootstrap/2-bootstrap/solution'}),
            testFile()
          ]
        },
        {
          name: 'Bootstrap the module',
          path: '1-bootstrap/2-bootstrap',
          description: `Now we got module and component ready, let's bootstrap it!!!`,
          fileTemplates: [
            appBootstrap(),
            appModule({
              hidden: true,
              excludeFromTesting: true,
              path: '1-bootstrap/1-module/solution'
            }),
            appComponent({readonly: true, path: '1-bootstrap/0-component/solution'}),
            testFile()
          ]
        },
        {
          name: 'success',
          path: '1-bootstrap/outro',
          description: `
          <h1>Congrats on your first Angular2 app</h1>
        `,
          fileTemplates: [],
          tests: [],
          messageNext: `Let's learn the templates!`
        },
      ]
    }, {
      name: 'Templates',
      selectedExerciseIndex: 0,
      exercises: [
        {
          name: 'Set up the page',
          description: `Let's setup a header, a search box, and a search button for our component!`,
          path: '2-templates/0-header-input',
          fileTemplates: [
            htmlFile('app'),
            appComponent({readonly: true, 'path': '1-bootstrap/0-component/solution'}),
            sharedAppBootstrap({hidden: true}),
            testFile(),
            appModule({
              readonly: true,
              excludeFromTesting: true,
              path: '1-bootstrap/1-module/solution'
            })
          ],
          tests: []
        }, {
          name: 'Add some dynamics',
          description: `Now let's add search method and display a message when there are no videos.`,
          path: '2-templates/1-no-videos',
          fileTemplates: [
            htmlFile('app'),
            appComponent({'path': '1-bootstrap/0-component/solution'}),
            sharedAppBootstrap({hidden: true}),
            testFile(),
            appModule({
              readonly: true,
              excludeFromTesting: true,
              path: '1-bootstrap/1-module/solution'
            })
          ],
          tests: []
        }, {
          name: 'Display all videos',
          description: `Finally let's iterate over the videos.`,
          path: '2-templates/2-all-videos',
          fileTemplates: [
            htmlFile('app', {path: '2-templates/1-no-videos/solution'}),
            appComponent(),
            sharedAppBootstrap({hidden: true}),
            testFile(),
            appModule({
              readonly: true,
              excludeFromTesting: true,
              path: '1-bootstrap/1-module/solution'
            })
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
        description: `
          Now we're fetching the videos using a service instead of having them hardcoded.          
        `,
        path: '3-dependency-injection',
        fileTemplates: [
          tsFile('VideoService'),
          tsFile('AppModule'),
          tsFile('AppComponent', {path: '2-templates/2-all-videos/solution'}),
          htmlFile('app', {path: '2-templates/2-all-videos/solution'}),
          sharedApiFile('Api'),
          sharedAppBootstrap({hidden: true}),
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
          name: 'Create VideoComponent',
          description: `<p>Now instead of having the video html in the app component, we're going to have 
            a separate component for the video info.</p>
            <p>We are also going to use this moment to add more information: description, amount of views and amount of likes. </p>
  `,
          path: '4-component-tree/0-add-video-component',
          fileTemplates: [
            htmlFile('video'),
            tsFile('VideoComponent'),
            tsFile('AppModule'),
            tsFile('AppComponent', {hidden: true}),
            sharedTsFile('VideoService', {hidden: true}),
            sharedApiFile({hidden: true}),
            sharedAppBootstrap({hidden: true}),
            sharedVideoInterface(),
            testFile()
          ],
          tests: []
        },
        {
          name: 'Use VideoComponent',
          description: `Use VideoComponent in the app.`,
          path: '4-component-tree/1-use-video-component',
          fileTemplates: [
            htmlFile('app'),
            htmlFile('video', {readonly: true, path: '4-component-tree/0-add-video-component/solution'}),
            tsFile('AppModule'),
            tsFile('VideoComponent', {readonly: true, path: '4-component-tree/0-add-video-component/solution'}),
            ...hide(
              tsFile('AppComponent'),
              sharedTsFile('VideoService'),
              sharedApiFile(),
              sharedAppBootstrap(),
            ),
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
            tsFile('WrapperComponent'),
            ...hide(
              tsFile('AppModule'),
              sharedAppBootstrap(),
              sharedVideoInterface()
            ),
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
            htmlFile('video'),
            tsFile('VideoComponent', {readonly: true}),
            htmlFile('togglepanel'),
            tsFile('TogglePanelComponent'),
            ...hide(
              tsFile('AppComponent'),
              tsFile('AppModule'),
              htmlFile('app', {path: '4-component-tree/1-use-video-component/solution'}),
              sharedAppBootstrap(),
              sharedVideoInterface(),
              sharedTsFile('VideoService'),
              sharedApiFile()
            ),
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
          name: 'Inject parent component',
          description: `Create a context-ad component, which will inject it's parent component, see what the
            description, and display the value accordingly.`,
          path: '6-children',
          fileTemplates: [
            tsFile('ContextComponent'),
            htmlFile('context'),
            htmlFile('video'),
            tsFile('AppModule'),
            ...readOnly(
              tsFile('ContextService'),
              tsFile('VideoComponent')
            ),
            htmlFile('app', {path: '4-component-tree/1-use-video-component/solution'}),
            ...hide(htmlFile('togglepanel'),
              sharedTsFile('TogglePanelComponent'),
              tsFile('AppComponent'),
              sharedAppBootstrap(),
              sharedVideoInterface(),
              sharedTsFile('VideoService'),
              sharedApiFile(),
            ),
            testFile(),
          ],
          tests: []
        }]
    },
    {
      name: 'Pipes',
      selectedExerciseIndex: 0,
      exercises: [{
        name: 'Create a pipe',
        description: 'Create a fuzzy pipe, which takes a date in YYYY-MM-DD format, and returns how many days ago this was.',
        path: '7-pipes/0-create-pipe',
        fileTemplates: [
          tsFile('FuzzyPipe'),
          testFile()
        ],
        tests: []
      }, {
        name: 'Use the pipe',
        description: 'Now include the app in the module and use in the app.',
        path: '7-pipes/1-use-pipe',
        fileTemplates: [
          htmlFile('video', {path: '6-children/solution'}),
          tsFile('AppModule', {path: '6-children'}),
          tsFile('FuzzyPipe', {readonly: true, path: '7-pipes/0-create-pipe/solution'}),
          testFile(),
          ...hide(
            tsFile('ContextComponent', {path: '6-children'}),
            htmlFile('context', {path: '6-children'}),
            tsFile('ContextService', {path: '6-children'}),
            tsFile('VideoComponent', {path: '6-children'}),
            htmlFile('app', {path: '6-children'}),
            htmlFile('togglepanel', {path: '6-children'}),
            sharedTsFile('TogglePanelComponent', {hidden: true}),
            tsFile('AppComponent', {path: '6-children'}),
            sharedAppBootstrap({hidden: true}),
            sharedVideoInterface({hidden: true}),
            sharedTsFile('VideoService', {hidden: true}),
            sharedApiFile({hidden: true})
          ),

          testFile(),
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

