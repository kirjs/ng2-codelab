System.config({
  map: {
    'rxjs': 'node_modules/rxjs',
    'reflect-metadata': 'node_modules/reflect-metadata/Reflect.js'
  },
  packages: {
    rxjs: {
      defaultExtension: 'js'
    }
  }
});

window.define = SystemJS.amdDefine;
