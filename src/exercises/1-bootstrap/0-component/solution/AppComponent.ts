import {Component} from '@angular/core';

@Component({
  selector: 'my-app',
  template: '<h1>Hello {{title}}!</h1>'
})
export class AppComponent {
  title = 'CatTube';
}

// Pls ignore
export function evalJs(s: string): any {
}
