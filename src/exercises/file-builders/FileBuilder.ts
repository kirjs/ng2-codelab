import {FileConfig} from "../../app/file-config";

export class FileBuilder implements FileConfig {

  constructor(public filename: string) {
  }

  update(callback) {
    callback(this);
    return this.generate();
  }

  public generate() {

  }

  fork() {
    throw new Error('not implemented');
  }
}
