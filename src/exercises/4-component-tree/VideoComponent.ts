import {Component, Input} from '@angular/core';

interface Video {
  title: string,
  src: string
}

@Component({
  selector: 'my-video',
  templateUrl: 'video.html'
})
export class VideoComponent {
  @Input() video: Array<Video> = [];
}
