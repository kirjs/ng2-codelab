import {FuzzyTime, evalJs} from './FuzzyPipe';
import "reflect-metadata";

let metadata;
beforeEach(() => {
  try {
    metadata = Reflect.getMetadata("annotations", FuzzyTime);
  } catch (e) {

  }
});


const d = new Date();
d.setDate(d.getDate() - 2);
const formattedDate = d.toISOString().slice(0, 10);


describe('Pipe', () => {
  it('Create a class called FuzzyTime', () => {
    chai.expect(typeof evalJs('FuzzyTime')).equals('function');
  });

  it('Export it', () => {
    chai.expect(typeof FuzzyTime).equals('function');
  });

  it('Add a @Pipe() decorator', () => {
    chai.expect(metadata).is.an('array')
  });

  it('Set the name to fuzzy', () => {
    chai.expect(metadata[0].name).equals('fuzzy');
  });

  it(`Make it return '2 days ago for '${formattedDate}'`, () => {
    let fuzzyTime = new FuzzyTime();
    chai.expect(fuzzyTime.transform(d.toISOString().slice(0, 10)).toLowerCase()).equals('2 days');
  });
});

