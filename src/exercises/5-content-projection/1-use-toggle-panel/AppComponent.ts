import {Component} from '@angular/core';
import {VideoService} from "../../shared/VideoService";

@Component({
  selector: 'my-app',
  templateUrl: 'app.html'
})
export class AppComponent {
  videos = [];
  title = "CatTube";

  constructor(private v: VideoService) {
    // Display all cats right away!
    this.search('');
  }

  search(value) {
    this.videos = this.v.search(value);
  }
}
