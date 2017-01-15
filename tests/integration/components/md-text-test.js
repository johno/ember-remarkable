import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('md-text', 'Integration | Component | md text', {
  integration: true
});

test('it renders', function(assert) {
  this.render(hbs`{{md-text text="# An awesome h1!"}}`);
  assert.equal(this.$().text().trim(), 'An awesome h1!');
});

test('it parses markdown', function(assert) {
  this.render(hbs`{{md-text text="# An awesome h1!"}}`);
  assert.equal(this.$('h1').text().trim(), 'An awesome h1!');
});

test('it correctly creates a link from a url', function(assert) {
  this.render(hbs`{{md-text text='# Markdown is fun www.google.com' linkify=true}}`);
  assert.equal(this.$().find('a').length, 1);
});

test('it does not render html when the html option is set to false', function(assert) {
  this.render(hbs`{{md-text text="<abbr>Cool</abbr>"}}`);
  assert.equal(this.$().find('abbr').length, 0);
});

test('it renders html when the html option is set to true', function(assert) {
  this.render(hbs`{{md-text text="<abbr>Cool</abbr>" html=true}}`);
  assert.equal(this.$().find('abbr').length, 1);
});

test('it renders with syntax highlighting when a language is specified', function(assert) {
  this.render(hbs`{{md-text text='# Markdown is fun\n \`\`\`js\nvar awesome = require("awesome");\`\`\`'}}`);
  assert.ok(this.$().find('.language-js').length);
});

test('it allows to override the highlight function', function(assert) {
  this.set('highlight', function(str) {
    return `<h1>${str}</h1>`;
  });
  this.render(hbs`{{md-text highlight=highlight text='\`\`\`text\nCustom highlighting\n\`\`\`'}}`);
  assert.ok(this.$().find('code').find('h1').length);
});

test('it renders text without highlights', function(assert) {
  this.render(hbs`{{md-text text='\`\`\`text\nvar awesome = require("awesome");\`\`\`'}}`);
  assert.equal(this.$().find('.hljs-keyword').length, 0);
});

test('it renders text with highlights when highlight.js is not excluded', function(assert) {
  this.render(hbs`{{md-text text='\`\`\`js\nvar awesome = require("awesome");\`\`\`'}}`);
  assert.ok(this.$().find('.hljs-keyword').length > 0);
});

test('it renders text without highlights when highlight.js is excluded', function(assert) {
  this.render(hbs`{{md-text highlightJsExcluded=true text='\`\`\`js\nvar awesome = require("awesome");\`\`\`'}}`);
  assert.equal(this.$().find('.hljs-keyword').length, 0);
});

test('it renders a dynamic template', function(assert) {
  this.tpl = "{{link-to 'root' 'Foo'}} <a href>Bar</a>";
  this.render(hbs`{{md-text text=tpl html=true dynamic=true}}`);
  assert.equal(this.$().find('a').length, 2); // should have both dynamic and static link
});

test('it renders a video with plugin', function(assert) {
  let reg = /^%\[([^\]]*)\]\s*\(([^)]+)\)/;

  this.plugins = [
    function video(md, options) {
      md.inline.ruler.push('video', function (state, silent) {
        // it is surely not our rule, so we could stop early
        if (state.src[state.pos] !== '%') {
          return false;
        }

        var match = reg.exec(state.src.slice(state.pos));
        if (!match) {
          return false;
        }

        // in silent mode it shouldn't output any tokens or modify pending
        if (!silent) {
          state.push({
            type: 'video',
            title: match[1],
            src: match[2].replace('/watch?v=', '/embed/'),
            level: state.level,
          });
        }

        // every rule should set state.pos to a position after token's contents
        state.pos += match[0].length;

        return true;
      }, options);

      md.renderer.rules.video = function (tokens, idx/*, options, env*/) {
        return `<iframe width="560" height="315" src="${tokens[idx].src}" frameborder="0"></iframe>`;
      };
    }
  ];

  this.render(hbs`{{md-text text='%[Test video](https://www.youtube.com/watch?v=OInJBwS8VDQ)' plugins=plugins}}`);
  assert.equal(this.$().find('iframe').length, 1);
});
