import {
  mdRemarkable
} from 'ember-remarkable/helpers/md-remarkable';

module('MdRemarkableHelper');

test('it correctly converts markdown to html', function() {
  var result = mdRemarkable('# This should be a h1');
  equal(result.toString().trim(), '<h1>This should be a h1</h1>');
});
