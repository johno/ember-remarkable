'use strict';

var path = require('path');

module.exports = {
  name: 'ember-remarkable',

  blueprintsPath: function() {
    return path.join(__dirname, 'blueprints');
  },

  config: function(/*environment, appConfig*/) {
    return {
      remarkable: {
        excludeHighlightJs: false
      }
    }
  },

  included: function(app) {
    this._super.included.apply(this, arguments);

    var bowerDirectory = this.project.bowerDirectory;
    var importContext;

    if (this.import) {  // support for ember-cli >= 2.7
      importContext = this;
    } else { // addon support for ember-cli < 2.7
      importContext = this._findHostForLegacyEmberCLI();
    }

    var env = app.env;
    var config = this.project.config(env || 'development');
    var remarkableConfig = config.remarkable || {}
    var excludeHighlightJs = remarkableConfig.excludeHighlightJs;

    importContext.import(bowerDirectory + '/remarkable/dist/remarkable.js');
    if (!excludeHighlightJs) {
      importContext.import(bowerDirectory + '/highlightjs/highlight.pack.js');
    }
    importContext.import('vendor/ember-remarkable/shim.js', {
      type: 'vendor',
      exports: { 'remarkable': ['default'] }
    });
  },

  // included from https://git.io/v6F7n
  // not needed for ember-cli > 2.7
  _findHostForLegacyEmberCLI: function() {
    var current = this;
    var app;

    // Keep iterating upward until we don't have a grandparent.
    // Has to do this grandparent check because at some point we hit the project.
    do {
      app = current.app || app;
    } while (current.parent.parent && (current = current.parent));

    return app;
  }
};
