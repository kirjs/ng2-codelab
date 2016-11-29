import {CodelabConfig} from "../codelab-config";
import {FileConfig} from "../file-config";

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

function hidden(...files: FileConfig[]): FileConfig[] {
  return files.map(file => Object.assign({}, file, {hidden: true}))
}
function readOnly(...files: FileConfig[]): FileConfig[] {
  return files.map(file => Object.assign({}, file, {readonly: true}))
}
function justForReference(...files: FileConfig[]): FileConfig[] {
  return collapsed(...readOnly(...files));
}
function collapsed(...files: FileConfig[]): FileConfig[] {
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
  user: '',
  auth: {},
  page: 'milestone',
  selectedMilestoneIndex: 0,
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
          <h1>Welcome to the Angular 2 and TypeScript CodeLab!</h1>
          <p>In this codelab we're going to learn the basics of TypeScript and Angular2.</p>         
          <p>The slides for the codelab are available using 
          <a href = "https://docs.google.com/presentation/d/1Wh4ZwTKG1h66f3mTD4GQO8rKwGDEJeBSvUDJ3udU1LA/edit?usp=sharing">here</a></p>         
          <p>Enjoy, and please leave your feedback.</p>         
          <p>List of known issues:</p>         
          <ul>
            <li>There are no type definitions imported in the editor.</li>
            <li>Mocha is used for testing instead of jasmine. </li>
            <li>Forms/Routing milestone is missing.</li>
            <li>File naming scheme with a dot should be used, e.g. "app.component.ts", not "AppComponent.ts".</li>
            <li>The app is not as beautiful as it could have been.</li>
          </ul>         
             <p>Missing milestones/Topics for the advance course:</p>         
          <ul>
            <li>Angular-cli.</li>
            <li>Data flows</li>
            <li>Rxjs</li>
            <li>CSS and styling</li>
          </ul>         
          
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
            tsFile('Meetup'),
            ...justForReference(
              tsFile('Anglar'),
              tsFile('anglars'),
              tsFile('Main')
            ),
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
            appComponent({readonly: true}),
            testFile(),
            appModule({
              readonly: true,
              collapsed: true,
              excludeFromTesting: true,
              path: '1-bootstrap/1-module/solution',
            }),
            ...hidden(sharedAppBootstrap())
          ],
          tests: []
        }, {
          name: 'Add some dynamics',
          description: `Now let's add search method and display a message when there are no videos.`,
          path: '2-templates/1-no-videos',
          fileTemplates: [
            htmlFile('app'),
            appComponent({'path': '2-templates/0-header-input'}),
            sharedAppBootstrap({hidden: true}),
            testFile(),
            appModule({
              readonly: true,
              collapsed: true,
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
              collapsed: true,
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
          ...justForReference(
            htmlFile('app', {path: '2-templates/2-all-videos/solution'}),
            sharedApiFile('Api')
          ),
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
            ...justForReference(
              sharedVideoInterface()
            ),
            ...hidden(
              tsFile('AppModule', {path: '4-component-tree/1-use-video-component/solution'}),
              htmlFile('index'),
              tsFile('AppComponent'),
              sharedTsFile('VideoService'),
              sharedApiFile(),
              sharedAppBootstrap()
            ),
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
            tsFile('AppModule'),
            ...justForReference(htmlFile('video', {
                readonly: true,
                path: '4-component-tree/0-add-video-component/solution'
              }),
              tsFile('VideoComponent', {readonly: true, path: '4-component-tree/0-add-video-component/solution'}),
              sharedVideoInterface()),
            ...hidden(
              tsFile('AppComponent'),
              sharedTsFile('VideoService'),
              sharedApiFile(),
              sharedAppBootstrap(),
            ),
            testFile()
          ],
          tests: []
        }]
    }, {
      name: 'Custom events',
      selectedExerciseIndex: 0,
      exercises: [
        {
          name: 'Create VideoComponent',
          description: `<p>Let's try some custom events now. </p>
            <p>We'll create a thumbs component which will send thumbsUp/thumbsDown event </p>
  `,
          path: '4-z-custom-events/0-add-thumb-component',
          fileTemplates: [
            htmlFile('thumbs'),
            tsFile('ThumbsComponent'),
            ...justForReference(
              tsFile('AppModule'),
              tsFile('WrapperComponent'),
            ),
            ...hidden(
              htmlFile('index'),
              tsFile('AppComponent'),
              sharedTsFile('VideoService'),
              sharedApiFile(),
              sharedAppBootstrap()
            ),
            testFile()
          ],
          tests: []
        },
        {
          name: 'Use VideoComponent',
          description: `Use VideoComponent in the app.`,
          path: '4-z-custom-events/1-use-thumb-component',
          fileTemplates: [
            htmlFile('video'),
            tsFile('VideoComponent'),
            tsFile('AppModule'),
            ...justForReference(
              htmlFile('thumbs', {path: '4-z-custom-events/0-add-thumb-component/solution'}),
              tsFile('ThumbsComponent', {path: '4-z-custom-events/0-add-thumb-component/solution'}),

              sharedVideoInterface()),
            ...hidden(
              htmlFile('app', {path: '4-component-tree/1-use-video-component/solution'}),
              tsFile('AppComponent'),
              sharedTsFile('VideoService'),
              sharedApiFile(),
              sharedAppBootstrap(),
            ),
            testFile()
          ],
          tests: []
        }]
    }, {
      name: 'Content projection',
      selectedExerciseIndex: 0,
      exercises: [
        {
          // TODO: See if we can maybe bootstrap only video component, not the whole app for this one.
          name: 'Add TogglePanelComponent',
          description: `Let's create a component which will use content projection to toggle between description and meta information. `,
          path: '5-content-projection/0-add-toggle-panel-component',
          fileTemplates: [
            htmlFile('togglepanel'),
            tsFile('TogglePanelComponent'),
            ...justForReference(
              tsFile('WrapperComponent'),
              tsFile('AppModule'),
              htmlFile('index'),
            ),
            ...hidden(
              sharedAppBootstrap(),
              sharedVideoInterface()
            ),
            testFile(),
          ],
          tests: []
        },
        {
          name: 'Use TogglePanelComponent',
          description: `Now let's use the component.`,
          path: '5-content-projection/1-use-toggle-panel',
          fileTemplates: [

            htmlFile('video', {path: '4-component-tree/0-add-video-component/solution'}),
            tsFile('VideoComponent', {readonly: true}),
            tsFile('AppModule'),
            ...justForReference(
              tsFile('TogglePanelComponent', {path: '5-content-projection/0-add-toggle-panel-component/solution'}),
              htmlFile('togglepanel', {path: '5-content-projection/0-add-toggle-panel-component/solution'}),
            ),
            ...hidden(
              tsFile('AppComponent', {path: '4-component-tree/1-use-video-component/solution'}),
              htmlFile('app', {path: '4-component-tree/1-use-video-component/solution'}),
              sharedAppBootstrap(),
              sharedVideoInterface(),
              sharedTsFile('VideoService'),
              sharedApiFile()
            ),
            testFile()
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
          description: `<p>Create a Context(Ad)Component</p>
            <p>which will inject it's parent component, see what thedescription, and display the value accordingly.</p>
            <p>Note: We had to get rid of the 'Ad' part of the component, because AdBlock blocked the template.</p>`,
          path: '6-children',
          fileTemplates: [
            tsFile('ContextComponent'),
            htmlFile('context'),
            htmlFile('video'),
            ...justForReference(
              tsFile('AppModule'),
              tsFile('ContextService'),
              tsFile('VideoComponent'),
              htmlFile('app', {path: '4-component-tree/1-use-video-component/solution'}),
            ),
            ...hidden(
              htmlFile('index'),
              htmlFile('togglepanel', {path: '5-content-projection/0-add-toggle-panel-component/solution'}),
              sharedTsFile('TogglePanelComponent', {path: '5-content-projection/0-add-toggle-panel-component/solution'}),
              tsFile('AppComponent', {path: '4-component-tree/1-use-video-component/solution'}),
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
          tsFile('AppModule'),
          tsFile('FuzzyPipe', {readonly: true, path: '7-pipes/0-create-pipe/solution'}),
          testFile(),
          ...hidden(
            tsFile('ContextComponent', {path: '6-children'}),
            htmlFile('context', {path: '6-children'}),
            tsFile('ContextService', {path: '6-children'}),
            tsFile('VideoComponent', {path: '6-children'}),
            htmlFile('app', {path: '4-component-tree/1-use-video-component/solution'}),
            htmlFile('togglepanel', {path: '5-content-projection/0-add-toggle-panel-component/solution'}),
            sharedTsFile('TogglePanelComponent', {path: '5-content-projection/0-add-toggle-panel-component/solution'}),
            tsFile('AppComponent', {path: '4-component-tree/1-use-video-component/solution'}),
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
      name: 'Tests',
      selectedExerciseIndex: 0,
      exercises: [{
        name: 'Sample tests',
        description: `
        <p>In this milestone instead of changing the code to pass the test
            you'll have to change the test to pass the code. </p>

        <p>This milestone is experimental and temporarily uses 'mocha' and 'chai' instead of jasmine.</p>
`,
        path: '8-tests/0-test-component',
        fileTemplates: [
          Object.assign(testFile(), {hidden: false}),
          htmlFile('video', {path: '6-children/solution'}),
          tsFile('FuzzyPipe', {readonly: true, path: '7-pipes/0-create-pipe/solution'}),
          testFile(),
          ...hidden(
            tsFile('ContextComponent', {path: '6-children'}),
            htmlFile('context', {path: '6-children'}),
            tsFile('ContextService', {path: '6-children'}),
            tsFile('VideoComponent', {path: '6-children'}),
            htmlFile('app', {path: '4-component-tree/1-use-video-component/solution'}),
            htmlFile('togglepanel', {path: '5-content-projection/0-add-toggle-panel-component/solution'}),
            tsFile('TogglePanelComponent', {path: '5-content-projection/0-add-toggle-panel-component/solution'}),
            tsFile('AppComponent', {path: '4-component-tree/1-use-video-component/solution'}),
            sharedAppBootstrap({hidden: true}),
            sharedVideoInterface({hidden: true}),
            sharedTsFile('VideoService', {hidden: true}),
            sharedApiFile({hidden: true})
          )
        ],
        tests: []
      }]
    },
    {
      name: 'Survey',
      selectedExerciseIndex: 0,
      exercises: [{
        name: 'All done!',
        description: `
        Please fill out <a href = "https://docs.google.com/forms/d/1lGPvmCftArLXVuJkO6L7sXZiqIDj-DtiPM0MQJXLJTA/edit">The survey</a>
        (which is different from the feedback form)
`,
        path: 'test',
        fileTemplates: [],
        tests: []
      }]
    }
  ]
};

