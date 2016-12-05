import {Component, Input} from "@angular/core";
import {VideoItem} from "./VideoItem";
/*d:thumbsComponentUse*/
import {Thumbs} from "./ThumbsComponent";
/*/d*//*d:videoComponentCreateSolved*/
@Component({
  selector: "my-video",
  templateUrl: "./video.html"
})
/*/d*/
export class VideoComponent {
  /*d:videoComponentCreateSolved*/
  @Input() video: VideoItem;
  /*/d*//*d:thumbsComponentUseSolved*/
  onThumbs(thumbs: Thumbs) {
    if (thumbs == Thumbs.UP) {
      this.video.likes++;
    }
    if (thumbs == Thumbs.DOWN) {
      this.video.likes--;
    }
  }
  /*/d*/
}
