import {TestBed} from '@angular/core/testing';
import {FuzzyTime, evalJs} from './FuzzyPipe'; // Solution prefix will be stripped-out by the app
import "reflect-metadata";

let metadata;
beforeEach(() => {
  TestBed.resetTestingModule();
  TestBed.configureTestingModule({declarations: [FuzzyTime]});
  metadata = Reflect.getMetadata("annotations", FuzzyTime);
});

let timeConverter = (value:string) =>{
    let date = new Date(value);
    let dateNow = new Date();

    let millisecondsDifference = dateNow.getTime() - date.getTime();
    let differenceDays = Math.floor(millisecondsDifference / (1000 * 3600 * 24));
    let differenceYears = Math.floor(differenceDays / 365);
    
    if(differenceDays < 365){
        return  differenceDays + ' days ago';
    }
    return differenceYears + ' years ago';
}

describe('Pipe', () => {
  it('Create a pipe called FuzzyTime', () => {
    chai.expect(typeof evalJs('FuzzyTime')).equals('function');
  });
  it('Export it', () => {
    chai.expect(typeof FuzzyTime).equals('function');
  });

  it('Make it work', () => {
    let fuzzyTime = new FuzzyTime();
    chai.expect(fuzzyTime.transform('2016-11-24')).equals(timeConverter('2016-11-24'));
    chai.expect(fuzzyTime.transform('2012-11-25', )).equals(timeConverter('2012-11-25'));
    chai.expect(fuzzyTime.transform('2010-11-25', )).equals(timeConverter('2010-11-25'));
  });

});

