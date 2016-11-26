import { CodelabPage } from './app.po';
import { browser } from 'protractor';

describe('codelab App', function() {
  let page: CodelabPage;

  beforeEach(() => {
    page = new CodelabPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getElementText('app-root .next')).toEqual('Good job! Go to the next exercise!');
  });
});
