// Karma configuration file, see link for more information
// https://karma-runner.github.io/1.0/config/configuration-file.html

module.exports = function (config) {
  config.set({
    basePath: '',
    frameworks: ['jasmine', '@angular-devkit/build-angular'],
    plugins: [
      require('karma-jasmine'),
      require('karma-chrome-launcher'),
      require('karma-jasmine-html-reporter'),
      require('karma-junit-reporter'),
      require('@angular-devkit/build-angular/plugins/karma')
    ],
  reporters: ['junit'],    
    junitReporter: { 
	  outputDir: 'karma-results',    
	  outputFile: 'karma-results.xml',
	  suite: '', // suite will become the package name attribute in xml testsuite element
	  useBrowserName: true, // add browser name to report and classes names
	  nameFormatter: undefined, // function (browser, result) to customize the name attribute in xml testcase element
	  classNameFormatter: undefined, // function (browser, result) to customize the classname attribute in xml testcase element
	  properties: {}, // key value pair of properties to add to the <properties> section of the report
	  xmlVersion: null // use '1' if reporting to be per SonarQube 6.2 XML format	    
    },
    angularCli: {
      environment: 'dev',
    },
    port: 9876,
    logLevel: config.LOG_INFO,
  browsers: ['ChromeHeadless'],    
  autoWatch: false,    
  singleRun: true    
  });
};

