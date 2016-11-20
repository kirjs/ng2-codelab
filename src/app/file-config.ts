export interface FileConfig {
  type?: string,
  after?: string;
  before?: string;
  moduleName?: string,
  filename: string,
  code?: string,
  ui?: boolean
  bootstrap?: boolean
  readonly?: boolean
  test?: boolean,
  hidden?: boolean
}
