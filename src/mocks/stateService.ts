import {StateService} from "../app/codelab/state.service";
export class MockStateService {
  update;

  constructor(config) {
    this.update = {
      subscribe: (callback) => {
        callback(config)
      }
    }
  }

}

export const mockStateServiceProvider = (config) => ({
  provide: StateService, useValue: new MockStateService(config)
});
