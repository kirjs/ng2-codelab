import {Api} from './Api';
import {Injectable} from '@angular/core';

@Injectable()
export class VideoService {
  search(searchString: string) {
    return Api.fetch(searchString)
  }
}
