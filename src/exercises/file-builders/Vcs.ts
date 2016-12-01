import {FileBuilder} from "./FileBuilder";

export class Vcs {
  versions: any = {};

  constructor(private file: FileBuilder) {
    this.versions['file'] = file;

  }

  commit(commitId, callback) {
    this.file.update(callback);
    this.versions[commitId] = this.file.generate();
    return this;
  }

  build() {
    return this.versions;
  }


}
