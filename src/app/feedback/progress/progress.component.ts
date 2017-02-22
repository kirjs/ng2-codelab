import { Component, OnInit } from '@angular/core';
import { AngularFire, FirebaseListObservable } from 'angularfire2';

@Component({
  selector: 'app-progress',
  templateUrl: './progress.component.html',
  styleUrls: ['./progress.component.css']
})
export class ProgressComponent implements OnInit {
  progress: Array<any>;

  constructor(private angularFire: AngularFire) { }

  testStats = [];
  milestonesIds = [];
  users = [];

  ngOnInit() {
    this.angularFire.auth.login().then(authData => {
      this.angularFire.database.list('/user_progress').subscribe(progress_list => {
        this.progress = progress_list;
        this.users = [];
        this.progress.forEach((val) => {
          let user = val;
          let userObject = { uid: user.$key, milestones: [] };
          if(user.$value){
            user = JSON.parse(user.$value);
          }
          user.codelab.milestones.forEach((milestone, milestoneIndex) => {
            userObject.milestones.push({ tests: [], id: milestoneIndex + 1 });
            milestone.exercises.forEach((exercise, exerciseIndex) => {
              if (exercise.tests) {
                exercise.tests.forEach(test => {
                  userObject.milestones[milestoneIndex].tests.push({ pass: test.pass, title: test.title });
                })
              }
            })
          })
          this.users.push(userObject);
        });
      });

    });
  }

}
