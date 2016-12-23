/**
 * Created by fuiste on 12/5/14.
 */
import Ember from 'ember';
import RestrictedRoute from '../../restricted';

export default RestrictedRoute.extend({
  beforeModel: function(transition) {
    this._super(transition);
    return Ember.RSVP.Promise.all([this.store.find('section'), this.store.find('survey'), this.store.find('item')]);
  },
  redirect: function(){
    this.transitionTo('clientell.assign.new');
  }
});
