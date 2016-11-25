import {Component} from '@angular/core';

const FAKE_VIDEOS = {
  videos: [
    {
      title: "Cute kitten",
      src: "/assets/images/kitten1.jpg"
    },
    {
      title: "Kitten on the tree",
      src: "/assets/images/kitten2.jpg"
    },
  ]
};

@Component({
  selector: 'my-app',
  templateUrl: 'video.html'
})
export class AppComponent {
  videos = FAKE_VIDEOS.videos;
  title = "CatTube";
}
