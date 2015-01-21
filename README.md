# Ember Remarkable

[![Build Status](https://travis-ci.org/johnotander/ember-remarkable.svg?branch=master)](https://travis-ci.org/johnotander/ember-remarkable)

Add [Remarkable](https://github.com/jonschlinkert/remarkable) markdown parsing helpers and
components to your Ember app.

Integrates with [ember-cli](http://ember-cli.com).

## Installation

```
npm i --save-dev ember-remarkable
ember g ember-remarkable
```

## Usage

### The helper

```hbs
{{md '# Markdown text!'}}
```

### The component

```hbs
{{md-text text="# Markdown text!" typographer=true linkify=false}}
```

Options:

* [Typographer](https://github.com/jonschlinkert/remarkable#constructor)
* [Linkify](https://github.com/jonschlinkert/remarkable#constructor)

#### Syntax Highlighting

This addon uses [highlight.js](http://highlightjs.org) for syntax highlighting, in order to include it
you just need to use Github style [code-fencing](https://help.github.com/articles/github-flavored-markdown/).
Currently, only the component supports syntax highlighting.

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

## License

MIT

## Contributing

1. Fork it
2. Create your feature branch (`git checkout -b my-new-feature`)
3. Commit your changes (`git commit -am 'Add some feature'`)
4. Push to the branch (`git push origin my-new-feature`)
5. Create new Pull Request

Crafted with <3 by [John Otander](http://johnotander.com)([@4lpine](https://twitter.com/4lpine)).
