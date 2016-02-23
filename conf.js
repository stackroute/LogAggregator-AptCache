exports.config = {
  // allScriptsTimeout:11000,

  chromeDriver:'./selenium/chromedriver',
  framework: 'jasmine',
  capabilities: {
    'browserName': 'firefox'
  },

  seleniumAddress: 'http://172.23.238.188:4444/wd/hub',
  baseUrl: 'http://localhost:3000/#/login',
  specs: ['spec.js'],

  jasmineNodeOpts : {
    onComplete: null,
    isVerbose:false,
    showColors:true,
    includesStackTrace :true,
    defaultTimeoutInterval :30000
  }
};
