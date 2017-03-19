import {i18n} from '../../i18n/i18n';
import {FileConfig} from '../codelab/file-config';
import {differ} from '../differ/differ';

type Override = {[key: string]: {[key: string]: string}};
interface Overrides {
  file: Override,
  stage: Override,
}

function hidden(...files: FileConfig[]): FileConfig[] {
  return files.map(file => Object.assign({}, file, {hidden: true}))
}

function readOnly(...files: FileConfig[]): FileConfig[] {
  return files.map(file => Object.assign({}, file, {readonly: true}))
}

function justForReference(...files: FileConfig[]): FileConfig[] {
  return collapsed(...readOnly(...files));
}

function collapsed(...files: FileConfig[]): FileConfig[] {
  return files.map(file => Object.assign({}, file, {collapsed: true}))
}


export class DiffFilesResolver {
  constructor(private files: {[key: string]: string},
              private stages: Array<string>,
              private overrides: Overrides) {
  }

  resolve(stage: string, files) {
    function test(...files: FileConfig[]): FileConfig[] {
      return files.map(file => Object.assign({}, file, {
        excludeFromTesting: false,
        test: true,
        bootstrap: true,
        before: 'mochaBefore();',
        after: 'mochaAfter();',
        hidden: true,
      }))
    }

    function evaled(file) {
      return Object.assign(file, {
        after: `export function evalJs( js ){ return eval(js);}`
      });
    }

    const result = [];
    const bootstrap = (files.bootstrap || []) as Array<string>;
    if (files.exercise) {
      files.exercise.forEach(file => {
        result.push(evaled(this.getFileCodeForStage(file, stage, bootstrap.indexOf(file) >= 0)));
      });
    }

    if (files.reference) {
      files.reference.forEach(file => {
        result.push(...justForReference(this.getFileCodeForStage(file, stage, bootstrap.indexOf(file) >= 0)));
      })
    }
    if (files.hidden) {
      files.hidden.forEach(file => {
        result.push(...hidden(this.getFileCodeForStage(file, stage, bootstrap.indexOf(file) >= 0)));
      })
    }

    if (files.test) {
      files.test.forEach(file => {
        result.push(...test(this.getFileCodeForStage(file, stage, bootstrap.indexOf(file) >= 0)));
      })
    }
    return result;
  }


  getFileByPath(path: string) {
    if (!this.files[path]) {
      throw new Error('Incorrect path');
    }

    return i18n(path, this.files[path]);
  }


  getFileCodeForStage(path: string, stage: string, bootstrap: boolean): FileConfig {
    const type = path.substr(path.lastIndexOf('.') + 1);
    stage = (this.overrides.stage[path] && this.overrides.stage[path][stage]) || stage;

    // Using overrides path, but keeping the original path for display purposes.
    // TODO: This get broken if files are ind different folders
    const diffs = differ(this.getFileByPath((this.overrides.file[path] && this.overrides.file[path][stage]) || path), this.stages);

    if (type == 'ts') {
      return {
        bootstrap: bootstrap,
        excludeFromTesting: bootstrap,
        type: 'typescript',
        path,
        template: diffs[stage],
        moduleName: path.replace('.ts', ''),
        code: diffs[stage],
        solution: diffs[stage + 'Solved']
      };
    } else {
      return {
        type,
        path,
        code: diffs[stage],
        template: diffs[stage],
        solution: diffs[stage + 'Solved']
      }
    }
  }
}
