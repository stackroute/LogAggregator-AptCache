
// describe('Login Page', function() {
//   it('should have title as ', function() {
//     browser.ignoreSynchronization = true;
//     browser.get('http://localhost:7070/#/login');
//
//     // var mainTab =   element(by.id('qwerty'));
//     var mainTab =   element(by.css('.login-page'));
//     console.log("**************** "+ Object.keys(mainTab));
//
//     expect(browser.getTitle()).toEqual('Tattva');
//     expect(mainTab.getText()).toEqual('Analyze logs better !');
//   });
// });


describe('Login page ', function() {


  it('logged in ', function() {
    browser.ignoreSynchronization = true;
    browser.get('http://localhost:7070/#/login');

    // var userName = element(by.model('uName'));
    // var password = element(by.model('pwd'));
    // var loginButton = element(by.css('.btn-success.active'));
    // var latestResult = element(by.binding('selectedTab'));
    // var pageHeader = element(by.css('page-header'));

    element(by.model('uName')).sendKeys("abcd");
    element(by.model('pwd')).sendKeys("123456");
    element(by.css('.btn-success.active')).click();
    console.log(element(by.css('.tab-pane small')).getText());
// expect(element(by.css('.page-header')).getText()).toEqual('Listing of all requests based on different paths');
    // expect(element(by.binding('selectedTab')).getText()).toEqual('Log Listing');
  });
});
