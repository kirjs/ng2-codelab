import {Component, Inject} from '@angular/core';
import {VideoService} from "./VideoService";
import {VideoItem} from "../../../shared/VideoItem";


@Component({
  selector: 'my-app',
  templateUrl: 'app.html'
})
export class AppComponent {
  videos: VideoItem[] = [];
  title = "CatTube";

  constructor(private v: VideoService) {
  }

  search(value) {
    this.videos = this.v.search(value);
  }
}
