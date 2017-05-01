import Ember from 'ember';
import Remarkable from 'remarkable';
import layout from '../templates/components/md-text';

const { computed, HTMLBars } = Ember;

export default Ember.Component.extend({
  layout,

  tagName: '',

  text: '',
  typographer: false,
  linkify: false,
  linkTarget: '',
  html: false,
  extensions: true,
  dynamic: false,
  highlightJsExcluded: Ember.computed(function () {
    let config;
    if (Ember.getOwner) {
      config = Ember.getOwner(this).resolveRegistration('config:environment');
    } else {
      let registry = this.container.registry || this.container._registry;
      config = registry.resolve('config:environment');
    }
    let remarkableConfig = config.remarkable || {};
    return remarkableConfig.excludeHighlightJs || false;
  }),
  highlight: Ember.computed('highlightJsExcluded', function() {
    let highlightJsExcluded = this.get('highlightJsExcluded');
    return function (str, lang) {
      if (!highlightJsExcluded) {
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
      }

      return '';
    };
  }),

  parsedMarkdownUnsafe: computed('text', 'html', 'typographer', 'linkify', 'linkTarget', function () {
    var md = new Remarkable({
      typographer: this.get('typographer'),
      linkify: this.get('linkify'),
      linkTarget: this.get('linkTarget'),
      html: this.get('html'),
      highlight: this.get('highlight')
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
  })
});
