import Ember from 'ember';
import Remarkable from 'remarkable';

export function mdRemarkable(arg) {
  var markdownInput = arg[0];
  var md = new Remarkable();
  return new Ember.Handlebars.SafeString(md.render(markdownInput));
}

export default Ember.Helper.helper(mdRemarkable);
