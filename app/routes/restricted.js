import Ember from 'ember';

export default Ember.Route.extend({
  beforeModel: function(transition) {
    if (!this.controllerFor('auth').get('hasValidToken')) {
      this.controllerFor('auth').set('attemptedTransition', transition).set('unauthorized', true);
      this.transitionTo('auth');
    }
  },
  actions: {
    showLearnMoreModal: function(){
      Ember.$('#learn-more-modal').modal('show');
    }
  }
});
