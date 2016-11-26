import { browser, element, by } from 'protractor';
import {By} from "protractor/built/index";

export class CodelabPage {
  navigateTo() {
    return browser.get('/');
  }

  getMilestoneText() {
    element(by.css('.milestone')).click();
    return element(by.css('.milestone')).getText();
  }

    getElementText(nameElement) {
    return element(by.css(nameElement)).getText();
  }
     clickElement(nameElement) {
    return element(by.css(nameElement)).click();
  }

 clickTo(){
   return  element(by.xpath(".//div[contains(@id, 'index1')]")).click();
 }

   sendKeysTo(nameElement){
   return  element(by.css(nameElement)).sendKeys('njnj');
 }


}
