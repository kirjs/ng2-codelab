import {Component} from '@angular/core';
import {ContextService} from "./ContextService";
import {VideoComponent} from "./VideoComponent";


@Component({
  selector: 'my-ad',
  templateUrl: 'context.html'
})
export class ContextComponent {
  description: string;

  constructor(public parent: VideoComponent, private  service: ContextService) {
  }

  ngOnInit() {
    this.description = this.service.getAddText(this.parent.video.description);
  }
}
