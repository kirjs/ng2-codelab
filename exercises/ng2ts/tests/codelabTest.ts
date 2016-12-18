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
 * It will be stripped during runtime, and the Codelab module
 * will be loaded.
 */
import {Codelab, evalJs} from '../typescript-intro/Codelab';
/**
 * In the test we get the access to the actual sourcecode
 * I'd try not to overuse it
 */
import * as code from '../code';

const guests = [
  {name: 'me', coming: true},
  {name: 'notme', coming: false},
];

describe('Component', () => {
  it(`Create a class called 'Codelab'`, () => {
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
    chai.expect(typeof evalJs('Codelab')).equals('function');
  });

  it(`Export the class`, () => {
    /**
     * Require the class, assert it's a function (compile target is es5).
     */
    chai.expect(typeof Codelab).equals('function');
  });

  it('Add a constructor', () => {
    /**
     * Fancy: Require the actual source code, and search in it.
     */
    chai.expect(code.typescript_intro_Codelab_ts.indexOf('constructor') > -1, `The codelab class doesn't have constuctor`).is.true;
  });

  it(`Make constructor take a parameter 'guests'`, () => {
    chai.expect(Codelab.length, `Codelab constructor should take one parameter called 'guests'`).equals(1);
  });

  it('This parameter should be public', () => {
    const codelab = new Codelab(guests);
    chai.expect(codelab.guests).equals(guests);
  });

  it(`Create new method 'getGuestsComing'`, () => {
    chai.expect(typeof (new Codelab(guests).getGuestsComing)).equals('function');
  });

  it(`Modify getGuestsComing to filter the guests array and only return guests with the 'coming' property set to true. 
  (hint: please use Array.filter method, and NOT a for loop. Ask us for help if you don't know how to
   (There's potential of getting into an infinite loop otherwise)`, () => {
    chai.expect(new Codelab(guests).getGuestsComing().length).equals(1);
  });

  /*
   xit(`Let's debug the app! You'll need this if something goes wrong.
   * Open the dev tools in your browser
   * Put in the new method add 'debugger;'
   * The app will stop, and you'll be able to inspect local variables.
   * Get out using F8
   * We can't really test this, so this test is marked as passed
   `, () => {

   });
   */
});

