export const imports = {
  angular: {
    core: {
      Component: {filename: '@angular/core', exports: ['Component']},
      // I know!!
      ComponentAndInput: {filename: '@angular/core', exports: ['Component', 'Input']},
      COE: {filename: '@angular/core', exports: ['Component', 'Output', 'EventEmitter']},

      Injectable: {filename: '@angular/core', exports: ['Injectable']},
      NgModule: {
        filename: '@angular/core', exports: ['NgModule']
      }
    },
    platformBrowser: {
      BrowserModule: {
        filename: '@angular/platform-browser',
        exports: ['BrowserModule']
      }
    }
  }
};
