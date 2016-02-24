describe('Login Page', function() {

  var checkingTabs = function(yearDescription, monthDescription) {
    var YearTab = element(by.id('year_tab')).click();
    var YearTabYearButton = element.all(by.id('dropdownMenu1')).get(1).click();
    var selectYear = element.all(by.repeater("year in info['years']").row(3)).click();
    var description = by.id('Description');
    browser.wait(function() {
      return browser.isElementPresent(description);
    })
    expect(YearTabYearButton.getText()).toContain('2016');
    expect(YearTab.getText()).toContain('Year-wise');
    expect(element(description).getText()).toEqual(yearDescription);

    var MonthTab = element(by.id('month_tab')).click();
    var MonthTabYearButton = element.all(by.id('dropdownMenu1')).get(1).click();
    selectYear = element.all(by.repeater("year in info['years']").row(3)).click();
    var MonthTabMonthButton = element.all(by.id('dropdownMenu3')).click();
    var selectMonth = element.all(by.repeater("month in info['months']").row(1)).click();
    description = by.id('Description');
    browser.wait(function() {
      return browser.isElementPresent(description);
    })
    expect(MonthTabYearButton.getText()).toContain('2016');
    expect(MonthTabMonthButton.getText()).toContain('Feb');
    expect(MonthTab.getText()).toContain('Month-wise');
    expect(element(description).getText()).toEqual(monthDescription);
  }
   browser.driver.manage().window().maximize();

  it('Title ', function() {
    browser.ignoreSynchronization = true;
    browser.get('http://localhost:7070/#/login');

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

    var yearDes = 'This graph shows the number of apt logs grouped by outgoing requests and those cached by the server in all of 2016';
    var monthDes = 'This graph shows the number of apt logs grouped by outgoing requests and those cached by the server in all of Feb in the year 2016';
    checkingTabs(yearDes, monthDes);

  });

  it('Data rate', function(){
    var dataRateTab = element.all(by.repeater('tabs in aptLogTabs').row(1)).click();
    var waitdataRateTab = by.id('DataRate');
    browser.wait(function() {
      return browser.isElementPresent(waitdataRateTab);
    });
    expect(dataRateTab.getText()).toContain('Data Rate');
    expect(element(waitdataRateTab).getText()).toEqual('Apt-log Data rate');

    var yearDes = 'This graph shows the data size of apt logs grouped by outgoing requests and those cached by the server in all of 2016';
    var monthDes = 'This graph shows the data size of apt logs grouped by outgoing requests and those cached by the server in all of Feb in the year 2016';
    checkingTabs(yearDes, monthDes);

  });

  it('Package Count tab', function(){
    var packageCountTab = element.all(by.repeater('tabs in aptLogTabs').row(2)).click();
    var waitpackageCountTab = by.id('PackageCount');
    browser.wait(function() {
      return browser.isElementPresent(waitpackageCountTab);
    });
    expect(packageCountTab.getText()).toContain('Package Count');
    expect(element(waitpackageCountTab).getText()).toEqual('Apt-log Package Count');

    var yearDes = 'This table shows the number of apt logs cached by the server organized by package details for all of 2016';
    var monthDes = 'This table shows the number of apt logs cached by the server organized by package details for all of Feb in the year 2016';
    checkingTabs(yearDes, monthDes);

  });

  it('Package Analytics tab', function(){
    var packageAnalyticsTab = element.all(by.repeater('tabs in aptLogTabs').row(3)).click();
    var waitpackageAnalyticsTab = by.id('PackageAnalytics');
    browser.wait(function() {
      return browser.isElementPresent(waitpackageAnalyticsTab);
    });
    expect(packageAnalyticsTab.getText()).toContain('Package Analytics');
    expect(element(waitpackageAnalyticsTab).getText()).toEqual('Apt-log Package Analytics');

    var yearDes = 'This table shows the number of apt logs cached by the server organized by package and operating system for all of 2016';
    var monthDes = 'This table shows the number of apt logs cached by the server organized by package and operating system for all of Feb in the year 2016';
    checkingTabs(yearDes, monthDes);

  });

  it('Package Repository tab ', function(){
    var packageRepositoryTab = element.all(by.repeater('tabs in aptLogTabs').row(4)).click();
    var waitpackageRepositoryTab = by.id('PackageRepository');
    browser.wait(function() {
      return browser.isElementPresent(waitpackageRepositoryTab);
    });
    expect(packageRepositoryTab.getText()).toContain('Package Repository');
    expect(element(waitpackageRepositoryTab).getText()).toEqual('Apt-log Package With Repository and Pool');

    element(by.css('.fa-power-off')).click();
    var mainTab =   by.css('.login-page h1');
    browser.wait(function() {
      return browser.isElementPresent(mainTab);
    });
    expect(browser.getTitle()).toEqual('Tattva');
  });

});
