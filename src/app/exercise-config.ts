import {FileConfig} from "./file-config";
import {TestInfo} from "./test-info";
import {SafeHtml} from "@angular/platform-browser";

export interface ExerciseConfig {
  name: string,
  description: string,
  fileTemplates: Array<FileConfig>
  solutions?: Array<FileConfig>
  editedFiles?: Array<FileConfig>;
  tests?: Array<TestInfo>;
  messageNext?: string,
  skipTests?: boolean
}
