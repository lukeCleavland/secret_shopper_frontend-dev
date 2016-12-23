/**
 * Created by fuiste on 12/1/14.
 */
import RestrictedRoute from '../../restricted';
import Ember from 'ember';

export default RestrictedRoute.extend({
  /**
   * ALL models relevant to this route are loaded in on the index route to speed up interaction with the survey creation.
   */
  beforeModel: function(transition){
    this._super(transition);
    return Ember.RSVP.Promise.all([this.store.find('section'), this.store.find('survey')]);
  },
  model: function(){
    return this.store.all('survey');
  },
  afterModel: function() {
    this.store.all('subcategory').forEach(function (s) {
      s.set('addedToSurvey', false);
    });
  },
  setupController: function(controller, model){
    controller.set('model', model);
  }
});
