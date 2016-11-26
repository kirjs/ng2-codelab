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


// TODO: This function get's added at run time, is needed for testing only,
// and sholdn't technically be part of the solution.
// Only need it here for typechecking in the test file.
export function evalJs(str){
}
