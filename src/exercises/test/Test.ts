/**
 * This is a good sample sample of a codelab exercise.
 *
 * An exercise is just a folder with a bunch of files.
 *
 * the configuration is in app/codelab/codelab-config.ts.
 */


/**
 * Angular is being smart here, so we have to reset TestBed for every test even if there are no angular components.
 * TODO(kirjs): move this to a global beforeEach
 */
import {TestBed} from '@angular/core/testing';
/**
 * `./solution/` prefix is used to make the test typecheck.
 * It will be stripped during runtime, and the `./Dog` module
 * will be loaded.
 */
import {Dog, evalJs} from './solution/Dog';
/**
 * In the test we get the access to the actual sourcecode
 * General recommendation here is not to overuse it.
 */
/**
 * `(../)+shared/` prefix is used to make the test typecheck.
 * It will be stripped during runtime, and the `./code` module
 * will be loaded.
 */

import {DogCode} from '../shared/code';
import {BarkTranslatingService} from "./BarkingBroadcastingService";

beforeEach(() => {
  TestBed.resetTestingModule();
});

describe('Component', () => {
  it(`Create a class called Dog`, () => {
    /**
     * We can use evalJs to get into the scope of the user's file.
     * Currently evalJs has to be manually added to the `before`
     * section in the file config.
     *
     * I expert the primary use case for eval js would be to remind
     * the user to export something.
     *
     * e.g. if the user created teh class, but haven't exported it this
     * test will still pass.
     */
    chai.expect(typeof evalJs('Dog')).equals('function');
  });

  it(`Export the class`, () => {
    /**
     * Require the class, assert it's a function (compile target is es5).
     */
    chai.expect(typeof Dog).equals('function');
  });

  it('Add a constructor', () => {
    /**
     * Fancy: Require the actual source code, and search in it.
     *
     */
    chai.expect(DogCode.indexOf('constructor') > -1, `Your dog doesn't have constuctor`).is.true;
  });

  it('Make constructor take a parameter', () => {
    chai.expect(Dog.length, 'Dog constructor should take one parameter').equals(1);
  });

  it('Use accessor shortcut', () => {

  });

  it('Create new method', () => {
    chai.expect(typeof (new Dog(new BarkTranslatingService()).bark)).equals('function');
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

