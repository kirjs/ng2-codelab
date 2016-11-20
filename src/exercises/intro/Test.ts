import {TestBed} from '@angular/core/testing';
import {Dog} from './__SOLUTION__Dog';


let metadata;
beforeEach(() => {
  TestBed.resetTestingModule();
});

describe('Component', () => {
  it(`Create and export a class called Dog`, () => {
    chai.expect(typeof Dog).equals('function');
  });

  it('Add a constructor', () => {

  });

  it('Make constructor take a parameter', () => {

  });

  it('Use accessor shortcut', () => {

  });

  it('Create new method', () => {

  });

  it(`Let's debug the app! You'll need this if something goes wrong.
   * Open the dev tools in your browser
   * Put in the new method add "debugger;"
   * The app will stop, and you'll be able to inspect local variables. 
   * Get out using F8
   * We can't really test this, so this test is marked as passed
  `, () => {

  });

});

