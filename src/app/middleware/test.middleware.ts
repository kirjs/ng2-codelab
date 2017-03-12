import {AppState, AppConfig} from '../codelab/codelab-config';
import {ActionTypes} from '../action-types.enum';
import {selectedExercise, StateService} from '../codelab/state.service';


enum TestMode {
  BROKEN, FIXED
}


export function testMiddleware(stateService: StateService, appConfig: AppConfig) {
  let expectedTests = 0;
  let testMode: TestMode = TestMode.BROKEN;
  let lastExercise = null;
  const startTime = (new Date()).getTime();

  if (appConfig.test) {
    console.log('TEST START');
  }

  return function test(state: AppState, action) {
    if (appConfig.test) {
      if (ActionTypes.INIT_STATE === action.type) {
        stateService.nextExercise();
        testMode = TestMode.BROKEN;
        return state;
      }
      if (ActionTypes.NEXT_EXERCISE === action.type) {
        const exercise = selectedExercise(state);


        if (lastExercise != exercise && !exercise.files || exercise.skipTests) {
          lastExercise = exercise;
          // This is just info
          stateService.nextExercise();
        }

        if (state.codelab.selectedMilestoneIndex === state.codelab.milestones.length - 1) {
          let result = (new Date()).getTime() - startTime;
          console.log('TEST RUN COMPLETE', result);
          alert(result);
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
