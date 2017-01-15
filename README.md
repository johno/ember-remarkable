# ember-remarkable [![Build Status](https://travis-ci.org/johnotander/ember-remarkable.svg?branch=master)](https://travis-ci.org/johnotander/ember-remarkable) [![Ember Observer Score](http://emberobserver.com/badges/ember-remarkable.svg)](http://emberobserver.com/addons/ember-remarkable)

Add [Remarkable](https://github.com/jonschlinkert/remarkable) markdown parsing helpers and
components to your Ember app.

## Installation

```
ember install ember-remarkable
```

## Usage

```hbs
{{md-text
  text        = "# Markdown text!"
  typographer = true
  linkify     = false
}}
```

#### Options

option        | type    | default | security                                             | description
------------- | ------- | ------- | ---------------------------------------------------- | -----------
`text`        | string  |         |                                                      | Markdown content to render
`typographer` | boolean | `false` |                                                      | Whether to enable Remarkable's [typographer](https://github.com/jonschlinkert/remarkable#constructor) option
`linkify`     | boolean | `false` |                                                      | Whether to enable Remarkable's [linkify](https://github.com/jonschlinkert/remarkable#constructor) option
`html`        | boolean | `false` | :warning: [insecure](#warning-security-implications) | Whether to enable Remarkable's [html](https://github.com/jonschlinkert/remarkable#constructor) option
`extensions`  | boolean | `true`  |                                                      | Whether to enable Remarkable's [syntax extensions](https://github.com/jonschlinkert/remarkable#constructor)
`dynamic`     | boolean | `false` | :warning: [insecure](#warning-security-implications) | Whether to enable dynamic template rendering ([see below](#dynamic-template-rendering))


#### Inline multi-line input

When you provide the `text` inline, you can split it into multiple lines like this:

```hbs
<div>
  {{md-text
    text = "
# Hello world

Note that you have to unindent
the multiline `text` content.
    "
  }}
</div>
```

#### Dynamic Template Rendering

By enabling the `dynamic` option you can embed Ember components into your markdown:

```hbs
{{md-text
  text = "{{link-to 'Foo' 'foo'}}"
}}
```

This feature is useful for implementing CMS-like functionality with Ember: it lets your Markdown content to be dynamic and Ember-driven rather than just static HTML.

But this approach is not encouraged by the Ember core team and might be deprecated in the future (though there are no plans to deprecate it as of May 2016).



#### :warning: Security implications

By using the `html` and `dynamic` template options you can make your app vulnerable to [XSS](https://en.wikipedia.org/wiki/Cross-site_scripting).

Use those options **only** if your Markdown content is provided by trusted team members and regular users have no way to update it.



#### Syntax Highlighting

This addon uses [highlight.js](http://highlightjs.org) for syntax highlighting, in order to include it
you just need to use Github style [code-fencing](https://help.github.com/articles/github-flavored-markdown/).
Currently, only the component supports syntax highlighting.

##### Excluding Highlightjs

The use of highlight.js can be disabled by adding the following option to your `config/environment.js`:

```js
remarkable: {
  excludeHighlightJs: true
}
```
    
Setting to `true` will ensure that highlight.js won't  be included in your build.

##### Custom Highlighting

The highlight function, as used by remarkable, can be overriden. To do this, create your own `md-text` component:

```js
import MDTextComponent from 'ember-remarkable/components/md-text';

export default MDTextComponent.extend({ 
  highlight: function(str, lang) {
     return '';
  }
}); 
```

#### Plugins

You can pass plugins to each component instance by providing an array of [plugin functions](https://github.com/jonschlinkert/remarkable/blob/master/docs/plugins.md) in a `plugin` option. 

## Development

### Installation

* `git clone` this repository
* `npm install`
* `bower install`

### Running

* `ember server`
* Visit your app at http://localhost:4200.

### Running Tests

* `ember test`
* `ember test --server`

### Building

* `ember build`

For more information on using ember-cli, visit [http://www.ember-cli.com/](http://www.ember-cli.com/).

## Thanks to the following

* <https://github.com/jonschlinkert/remarkable>
* <http://highlightjs.org>

## License

MIT

## Contributing

1. Fork it
2. Create your feature branch (`git checkout -b my-new-feature`)
3. Commit your changes (`git commit -am 'Add some feature'`)
4. Push to the branch (`git push origin my-new-feature`)
5. Create new Pull Request

***

> Crafted with <3 by [John Otander](http://johnotander.com)([@4lpine](https://twitter.com/4lpine)).
