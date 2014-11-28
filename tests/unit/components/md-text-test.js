import Ember from 'ember';

import {
  moduleForComponent,
  test
} from 'ember-qunit';

moduleForComponent('md-text', 'MdTextComponent', {
  // specify the other units that are required for this test
  // needs: ['component:foo', 'helper:bar']
});

test('it renders', function() {
  // creates the component instance
  var component = this.subject();
  equal(component._state, 'preRender');

  // appends the component to the page
  this.append();
  equal(component._state, 'inDOM');
});

test('it displays text', function() {
  var component = this.subject();
  component.set('text', '# Markdown is fun');

  var $component = this.append();
  equal($component.text().trim(), 'Markdown is fun');
});

test('it properly parses the markdown', function() {
  var component = this.subject();
  component.set('text', '# Markdown is fun');

  var $component = this.append();
  equal($component.find('h1').length, 1);
});
