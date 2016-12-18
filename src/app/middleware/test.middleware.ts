import {AppState, AppConfig} from '../codelab-config';
import {ActionTypes} from '../action-types.enum';
import {selectedExercise, StateService} from '../state.service';


enum TestMode {
  BROKEN, FIXED
}


export function testMiddleware(stateService: StateService, appConfig: AppConfig) {
  let expectedTests = 0;
  let testMode: TestMode = TestMode.BROKEN;
  let lastExercise = null;

  return function test(state: AppState, action) {
    if (appConfig.test) {
      if (ActionTypes.INIT_STATE === action.type) {
        stateService.nextExercise();
        testMode = TestMode.BROKEN;
        return state;
      }
      if (ActionTypes.NEXT_EXERCISE === action.type) {
        const exercise = selectedExercise(state);


        if (lastExercise != exercise && exercise.fileTemplates.length === 0 || exercise.skipTests) {
          lastExercise = exercise;
          // This is just info
          stateService.nextExercise();
        }
      }

      if (ActionTypes.SET_TEST_LIST === action.type) {
        expectedTests = action.data.length;
      }

      if (ActionTypes.UPDATE_SINGLE_TEST_RESULT === action.type) {
        if (testMode === TestMode.BROKEN) {
          expectedTests--;
          if (expectedTests === 0) {
            testMode = TestMode.FIXED;
            stateService.loadSolutions();

          }
        } else if (testMode === TestMode.FIXED) {
          if (action.data.pass) {
            expectedTests--;
            if (expectedTests === 0) {
              testMode = TestMode.BROKEN;
              stateService.nextExercise();
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
}
