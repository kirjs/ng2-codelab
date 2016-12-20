import {CodelabState} from '../src/app/codelab-config';
import {FileConfig} from '../src/app/file-config';
import {differ} from '../src/app/differ/differ';
import {Injectable} from '@angular/core';
import {ng2tsConfig} from './ng2ts/ng2ts';

import {i18n} from '../src/gen/i18n';


declare const require;

// This should be done using require.context.
const preloadedFiles = {
  'app.component.ts': require(`!raw!./ng2ts/app.component.ts`),
  'app.module.ts': require('!raw!./ng2ts/app.module.ts'),
  'app.html': require('!raw!./ng2ts/app.html'),
  'main.ts': require('!raw!./ng2ts/main.ts'),
  'video/video-item.ts': require('!raw!./ng2ts/video/video-item.ts'),
  'api.service.ts': require('!raw!./ng2ts/api.service.ts'),
  'video/video.service.ts': require('!raw!./ng2ts/video/video.service.ts'),
  'video/video.html': require('!raw!./ng2ts/video/video.html'),
  'video/video.component.ts': require('!raw!./ng2ts/video/video.component.ts'),
  'thumbs/thumbs.component.ts': require('!raw!./ng2ts/thumbs/thumbs.component.ts'),
  'thumbs/thumbs.html': require('!raw!./ng2ts/thumbs/thumbs.html'),
  'toggle-panel/toggle-panel.html': require('!raw!./ng2ts/toggle-panel/toggle-panel.html'),
  'toggle-panel/toggle-panel.component.ts': require('!raw!./ng2ts/toggle-panel/toggle-panel.component.ts'),
  'wrapper.component.ts': require('!raw!./ng2ts/wrapper.component.ts'),
  'context/context.component.ts': require('!raw!./ng2ts/context/context.component.ts'),
  'context/context.service.ts': require('!raw!./ng2ts/context/context.service.ts'),
  'context/context.html': require('!raw!./ng2ts/context/context.html'),
  'typescript-intro/Codelab.ts': require('!raw!./ng2ts/typescript-intro/Codelab.ts'),
  'typescript-intro/Main.ts': require('!raw!./ng2ts/typescript-intro/Main.ts'),
  'typescript-intro/Guest.ts': require('!raw!./ng2ts/typescript-intro/Guest.ts'),
  'fuzzy-pipe/fuzzy.pipe.ts': require('!raw!./ng2ts/fuzzy-pipe/fuzzy.pipe.ts'),
  'tests/codelabTest.ts': require('!raw!./ng2ts/tests/codelabTest.ts'),
  'tests/createComponentTest.ts': require('!raw!./ng2ts/tests/createComponentTest.ts'),
  'tests/createModuleTest.ts': require('!raw!./ng2ts/tests/createModuleTest.ts'),
  'tests/bootstrapTest.ts': require('!raw!./ng2ts/tests/bootstrapTest.ts'),
  'tests/templatePageSetupTest.ts': require('!raw!./ng2ts/tests/templatePageSetupTest.ts'),
  'tests/templateAddActionTest.ts': require('!raw!./ng2ts/tests/templateAddActionTest.ts'),
  'tests/templateAllVideosTest.ts': require('!raw!./ng2ts/tests/templateAllVideosTest.ts'),
  'tests/diInjectServiceTest.ts': require('!raw!./ng2ts/tests/diInjectServiceTest.ts'),
  'tests/videoComponentCreateTest.ts': require('!raw!./ng2ts/tests/videoComponentCreateTest.ts'),
  'tests/videoComponentUseTest.ts': require('!raw!./ng2ts/tests/videoComponentUseTest.ts'),
  'tests/ThumbsComponentCreateTest.ts': require('!raw!./ng2ts/tests/ThumbsComponentCreateTest.ts'),
  'tests/ThumbsComponentUseTest.ts': require('!raw!./ng2ts/tests/ThumbsComponentUseTest.ts'),
  'tests/togglePanelComponentCreateTest.ts': require('!raw!./ng2ts/tests/togglePanelComponentCreateTest.ts'),
  'tests/togglePanelComponentUseTest.ts': require('!raw!./ng2ts/tests/togglePanelComponentUseTest.ts'),
  'tests/contextComponentUseTest.ts': require('!raw!./ng2ts/tests/contextComponentUseTest.ts'),
  'tests/fuzzyPipeCreateTest.ts': require('!raw!./ng2ts/tests/fuzzyPipeCreateTest.ts'),
  'tests/fuzzyPipeUseTest.ts': require('!raw!./ng2ts/tests/fuzzyPipeUseTest.ts'),
  'thumbs.app.module.ts': require('!raw!./ng2ts/thumbs.app.module.ts'),
  'toggle-panel.app.module.ts': require('!raw!./ng2ts/toggle-panel.app.module.ts'),
  'index.html': '<my-thumbs></my-thumbs><my-wrapper></my-wrapper>'
};




function getFileByPath(path) {
  if (!preloadedFiles[path]) {
    throw new Error('Incorrect path');
  }

  return i18n(path, preloadedFiles[path]);
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
