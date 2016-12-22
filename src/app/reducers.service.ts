import {Injectable} from '@angular/core';
import {AppState} from './codelab-config';
import {ActionTypes} from './action-types.enum';
import {selectedMilestone, selectedExercise} from './state.service';
import {FileConfig} from './file-config';
import {TestInfo} from './test-info';
import {Observable} from 'rxjs/Rx';
import {AngularFire} from 'angularfire2';
import {MonacoConfigService} from './monaco-config.service';
import {AppConfigService} from './app-config.service';
import {ExerciseConfig} from './exercise-config';

@Injectable()
export class ReducersService {
  [ActionTypes.INIT_STATE](state: AppState) {
    const localState = JSON.parse(localStorage.getItem('state'));
    const actualState = (this.appConfig.config.preserveState && localState) ? localState : state;
    return this[ActionTypes.SELECT_EXERCISE](actualState, {data: selectedMilestone(actualState).selectedExerciseIndex});
  }

  [ActionTypes.TOGGLE_AUTORUN](state: AppState) {
    state.local.autorun = !state.local.autorun;
    return state;
  }

  [ActionTypes.OPEN_FEEDBACK](state: AppState) {
    state.local.page = 'feedback';
    return state;
  }

  [ActionTypes.RUN_CODE](state: AppState) {
    // Runner watches for changes to runId, and reruns the code on update.
    // This is probably not the most intuitive way to do things.
    if (this.appConfig.config.debug) {
      state.local.debugTrackTime = (new Date()).getTime();
      console.log('RUN START');
    }

    state.local.runId++;
    return state;
  }

  [ActionTypes.SET_AUTH](state: AppState, {data}: {data: {}}) {
    state.local.auth = data;
    return state;
  }

  [ActionTypes.SIMULATE_STATE](state: AppState, {data}: {data: AppState}) {
    data.local.auth = state.local.auth;
    return data;
  }

  [ActionTypes.SELECT_MILESTONE](state: AppState, {data}: {data: number}) {
    state.local.page = 'milestone';
    state.codelab.selectedMilestoneIndex = data;
    const nextIndex = selectedMilestone(state).selectedExerciseIndex;
    return this[ActionTypes.SELECT_EXERCISE](state, Object.assign({}, data, {data: nextIndex}));
  }

  [ActionTypes.TOGGLE_FILE](state: AppState, {data}: {data: FileConfig}) {
    const milestone = state.codelab.milestones[state.codelab.selectedMilestoneIndex];
    let exercise = milestone.exercises[milestone.selectedExerciseIndex] as ExerciseConfig;


    exercise.files.forEach((file) => {
      if (file === data) {
        file.collapsed = !file.collapsed;
      }
    });

    return state;
  }

  [ActionTypes.LOAD_ALL_SOLUTIONS](state: AppState) {

    const exercise = selectedExercise(state) as ExerciseConfig;
    return exercise.files.reduce((state, file) => {
      if (file.solution) {

        return this[ActionTypes.UPDATE_CODE](state, {data: {file: file, code: file.solution}})
      }
      return state;
    }, state);
  }

  [ActionTypes.LOAD_SOLUTION](state: AppState, {data}: {data: FileConfig}) {
    const exercise = selectedExercise(state) as ExerciseConfig;

    exercise.files = exercise.files.map((file) => {
      if (file === data) {
        file = Object.assign(file, {code: file.solution});
      }
      return file;
    });

    return state;
  }

  [ActionTypes.UPDATE_CODE](state: AppState, {data}: {data: {file: FileConfig, code: string}}) {
    const exercise = selectedExercise(state) as ExerciseConfig;

    exercise.files.forEach((file) => {
      if (file === data.file) {
        file.code = data.code;
      }
    });

    return state.local.autorun ? this[ActionTypes.RUN_CODE](state) : state;
  }

  [ActionTypes.SET_TEST_LIST](state: AppState, action: {data: Array<string>}) {

    selectedExercise(state).tests = action.data.map(test => ({title: test}));
    return state;
  }

  [ActionTypes.UPDATE_SINGLE_TEST_RESULT](state: AppState, action: {data: TestInfo}) {
    selectedExercise(state).tests.forEach(test => {
      if (test.title === action.data.title) {
        test.pass = action.data.pass;
        test.result = action.data.result;
      }
    });

    if (this.appConfig.config.debug) {
      if (!selectedExercise(state).tests.find(t => t.pass === undefined)) {
        console.log('RUN COMPLETE', (new Date()).getTime() - state.local.debugTrackTime);
      }
    }

    return state;
  }

  [ActionTypes.NEXT_EXERCISE](state: AppState) {
    let milestone = selectedMilestone(state);
    let nextIndex = milestone.selectedExerciseIndex + 1;
    // Check if we still have exercises left in the milestone.
    if (milestone.exercises.length > nextIndex) {
      return this[ActionTypes.SELECT_EXERCISE](state, {data: nextIndex});
    } else {
      // Looks like we're at the end of the milestone, let's move on to the next one!
      let nextMilestoneIndex = state.codelab.selectedMilestoneIndex + 1;
      if (state.codelab.milestones.length > nextMilestoneIndex) {
        return this[ActionTypes.SELECT_MILESTONE](state, {data: nextMilestoneIndex});
      }
    }
    return state;
  }

  [ActionTypes.SEND_FEEDBACK](state: AppState, feedback) {
    if (this.appConfig.config.feedbackEnabled) {
      let items = this.angularFire.database.list('/feedback');
      items.push({
        comment: feedback.data.comment,
        state: JSON.parse(JSON.stringify(state)),
        name: feedback.data.username
      });
      state.local.user = feedback.data.username;
    }
    return state;
  }

  [ActionTypes.SELECT_EXERCISE](state: AppState, {data}: {data: number}): AppState | Observable<AppState> {
    const milestone = selectedMilestone(state);
    milestone.selectedExerciseIndex = data;
    const exercise = selectedExercise(state);

    if (exercise.files) {
      exercise.files.forEach(file => file.code = file.template);
      this.monacoConfig.createFileModels(exercise.files);
    }

    return this[ActionTypes.RUN_CODE](state);
  }

  constructor(protected angularFire: AngularFire,
              protected monacoConfig: MonacoConfigService,
              protected appConfig: AppConfigService) {

  }


}
