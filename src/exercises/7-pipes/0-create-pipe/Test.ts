import {TestBed} from '@angular/core/testing';
import {FuzzyTime, evalJs} from './FuzzyPipe'; // Solution prefix will be stripped-out by the app
import "reflect-metadata";

let metadata;
beforeEach(() => {
  TestBed.resetTestingModule();
  TestBed.configureTestingModule({declarations: [FuzzyTime]});
  metadata = Reflect.getMetadata("annotations", FuzzyTime);
});

describe('Pipe', () => {
  it('Create a pipe called FuzzyTime', () => {
    chai.expect(typeof evalJs('FuzzyTime')).equals('function');
  });
  it('Export it', () => {
    chai.expect(typeof FuzzyTime).equals('function');
  });

  it('Make it work', () => {
    let fuzzyTime = new FuzzyTime();
    jasmine.clock().install();
    jasmine.clock().mockDate(new Date('2016-11-26'));
    chai.expect(fuzzyTime.transform('2016-11-24')).equals('2 days ago');
    chai.expect(fuzzyTime.transform('2012-11-25', )).equals('4 years ago');
    chai.expect(fuzzyTime.transform('2010-11-25')).equals('6 years ago');
    jasmine.clock().uninstall();
  });

});

