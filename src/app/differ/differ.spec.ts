import {differ} from "./differ";

fdescribe('differ', () => {
  it('returns the text the way it is, if there are no special tags.', () => {
    let commits = differ('hi', ['first', 'second']);
    expect(commits['initial']).toEqual('hi');
    expect(commits['first']).toEqual('hi');
    expect(commits['second']).toEqual('hi');
  });

  it('Progressively adds the text for a single commit.', () => {
    let commits = differ('hi/*d:first*/, world!/*/d*/', ['first']);
    expect(commits['initial']).toEqual('hi');
    expect(commits['first']).toEqual('hi, world!');
  });

  it('Works for multiline strings', () => {
    let commits = differ(`hi/*d:first*/, wor
  ld!/*/d*/`, ['first']);
    expect(commits['initial']).toEqual('hi');
    expect(commits['first']).toEqual(`hi, wor
  ld!`);
  });

  it('Progressively adds the text for multiple commits.', () => {
    let commits = differ(`/*d:first*/bu/*/d*//*d:second*/ra/*/d*//*d:third*/ti/*/d*//*d:forth*/no/*/d*/`,
      ['first', 'second', 'third', 'forth']);
    expect(commits['initial']).toEqual('');
    expect(commits['first']).toEqual('bu');
    expect(commits['second']).toEqual('bura');
    expect(commits['third']).toEqual('burati');
    expect(commits['forth']).toEqual('buratino');
  })
});
