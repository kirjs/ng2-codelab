import { browser, element, by } from 'protractor';

export class CodelabPage {
  navigateTo() {
    return browser.get('/');
  }

  getMilestoneDescriptionText() {
    element(by.css('.milestone')).click();

    return element(by.css('.description')).getText();
  }
}
