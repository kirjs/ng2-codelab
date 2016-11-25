import {Component} from '@angular/core';
import {VideoService} from "./VideoService";


const FAKE_VIDEOS = [
  {
    title: "Cute kitten",
    src: "/assets/images/kitten1.jpg"
  },
  {
    title: "Kitten on the tree",
    src: "/assets/images/kitten2.jpg"
  },
  {
    title: "Serouis cat",
    src: "/assets/images/kitten2.jpg"
  },
];


@Component({
  selector: 'my-app',
  templateUrl: 'app.html'
})
export class AppComponent {
  videos = [];
  title = "CatTube";

  constructor(private v: VideoService) {
  }

  search(value) {
    this.videos = this.v.search(value);
  }
}
