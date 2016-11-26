import { browser, element, by } from 'protractor';

export class CodelabPage {
  navigateTo() {
    return browser.get('/');
  }

  getMilestoneText() {
    element(by.css('.milestone')).click();
    return element(by.css('.milestone')).getText();
  }
}
