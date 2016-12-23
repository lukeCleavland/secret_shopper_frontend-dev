import Ember from 'ember';

export default Ember.ObjectController.extend({
  needs: ['analytics/date-range'],
  dateRange: Ember.computed.alias('controllers.analytics/date-range'),
  surveyResultsHaveChanged: function(){
    Ember.run.once(this, 'propagateDatesToSurvey');
  }.observes('dateRange.start', 'dateRange.stop').on('init'),
  propagateDatesToSurvey: function(){
    var startDate = this.get('dateRange.startMoment'), stopDate = this.get('dateRange.stopMoment');
    this.get('model').set('startMoment', startDate).set('stopMoment', stopDate);
  }
});
