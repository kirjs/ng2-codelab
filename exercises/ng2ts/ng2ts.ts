import {polyglot} from '../../src/i18n/polyglot';

//  TODO: This should be done using require.context
const preloadedFiles = {
  'app.component.ts': require(`!raw-loader!./app.component.ts`),
  'app.module.ts': require('!raw-loader!./app.module.ts'),
  'app.html': require('!raw-loader!./app.html'),
  'main.ts': require('!raw-loader!./main.ts'),
  'video/video-item.ts': require('!raw-loader!./video/video-item.ts'),
  'api.service.ts': require('!raw-loader!./api.service.ts'),
  'video/video.service.ts': require('!raw-loader!./video/video.service.ts'),
  'video/video.html': require('!raw-loader!./video/video.html'),
  'video/video.component.ts': require('!raw-loader!./video/video.component.ts'),
  'thumbs/thumbs.component.ts': require('!raw-loader!./thumbs/thumbs.component.ts'),
  'thumbs/thumbs.html': require('!raw-loader!./thumbs/thumbs.html'),
  'toggle-panel/toggle-panel.html': require('!raw-loader!./toggle-panel/toggle-panel.html'),
  'toggle-panel/toggle-panel.component.ts': require('!raw-loader!./toggle-panel/toggle-panel.component.ts'),
  'wrapper.component.ts': require('!raw-loader!./wrapper.component.ts'),
  'context/context.component.ts': require('!raw-loader!./context/context.component.ts'),
  'context/context.service.ts': require('!raw-loader!./context/context.service.ts'),
  'context/context.html': require('!raw-loader!./context/context.html'),
  'typescript-intro/Codelab.ts': require('!raw-loader!./typescript-intro/Codelab.ts'),
  'typescript-intro/Main.ts': require('!raw-loader!./typescript-intro/Main.ts'),
  'typescript-intro/Guest.ts': require('!raw-loader!./typescript-intro/Guest.ts'),
  'fuzzy-pipe/fuzzy.pipe.ts': require('!raw-loader!./fuzzy-pipe/fuzzy.pipe.ts'),
  'tests/codelabTest.ts': require('!raw-loader!./tests/codelabTest.ts'),
  'tests/createComponentTest.ts': require('!raw-loader!./tests/createComponentTest.ts'),
  'tests/createModuleTest.ts': require('!raw-loader!./tests/createModuleTest.ts'),
  'tests/bootstrapTest.ts': require('!raw-loader!./tests/bootstrapTest.ts'),
  'tests/templatePageSetupTest.ts': require('!raw-loader!./tests/templatePageSetupTest.ts'),
  'tests/templateAddActionTest.ts': require('!raw-loader!./tests/templateAddActionTest.ts'),
  'tests/templateAllVideosTest.ts': require('!raw-loader!./tests/templateAllVideosTest.ts'),
  'tests/diInjectServiceTest.ts': require('!raw-loader!./tests/diInjectServiceTest.ts'),
  'tests/videoComponentCreateTest.ts': require('!raw-loader!./tests/videoComponentCreateTest.ts'),
  'tests/videoComponentUseTest.ts': require('!raw-loader!./tests/videoComponentUseTest.ts'),
  'tests/ThumbsComponentCreateTest.ts': require('!raw-loader!./tests/ThumbsComponentCreateTest.ts'),
  'tests/ThumbsComponentUseTest.ts': require('!raw-loader!./tests/ThumbsComponentUseTest.ts'),
  'tests/togglePanelComponentCreateTest.ts': require('!raw-loader!./tests/togglePanelComponentCreateTest.ts'),
  'tests/togglePanelComponentUseTest.ts': require('!raw-loader!./tests/togglePanelComponentUseTest.ts'),
  'tests/contextComponentUseTest.ts': require('!raw-loader!./tests/contextComponentUseTest.ts'),
  'tests/fuzzyPipeCreateTest.ts': require('!raw-loader!./tests/fuzzyPipeCreateTest.ts'),
  'tests/fuzzyPipeUseTest.ts': require('!raw-loader!./tests/fuzzyPipeUseTest.ts'),
  'thumbs.app.module.ts': require('!raw-loader!./thumbs.app.module.ts'),
  'toggle-panel.app.module.ts': require('!raw-loader!./toggle-panel.app.module.ts'),
  'index.html': '<my-thumbs></my-thumbs><my-wrapper></my-wrapper>'
};


const files = {
  appComponent: 'app.component.ts',
  appModule: 'app.module.ts',
  appHtml: 'app.html',
  main: 'main.ts',
  video_videoItem: 'video/video-item.ts',
  apiService: 'api.service.ts',
  video_videoService: 'video/video.service.ts',
  video_video_html: 'video/video.html',
  video_video_component: 'video/video.component.ts',
  thumbs_thumbs_component: 'thumbs/thumbs.component.ts',
  thumbs_thumbs_html: 'thumbs/thumbs.html',
  toggle_panel_toggle_panel_html: 'toggle-panel/toggle-panel.html',
  toggle_panel_toggle_panel: 'toggle-panel/toggle-panel.component.ts',
  wrapperComponent: 'wrapper.component.ts',
  contextComponent: 'context/context.component.ts',
  context_context_html: 'context/context.html',
  contextService: 'context/context.service.ts',
  typescript_intro_Codelab_ts: 'typescript-intro/Codelab.ts',
  typescript_intro_Main_ts: 'typescript-intro/Main.ts',
  typescript_intro_Guest_ts: 'typescript-intro/Guest.ts',
  fuzzyPipe_fuzzyPipe: 'fuzzy-pipe/fuzzy.pipe.ts',
  test: 'tests/test.ts',
  indexHtml: 'index.html'
};


const fileOverrides = {
  'app.module.ts': {
    thumbsComponentCreate: 'thumbs.app.module.ts',
    togglePanelComponentCreate: 'toggle-panel.app.module.ts'
  },
  'tests/test.ts': {
    codelab: 'tests/codelabTest.ts',
    createComponent: 'tests/createComponentTest.ts',
    createModule: 'tests/createModuleTest.ts',
    bootstrap: 'tests/bootstrapTest.ts',
    templatePageSetup: 'tests/templatePageSetupTest.ts',
    templateAddAction: 'tests/templateAddActionTest.ts',
    templateAllVideos: 'tests/templateAllVideosTest.ts',
    diInjectService: 'tests/diInjectServiceTest.ts',
    videoComponentCreate: 'tests/videoComponentCreateTest.ts',
    videoComponentUse: 'tests/videoComponentUseTest.ts',
    thumbsComponentCreate: 'tests/ThumbsComponentCreateTest.ts',
    thumbsComponentUse: 'tests/ThumbsComponentUseTest.ts',
    togglePanelComponentCreate: 'tests/togglePanelComponentCreateTest.ts',
    togglePanelComponentUse: 'tests/togglePanelComponentUseTest.ts',
    contextComponentUse: 'tests/contextComponentUseTest.ts',
    fuzzyPipeCreate: 'tests/fuzzyPipeCreateTest.ts',
    fuzzyPipeUse: 'tests/fuzzyPipeUseTest.ts',
  }
};

const stageOverrides = {
  'main.ts': {
    createComponent: 'bootstrapSolved',
    createModule: 'bootstrapSolved',
  },
  'app.module.ts': {
    createComponent: 'bootstrapSolved'
  }
};


export type stage = 'codelab'|
  'createComponent'|
  'createModule'|
  'bootstrap'|
  'templatePageSetup'|
  'templateAddAction'|
  'templateAllVideos'|
  'diInjectService'|
  'dataBinding'|
  'videoComponentCreate'|
  'videoComponentUse'|
  'thumbsComponentCreate'|
  'thumbsComponentUse'|
  'togglePanelComponentCreate'|
  'togglePanelComponentUse'|
  'contextComponentUse'|
  'fuzzyPipeCreate'|
  'fuzzyPipeUse'|
  'neverShow';

const stages: stage[] = [
  'codelab',
  'createComponent',
  'createModule',
  'bootstrap',
  'templatePageSetup',
  'templateAddAction',
  'templateAllVideos',
  'diInjectService',
  'dataBinding',
  'videoComponentCreate',
  'videoComponentUse',
  'thumbsComponentCreate',
  'thumbsComponentUse',
  'togglePanelComponentCreate',
  'togglePanelComponentUse',
  'contextComponentUse',
  'fuzzyPipeCreate',
  'fuzzyPipeUse',
  'neverShow'
];

export interface CodelabConfigTemplate {
  name: string;
  files: {[key: string]: string},
  preloadedFiles: {[key: string]: string},
  overrides: {
    file: {[key: string]: {[key: string]: string}},
    stage: {[key: string]: {[key: string]: string}},
  },
  stages: stage[],
  milestones: MilestoneConfigTemplate[]
}

export interface SlideTemplate {
  slide: true,
  name: string,
  description: string
}

export interface ExerciseConfigTemplate {
  slide?: false,
  name: string,
  skipTests?: boolean,
  description: string,
  runner?: string,
  stage: string,
  files: {
    exercise?: string[]
    reference?: string[]
    hidden?: string[]
    bootstrap?: string[],
    test?: string[]
  }
}

export interface MilestoneConfigTemplate {
  name: string,
  exercises: Array<ExerciseConfigTemplate|SlideTemplate>
}

export const ng2tsConfig: CodelabConfigTemplate = {
  name: 'Angular 101 Codelab (beta)',
  files,
  preloadedFiles,
  overrides: {
    file: fileOverrides,
    stage: stageOverrides
  },
  stages: stages,
  milestones: [
    {
      name: 'Intro to TypeScript',
      exercises: [
        {
          name: polyglot.t(`Intro`),
          slide: true,
          description: `
          <h1>${polyglot.t('Angular/TypeScript CodeLab!')}</h1>
          <p>${polyglot.t(`In this codelab we're going to learn the basics of TypeScript and Angular.`)}</p>
          <p>${polyglot.t(`This is a beta version of the codelab with limited access, please don't share it publically (yet).`)}</p>
          <p>${polyglot.t(`This codelab is very new and only covers the basics of Angular. Please leave your feedback (in the end) and come back for more advanced exercises later.`)}</p>
          <p>${polyglot.t(`We're using Angular version 2.3.0`)}</p>
          <p>${polyglot.t(`The slides for the codelab are available using
          <a href = "https://docs.google.com/presentation/d/1Wh4ZwTKG1h66f3mTD4GQO8rKwGDEJeBSvUDJ3udU1LA/edit?usp=sharing">here</a>.`)}</p>                 
        `
        },
        {
          name: polyglot.t(`TypeScript`),
          stage: `codelab`,
          runner: 'TypeScript',
          description: `
          <p>${polyglot.t(`We created a TypeScript file for you, now let's add our first TS class
           called Codelab.`)}</p>

          <p>${polyglot.t(`It will take a list of guests, and will have a 'getGuestsComing' method, which will only return people who're coming.`)}</p>
          <p>${polyglot.t(`As you can see in the 'Main.ts' file we have 4 people signed up, but Charles Darwin had a last minute change of plans,
          so only 3 people should be returned.`)}</p>
        `,
          runner: 'typescript',
          files: {
            exercise: [
              files.typescript_intro_Codelab_ts,
              files.typescript_intro_Guest_ts,
              files.typescript_intro_Main_ts
            ],
            test: [files.test],
            bootstrap: [
              files.typescript_intro_Main_ts
            ]
          },
        }
      ]
    },
    {
      name: polyglot.t(`Bootstrapping your app`),

      exercises: [
        {
          name: polyglot.t(`Intro`),
          slide: true,
          description: `
          <h1>${polyglot.t(`Let's build our first Angular app!`)}</h1>
          <p>${polyglot.t(`This is how it will look:`)}</p>

          <div class = "inBrowser">
            <div class="smaller">
              <h1>Hello CatTube!</h1>
            </div>
          </div>
          <p>${polyglot.t(`3 simple steps:`)}</p>
          <ol>
            <li>${polyglot.t(`Create a Component`)}</li>
            <li>${polyglot.t(`Create a NgModule`)}</li>
            <li>${polyglot.t(`Bootstrap the NgModule`)}</li>
          </ol>
        `
        },
        {
          name: polyglot.t(`Create a component`),
          stage: `createComponent`,
          description: `<p>${polyglot.t(`Let's create our first component!`)}</p>`,
          files: {
            exercise: [files.appComponent],
            reference: [files.appModule, files.main],
            bootstrap: [files.main],
            test: [files.test],
          }
        },
        {
          name: polyglot.t(`Create a NgModule`),
          stage: `createModule`,
          description: polyglot.t(`Now we got the component, we need to pass it to a NgModule.`),
          files: {
            exercise: [files.appModule],
            reference: [files.appComponent],
            hidden: [files.main],
            test: [files.test],
            bootstrap: [files.main]
          }
        },
        {
          name: polyglot.t(`Bootstrap the module`),
          skipTests: true,
          stage: `bootstrap`,
          description: `
          <p>${polyglot.t(`Now we got both NgModule and component ready, let's bootstrap the app!`)}</p>
          <p>${polyglot.t(`There's no  simple way to test it,  make sure your app displays: 'Hello CatTube!'`)}</p>`,
          files: {
            exercise: [files.main],
            reference: [files.appComponent, files.appModule],
            test: [files.test],
            bootstrap: [files.main]
          }
        }
      ]
    },
    {
      name: polyglot.t(`Templates`),
      exercises: [
        {
          name: polyglot.t(`Intro`),
          slide: true,
          description: `
          <h1>${polyglot.t(`Exploring Angular templates!`)}</h1>
          <p>${polyglot.t(`As a result we'll see our cats displayed.`)}</p>

          <div class = "inBrowser">
            <div class="smaller">
              <my-app><div>
                <h1>${polyglot.t(`CatTube`)}</h1>
                <button>${polyglot.t(`Search!`)}</button>
                <div>
                  <h2>${polyglot.t(`Cute kitten`)}</h2>
                  <img src="/assets/images/cat-0.png">
                </div><div>
                  <h2>${polyglot.t(`Kitten on the tree`)}</h2>
                  <img src="/assets/images/cat-1.jpg">
                </div><div>
                  <h2>${polyglot.t(`Serouis cat`)}</h2>
                  <img src="/assets/images/cat-2.jpg">
                </div>
              </div></my-app>
            </div>
          </div>
        `
        },
        {
          name: polyglot.t(`Set up the page`),
          description: polyglot.t(`Setup a header, a search box, and a search button in the app component!`),
          stage: `templatePageSetup`,
          files: {
            exercise: [files.appHtml],
            reference: [files.appComponent, files.appModule, files.main],
            test: [files.test],
            bootstrap: [files.main]
          }
        }, {
          name: polyglot.t(`Add some action`),
          description: `
              <ul>
                 <li>${polyglot.t(`Add a search method to the AppComponent`)}</li>
                 <li>${polyglot.t(`Display a message when there are no videos.`)}</li>
               </ul>
            `,
          stage: `templateAddAction`,
          files: {
            exercise: [files.appComponent, files.appHtml],
            reference: [files.appModule, files.main, files.video_videoItem],
            test: [files.test],
            bootstrap: [files.main],
          }
        },
        {
          name: polyglot.t(`Display all videos`),
          description: polyglot.t(`Finally let's iterate over the videos.`),
          stage: `templateAllVideos`,
          files: {
            exercise: [files.appComponent, files.appHtml],
            reference: [files.appModule, files.main, files.video_videoItem],
            test: [files.test],
            bootstrap: [files.main]
          }
        }
      ]
    },
    {
      name: polyglot.t(`Dependency Injection`),
      exercises: [{
        name: polyglot.t(`Intro`),
        slide: true,
        description: `
          <h1>${polyglot.t(`Let's inject a service.`)}</h1>
          <p>${polyglot.t(`Using a service is way better than hardcoded data. As a result we get even more cats.`)}</p>

          <div class = "inBrowser">
            <div class="smaller">
              <my-app><div>
                <h1>${polyglot.t(`CatTube`)}</h1>
                <input placeholder="video" type="text">
                <button>${polyglot.t(`Search!`)}</button>
                <div>
                  <h2>${polyglot.t(`Cute kitten`)}</h2>
                  <img src="/assets/images/cat-0.png">
                </div><div>
                  <h2>${polyglot.t(`Kitten on the tree`)}</h2>
                  <img src="/assets/images/cat-1.jpg">
                </div><div>
                  <h2>${polyglot.t(`More kitten`)}</h2>
                  <img src="/assets/images/cat-2.jpg">
                </div><div>
                  <h2>${polyglot.t(`Another kitten`)}</h2>
                  <img src="/assets/images/cat-3.jpg">
                </div><div>
                  <h2>${polyglot.t(`Serouis cat`)}</h2>
                  <img src="/assets/images/cat-4.jpg">
                </div><div>
                  <h2>${polyglot.t(`Serouis cat`)}</h2>
                  <img  src="/assets/images/cat-5.jpg">
                </div><div>
                  <h2>${polyglot.t(`Serouis cat`)}</h2>
                  <img  src="/assets/images/cat-6.jpg">
                </div>
              </div></my-app>
            </div>
          </div>
        `,
      }, {
        name: polyglot.t(`Service injection`),
        stage: `diInjectService`,
        description: polyglot.t(`Fetch the videos using a service, instead of having them hardcoded.`),
        files: {
          exercise: [files.video_videoService, files.appModule, files.appComponent],
          reference: [files.appHtml, files.apiService, files.video_videoItem, files.main],
          test: [files.test],
          bootstrap: [files.main]
        }
      }]
    },
    {
      name: polyglot.t(`Component Tree`),
      exercises: [
        {
          name: polyglot.t(`Intro`),
          slide: true,
          description: `
          <h1>${polyglot.t(`Create a Video component!`)}</h1>
          <p>${polyglot.t(`Create a separate component with the video information.`)}</p>
          <p>${polyglot.t(`Add description, amount of views and likes.`)}</p>

            <div class = "inBrowser">
              <div class="smaller">
                <div>
                  <h2>${polyglot.t(`Cute kitten`)}</h2>
                  <img src="/assets/images/cat-0.png">
                  <div>${polyglot.t(`Date 2016-11-25`)}</div>
                  <div>${polyglot.t(`Views 100`)}</div>
                  <div>${polyglot.t(`Likes 20`)}</div>
                  <div>${polyglot.t(`Description todo`)}</div>
                </div>
              </div>
            </div>
        `,
        },
        {
          name: polyglot.t(`Create VideoComponent`),
          description: polyglot.t(`Create a video component.`),
          stage: `videoComponentCreate`,
          files: {
            exercise: [files.video_video_component, files.video_video_html],
            reference: [
              files.appModule,
              files.video_videoService, files.appHtml,
              files.appComponent, files.video_videoItem,
              files.apiService, files.main
            ],
            test: [files.test],
            bootstrap: [files.main]
          }
        },
        {
          name: polyglot.t(`Use VideoComponent`),
          description: polyglot.t(`Use the VideoComponent in the app.`),
          stage: `videoComponentUse`,
          files: {
            exercise: [files.appModule, files.appHtml,],
            reference: [
              files.video_video_html,
              files.video_video_component, files.appComponent, files.video_videoService, files.video_videoItem, files.apiService, files.main
            ],
            test: [files.test],
            bootstrap: [files.main]
          }
        }]
    }, {
      name: polyglot.t(`Custom events`),
      exercises: [
        {
          name: polyglot.t(`Intro`),
          slide: true,
          description: `
          <h1>${polyglot.t(`Let's use custom events!`)}</h1>
          <p>${polyglot.t(`Add a ThumbsComponent which will emit an 'onThumbs' event.`)}</p>
          <p>${polyglot.t(`In the video component listen to the event and change the amount of likes accordingly.`)}</p>

            <div class = "inBrowser">
              <div class="smaller">
                <div>
                  <h2>${polyglot.t(`Cute kitten`)}</h2>
                  <img src="/assets/images/cat-0.png">
                  <div>${polyglot.t(`Date 2016-11-25`)}</div>
                  <div>${polyglot.t(`Views 100`)}</div>
                  <div>${polyglot.t(`Likes 20`)}</div>
                  <div>${polyglot.t(`Description todo`)}</div>
                  <button>${polyglot.t(`Thumbs Up`)}</button> <button>${polyglot.t(`Thumbs Down`)}</button>
                </div>
              </div>
            </div>
        `,
        },
        {
          name: polyglot.t(`Create ThumbsComponent`),
          description: polyglot.t(`Create ThumbsComponent.`),
          stage: `thumbsComponentCreate`,
          files: {
            exercise: [files.thumbs_thumbs_component, files.thumbs_thumbs_html],
            reference: [files.apiService, files.appModule, files.main, files.indexHtml],
            test: [files.test],
            bootstrap: [files.main]
          }
        },
        {
          name: polyglot.t(`Use ThumbsComponent`),
          description: polyglot.t(`Use the 'ThumbsComponent' in the app.`),
          stage: `thumbsComponentUse`,
          files: {
            exercise: [files.video_video_component, files.video_video_html, files.appModule,],
            reference: [
              files.thumbs_thumbs_component, files.thumbs_thumbs_html, files.appHtml, files.appComponent, files.video_videoService, files.video_videoItem, files.apiService, files.main
            ],
            test: [files.test],
            bootstrap: [files.main]
          }
        }]
    }, {
      name: polyglot.t(`Content projection`),
      exercises: [
        {
          name: polyglot.t(`Intro`),
          slide: true,
          description: `
          <h1>${polyglot.t(`Let's project some content!`)}</h1>
          <p>${polyglot.t(`In this milestone we'll create a component called 'TogglePanel'`)}</p>
          <p>${polyglot.t(`It will actually take 2 divs, but only display one at a time.`)}</p>

            <div class = "inBrowser">
              <div class="smaller">
                <div>
                  <h2>${polyglot.t(`Cute kitten`)}</h2>
                  <img src="/assets/images/cat-0.png">
                  <div>${polyglot.t(`This is the description. Once you click 'show meta' button it will be gone.  (please don't try clicking it here, I'm just a screenshot)`)}</div>
                  <div>${polyglot.t(`Show meta`)}</div>
                  <button>${polyglot.t(`Thumbs Up`)}</button> <button>${polyglot.t(`Thumbs Down`)}</button>
                </div>
              </div>
            </div>

            <p>${polyglot.t(`So when you click the 'Show meta button', description is gone, likes and views are displayed instead.`)}</p>

            <div class = "inBrowser">
              <div class="smaller">
                <div>
                 <h2>${polyglot.t(`Cute kitten`)}</h2>
                 <img  src="/assets/images/cat-0.png">
                 <div>${polyglot.t(`Views 100`)}</div>
                 <div>${polyglot.t(`Likes 20`)}</div>
                 <div>${polyglot.t(`Show description`)}</div>
                 <button>${polyglot.t(`Thumbs Up`)}</button> <button>${polyglot.t(`Thumbs Down`)}</button>
                </div>
              </div>
            </div>
        `
        },
        {
          name: polyglot.t(`Add TogglePanelComponent`),
          description: polyglot.t(`Let's create a component which will use content projection to toggle between description and meta information. `),
          stage: `togglePanelComponentCreate`,
          files: {
            exercise: [files.toggle_panel_toggle_panel, files.toggle_panel_toggle_panel_html],
            reference: [files.wrapperComponent, files.apiService, files.appModule, files.main, files.indexHtml],
            test: [files.test],
            bootstrap: [files.main]
          }
        },
        {
          name: polyglot.t(`Use TogglePanelComponent`),
          description: polyglot.t(`Now let's use the component.`),
          stage: `togglePanelComponentUse`,
          files: {
            exercise: [files.video_video_html, files.appModule],
            reference: [
              files.video_video_component,
              files.toggle_panel_toggle_panel,
              files.toggle_panel_toggle_panel_html,
              files.thumbs_thumbs_component,
              files.thumbs_thumbs_html,
              files.appHtml,
              files.appComponent,
              files.video_videoService,
              files.video_videoItem,
              files.apiService,
              files.main
            ],
            test: [files.test],
            bootstrap: [files.main]
          }
        }]
    },
    /*
     {
     name: polyglot.t(`Parent-container`),
     exercises: [{
     name: polyglot.t(`Intro`),
     slide: true,
     description: polyglot.t(`
     <h1>Let's inject parent component!</h1>
     <p>In this milestone we'll create create a ContextAdComponent. </p>
     <p>This component will not use inputs. Instead it will require parent (Video) component and directly look at it's properties. </p>
     <p>It will display different text depending of if there's a word 'music' in the description. </p>

     <div class = "inBrowser">
     <div class="smaller">
     <div>
     <h2>Cute kitten dancing</h2>
     <img  src="/assets/images/cat-0.png">
     <div>Decription: music</div>
     <button>Show meta</button>
     <button>Thumbs Up</button> <button>Thumbs Down</button>
     <div>Context ad: Turn up your speakers</div>
     </div>
     <div>
     <h2>Cute kitten sleeping</h2>
     <img  src="/assets/images/cat-0.png">
     <div>Decription: sleeping</div>
     <button>Show meta</button>
     <button>Thumbs Up</button> <button>Thumbs Down</button>
     <div>Context ad: Check out our web site.</div>
     </div>
     </div>
     </div>

     <p>Note, we are actually calling it ContextComponent, because when it was called ContextAdComponent, adblock blocked it, and I spent 2 hours debugging. </p>


     `),
     },
     {
     name: polyglot.t(`Inject parent component`),
     description: polyglot.t(`<p>Create a Context(Ad)Component</p>
     <p>Which will inject it's parent component, see what thedescription, and display the value accordingly.</p>
     <p>Note: We had to get rid of the 'Ad' part of the component, because AdBlock blocked the template.</p>`),
     stage: `contextComponentUse`,
     files: {
     exercise: [files.contextComponent, files.context_context_html],
     reference: [

     files.contextService,
     files.video_video_html,
     files.appModule,
     files.video_video_component,
     files.toggle_panel_toggle_panel,
     files.toggle_panel_toggle_panel_html,
     files.thumbs_thumbs_component,
     files.thumbs_thumbs_html,
     files.appHtml,
     files.appComponent,
     files.video_videoService,
     files.video_videoItem,
     files.apiService,
     files.main
     ],
     test: [files.test],
     bootstrap: [files.main]
     },
     }]
     },
     */
    {
      name: polyglot.t(`Pipes (bonus)`),
      exercises: [{
        name: polyglot.t(`Create a pipe`),
        description: polyglot.t(`Create a fuzzy pipe, which takes a date in YYYY-MM-DD format, and returns how many days ago this was.`),
        stage: `fuzzyPipeCreate`,
        files: {
          exercise: [files.fuzzyPipe_fuzzyPipe],
          test: [files.test],
          bootstrap: [files.main]
        }
      }, {

        name: polyglot.t(`Use the pipe`),
        stage: `fuzzyPipeUse`,
        description: polyglot.t(`Now include the app in the module and use in the app.`),
        files: {
          exercise: [files.appModule, files.video_video_html],
          reference: [files.fuzzyPipe_fuzzyPipe,
            files.contextService,
            files.contextComponent,
            files.context_context_html,
            files.video_video_component,
            files.toggle_panel_toggle_panel,
            files.toggle_panel_toggle_panel_html,
            files.thumbs_thumbs_component,
            files.thumbs_thumbs_html,
            files.appHtml,
            files.appComponent,
            files.video_videoService,
            files.video_videoItem,
            files.apiService,
            files.main
          ],
          test: [files.test],
          bootstrap: [files.main]
        }
      }]
    },
    {
      name: polyglot.t(`Survey`),
      exercises: [{
        slide: true,
        name: polyglot.t(`All done!`),
        description: `
        <h1>${polyglot.t('This is it for now!')}</h1>
        <p>${polyglot.t(`This codelab is really new. We're working on adding more advanced and fun exercises. `)}
        <p>${polyglot.t('Meanwhile please fill out <a href = "https://docs.google.com/forms/d/1lGPvmCftArLXVuJkO6L7sXZiqIDj-DtiPM0MQJXLJTA/edit">The survey</a>. This would help us to improve!')}
        <p>${polyglot.t('This codelab is written in Angular! <a href = "https://github.com/kirjs/ng2-codelab">Check out the code at this git repo</a>')}
        <p>${polyglot.t('If you want to learn more about angular check out <a href = "https://angular.io/">angular.io</a>')}
        `
      }]
    }
  ]
};
