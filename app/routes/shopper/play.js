/**
 * Created by fuiste on 12/10/14.
 */
import Ember from 'ember';

export default Ember.Route.extend({
  queryParams: {
    resultId: {
      refreshModel: true
    }
  },
  beforeModel: function(params) {
    return Ember.RSVP.Promise.all([
      this.store.find('section'),
      this.store.find('survey'),
      this.store.find('scale'),
      this.store.find('item'),
      this.store.find('subcategory'),
      this.store.find('question'),
      this.store.find('assignment'),
      this.store.find('answer'),
      this.store.find('response', {survey_result: params['resultId']}),
      this.store.find('responseGroup', {response_group: params['resultId']})
    ]);
  },
  model: function(params) {
    return this.store.find('surveyResult', params['resultId']);
  },
  setupController: function(controller, model){
    if (model.get('done')){this.transitionTo('shopper.complete');}
    var self = this;
    if(!(model.get('initialized'))){
      model.get('assignment.survey.sections').forEach(function(s){
        var grp = self.store.createRecord('responseGroup', {subcategory: s.get('subcategory'), position: s.get('position')});
        s.get('items').forEach(function(i){
          grp.get('responses').pushObject(self.store.createRecord('response', {question: i.get('question'), position: i.get('position')}));
        });
        model.get('responseGroups').pushObject(grp);
      });
      model.set('initialized', true);
    }

    controller.set('model', model);
  }
});
