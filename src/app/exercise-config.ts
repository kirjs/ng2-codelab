import {FileConfig} from "./file-config";
import {TestInfo} from "./test-info";

export interface ExerciseConfig {
  name: string,
  path: string,
  description: string,
  fileTemplates: Array<FileConfig>
  editedFiles?: Array<FileConfig>;
  tests?: Array<TestInfo>;
}
