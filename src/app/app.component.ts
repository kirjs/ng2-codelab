import { Component } from "@angular/core";
import { StateService } from "./state.service";
import {appConfig} from './app-config.service';
import {FeedbackService} from './feedback/feedback.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  auth;
  constructor(private state: StateService, private feedbackService: FeedbackService) {
  }

  ngOnInit() {
    this.feedbackService.simulateState();

    //retrieve user progress only if it's enabled
    if(appConfig.feedbackEnabled && !appConfig.simulation){
        
    }
  }
}
