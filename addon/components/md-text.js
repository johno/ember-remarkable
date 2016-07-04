import Ember from 'ember';
import Remarkable from 'remarkable';
import hljs from 'hljs';

const {computed, HTMLBars} = Ember;

export default Ember.Component.extend({
  tagName: '',

  text: '',
  typographer: false,
  linkify: false,
  html: false,
  extensions: true,
  dynamic: false,
  usePlugins: null,

  parsedMarkdownUnsafe: computed('text', 'html', 'typographer', 'linkify', function() {
    var md = new Remarkable({
      typographer: this.get('typographer'),
      linkify:     this.get('linkify'),
      html:        this.get('html'),

      highlight: function (str, lang) {
        if (lang === 'text' || lang === 'no-highlight') {
          return '';
        }

        if (lang && hljs.getLanguage(lang)) {
          try {
            return hljs.highlight(lang, str).value;
          } catch (err) {
          }
        }

        try {
          return hljs.highlightAuto(str).value;
        } catch (err) {
        }

        return '';
      }
    });

    if (this.get('extensions')) {
      md.core.ruler.enable([
        'abbr'
      ]);
      md.block.ruler.enable([
        'footnote',
        'deflist'
      ]);
      md.inline.ruler.enable([
        'footnote_inline',
        'ins',
        'mark',
        'sub',
        'sup'
      ]);
    }

    let config = Ember.getOwner(this).resolveRegistration('config:environment');
    if (config.emberRemarkable.plugins !== false) {
      let usePlugins = this.get('usePlugins');
      config.emberRemarkable.plugins.forEach(function(plugin) {
        if (usePlugins == null || usePlugins.indexOf(plugin.name) !== -1) {
          md.use(plugin.plugin);
        }
      });
    }

    return md.render(this.get('text'));
  }),

  parsedMarkdown: computed('parsedMarkdownUnsafe', function () {
    const parsedMarkdownUnsafe = this.get('parsedMarkdownUnsafe');
    return new Ember.Handlebars.SafeString(parsedMarkdownUnsafe);
  }),

  precompiledTemplate: computed('parsedMarkdownUnsafe', function () {
    const parsedMarkdownUnsafe = this.get('parsedMarkdownUnsafe');
    return HTMLBars.compile(parsedMarkdownUnsafe, false);
  }),
});
