import { CodelabPage } from './app.po';
import { browser } from 'protractor';

describe('codelab App', function() {
  let page: CodelabPage;

  beforeEach(() => {
    page = new CodelabPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    page.clickElement('app-root .next');
    page.clickElement('app-root index1');
    browser.manage().timeouts().pageLoadTimeout(1000);
  });
});
