import {Component, Input} from '@angular/core';
import {VideoItem} from "../../shared/VideoItem";

@Component({
  selector: 'my-wrapper',
  // Just using template here to avoid extra files.
  template: `
    <my-toggle-panel>
      <div class="description">Either show me</div>
      <div class="extra">Or show me</div>
    </my-toggle-panel>
`
})
export class WrapperComponent {

}
