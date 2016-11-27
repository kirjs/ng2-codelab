import {Component} from '@angular/core';
// This is a fake app component, it's needed to bootstrap the video component with the aproppriate params.
import {Api} from '../../shared/Api';
@Component({
  selector: 'my-app',
  template: '<my-video [video]="video"></my-video>'
})
export class AppComponent {
  video = Api.fetch('')[0];
}
