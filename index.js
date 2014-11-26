'use strict';

var path = require('path');

module.exports = {
  name: 'ember-remarkable',

  blueprintsPath: function() {
    return path.join(__dirname, 'blueprints');
  },

  included: function(app) {
    this._super.included(app);
    this.app.import(app.bowerDirectory + 'remarkable/remarkable.js');
  }
};
