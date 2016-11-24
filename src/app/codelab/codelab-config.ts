import {CodelabConfig} from "../codelab-config";

function testFile() {
  return {
    filename: 'Test.ts',
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

function appBootstrap(extensions?) {
  return Object.assign(tsFile('AppModule'), {
    filename: 'Bootstrap.ts',
    type: 'ts',
    ui: true,
    bootstrap: true,
  }, extensions)
}


export const codelabConfig: CodelabConfig = {
  name: 'Angular2 codelab',
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
          name: 'Intro to typescript',
          path: 'intro',
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
          path: 'intro',
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
          path: 'intro',
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
          path: 'bootstrap/intro',
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
          path: 'bootstrap/component',
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
          path: 'bootstrap/module',
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
          path: 'bootstrap/bootstrap',
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
      exercises: [{
        name: 'Exercise',
        description: `Let's learn how to use templates.`,
        path: 'templates',
        fileTemplates: [
          htmlFile('video'),
          appBootstrap()
        ],
        tests: []
      }]
    }, {
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
    }]
};

