/**
 * Created by fuiste on 12/1/14.
 */
import Ember from 'ember';

export default Ember.Controller.extend({
  needs: ['clientell/create/build', 'auth'],
  build: Ember.computed.alias('controllers.clientell/create/build'),
  actions: {
    /**
     * init a new survey record and transition to the build route.
     */
    newSurvey: function(){
      this.set('build.currentSurvey', this.store.createRecord('survey', {showSectionTitles: true}));
      this.transitionToRoute('clientell.create.build');
    },
    /**
     * Builds a new survey from an existing survey, sets it to the 'under construction' survey, then transitions to build route.
     *
     * @param survey
     */
    initializeSurveyFromExisting: function(survey){
      var self = this;
      var newSurvey = this.store.createRecord('survey', {showSectionTitles: survey.get('showSectionTitles')});
      survey.get('sections').forEach(function(s){
        var newSection = self.store.createRecord('section', {subcategory: s.get('subcategory'), position: s.get('position')});
        s.get('items').forEach(function(i){
          newSection.get('items').pushObject(self.store.createRecord('item', {question: i.get('question'), position: i.get('position')}));
        });
        newSurvey.get('sections').pushObject(newSection);
      });
      this.set('build.currentSurvey', newSurvey);
      this.transitionToRoute('clientell.create.build');
    },
    /**
     * Removes a survey form Clientell, but keeps it around on the back end for results.
     *
     * @param survey the survey to remove
     */
    hideSurvey: function(survey){
    if (confirm("want to delete?")) {
           survey.set('hidden', true);
      survey.save();
    }

    }
  }
});
