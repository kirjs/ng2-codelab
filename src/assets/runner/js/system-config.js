function loadSystemModule(name, code) {
  window.define = function (deps, callback) {
    console.log(window.System.x);
    window.System.amdDefine(name, deps, callback)
  };
  window.define.amd = true;
  eval(code);
}

System.config({
  map: {
    'reflect-metadata': 'node_modules/reflect-metadata/Reflect.js',
    'rxjs': 'node_modules/rxjs',
    '@angular/core': 'node_modules/@angular/core/bundles/core.umd.js',
    '@angular/core/testing': 'node_modules/@angular/core/bundles/core-testing.umd.js',
    '@angular/common': 'node_modules/@angular/common/bundles/common.umd.js',
    '@angular/compiler': 'node_modules/@angular/compiler/bundles/compiler.umd.js',
    '@angular/compiler/testing': 'node_modules/@angular/compiler/bundles/compiler-testing.umd.js',
    '@angular/platform-browser': 'node_modules/@angular/platform-browser/bundles/platform-browser.umd.js',
    '@angular/platform-browser/testing': 'node_modules/@angular/platform-browser/bundles/platform-browser-testing.umd.js',
    '@angular/platform-browser-dynamic': 'node_modules/@angular/platform-browser-dynamic/bundles/platform-browser-dynamic.umd.js',
    '@angular/platform-browser-dynamic/testing': 'node_modules/@angular/platform-browser-dynamic/bundles/platform-browser-dynamic-testing.umd.js',
  },
  packages: {
    rxjs: {
      defaultExtension: 'js'
    }
  }
});
