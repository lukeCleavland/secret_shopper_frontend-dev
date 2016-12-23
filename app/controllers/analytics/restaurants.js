import Ember from 'ember';

export default Ember.ArrayController.extend({
  needs: ['analytics/date-range', 'analytics/answers', 'auth'],
  auth: Ember.computed.alias('controllers.auth'),
  dateRange: Ember.computed.alias('controllers.analytics/date-range'),
  answers: Ember.computed.alias('controllers.analytics/answers'),
  surveyResultsHaveChanged: function(){
    Ember.run.once(this, 'propagateDatesToRestaurants');
  }.observes('dateRange.startMoment', 'dateRange.stopMoment').on('init'),
  propagateDatesToRestaurants: function(){
    var startDate = this.get('dateRange.startMoment'), stopDate = this.get('dateRange.stopMoment');
    this.get('model').forEach(function(m){
      m.set('startMoment', startDate).set('stopMoment', stopDate);
    });
  },
  completedSurveys: function(){
    return this.get('model').mapBy('assignmentsInRange.length').reduce(function(total, assignmentCount){ return total + assignmentCount; }, 0);
  }.property('model.[]'),
  actions: {
    deleteResult: function(result){
      result.destroyRecord();
    }
  }
});
