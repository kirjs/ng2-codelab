import {CodelabState} from '../app/codelab/codelab-config';
import {Injectable} from '@angular/core';
import {ng2tsConfig} from './ng2ts/ng2ts';
import {testCodelabConfig} from './test-codelab/test-codelab';
import {UxiConfig} from './uxi/uxi';

declare const require;

@Injectable()
export class CodelabConfigService {
  public codelabs: [CodelabState];

  constructor() {
    this.codelabs = [
      Object.assign(ng2tsConfig, {selectedMilestoneIndex: 0}),
      Object.assign(UxiConfig, {selectedMilestoneIndex: 0}),
      Object.assign(testCodelabConfig, {selectedMilestoneIndex: 0})
    ]
  }
}
