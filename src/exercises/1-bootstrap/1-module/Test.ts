import {TestBed} from '@angular/core/testing';
import {AppModule} from './solution/AppModule';
import {BrowserModule} from '@angular/platform-browser';
import {AppComponent} from './AppComponent';
import "reflect-metadata";
let metadata;

beforeEach(() => {
  TestBed.resetTestingModule();
  TestBed.configureTestingModule({declarations: []});
  try {
    metadata = Reflect.getMetadata("annotations", AppModule);
  } catch (e) {
    // Do nothing, we have assertions below for this case
  }
});

describe('Component', () => {
  it('Create a class called AppModule', () => {
    chai.expect(typeof AppModule).equals('function');
  });
  it('Add a Module annotation for the class', () => {
    chai.expect(metadata).is.not.undefined
  });

  it('Add imports to the module annotation config', () => {
    chai.expect(metadata[0].imports[0]).equals(BrowserModule);
  });

  it(`Add AppComponent that we created in the previous 
  exercise to the declarations section of the decorator (don't forget to import it)`, () => {
    chai.expect(metadata[0].declarations[0]).equals(AppComponent);
  });

  it(`Add AppComponent that we created in the previous 
  exercise to the bootstrap section of the decorator (don't forget to import it)`, () => {
    chai.expect(metadata[0].bootstrap[0]).equals(AppComponent);
  });
});

