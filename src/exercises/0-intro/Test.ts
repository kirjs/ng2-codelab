/**
 * This is a good sample sample of a codelab exercise.
 *
 * An exercise is just a folder with a bunch of files.
 *
 * the configuration is in app/codelab/codelab-config.ts.
 *
 *
 * There are
 *
 */

/**
 * solution/ prefix is used to let the test typechecked.
 * It will be stripped during runtime, and the Meetup module
 * will be loaded.
 */
import {Meetup, evalJs} from './Meetup';
/**
 * In the test we get the access to the actual sourcecode
 * I'd try not to overuse it
 */
import {MeetupCode} from './code';

const guests = [
  {name: 'me', rsvp: true},
  {name: 'notme', rsvp: false},
];

describe('Component', () => {
  it(`Create a class called Meetup`, () => {
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
    chai.expect(typeof evalJs('Meetup')).equals('function');
  });

  it(`Export the class`, () => {
    /**
     * Require the class, assert it's a function (compile target is es5).
     */
    chai.expect(typeof Meetup).equals('function');
  });

  it('Add a constructor', () => {
    /**
     * Fancy: Require the actual source code, and search in it.
     *
     */
    chai.expect(MeetupCode.indexOf('constructor') > -1, `The meetup class doesn't have constuctor`).is.true;
  });

  it('Make constructor take a parameter "guests"', () => {
    chai.expect(Meetup.length, 'Meetup constructor should take one parameter called "guests"').equals(1);
  });

  it('This parameter should be public', () => {
    const meetup = new Meetup(guests);
    chai.expect(meetup.guests).equals(guests);
  });

  it('Create new method "getRsvp"', () => {
    chai.expect(typeof (new Meetup(guests).getRsvp)).equals('function');
  });

  it('Modify getRsvp to filter the guests array and only return guests with rsvp set to true.', () => {
    chai.expect(new Meetup(guests).getRsvp().length).equals(1);
  });

  /*
  xit(`Let's debug the app! You'll need this if something goes wrong.
   * Open the dev tools in your browser
   * Put in the new method add "debugger;"
   * The app will stop, and you'll be able to inspect local variables.
   * Get out using F8
   * We can't really test this, so this test is marked as passed
  `, () => {

  });
*/
});

