import Ember from 'ember';
import { mdRemarkable } from 'ember-remarkable/helpers/md-remarkable';

export function initialize(/* container, application */) {
  Ember.Handlebars.helper('md', mdRemarkable);
};

export default {
  name: 'ember-remarkable',
  initialize: initialize
};
