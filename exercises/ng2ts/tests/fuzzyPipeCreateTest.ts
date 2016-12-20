declare const polyglot: {t: (s)=>any};
import {FuzzyPipe, evalJs} from '../fuzzy-pipe/fuzzy.pipe';
import 'reflect-metadata';

let metadata;
beforeEach(() => {
  try {
    metadata = Reflect.getMetadata('annotations', FuzzyPipe);
  } catch (e) {

  }
});

const d = new Date();
d.setDate(d.getDate() - 2);
const formattedDate = d.toISOString().slice(0, 10);


describe('Pipe', () => {
  it(polyglot.t(`Create a class called FuzzyPipe`), () => {
    chai.expect(typeof evalJs('FuzzyPipe')).equals('function');
  });

  it(polyglot.t(`Export it`), () => {
    chai.expect(typeof FuzzyPipe).equals('function');
  });

  it(polyglot.t(`Add a @Pipe() decorator`), () => {
    chai.expect(metadata).is.an('array')
  });

  it(polyglot.t(`Set the name to fuzzy`), () => {
    chai.expect(metadata[0].name).equals('fuzzy');
  });

  it(polyglot.t(`Make it return '2 days ago for '${formattedDate}'`), () => {
    let fuzzyTime = new FuzzyPipe();
    chai.expect(fuzzyTime.transform(d.toISOString().slice(0, 10)).toLowerCase()).equals('2 days');
  });
});

