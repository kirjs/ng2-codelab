import {CodelabPage} from './app.po';
import {browser, element, by} from 'protractor';

describe('codelab App', function () {
  let page: CodelabPage;

  beforeEach(() => {
    page = new CodelabPage();
  });

  it('should display message saying app works', () => {
      page.navigateTo();
      page.openMilestone(1);
      page.openExercise('TypeScript');
      browser.pause(2000);
      page.editCode('Dog.ts', `HopHeyLalalay`);
      browser.pause();
    }
  );
});
