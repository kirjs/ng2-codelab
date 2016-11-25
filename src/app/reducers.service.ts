import {Injectable} from '@angular/core';
import {CodelabConfig} from "./codelab-config";
import {ActionTypes} from "./action-types.enum";
import {selectedMilestone, selectedExercise} from "./state.service";
import {FileConfig} from "./file-config";
import {TestInfo} from "./test-info";
import {Http} from "@angular/http";
import {Observable} from "rxjs/Rx";


@Injectable()
export class ReducersService {

  [ActionTypes.INIT_STATE](state: CodelabConfig) {

    let localState;// = JSON.parse(localStorage.getItem('state'));
    return localState ? localState : state;
  }

  [ActionTypes.SELECT_MILESTONE](state: CodelabConfig, {data}: {data: number}) {
    state.selectedMilestoneIndex = data;
    const nextIndex = selectedMilestone(state).selectedExerciseIndex;
    return this[ActionTypes.SELECT_EXERCISE](state, Object.assign({}, data, {data: nextIndex}));
  }

  [ActionTypes.PING](state: CodelabConfig) {
    return state;
  }

  [ActionTypes.UPDATE_CODE](state: CodelabConfig, {data}: {data: {file: FileConfig, code: string}}) {
    const milestone = state.milestones[state.selectedMilestoneIndex];
    let exercise = milestone.exercises[milestone.selectedExerciseIndex];

    exercise.editedFiles.forEach((file) => {
      if (file === data.file) {
        file.code = data.code;
      }
    });

    return state;
  }

  [ActionTypes.SET_TEST_LIST](state: CodelabConfig, action: {data: Array<string>}) {
    selectedExercise(state).tests = action.data.map(test => ({title: test}));
    return state;
  }

  [ActionTypes.UPDATE_SINGLE_TEST_RESULT](state: CodelabConfig, action: {data: TestInfo}) {
    selectedExercise(state).tests.forEach(test => {
      if (test.title === action.data.title) {
        test.pass = action.data.pass;
        test.result = action.data.result;
      }
    });

    return state;
  }

  [ActionTypes.NEXT_EXERCISE](state: CodelabConfig, data) {
    let milestone = selectedMilestone(state);
    let nextIndex = milestone.selectedExerciseIndex + 1;
    // Check if we still have exercises left in the milestone.
    if (milestone.exercises.length > nextIndex) {
      return this[ActionTypes.SELECT_EXERCISE](state, Object.assign({}, data, {data: nextIndex}));
    } else {
      // Looks like we're at the end of the milestone, let's move on to the next one!
      let nextMilestoneIndex = state.selectedMilestoneIndex + 1;
      if (state.milestones.length > nextMilestoneIndex) {
        return this[ActionTypes.SELECT_MILESTONE](state, Object.assign({}, data, {data: nextMilestoneIndex}));
      }
    }
    return state;
  }

  [ActionTypes.SELECT_EXERCISE](state: CodelabConfig, {data}: {data: number}): CodelabConfig | Observable<CodelabConfig> {
    const exerciseConfig = state.milestones[state.selectedMilestoneIndex].exercises[data];
    if (exerciseConfig.editedFiles) {
      state.milestones[state.selectedMilestoneIndex].selectedExerciseIndex = data;
      return state;
    }

    exerciseConfig.editedFiles = [];
    const files = exerciseConfig.fileTemplates.map(file => file.filename)
      .map(file => `exercises/${exerciseConfig.path}/${file}`);


    return Observable.forkJoin(files.map(a => this.http.get(a))).map((responses) => {
      responses.forEach((response: {text: any}, index) => {
        let code = response.text();
        code = code.replace(/\.\/solution\//g, './');
        exerciseConfig.fileTemplates[index].code = code;
        exerciseConfig.fileTemplates[index].moduleName = exerciseConfig.fileTemplates[index].filename.split('.')[0];
        exerciseConfig.editedFiles[index] = Object.assign({}, exerciseConfig.fileTemplates[index]);
        state.milestones[state.selectedMilestoneIndex].selectedExerciseIndex = data;
      });

      return state;
    });
  }

  constructor(private http: Http) {
  }

}
