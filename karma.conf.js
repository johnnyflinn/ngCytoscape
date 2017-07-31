module.exports = function(config){
  config.set({

    basePath : '',
    browserDisconnectTimeout: 6000,
    reporters: ['progress', 'html'],
    files : [
      'bower_components/angular/angular.js',
      'bower_components/angular-route/angular-route.js',
      'bower_components/angular-mocks/angular-mocks.js',
      'bower_components/cytoscape//dist/cytoscape.js',
      'src/directives/*.js',
      'src/services/*.js'
    ],

    autoWatch : true,

    frameworks: ['jasmine'],

    // browsers : ['Chrome'],

    plugins : [
            'karma-chrome-launcher',
            'karma-firefox-launcher',
            'karma-jasmine',
            'karma-junit-reporter',
            'karma-htmlfile-reporter'
            ],
    htmlReporter:{
      outputFile: 'tests_out/test_unit.html'
    },
    junitReporter : {
      outputFile: 'test_out/test_unit.xml',
      suite: 'unit'
    }

  });
};
