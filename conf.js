exports.config = {
  allScriptsTimeout:100000,
  chromeDriver:'./selenium/chromedriver',
  framework: 'jasmine',
  capabilities: {
    'browserName': 'firefox'
  },
  seleniumAddress: 'http://192.168.1.7:4444/wd/hub',
  baseUrl: 'http://localhost:3000/#/login',
  specs: ['spec.js'],
  jasmineNodeOpts : {
    onComplete: null,
    isVerbose:false,
    showColors:true,
    includesStackTrace :true,
    defaultTimeoutInterval :60000
  },
  onPrepare: function () {
    return browser.executeScript("alert('Test');").then(function () {
        return browser.switchTo().alert().accept();
    });
  },
};
