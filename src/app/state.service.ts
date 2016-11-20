import {Injectable} from '@angular/core';
import {Http} from "@angular/http";
import {Observable, Subject} from "rxjs/Rx";
import {CodelabConfig} from "./codelab-config";
import {ActionInit} from "./action-init";
import {Action} from "./action";
import {codelabConfig} from "./codelab/codelab-config";
import {ActionTypes} from "./action-types.enum";
import {FileConfig} from "./file-config";
import {TestInfo} from "./test-info";
import {ExerciseConfig} from "./exercise-config";
import {MilestoneConfig} from "./milestone-config";

export function selectedMilestone(state: CodelabConfig): MilestoneConfig {
  return state.milestones[state.selectedMilestoneIndex];
}
export function selectedExercise(state: CodelabConfig): ExerciseConfig {
  const milestone = selectedMilestone(state);
  return milestone.exercises[milestone.selectedExerciseIndex];
}

export function exerciseComplete(exercise: ExerciseConfig){
  return exercise.tests && exercise.tests.every(test => test.pass);
}


const actions: {[key: string]: (state: CodelabConfig, action: ActionInit)=>any} = {
  [ActionTypes.INIT_STATE](state: CodelabConfig){
    let localState = JSON.parse(localStorage.getItem('state'));
    return localState ? localState : state;
  },
  [ActionTypes.SELECT_MILESTONE](state: CodelabConfig, {data}: {data: number}){
    state.selectedMilestoneIndex = data;
    return state;
  },
  [ActionTypes.UPDATE_CODE](state: CodelabConfig, {data}: {data: {file: FileConfig, code: string}}){
    const milestone = state.milestones[state.selectedMilestoneIndex];
    let exercise = milestone.exercises[milestone.selectedExerciseIndex];

    exercise.editedFiles.forEach((file) => {
      if (file === data.file) {
        file.code = data.code;
      }
    });

    return state;
  },

  [ActionTypes.SET_TEST_LIST](state: CodelabConfig, action: {data: Array<string>}){
    selectedExercise(state).tests = action.data.map(test => ({title: test}));
    return state;
  },
  [ActionTypes.UPDATE_SINGLE_TEST_RESULT](state: CodelabConfig, action: {data: TestInfo}){
    selectedExercise(state).tests.forEach(test => {
      if (test.title === action.data.title) {
        test.pass = action.data.pass;
        test.result = action.data.result;
      }
    });

    return state;
  },

  [ActionTypes.NEXT_EXERCISE](state: CodelabConfig, data){
    let milestone = selectedMilestone(state);
    let nextIndex = milestone.selectedExerciseIndex + 1;
    if (milestone.exercises.length > nextIndex) {
      return this[ActionTypes.SELECT_EXERCISE](state, Object.assign({}, data, {data: nextIndex}));
    }
    return state;
  },
  [ActionTypes.SELECT_EXERCISE](state: CodelabConfig, {data, providers: {http}}: {data: number, providers: {http: Http}}){
    const exerciseConfig = state.milestones[state.selectedMilestoneIndex].exercises[data];


    if (exerciseConfig.editedFiles) {
      state.milestones[state.selectedMilestoneIndex].selectedExerciseIndex = data;
      return state;
    }

    exerciseConfig.editedFiles = [];
    const files = exerciseConfig.fileTemplates.map(file => file.filename)
      .map(file => `exercises/${exerciseConfig.path}/${file}`);

    return Observable.forkJoin(files.map(a => http.get(a))).map((responses) => {
      responses.forEach((response: {text: any}, index) => {
        exerciseConfig.fileTemplates[index].code = response.text();
        exerciseConfig.fileTemplates[index].moduleName = exerciseConfig.fileTemplates[index].filename.replace('.ts', '');
        exerciseConfig.editedFiles[index] = Object.assign({}, exerciseConfig.fileTemplates[index]);
        state.milestones[state.selectedMilestoneIndex].selectedExerciseIndex = data;
      });

      return state;
    });
  },
};


@Injectable()
export class StateService {
  public readonly update: Observable<CodelabConfig>;
  private readonly dispatch = new Subject();

  constructor(private http: Http) {
    this.update = this.dispatch
      .mergeScan<CodelabConfig>((state: CodelabConfig, action: Action): any => {
        if (actions[action.type]) {
          const result = actions[action.type](state, action);
          return result instanceof Observable ? result : Observable.of(result);
        }
        return state;
      }, codelabConfig)
      .map((state: CodelabConfig) => {
        localStorage.setItem('state', JSON.stringify(state));
        return state;
      })
      .share();

    this.update.subscribe(() => {
      console.log('next');
    }, (error) => {
      debugger
    });
  }

  private dispatchAction(actionType: ActionTypes, data?) {
    this.dispatch.next({
        type: actionType,
        data: data === undefined ? {} : data,
        providers: {
          http: this.http
        }
      },
    );
  }

  selectMilestone(index: number) {
    this.dispatchAction(ActionTypes.SELECT_MILESTONE, index);
  }

  selectExercise(index: number) {
    this.dispatchAction(ActionTypes.SELECT_EXERCISE, index);
  }

  nextExercise() {
    this.dispatchAction(ActionTypes.NEXT_EXERCISE);
  }

  init() {
    this.dispatchAction(ActionTypes.INIT_STATE);
  }

  updateCode(changes) {
    this.dispatchAction(ActionTypes.UPDATE_CODE, changes);
  }

  setTestList(tests: Array<any>) {
    this.dispatchAction(ActionTypes.SET_TEST_LIST, tests);
  }

  updateSingleTestResult(test: any) {
    this.dispatchAction(ActionTypes.UPDATE_SINGLE_TEST_RESULT, test);
  }
}
