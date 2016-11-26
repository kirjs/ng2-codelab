export class Dog {
  constructor(public name: string) {
  }

  bark(content: string): string {
    return this.name;
  }
}
// TODO: This function get's added at run time, is needed for testing only,
// and sholdn't technically be part of the solution.
// Only need it here for typechecking in the test file.
export function evalJs(str) {
}
