import {Component} from "@angular/core";
/*d:createComponentSolved*/
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

  /*/d*//*d:createComponentSolved:createComponentSolved*/
  template: "<h1>Hello CatTube!</h1>",

  /*/d*//*d:templatePageSetup*/
  templateUrl: './app.html'
  /*/d*//*d:createComponentSolved*/

})
export class AppComponent {
  /*/d*//*d:templatePageSetup*/
  title = 'CatTube';
  /*/d*//*d:diInjectServiceSolved*/

  constructor(public videoService: VideoService) {
  }

  /*/d*//*d:templateAddActionSolved*/
  videos = [];

  search(searchString) {
    /*/d*//*d:diInjectServiceSolved*/
    this.videos = this.videoService.search(searchString);
    /*/d*//*d:templateAllVideosSolved:diInjectService*/
    this.videos = FAKE_VIDEOS.filter(video => video.title.indexOf(searchString) >= 0);
    /*/d*//*d:templateAddActionSolved*/
  }

  /*/d*//*d:templateAllVideosSolved*/
  ngOnInit(){
    this.search('');
  }
  /*/d*//*d:createComponentSolved*/
}
/*/d*/

