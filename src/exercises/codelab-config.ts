import {CodelabConfig} from "../app/codelab-config";
import {FileConfig} from "../app/file-config";

import {JsFileConfig} from "../app/js-file-config";

import {AppComponent} from "./files/AppComponent";
import {AppModule} from "./files/AppModule";
import {AppHtml} from "./files/AppHtml";
import {Bootstrap} from "./files/Bootstrap";
import {VideoItem} from "./files/VideoItem";
import {Api} from "./files/Api";
import {VideoService} from "./files/VideoService";
import {VideoHtml} from "./files/VideoHtml";
import {VideoComponent} from "./files/VideoComponent";
import {ThumbsHtml} from "./files/ThumbsHtml";
import {ThumbsComponent} from "./files/ThumbsComponent";
import {ToggelPanelHtml} from "./files/TogglePanelHtml";
import {TogglePanelComponent} from "./files/TogglePanelComponent";
import {WrapperComponent} from "./files/WrapperComponent";
import {ContextComponent} from "./files/ContextComponent";
import {ContextService} from "./files/ContextService";
import {Meetup} from "./files/Meetup";
import {Main} from "./files/Main";


function testFile() {
  return {
    filename: 'Test.ts',
    moduleName: 'Test',
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
function bootstrap(...files: FileConfig[]): FileConfig[] {
  return files.map(file => Object.assign({}, file, {bootstrap: true}))
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


function evaled(file) {
  return Object.assign(file, {
    after: `
    export function evalJs( js ){
      return eval(js);
    }
`
  });
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


// Ugly, but helps to typecheck.
// TODO: Find a nicer way
const files: {
  appComponent: {
    initial: FileConfig,
    solved: FileConfig,
    withTitle: FileConfig,
    withTemplate: FileConfig,
    withVideos: FileConfig,
    file: JsFileConfig
    withNgInit: FileConfig
    withVideoServiceImported: FileConfig
    withVideoService: FileConfig
  },
  appModule: {
    initial: FileConfig,
    solved: FileConfig,
    withVideoServiceInjected: JsFileConfig,
    withVideoService: JsFileConfig,
    withVideoComponentInjected: JsFileConfig,
    withVideoComponent: JsFileConfig,
    thumbs: JsFileConfig,
    wrapper: JsFileConfig,
    thumbsRollback: JsFileConfig,
    withThumbsInjected: JsFileConfig,
    withThumbsComponent: JsFileConfig,
    withTogglePanelInjected: JsFileConfig,
    withTogglePanel: JsFileConfig,
    withContextComponent: JsFileConfig,
    file: JsFileConfig,
  },
  bootstrap: {
    initial: FileConfig,
    solved: FileConfig,
    file: JsFileConfig,
    withTemplateLoader: FileConfig
  },
  thumbsHtml: {
    initial: FileConfig,
    solved: FileConfig
  },
  thumbsComponent: {
    initial: FileConfig,
    solved: FileConfig,
    file: JsFileConfig
  },
  appHtml: {
    initial: FileConfig,
    withSearchBox: FileConfig,
    withNoVideosMessage: FileConfig,
    withAllVideos: FileConfig,
    withVideoComponent: FileConfig
  },
  videoItem: {
    initial: FileConfig,
  },
  videoComponent: {
    initial: FileConfig,
    withInput: FileConfig,
    withThumbsInjected: FileConfig
    withThumbsEventHandled: FileConfig
  },
  videoHtml: {
    initial: FileConfig,
    withInfo: FileConfig,
    withThumbs: FileConfig,
    withTogglePanel: FileConfig
  },
  togglePanelHtml: {
    initial: FileConfig,
    solved: FileConfig
  },
  togglePanelComponent: {
    initial: FileConfig,
    solved: FileConfig
  },
  api: {
    initial: FileConfig,
  },
  wrapperComponent: {
    initial: FileConfig,
  },
  videoService: {
    initial: FileConfig,
    injectable: FileConfig,
  },
  contextComponent: {
    initial: FileConfig,
    solved: FileConfig
  },
  contextService: {
    initial: FileConfig
  },
  meetup: {
    initial: FileConfig,
    solved: FileConfig
  },
  mainMeetup: {
    initial: FileConfig
  },

} = {} as any;

files.appComponent = AppComponent;
files.appModule = AppModule;
files.appHtml = AppHtml;
files.bootstrap = Bootstrap;
files.videoItem = VideoItem;
files.api = Api;
files.videoService = VideoService;
files.videoHtml = VideoHtml;
files.videoComponent = VideoComponent;
files.thumbsComponent = ThumbsComponent;
files.thumbsHtml = ThumbsHtml;
files.togglePanelHtml = ToggelPanelHtml;
files.togglePanelComponent = TogglePanelComponent;
files.wrapperComponent = WrapperComponent;
files.contextComponent = ContextComponent;
files.contextService = ContextService;
files.meetup = Meetup;
files.mainMeetup = Main;


export const codelabConfig: CodelabConfig = {
    app: {
      name: 'Codelab',
      page: 'milestone',
      user: '',
      auth: '',
      feedbackEnabled: false
    },
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
          <p>Let's create our first TypeScript module.</p>
          <p>It will be a class called "Meetup".</p> 
          <p>It will take a list of guests, and will have a getRsvp method, which will only return people who're coming.</p> 
          <p>As you can see in the main.ts file we have 4 people signed up, but Charles Darwin had a last minute change of plans, 
          so only 3 people should be returned.</p> 
           
        `,
            solutions: [
              files.meetup.solved
            ],
            fileTemplates: [
              evaled(files.meetup.initial),
              evaled(files.mainMeetup.initial),
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
          <h1>Let's build our first Angular 2 app!</h1>
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
            solutions: [
              files.appComponent.solved
            ],
            fileTemplates: [
              evaled(files.appComponent.initial),
              ...hidden(
                files.appModule.solved,
                files.bootstrap.solved
              ),
              testFile()
            ]
          }, {
            name: 'Create a module',
            path: '1-bootstrap/1-module',
            description: `
        Now we got the component, but we need to wrap it in a module. For this exercise we'll bootstrap the module for you.`,
            solutions: [
              files.appModule.solved
            ],
            fileTemplates: [
              files.appModule.initial,
              ...justForReference(
                files.appComponent.solved
              ),
              ...hidden(
                files.bootstrap.solved
              ),
              testFile()
            ]
          },
          {
            name: 'Bootstrap the module',
            path: '1-bootstrap/2-bootstrap',
            description: `
          <p>Now we got module and component ready, let's bootstrap it!</p>
          <p>There's no really simple way to test it, so just make sure your app displays: 'Hello CatTube!'</p>`,
            solutions: [
              files.bootstrap.solved
            ],
            fileTemplates: [
              files.bootstrap.initial,
              ...justForReference(
                files.appComponent.solved,
                files.appModule.solved
              )
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
      },
      {
        name: 'Templates',
        selectedExerciseIndex: 0,
        exercises: [
          {
            name: 'Templates',
            path: '1-bootstrap/intro',
            description: `
          <h1>Let's work with angular templates</h1>
          <p>As a result we'll see our cats displayed.</p>
          
          <div class = "inBrowser">
            <div class="smaller">
              <my-app><div>
                <h1>CatTube</h1>              
                <button>Search!</button>
                <div>
                  <h2>Cute kitten</h2>
                  <img ng-reflect-src="/assets/images/kitten1.jpg" src="/assets/images/kitten1.jpg">
                </div><div>
                  <h2>Kitten on the tree</h2>
                  <img ng-reflect-src="/assets/images/kitten2.jpg" src="/assets/images/kitten2.jpg">
                </div><div>
                  <h2>Serouis cat</h2>
                  <img ng-reflect-src="/assets/images/kitten2.jpg" src="/assets/images/kitten2.jpg">
                </div>
              </div></my-app>
            </div>
          </div>
        
        `,
            fileTemplates: [],
            tests: [],
            messageNext: `I'm a ready, let's start!`
          },
          {
            name: 'Set up the page',
            description: `Let's setup a header, a search box, and a search button for our component!`,
            path: '2-templates/0-header-input',
            solutions: [
              files.appHtml.withSearchBox
            ],
            fileTemplates: [
              files.appHtml.initial,
              ...justForReference(
                files.appComponent.withTemplate,
                files.appModule.solved,
                files.bootstrap.withTemplateLoader,
              ),
              testFile(),
            ],
            tests: []
          }, {
            name: 'Add some action',
            description: `Now let's add search method and display a message when there are no videos.`,
            path: '2-templates/1-no-videos',
            solutions: [
              files.appHtml.withNoVideosMessage,
              files.appComponent.withVideos,
            ],
            fileTemplates: [
              files.appComponent.withTitle,
              files.appHtml.withSearchBox,
              ...justForReference(
                files.appModule.solved,
                files.bootstrap.withTemplateLoader,
              ),
              testFile()
            ],
            tests: []
          }, {
            name: 'Display all videos',
            description: `Finally let's iterate over the videos.`,
            path: '2-templates/2-all-videos',
            solutions: [
              files.appHtml.withAllVideos,
              files.appComponent.withNgInit,
            ],
            fileTemplates: [
              files.appHtml.withNoVideosMessage,
              files.appComponent.withVideos,
              ...justForReference(
                files.appModule.solved,
                files.bootstrap.withTemplateLoader,
              ),
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
          name: 'Templates',
          path: '1-bootstrap/intro',
          description: `
          <h1>Let's inject a service.</h1>
          <p>Using a service is way better than hardcoded data. As a result we get even more cats.</p>
          
          <div class = "inBrowser">
            <div class="smaller">
              <my-app><div>
                <h1>CatTube</h1>
                <input placeholder="video" type="text">
                <button>Search!</button>
                <div>
                  <h2>Cute kitten</h2>
                  <img ng-reflect-src="/assets/images/kitten1.jpg" src="/assets/images/kitten1.jpg">
                </div><div>
                  <h2>Kitten on the tree</h2>
                  <img ng-reflect-src="/assets/images/kitten2.jpg" src="/assets/images/kitten2.jpg">
                </div><div>
                  <h2>More kitten</h2>
                  <img ng-reflect-src="/assets/images/kitten2.jpg" src="/assets/images/kitten2.jpg">
                </div><div>
                  <h2>Another kitten</h2>
                  <img ng-reflect-src="/assets/images/kitten2.jpg" src="/assets/images/kitten2.jpg">
                </div><div>
                  <h2>Serouis cat</h2>
                  <img ng-reflect-src="/assets/images/kitten2.jpg" src="/assets/images/kitten2.jpg">
                </div><div>
                  <h2>Serouis cat</h2>
                  <img ng-reflect-src="/assets/images/kitten2.jpg" src="/assets/images/kitten2.jpg">
                </div><div>
                  <h2>Serouis cat</h2>
                  <img ng-reflect-src="/assets/images/kitten2.jpg" src="/assets/images/kitten2.jpg">
                </div>
              </div></my-app>
            </div>
          </div>
        
        `,
          fileTemplates: [],
          tests: [],
          messageNext: `I'm a ready, let's start!`
        }, {
          name: 'Service injection',
          description: `
          Now we're fetching the videos using a service instead of having them hardcoded.
        `,
          path: '3-dependency-injection',
          solutions: [
            files.videoService.injectable,
            files.appModule.withVideoService,
            files.appComponent.withVideoService,
          ],
          fileTemplates: [
            files.videoService.initial,
            files.appModule.withVideoServiceInjected,
            files.appComponent.withVideoServiceImported,
            ...justForReference(
              files.appHtml.withAllVideos,
              files.videoItem.initial,
              files.api.initial,
              files.bootstrap.withTemplateLoader,
            ),
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
            name: 'Intro',
            path: '1-bootstrap/intro',
            description: `
          <h1>Let's create a Video component!</h1>
          <p>Now instead of having the video html in the app component, we're going to have
            a separate component for the video info.</p>
          <p>We are also going to use this moment to add more information: description, amount of views and amount of likes. </p>
              
            <div class = "inBrowser">
              <div class="smaller">   
                <div>
                  <h2>Cute kitten</h2>
                  <img ng-reflect-src="/assets/images/kitten1.jpg" src="/assets/images/kitten1.jpg">
                  <div>Date 2016-11-25</div>
                  <div>Views 100</div>
                  <div>Likes 20</div>
                  <div>Description todo</div>
                </div>
              </div>
            </div>          
        `,
            fileTemplates: [],
            tests: [],
            messageNext: `I'm a ready, let's start!`
          },
          {

            name: 'Create VideoComponent',
            description: `<p>Now instead of having the video html in the app component, we're going to have 
            a separate component for the video info.</p>
            <p>We are also going to use this moment to add more information: description, amount of views and amount of likes. </p>
            `,
            path: '4-component-tree/0-add-video-component',
            solutions: [
              files.videoHtml.withInfo,
              files.videoComponent.withInput,
              files.appModule.withVideoService,
            ],
            fileTemplates: [
              files.videoComponent.initial,
              files.videoHtml.initial,
              ...justForReference(
                files.appModule.withVideoComponentInjected,
                files.videoService.injectable,
                files.appHtml.withAllVideos,
                files.appComponent.withVideoService,
                files.videoItem.initial,
                files.api.initial,
                files.bootstrap.withTemplateLoader,
              ),
              testFile()
            ],
            tests: []
          },
          {
            name: 'Use VideoComponent',
            description: `Use VideoComponent in the app.`,
            path: '4-component-tree/1-use-video-component',
            solutions: [
              files.appModule.withVideoComponent,
              files.appHtml.withVideoComponent,
            ],
            fileTemplates: [
              files.appModule.withVideoComponentInjected,
              files.appHtml.withAllVideos,
              ...justForReference(
                files.videoHtml.withInfo,
                files.videoComponent.withInput,
                files.appComponent.withVideoService,
                files.videoService.injectable,
                files.videoItem.initial,
                files.api.initial,
                files.bootstrap.withTemplateLoader
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
            name: 'Intro',
            path: '1-bootstrap/intro',
            description: `
          <h1>Let's try  using custom events!</h1>
          <p>We'll add a thumbs component which will emit 'onThumbs' event.  </p>
          <p>Then in the video component we're going to listed to the event and change the amount of like accordingly.</p>
              
            <div class = "inBrowser">
              <div class="smaller">   
                <div>
                  <h2>Cute kitten</h2>
                  <img ng-reflect-src="/assets/images/kitten1.jpg" src="/assets/images/kitten1.jpg">
                  <div>Date 2016-11-25</div>
                  <div>Views 100</div>
                  <div>Likes 20</div>
                  <div>Description todo</div>
                  <button>[Thumbs Up]</button> <button>[Thumbs Down]</button>
                </div>
              </div>
            </div>          
        `,
            fileTemplates: [],
            tests: [],
            messageNext: `I'm a ready, let's start!`
          },
          {
            name: 'Create ThumbsComponent',
            description: `<p>Let's try some custom events now. </p>
            <p>We'll create a thumbs component which will send thumbsUp/thumbsDown event </p>
  `,
            path: '4-z-custom-events/0-add-thumb-component',
            solutions: [
              files.thumbsHtml.solved,
              files.thumbsComponent.solved,
            ],
            fileTemplates: [
              files.thumbsHtml.initial,
              files.thumbsComponent.initial,
              ...justForReference(
                files.api.initial,
                files.appModule.thumbs,
                files.bootstrap.withTemplateLoader,
              ),
              testFile(),
              ...hidden({
                  filename: 'index.html',
                  code: '<my-thumbs></my-thumbs>'
                },
              )
            ],
            tests: []
          },
          {
            name: 'Use ThumbsComponent',
            description: `Use VideoComponent in the app.`,
            path: '4-z-custom-events/1-use-thumb-component',
            solutions: [
              files.appModule.withThumbsComponent,
              files.videoHtml.withThumbs,
              files.videoComponent.withThumbsEventHandled
            ],
            fileTemplates: [
              files.videoHtml.withInfo,
              files.videoComponent.withThumbsInjected,
              files.appModule.withThumbsInjected,
              ...justForReference(
                files.thumbsHtml.solved,
                files.thumbsComponent.solved,
                files.appHtml.withVideoComponent,
                files.appComponent.withVideoService,
                files.videoService.injectable,
                files.videoItem.initial,
                files.api.initial,
                files.bootstrap.withTemplateLoader,
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
            name: 'Intro',
            path: '1-bootstrap/intro',
            description: `
          <h1>Let's project some content!</h1>
          <p>In this milestone we'll create a component called 'TogglePanel'</p>
          <p>It will actually take 2 divs, but only display one at a time. </p>
              
            <div class = "inBrowser">
              <div class="smaller">   
                <div>
                  <h2>Cute kitten</h2>
                  <img ng-reflect-src="/assets/images/kitten1.jpg" src="/assets/images/kitten1.jpg">            
                  <div>This is the description. Once you click 'show meta' button it will be gone.  (please don't try clicking it here, I'm just a screenshot)</div>
                  <div>[Show meta]</div>
                  <button>[Thumbs Up]</button> <button>[Thumbs Down]</button>
                </div>
              </div>
            </div>               
              
            <p>So when you click the 'Show meta button', description is gone, likes and views are displayed instead.</p>
              
            <div class = "inBrowser">
              <div class="smaller">   
                <div>
                  <h2>Cute kitten</h2>
                  <img ng-reflect-src="/assets/images/kitten1.jpg" src="/assets/images/kitten1.jpg">            
                  <div>Likes: 1000</div>
                  <div>Views: 1000000</div>
                  <div>[Show description]</div>
                  <button>[Thumbs Up]</button> <button>[Thumbs Down]</button>
                </div>
              </div>
            </div>          
        `,
            fileTemplates: [],
            tests: [],
            messageNext: `I'm a ready, let's start!`


          },
          {
            // TODO: See if we can maybe bootstrap only video component, not the whole app for this one.
            name: 'Add TogglePanelComponent',
            description: `Let's create a component which will use content projection to toggle between description and meta information. `,
            path: '5-content-projection/0-add-toggle-panel-component',
            solutions: [
              files.togglePanelHtml.solved,
              files.togglePanelComponent.solved,
            ],
            fileTemplates: [
              files.togglePanelHtml.initial,
              files.togglePanelComponent.initial,
              files.wrapperComponent.initial,
              files.appModule.wrapper,
              {
                filename: 'index.html',
                code: '<my-wrapper></my-wrapper>'
              },
              files.bootstrap.withTemplateLoader,
              testFile()
            ],
            tests: []
          },
          {
            name: 'Use TogglePanelComponent',
            description: `Now let's use the component.`,
            path: '5-content-projection/1-use-toggle-panel',
            solutions: [
              files.appModule.withTogglePanel,
              files.videoHtml.withTogglePanel
            ],
            fileTemplates: [
              files.appModule.withTogglePanelInjected,
              files.videoHtml.withInfo,
              ...justForReference(
                files.videoComponent.withInput,
                files.togglePanelHtml.solved,
                files.togglePanelComponent.solved,
                files.appHtml.withVideoComponent,
                files.appComponent.withVideoService,
                files.videoService.injectable,
                files.videoItem.initial,
                files.api.initial,
                files.thumbsHtml.solved,
                files.thumbsComponent.solved,
                files.bootstrap.withTemplateLoader,
              ),
              testFile()
            ],
            tests: []
          }]
      },
      {
        name: 'Parent-container',
        selectedExerciseIndex: 0,
        exercises: [{
          name: 'Intro',
          path: '1-bootstrap/intro',
          description: `
          <h1>Let's inject parent component!</h1>
          <p>In this milestone we'll create create a ContextAdComponent. </p>
          <p>This component will not use inputs. Instead it will require parent (Video) component and directly look at it's properties. </p>
          <p>It will display different text depending of if there's a word 'music' in the description. </p>
              
            <div class = "inBrowser">
              <div class="smaller">   
                <div>
                  <h2>Cute kitten dancing</h2>
                  <img ng-reflect-src="/assets/images/kitten1.jpg" src="/assets/images/kitten1.jpg">            
                  <div>Decription: music</div>
                  <div>[Show meta]</div>
                  <button>[Thumbs Up]</button> <button>[Thumbs Down]</button>
                  <div>Context ad: Turn up your speakers</div>                  
                </div>
                <div>
                  <h2>Cute kitten sleeping</h2>
                  <img ng-reflect-src="/assets/images/kitten1.jpg" src="/assets/images/kitten1.jpg">            
                  <div>Decription: sleeping</div>
                  <div>[Show meta]</div>
                  <button>[Thumbs Up]</button> <button>[Thumbs Down]</button>
                  <div>Context ad: Check out our web site.</div>                  
                </div>
              </div>
            </div>          
                 
             <p>Note, we are actually calling it ContextComponent, because when it was called ContextAdComponent, adblock blocked it, and I spent 2 hours debugging. </p>
              
                   
        `,
          fileTemplates: [],
          tests: [],
          messageNext: `I'm a ready, let's start!`


        },
          {
            name: 'Inject parent component',
            description: `<p>Create a Context(Ad)Component</p>
            <p>which will inject it's parent component, see what thedescription, and display the value accordingly.</p>
            <p>Note: We had to get rid of the 'Ad' part of the component, because AdBlock blocked the template.</p>`,
            path: '6-children',
            solutions: [
              files.contextComponent.solved
            ],
            fileTemplates: [
              files.contextComponent.initial,

              {
                filename: 'context.html',
                moduleName: 'context',
                code: '{{text}}'
              },
              ...justForReference(
                files.contextService.initial,
                files.appModule.withContextComponent,
                files.videoHtml.withInfo,
                files.videoComponent.withInput,

                files.togglePanelHtml.solved,
                files.togglePanelComponent.solved,
                files.appHtml.withVideoComponent,
                files.appComponent.withVideoService,
                files.videoService.injectable,
                files.videoItem.initial,
                files.api.initial,
                files.thumbsHtml.solved,
                files.thumbsComponent.solved,
                // files.bootstrap.solved
              ),
              testFile()
              /*
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
               ),*/
              //testFile(),
            ],
            tests: []
          }]
      },
      /*
       {
       name: 'Pipes',
       selectedExerciseIndex: 0,
       exercises: [{
       name: 'Create a pipe',
       description: 'Create a fuzzy pipe, which takes a date in YYYY-MM-DD format, and returns how many days ago this was.',
       path: '7-pipes/0-create-pipe',
       fileTemplates: [
       tsFile('FuzzyPipe', {code: ``}),
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
       },*/
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
  }
  ;

