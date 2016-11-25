import {Component} from '@angular/core';

const FAKE_VIDEOS = [
  {
    title: "Cute kitten",
    src: "/assets/images/kitten1.jpg"
  },
  {
    title: "Kitten on the tree",
    src: "/assets/images/kitten2.jpg"
  },
];


@Component({
  selector: 'my-app',
  templateUrl: 'video.html'
})
export class AppComponent {
  videos = [];
  title = "CatTube";

  search(value) {
    this.videos = FAKE_VIDEOS.filter(video => video.title.indexOf(value) >= 0)
  }
}
