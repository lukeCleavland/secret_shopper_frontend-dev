import Ember from 'ember';

export default Ember.Controller.extend({
  needs: ['analytics/date-range', 'auth'],
  auth: Ember.computed.alias('controllers.auth'),
  dateRange: Ember.computed.alias('controllers.analytics/date-range')
});
