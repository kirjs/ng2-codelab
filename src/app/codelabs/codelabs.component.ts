import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-codelabs',
  templateUrl: './codelabs.component.html',
  styleUrls: ['./codelabs.component.css']
})
export class CodelabsComponent implements OnInit {
  codelabs = [{
    label: 'Angular and TypeScript 101',
    description: 'Learn angular with TypeScript',
    id: 'ng2ts'
  }];

  constructor() {
  }

  ngOnInit() {

  }

}
