import Ember from 'ember';
import Remarkable from 'remarkable';
import hljs from 'hljs';

export default Ember.Component.extend({
  text: '',
  typographer: false,
  linkify: false,
  highlight: false,

  parsedMarkdown: function() {
    var md = new Remarkable({
      typographer: this.get('typographer'),
      linkify: this.get('linkify'),
      highlight: function(str, lang) {
        if (lang && hljs.getLanguage(lang)) {
          try {
            return hljs.highlight(lang, str).value;
          } catch (err) {}
        }

        try {
          return hljs.highlightAuto(str).value;
        } catch (err) {}

        return '';
      }
    });

    var html = md.render(this.get('text'));
    return new Ember.Handlebars.SafeString(html);
  }.property('text', 'highlight', 'typographer', 'linkify')
});
