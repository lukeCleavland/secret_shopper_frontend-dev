import RestrictedRoute from '../restricted';
import Ember from 'ember';

export default RestrictedRoute.extend({
  beforeModel: function(){
    var self = this;
    if (!this.store.all('assignment').get('length')) {
      Ember.RSVP.Promise.resolve(this.store.find('assignment', {completed_assignments: true}));
    }
    return Ember.RSVP.Promise.all([
    self.store.find('shopper'),
    self.store.find('section'),
    self.store.find('survey'),
      self.store.find('surveyResult',{completed_results: true}),
      self.store.find('response'),
     self.store.find('question'),
     self.store.find('answer'),
      self.store.find('responseGroup'),
      self.store.find('subcategory'),
      self.store.find('item'),
      self.store.find('restaurant')
    ]);
  },
  model: function(){
    return this.store.find('restaurant');
  },
  setupController: function(controller, model){
    controller.set('model', model);
    // Set the model for the Answers controller
    controller.get('answers').set('model', this.store.all('answer'));
  }
});
