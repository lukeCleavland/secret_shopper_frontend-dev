import Ember from 'ember';

export default Ember.Controller.extend({
  needs: ['auth', 'application'],
  auth: Ember.computed.alias('controllers.auth'),
  application: Ember.computed.alias('controllers.application')
});
