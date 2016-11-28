import {Component, Input} from '@angular/core';
import {VideoItem} from "../../shared/VideoItem";

@Component({
  selector: 'my-wrapper',
  // Just using template here to avoid extra files.
  template: `
    <my-thumbs></my-thumbs> 
  `
})
export class WrapperComponent {

}
