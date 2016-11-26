import {Component, Input} from '@angular/core';
import {VideoItem} from "../shared/VideoItem";

@Component({
  selector: 'my-video',
  templateUrl: 'video.html'
})
export class VideoComponent {
  @Input() video: VideoItem;
}
