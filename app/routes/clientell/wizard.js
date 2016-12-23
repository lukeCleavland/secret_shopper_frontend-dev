import Ember from 'ember';

export default Ember.Route.extend({
  beforeModel: function(transition){
    this._super(transition);
    return Ember.RSVP.Promise.all([this.store.find('category'), this.store.find('scale')]);
  }
});
