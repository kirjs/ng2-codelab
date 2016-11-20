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

function appComponent(extensions?) {
  return Object.assign({filename: 'AppComponent.ts', type: 'ts'}, extensions)
}

function appModule(extensions?) {
  return Object.assign({filename: 'AppModule.ts', type: 'ts'}, extensions)
}

function appBootstrap(extensions?) {
  return Object.assign({filename: 'Bootstrap.ts', type: 'ts', ui: true, bootstrap: true,}, extensions)
}


export const codelabConfig: CodelabConfig = {
  name: 'Angular2 codelab',
  selectedMilestoneIndex: 0,
  milestones: [{
    name: 'Bootstrapping your app',
    selectedExerciseIndex: 0,
    exercises: [
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
        description: `Now we got module and component ready, let's bootstrap it!`,
        fileTemplates: [
          appBootstrap({ui: false}),
          appModule({readonly: true}),
          appComponent({readonly: true}),
          testFile()
        ]
      },

    ]
  }, {
    selectedExerciseIndex: 0,
    name: 'Templates',
    exercises: []
  }]
};
