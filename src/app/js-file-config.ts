import {FileConfig} from "./file-config";
export interface JsFileConfig extends FileConfig {
  exports: string[],
  local?: boolean
}
