import { Component } from '@angular/core';
@Component({
  selector: 'my-app',
  template: '<h1>Hello {{title}}!</h1>'
})
export class AppComponent {
  name: 'hello';
}
export function scope(callback){
  callback();
}
