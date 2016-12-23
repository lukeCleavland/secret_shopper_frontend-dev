/**
 * Created by fuiste on 12/5/14.
 */
import RestrictedRoute from '../../restricted';
import Ember from 'ember';

export default RestrictedRoute.extend({
  beforeModel: function(transition) {
    this._super(transition);
    var cont = this.controllerFor('clientell.create.surveys');
    cont.set('model', this.store.all('survey'));
    return Ember.RSVP.Promise.all([this.store.find('shopper')]);
  },
  model: function(){
    return this.store.find('restaurant');
  },
  setupController: function(controller, model){
    controller.set('model', model);
  }
});
