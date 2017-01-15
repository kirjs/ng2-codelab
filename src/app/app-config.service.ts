import {Injectable} from '@angular/core';
import {AppConfig} from './codelab-config';


const test = window.location.hash.includes('test');
const presentationMode = window.location.hash.includes('present');
const debug = test || window.location.hash.includes('debug');
const reset = window.location.hash.includes('reset') || debug;
const noerrors = test || window.location.hash.includes('noerrors');

export const appConfig: AppConfig = {
  name: 'Codelab',
  page: 'milestone',
  user: '',
  auth: '',
  feedbackEnabled: false,
  preserveState: !reset,
  debug,
  test,
  noerrors,
  presentationMode
};

@Injectable()
export class AppConfigService {
  config = appConfig;
}
