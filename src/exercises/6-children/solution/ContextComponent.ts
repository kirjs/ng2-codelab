import {Component} from '@angular/core';
import {ContextService} from "./ContextService";
import {VideoComponent} from "./VideoComponent";

@Component({
  selector: 'my-ad',
  templateUrl: 'context.html'
})
export class ContextComponent {
  text: string;

  constructor(public parent: VideoComponent, private  service: ContextService) {
  }

  ngOnInit() {
    this.text = this.service.getAdText(this.parent.video.description);
  }
}
