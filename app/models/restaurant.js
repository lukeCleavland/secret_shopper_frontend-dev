import DS from 'ember-data';
import Ember from 'ember';
/* global  moment */

export default DS.Model.extend({
  name: DS.attr('string'),
  assignments: DS.hasMany('assignment'),
  startMoment: null,
  stopMoment: null,
  startAndStopMomentObserver: function(){
    Ember.run.once(this, 'propagateDatesToSurveys');
  }.observes('startMoment', 'stopMoment'),
  propagateDatesToSurveys: function(){
    var start = this.get('startMoment'), stop = this.get('stopMoment');
    this.get('assignments').mapBy('survey').forEach(function(s){
      s.set('startMoment', start).set('stopMoment', stop);
    });
  },
  assignmentsInRange: function(){
    var start = this.get('startMoment'), stop = this.get('stopMoment');
    return this.get('assignments').filter(function(a){
      var cd = a.get('surveyResult.completedDate'), m = moment(cd);
      return (m.isBefore(stop, 'day') || m.isSame(stop, 'day')) && (m.isAfter(start, 'day') || m.isSame(start, 'day'));
    });
  }.property('startMoment', 'stopMoment'),
  surveyCount: function(){
    return this.get('assignmentsInRange.length');
  }.property('assignmentsInRange.[]'),
  noSurveys: function(){
    return !this.get('surveyCount.length');
  }.property('surveyCount'),
  surveysInRange: function(){
    var air = this.get('assignmentsInRange'), surveysInRange = [], seenSurveyIds = [];
    air.mapBy('survey').forEach(function(s){
      if (seenSurveyIds.indexOf(s.get('id')) === -1) {
        s.set('completedAssignments', 1);
        seenSurveyIds.push(s.get('id'));
        surveysInRange.push(s);
      } else {
        s.incrementProperty('completedAssignments');
      }
    });
    return surveysInRange;
  }.property('assignmentsInRange.[]'),
  surveyResultsInRange: function(){
    var air = this.get('assignmentsInRange'), surveyResultsInRange = [];
    air.mapBy('surveyResult').forEach(function(sr){
      surveyResultsInRange.push(sr);
    });
    return surveyResultsInRange;
  }.property('assignmentsInRange.[]')
});
