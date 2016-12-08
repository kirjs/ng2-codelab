import {Injectable} from "@angular/core";
import {Observable, BehaviorSubject} from "rxjs/Rx";
import {CodelabConfig} from "./codelab-config";
import {Action} from "./action";
import {ActionTypes} from "./action-types.enum";
import {ExerciseConfig} from "./exercise-config";
import {MilestoneConfig} from "./milestone-config";
import {ReducersService} from "./reducers.service";
import {assert} from "./utils";
import {FileConfig} from "./file-config";
import {CodelabConfigService} from "../exercises/codelab-config-service";


export function selectedMilestone(state: CodelabConfig): MilestoneConfig {
  return assert(state.milestones[state.selectedMilestoneIndex]);
}
export function selectedExercise(state: CodelabConfig): ExerciseConfig {
  const milestone = selectedMilestone(state);
  return assert(milestone.exercises[milestone.selectedExerciseIndex]);
}

export function exerciseComplete(exercise: ExerciseConfig) {
  return exercise.tests && exercise.tests.every(test => test.pass);
}

@Injectable()
export class StateService {
  public readonly update: Observable<CodelabConfig>;
  private readonly dispatch = new BehaviorSubject<Action>({type: ActionTypes.INIT_STATE, data: {}});


  constructor(private reducers: ReducersService, codelabConfig: CodelabConfigService) {
    this.update = this.dispatch
      .mergeScan<CodelabConfig>((state: CodelabConfig, action: Action): any => {

        try {
          if (reducers[action.type]) {
            const result = this.test(reducers[action.type](state, action), action);

            return result instanceof Observable ? result : Observable.of(result);
          }
          if (!state) {
            debugger
          }
        }
        catch (e) {
          debugger
        }
        return this.test(state, action);
      }, codelabConfig.config)
      .map((state: CodelabConfig) => {
        localStorage.setItem('state', JSON.stringify(state));
        return state;
      })
      .publishReplay(1)
      .refCount();

    this.update.subscribe(() => {
      //console.log('next');
    }, (error) => {
      debugger
    });

  }

  private dispatchAction(actionType: ActionTypes, data?) {
    this.dispatch.next({
        type: actionType,
        data: data === undefined ? {} : data
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

  toggleAutorun() {
    this.dispatchAction(ActionTypes.TOGGLE_AUTORUN);
  }

  openFeedback() {
    this.dispatchAction(ActionTypes.OPEN_FEEDBACK);
  }

  setAuth(auth) {
    this.dispatchAction(ActionTypes.SET_AUTH, auth);
  }

  simulateState(state) {
    this.dispatchAction(ActionTypes.SIMULATE_STATE, state);
  }

  updateCode(changes) {
    this.dispatchAction(ActionTypes.UPDATE_CODE, changes);
  }

  sendFeedback(feedback) {
    this.dispatchAction(ActionTypes.SEND_FEEDBACK, feedback);
  }

  setTestList(tests: Array<any>) {
    this.dispatchAction(ActionTypes.SET_TEST_LIST, tests);
  }

  updateSingleTestResult(test: any) {
    this.dispatchAction(ActionTypes.UPDATE_SINGLE_TEST_RESULT, test);
  }

  run() {
    this.dispatchAction(ActionTypes.RUN_CODE);
  }

  toggleFile(file: FileConfig) {
    this.dispatchAction(ActionTypes.TOGGLE_FILE, file);
  }

  loadSolution(file: FileConfig) {
    this.dispatchAction(ActionTypes.LOAD_SOLUTION, file);
  }

  expectedTests = 0;
  testMode = 'broken';
  testLastExercise = null;

  private test(state, action) {
    if (state.test) {


      if (ActionTypes.INIT_STATE === action.type) {
        this.nextExercise();
        this.testMode = 'broken';
        return state;
      }
      if (ActionTypes.NEXT_EXERCISE === action.type) {
        const exercise = selectedExercise(state);


        if (this.testLastExercise != exercise && exercise.fileTemplates.length === 0 || exercise.skipTests) {
          this.testLastExercise = exercise;
          // This is just info
          this.nextExercise();
        }
      }

      if (ActionTypes.SET_TEST_LIST === action.type) {
        this.expectedTests = action.data.length;
      }

      if (ActionTypes.UPDATE_SINGLE_TEST_RESULT === action.type) {
        if (this.testMode === 'broken') {
          this.expectedTests--;
          if (this.expectedTests === 0) {
            this.testMode = 'fixed';
            this.loadSolutions();

          }
        } else if (this.testMode === 'fixed') {
          if (action.data.pass) {
            this.expectedTests--;
            if (this.expectedTests === 0) {
              this.testMode = 'broken';
              this.nextExercise();
            }
          } else {
            console.log('TEST FAILED', action.data);
            debugger
          }
        }
      }
    }
    return state;
  }

  private loadSolutions() {
    this.dispatchAction(ActionTypes.LOAD_ALL_SOLUTIONS);
  }
}
