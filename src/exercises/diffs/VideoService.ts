import {Injectable} from "@angular/core";
import {Api} from "./Api";
/*d:diInjectServiceSolved*/
@Injectable()
/*/d*//*d:initial*/
export class VideoService {
  search(searchString: string) {
    return Api.fetch(searchString)
  }
}
/*/d*/
