import Ember from 'ember';

export default Ember.Component.extend({
  actions: {
    deleteResult: function(result) {
      this.sendAction('action', result);
    }
  }
});
