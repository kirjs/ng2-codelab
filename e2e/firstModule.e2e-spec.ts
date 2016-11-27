import { CodelabPage } from './app.po';
import { browser, element, by } from 'protractor';

describe('codelab App', function () {
  let page:CodelabPage;

  beforeEach(() => {
    page = new CodelabPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    browser.ignoreSynchronization = true;
    page.clickTo();
    browser.manage().timeouts().pageLoadTimeout(10000);
    page.clickElement('.next');
    browser.ignoreSynchronization = true;
    browser.sleep(2000);
    page.clickElement('#editor');
    browser.ignoreSynchronization = true;
    page.sendKeysTo('#editor');
    browser.sleep(2000)
  }

  );
});
