import {Api} from './Api';
export class YoutubeService {
  fetch(searchString:string) {
    return Api.fetch(searchString)
  }
}
