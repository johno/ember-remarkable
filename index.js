'use strict';

var path = require('path');

module.exports = {
  name: 'ember-remarkable',

  blueprintsPath: function() {
    return path.join(__dirname, 'blueprints');
  },

  included: function(app) {
    this._super.included(app);
    this.app.import(app.bowerDirectory + '/remarkable/dist/remarkable.js');
    this.app.import(app.bowerDirectory + '/highlightjs/highlight.pack.js');
    this.app.import('vendor/ember-remarkable/shim.js', {
      type: 'vendor',
      exports: { 'remarkable': ['default'] }
    });
    this.app.import('vendor/ember-remarkable/highlightjs-shim.js', {
      type: 'vendor',
      exports: { 'hljs': ['default'] }
    });
  }
};
