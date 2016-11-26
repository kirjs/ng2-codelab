import {TestBed} from '@angular/core/testing';
import {evalJs} from '../../0-intro/solution/Dog';
import {AppComponent} from './solution/AppComponent'; // Solution prefix will be stripped-out by the app
import "reflect-metadata";

let metadata;
beforeEach(() => {
  TestBed.resetTestingModule();
  TestBed.configureTestingModule({declarations: [AppComponent]});
  metadata = Reflect.getMetadata("annotations", AppComponent);
});

describe('Component', () => {
  it('Create a class called AppComponent', () => {
    chai.expect(typeof AppComponent).equals('function');
  });
  it('Export the created class', () => {
    chai.expect(typeof evalJs('AppComponent')).equals('function');
  });
  it('Add a Component decorator for the class', () => {
    chai.expect(metadata).is.not.undefined
  });
  it('Add selector to the component annotation config', () => {
    chai.expect(metadata[0].selector).equals('my-app');
  });

  it('Add a template which would output <h1>Hello world!</h1>', () => {
    chai.expect(metadata[0].template).equals('<h1>Hello world!</h1>');
  });
});

