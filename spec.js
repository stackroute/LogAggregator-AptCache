describe('Login Page', function() {

  it('Title ', function() {
    browser.ignoreSynchronization = true;
    browser.get('http://localhost:7070/#/login');

    var mainTab =   element(by.css('.login-page h1'));
    expect(browser.getTitle()).toEqual('Tattva');
  });

  it('Logged in ', function() {
    browser.ignoreSynchronization = true;
    browser.get('http://localhost:7070/#/login');

    element(by.model('uName')).sendKeys("abcd");
    element(by.model('pwd')).sendKeys("123456");
    element(by.css('.btn-success.active')).click();
  });

  it('Log listing tab', function(){
    var logListingTab = element.all(by.repeater('tabs in nginxLogTabs').row(0)).click();
    var waitlogListingTab = by.css('.page-header');
    browser.wait(function() {
      return browser.isElementPresent(waitlogListingTab);
    });
    expect(logListingTab.getText()).toContain('Log Listing');
    expect(element(waitlogListingTab).getText()).toEqual('Listing of all requests based on different paths');
  });

  it('User Agent Tab', function(){
    var userAgentTab = element.all(by.repeater('tabs in nginxLogTabs').row(1)).click();
    var waituserAgentTab = by.css('.agent-header');
    browser.wait(function() {
      return browser.isElementPresent(waituserAgentTab);
    });
    expect(userAgentTab.getText()).toContain('User Agent');
    expect(element(waituserAgentTab).getText()).toEqual('This plot gives the Browser and OS shares of the requests');
  });

  it('Traffic Rate', function(){
    var trafficRateTab = element.all(by.repeater('tabs in nginxLogTabs').row(2)).click();
    var waittrafficRateTab = by.id('trafficRate');
    browser.wait(function() {
      return browser.isElementPresent(waittrafficRateTab);
    });
    expect(trafficRateTab.getText()).toContain('Traffic Rate');
    expect(element(waittrafficRateTab).getText()).toEqual('Traffic rates of different types of requests in given time are plotted here');
  });

  it('Request Rate', function(){
    element(by.cssContainingText('li', 'Dashboard')).click();
    var aptLogTab = element.all(by.repeater('value in config.dashboard').row(0)).click();

    var requestRateTab = element.all(by.repeater('tabs in aptLogTabs').row(0)).click();
    var waitrequestRateTab = by.id('RequestRate');
    browser.wait(function() {
      return browser.isElementPresent(waitrequestRateTab);
    });
    expect(requestRateTab.getText()).toContain('Request Rate');
    expect(element(waitrequestRateTab).getText()).toEqual('Apt-log Request rate');
  });

  it('Data rate', function(){
    var dataRateTab = element.all(by.repeater('tabs in aptLogTabs').row(1)).click();
    var waitdataRateTab = by.id('DataRate');
    browser.wait(function() {
      return browser.isElementPresent(waitdataRateTab);
    });
    expect(dataRateTab.getText()).toContain('Data Rate');
    expect(element(waitdataRateTab).getText()).toEqual('Apt-log Data rate');
  });

  it('Package Count tab', function(){
    var packageCountTab = element.all(by.repeater('tabs in aptLogTabs').row(2)).click();
    var waitpackageCountTab = by.id('PackageCount');
    browser.wait(function() {
      return browser.isElementPresent(waitpackageCountTab);
    });
    expect(packageCountTab.getText()).toContain('Package Count');
    expect(element(waitpackageCountTab).getText()).toEqual('Apt-log Package Count');
  });

  it('Package Analytics tab', function(){
    var packageAnalyticsTab = element.all(by.repeater('tabs in aptLogTabs').row(3)).click();
    var waitpackageAnalyticsTab = by.id('PackageAnalytics');
    browser.wait(function() {
      return browser.isElementPresent(waitpackageAnalyticsTab);
    });
    expect(packageAnalyticsTab.getText()).toContain('Package Analytics');
    expect(element(waitpackageAnalyticsTab).getText()).toEqual('Apt-log Package Analytics');
  });

  it('Package Repository tab ', function(){
    var packageRepositoryTab = element.all(by.repeater('tabs in aptLogTabs').row(4)).click();
    var waitpackageRepositoryTab = by.id('PackageRepository');
    browser.wait(function() {
      return browser.isElementPresent(waitpackageRepositoryTab);
    });
    expect(packageRepositoryTab.getText()).toContain('Package Repository');
    expect(element(waitpackageRepositoryTab).getText()).toEqual('Apt-log Package With Repository and Pool');
  });

});
