/**
 * Created by fuiste on 12/10/14.
 */
import Ember from 'ember';
import RestrictedRoute from '../../restricted';

export default RestrictedRoute.extend({
  beforeModel: function(transition){
    this._super(transition);
    return Ember.RSVP.Promise.all([this.store.find('assignment', {completed_assignments: false}), this.store.find('shopper'), this.store.find('survey'), this.store.find('restaurant')]);
  },
  model: function(){
    return this.store.all('assignment');
  },
  setupController: function(controller, model){
    controller.set('model', model);
  }
});
