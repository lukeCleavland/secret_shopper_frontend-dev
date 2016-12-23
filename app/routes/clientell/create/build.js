/**
 * Created by fuiste on 12/1/14.
 */
import RestrictedRoute from '../../restricted';
import Ember from 'ember';

export default RestrictedRoute.extend({
  beforeModel: function(transition){
    this._super(transition);
    return Ember.RSVP.Promise.all([this.store.find('section'), this.store.find('survey'), this.store.find('item'), this.store.find('category'), this.store.find('subcategory'), this.store.find('question')]);
  },
  model: function(){
    return this.store.find('category');
  },
  setupController: function(controller, model){
    controller.set('model', model);
  }
});
