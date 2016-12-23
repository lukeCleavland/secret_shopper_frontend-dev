/**
 * Created by fuiste on 12/1/14.
 */
import DS from 'ember-data';
import Ember from 'ember';
/* global moment */

export default DS.Model.extend({
  name: DS.attr('string'),
  flavorText: DS.attr('string'),
  showSectionTitles: DS.attr('boolean'),
  sections: DS.hasMany('section'),
  assignments: DS.hasMany('assignment'),
  hidden: DS.attr('boolean'),
  completedAssignments: null,
  startMoment: null,
  stopMoment: null,
  sortedSections: function(){
    return this.get('sections').sortBy('position');
  }.property('sections.@each.position'),
  startAndStopObserver: function(){
    Ember.run.once(this, 'updateSectionGrades');
  }.observes('startMoment', 'stopMoment'),
  surveyResultsInRange: function(){
    var az = this.get('assignments'), stop = this.get('stopMoment'), start = this.get('startMoment');
    return az.mapBy('surveyResult').filter(function(sr){
      var m = moment(sr.get('completedDate'));
      return (m.isBefore(stop, 'day') || m.isSame(stop, 'day')) && (m.isAfter(start, 'day') || m.isSame(start, 'day'));
    });
  }.property('assignments.[]', 'startMoment', 'stopMoment'),
  updateSectionGrades: function(){
    var stop = this.get('stopMoment'), start = this.get('startMoment');
    var srz = this.get('assignments').mapBy('surveyResult').filter(function(sr){
      var m = moment(sr.get('completedDate'));
      return (m.isBefore(stop, 'day') || m.isSame(stop, 'day')) && (m.isAfter(start, 'day') || m.isSame(start, 'day'));
    });
    this.get('sortedSections').forEach(function(s) {
      if (s.get('hasGradedItems')) {
        var sectionGrade = 0.0;
        var matchingResponseGroupsCount = 0.0;
        srz.map(function (sr) {
          var matchingRg = sr.get('responseGroups').filter(function(rg){ return rg.get('gradedResponses.length') && rg.get('subcategory.id') === s.get('subcategory.id');});
          if (matchingRg.get('length')) {
            sectionGrade += matchingRg.objectAt(0).get('grade');
            matchingResponseGroupsCount += 1;
          }
        });
        if (matchingResponseGroupsCount > 0) {
          s.set('grade', sectionGrade / matchingResponseGroupsCount).set('surveyResultCount', matchingResponseGroupsCount);
        } else {
          s.set('grade', -1).set('surveyResultCount', 0);
        }
      } else {
        s.set('grade', -1);
      }
    });
  },
  sectionGradesForBarChart: function(){
    // bar chart needs an array of sections
    // Each section needs a label which will be the subcategory name
    // and a value which will be an int value representing the percentage grade
    return this.get('sortedSections').filterBy('hasGradedItems').map(function(s){
      return {id: s.get('id'), label: s.get('subcategory.name'), grade: s.get('grade'), value: Math.floor(s.get('grade') * 100.0), count: 1};
    });
  }.property('sections.@each.grade')
});
