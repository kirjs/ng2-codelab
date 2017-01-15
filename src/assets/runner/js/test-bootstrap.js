function mochaBefore() {
  mocha.setup('bdd').reporter(function () {
  });
}

function flattenTests(suite) {
  const result = [];

  function extractSuite(suite) {
    suite.suites.forEach(function (suite) {
      extractSuite(suite);
    });
    suite.tests.forEach(function (test) {
      result.push(test.title);
    });
  }

  extractSuite(suite);
  return result;
}

function mochaAfter(runId) {
  window.top.postMessage({
    type: 'testList',
    tests: flattenTests(mocha.suite)
  }, '*');

  mocha.run()
    .on('pass', function (test, result) {
      window.top.postMessage({
        type: 'testResult',
        test: {
          title: test.title
        },
        result: result,
        pass: true,
        runId: runId
      }, '*')
    })
    .on('fail', function (test, error) {
      window.top.postMessage({
        type: 'testResult',
        test: {
          title: test.title
        },
        result: error.message,
        pass: false,
        runId: runId
      }, '*')
    })
}
