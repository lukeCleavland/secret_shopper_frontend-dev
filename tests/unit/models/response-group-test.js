import {
  moduleForModel,
  test
} from 'ember-qunit';

moduleForModel('response-group', 'ResponseGroup', {
  // Specify the other units that are required for this test.
  needs: []
});

test('it exists', function() {
  var model = this.subject();
  // var store = this.store();
  ok(!!model);
});
