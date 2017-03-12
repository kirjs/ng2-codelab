import {CodelabState} from '../src/app/codelab/codelab-config';
import {FileConfig} from '../src/app/codelab/file-config';
import {differ} from '../src/app/differ/differ';
import {Injectable} from '@angular/core';
import {ng2tsConfig} from './ng2ts/ng2ts';
import {i18n} from '../src/i18n/i18n';

declare const require;

function getFileByPath(path) {
  if (!ng2tsConfig.preloadedFiles[path]) {
    throw new Error('Incorrect path');
  }

  return i18n(path, ng2tsConfig.preloadedFiles[path]);
}

@Injectable()
export class CodelabConfigService {
  public config: CodelabState;

  constructor() {
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


    function evaled(file) {
      return Object.assign(file, {
        after: `
    export function evalJs( js ){
      return eval(js);
    }
`
      });
    }

    function getFile(path: string, stages: string[], stage: string, bootstrap: boolean, overrides): FileConfig {
      const type = path.substr(path.lastIndexOf('.') + 1);
      stage = (overrides.stage[path] && overrides.stage[path][stage]) || stage;

      // Using overrides path, but keeping the origingal path for display purposes.
      // TODO: This get broken if files are ind different folders
      const diffs = differ(getFileByPath((overrides.file[path] && overrides.file[path][stage]) || path), stages);

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

    const config = Object.assign(ng2tsConfig, {selectedMilestoneIndex: 0});
    config.milestones = ng2tsConfig.milestones.map(milestone => {
      (milestone as any).selectedExerciseIndex = 0;
      milestone.exercises = milestone.exercises.map(exercise => {
        const files: FileConfig[] = [];
        // Default value is undefined, but should be false.
        exercise.slide = exercise.slide || false;

        if (exercise.slide == false) {
          const bootstrap = (exercise.files.bootstrap || []) as Array<string>;
          if (exercise.files.exercise) {
            exercise.files.exercise.forEach(file => {
              files.push(evaled(getFile(file, config.stages, exercise.stage, bootstrap.indexOf(file) >= 0, config.overrides)));
            });
          }

          if (exercise.files.reference) {
            exercise.files.reference.forEach(file => {
              files.push(...justForReference(getFile(file, config.stages, exercise.stage, bootstrap.indexOf(file) >= 0, config.overrides)));
            })
          }
          if (exercise.files.hidden) {
            exercise.files.hidden.forEach(file => {
              files.push(...hidden(getFile(file, config.stages, exercise.stage, bootstrap.indexOf(file) >= 0, config.overrides)));
            })
          }

          if (exercise.files.test) {
            exercise.files.test.forEach(file => {
              files.push(...test(getFile(file, config.stages, exercise.stage, bootstrap.indexOf(file) >= 0, config.overrides)));
            })
          }

          exercise.files = files;
        }

        return exercise;
      });

      return milestone;
    });

    this.config = config;
  }
}
