import Ember from 'ember';
import RestrictedRoute from '../../restricted';

export default RestrictedRoute.extend({
  beforeModel: function(transition){
    this._super(transition);
    // Models that are required for the app:
    // Restaurant, Sections, Surveys, Assignments, SurveyResults, Responses,
    // Questions, Answers, ResponseGroups, Subcategories, Items
    // If any of these are missing, it's likely that a person is following a link to a completed Survey
    // So, load everything in case they want to keep using the app
    var necessaryModels = ['restaurant', 'section', 'survey', 'assignment', 'surveyResult', 'response', 'question', 'answer', 'responseGroup', 'subcategory', 'item'];
    var allModelsLoaded = true;
    var self = this;
    for (var i = 0, l = necessaryModels.length; i < l; i++) {
      if (!self.store.all(necessaryModels[i]).get('length')) {
        allModelsLoaded = false;
        break;
      }
    }
    if (!allModelsLoaded) {
      return Ember.RSVP.Promise.all([
        this.store.find('restaurant'),
        this.store.find('shopper'),
        this.store.find('section'),
        this.store.find('assignment', {completed_assignments: true}),
        this.store.find('survey'),
        this.store.find('surveyResult', {completed_results: true}),
        this.store.find('response'),
        this.store.find('question'), this.store.find('answer'),
        this.store.find('responseGroup'),
        this.store.find('subcategory'), this.store.find('item')
      ]);
    }
  },
  model: function(params){
    return this.store.recordForId('surveyResult', params.survey_result_id);
  },
  setupController: function(controller, model){
    controller.set('model', model);
    Ember.run.once(controller, 'propagateSortTypeToResponseGroups');
  }
});
