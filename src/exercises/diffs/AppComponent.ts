import {Component} from "@angular/core";
/*d:createComponentSolved/trimLeading*/
import {VideoService} from "./VideoService";
/*/d*//*d:templateAllVideos*/
const FAKE_VIDEOS = [{
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
  }];
/*/d*//*d:createComponentSolved*/
@Component({
  selector: "my-app",
  /*/d*//*d:createComponentSolved:bootstrapSolved/trimBoth*/
  template: "<h1>Hello CatTube!</h1>",
  /*/d*//*d:templatePageSetup/trimBoth*/
  templateUrl: './app.html'
  /*/d*//*d:createComponentSolved/trimTrailing*/
})
export class AppComponent {
/*/d*//*d:templatePageSetup/trimTrailing*/
  title = 'CatTube';
/*/d*//*d:diInjectServiceSolved*/
  constructor(public videoService: VideoService) {
  }
/*/d*//*d:templateAddActionSolved/trimTrailing*/
  videos = [];

  search(searchString) {
    /*/d*//*d:diInjectServiceSolved*/
    this.videos = this.videoService.search(searchString);
    /*/d*//*d:templateAllVideosSolved:diInjectService*/
    this.videos = FAKE_VIDEOS.filter(video => video.title.indexOf(searchString) >= 0);
    /*/d*//*d:templateAddActionSolved/trimBoth*/
  }

/*/d*//*d:templateAllVideosSolved*/
  ngOnInit(){
    this.search('');
  }
/*/d*//*d:createComponentSolved/trimTrailing*/
}
/*/d*/
