import {Injectable} from "@angular/core";
import {CodelabConfig} from "./codelab-config";
import {ActionTypes} from "./action-types.enum";
import {selectedMilestone, selectedExercise} from "./state.service";
import {FileConfig} from "./file-config";
import {TestInfo} from "./test-info";
import {Observable} from "rxjs/Rx";
import {AngularFire} from "angularfire2";
import {ExerciseService} from "./exercise.service";

@Injectable()
export class ReducersService {
  [ActionTypes.INIT_STATE](state: CodelabConfig) {
    let localState = JSON.parse(localStorage.getItem('state'));

    return (state.app.preserveState && localState) ? localState : state;
  }

  [ActionTypes.TOGGLE_AUTORUN](state: CodelabConfig) {

    state.autorun = !state.autorun;
    
    return state;
  }  

  [ActionTypes.OPEN_FEEDBACK](state: CodelabConfig) {
    state.page = 'feedback';
    return state;
  }

  [ActionTypes.SET_AUTH](state: CodelabConfig, {data}: {data: {}}) {
    state.auth = data;
    return state;
  }

  [ActionTypes.SIMULATE_STATE](state: CodelabConfig, {data}: {data: CodelabConfig}) {
    data.auth = state.auth;
    return data;
  }


  [ActionTypes.SELECT_MILESTONE](state: CodelabConfig, {data}: {data: number}) {
    state.page = 'milestone';
    state.selectedMilestoneIndex = data;
    const nextIndex = selectedMilestone(state).selectedExerciseIndex;
    return this[ActionTypes.SELECT_EXERCISE](state, Object.assign({}, data, {data: nextIndex}));
  }

  [ActionTypes.PING](state: CodelabConfig) {
    return state;
  }

  [ActionTypes.TOGGLE_FILE](state: CodelabConfig, {data}: {data: FileConfig}) {
    const milestone = state.milestones[state.selectedMilestoneIndex];
    let exercise = milestone.exercises[milestone.selectedExerciseIndex];

    exercise.editedFiles.forEach((file) => {
      if (file === data) {
        file.collapsed = !file.collapsed;
      }
    });

    return state;
  }

  [ActionTypes.LOAD_SOLUTION](state: CodelabConfig, {data}: {data: FileConfig}) {
    const milestone = state.milestones[state.selectedMilestoneIndex];
    let exercise = milestone.exercises[milestone.selectedExerciseIndex];

    exercise.editedFiles = exercise.editedFiles.map((file) => {
      if (file === data) {
        file = Object.assign(file, {code: file.solution});
      }

      return file;
    });

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

  [ActionTypes.SEND_FEEDBACK](state: CodelabConfig, feedback) {
    if (state.app.feedbackEnabled) {
      let items = this.angularFire.database.list('/feedback');
      items.push({
        comment: feedback.data.comment,
        state: JSON.parse(JSON.stringify(state)),
        name: feedback.data.username
      });
      state.user = feedback.data.username;
    }
    return state;
  }

  [ActionTypes.SELECT_EXERCISE](state: CodelabConfig, {data}: {data: number}): CodelabConfig | Observable<CodelabConfig> {
    state.milestones[state.selectedMilestoneIndex].selectedExerciseIndex = data;
    const exerciseConfig = state.milestones[state.selectedMilestoneIndex].exercises[data];
    if (exerciseConfig.editedFiles) {
      return state;
    }


    exerciseConfig.editedFiles = exerciseConfig
      .fileTemplates
      .map((file: FileConfig) => {
        if (!file) {
          console.log(exerciseConfig.fileTemplates);
          debugger
        }
        if (!file.code) {
          file.code = this.exerciseService.fetch(`${exerciseConfig.path}/${file.filename}`);
        }

        if (exerciseConfig.solutions) {
          const solution = exerciseConfig.solutions.find(f => f.filename === file.filename);
          if (solution) {
            file.solution = solution.code;
          }
        }

        return Object.assign({}, file);
      });

    return state;
  }

  constructor(private exerciseService: ExerciseService, private angularFire: AngularFire) {
  }

}
