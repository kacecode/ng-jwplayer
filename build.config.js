module.exports = {
  build_dir: 'build',
  compile_dir: 'bin',

  app_files: {
    js: ['src/**/*.js', '!*.spec.js', '!src/assets/**/*.js'],
    jsunit: ['src/**/*.spec.js'],
    
    coffee: ['src/**/*.coffee', '!src/**/*.spec.coffee'],
    coffeeunit: ['src/**/*.spec.coffee'],

    html: ['src/index.html'],
  },

  test_files: {
    js: [ 'vendor/angular-mocks/angular-mocks.js' ]
  },

  vendor_files: {
    js: [
      'vendor/angular/angular.js',
    ],
    css: [],
    assets: []
  }
};
