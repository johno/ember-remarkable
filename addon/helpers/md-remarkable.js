import Ember from 'ember';

export function mdRemarkable(markdownInput) {
  var md = new Remarkable();
  return new Ember.Handlebars.SafeString(md.render(markdownInput));
}

export default Ember.Handlebars.makeBoundHelper(mdRemarkable);
