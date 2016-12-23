import {
  moduleFor,
  test
} from 'ember-qunit';

moduleFor('controller:analytics', 'AnalyticsController', {
  // Specify the other units that are required for this test.
  needs: ['controller:analytics/date-range']
});

// Replace this with your real tests.
test('it exists', function() {
  var controller = this.subject();
  ok(controller);
});
