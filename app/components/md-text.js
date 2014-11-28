import Ember from 'ember';
import Remarkable from 'remarkable';

export default Ember.Component.extend({
  text: '',
  typographer: false,
  linkify: false,

  parsedMarkdown: function() {
    var md = new Remarkable(this.get('buildOptions'));
    var html = md.render(this.get('text'));

    return new Ember.Handlebars.SafeString(html);
  }.property('text'),

  buildOptions: function() {
    return {
      typographer: this.get('typographer'),
      linkify: this.get('linkify')
    };
  }.property('typographer', 'linkify', 'html')
});
