import {browser, element, by} from 'protractor';
import {By} from "protractor/built/index";

export class CodelabPage {
  navigateTo() {
    return browser.get('/');
  }

  getMilestoneDescriptionText() {
    element(by.css('.milestone')).click();

    return element(by.css('.description')).getText();
  }

  getElementText(nameElement) {
    return element(by.css(nameElement)).getText();
  }


  openMilestone(index) {
    return element(by.cssContainingText('.milestone', index)).click();
  }

  openExercise(text) {
    return element(by.cssContainingText('.exercise', text)).click();
  }

  sendKeysTo(nameElement) {
    return element(by.css(nameElement)).sendKeys('njnj');
  }


  editCode(filename: string, code: string) {
    return element(by.css('.monaco-editor-background textarea'))
      .sendKeys('njnj');
  }
}
