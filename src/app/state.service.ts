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
            const result = reducers[action.type](state, action);
            return result instanceof Observable ? result : Observable.of(result);
          }
          if (!state) {
            debugger
          }
        }
        catch (e) {
          debugger
        }
        return state;
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

  ping() {
    // This is a hack. See http://jsbin.com/yuqeniqena/1/edit?js,output
    this.dispatchAction(ActionTypes.PING);
  }

  toggleFile(file: FileConfig) {
    this.dispatchAction(ActionTypes.TOGGLE_FILE, file);
  }

  loadSolution(file: FileConfig) {
    this.dispatchAction(ActionTypes.LOAD_SOLUTION, file);
  }
}
