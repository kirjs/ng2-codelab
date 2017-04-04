export function generateItForFunction(func) {
  return (arg, result) => {
    it(`When [${arg}] is passed, the function should return ${result}`, () => {
      chai.expect(func(arg)).equals(result);
    });
  }
}

