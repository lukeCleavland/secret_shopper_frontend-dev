import RestrictedRoute from '../../restricted';
import Ember from 'ember';

export default RestrictedRoute.extend({
  beforeModel: function(){
    return Ember.RSVP.Promise.all([this.store.find('category'), this.store.find('subcategory'), this.store.find('question'), this.store.find('scale')]);
  },
  model: function(){
    return this.store.all('category');
  },
  setupController: function(controller, model){
    controller.set('model', model);
  }
});
