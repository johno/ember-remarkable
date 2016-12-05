import Ember from 'ember';
import Remarkable from 'remarkable';
import hljs from 'hljs';
import layout from '../templates/components/md-text';

const {computed, HTMLBars} = Ember;

export default Ember.Component.extend({
  layout,

  tagName: '',

  text: '',
  typographer: false,
  linkify: false,
  html: false,
  extensions: true,
  dynamic: false,

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

    let plugins = this.get('plugins');
    if (plugins) {
      plugins.forEach((plugin) => md.use(plugin));
    }

    return md.render(this.get('text'));
  }),

  parsedMarkdown: computed('parsedMarkdownUnsafe', function () {
    const parsedMarkdownUnsafe = this.get('parsedMarkdownUnsafe');
    return new Ember.String.htmlSafe(parsedMarkdownUnsafe);
  }),

  precompiledTemplate: computed('parsedMarkdownUnsafe', function () {
    const parsedMarkdownUnsafe = this.get('parsedMarkdownUnsafe');
    return HTMLBars.compile(parsedMarkdownUnsafe, false);
  }),
});
