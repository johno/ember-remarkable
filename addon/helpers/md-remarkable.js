import Ember from 'ember';

export function mdRemarkable(input) {
  return input;
}

export default Ember.Handlebars.makeBoundHelper(mdRemarkable);
