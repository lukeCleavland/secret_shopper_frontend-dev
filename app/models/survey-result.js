import DS from 'ember-data';
/* global moment */
import LetterGradeMixin from "../mixins/letter-grade";


export default DS.Model.extend(LetterGradeMixin, {
  completedDate: DS.attr('isodate'),
  initialized: DS.attr('boolean'),
  responseGroups: DS.hasMany('responseGroup'),
  assignment: DS.belongsTo('assignment'),
  done: DS.attr('boolean'),
  orderedResponseGroups: function(){
    return this.get('responseGroups').sortBy('position');
  }.property('responseGroups.[]'),
  shortFormattedDate: function(){
    var cd = this.get('completedDate'), m = moment(cd);
    return m.format('MM/DD/YY');
  }.property('completedData'),
  formattedDate: function(){
    var cd = this.get('completedDate'), m = moment(cd);
    return m.format('MM/DD/YYYY');
  }.property('completedDate'),
  grade: function(){
    var gradeSum = 0.0, gradedResponseGroups = 0;
    this.get('responseGroups').forEach(function(rg){
      if (rg.get('gradedResponses.length')) {
        gradeSum += rg.get('grade');
        gradedResponseGroups += 1;
      }
    });
    return gradedResponseGroups > 0 ? gradeSum / gradedResponseGroups : null;
  }.property('responseGroups.[]'),
  selected: true,
  responseGroupGradesForBarChart: function(){
    return this.get('orderedResponseGroups').filterBy('hasGradedResponses').map(function(rg){
      return {id: rg.get('id'), label: rg.get('subcategory.name'), grade: rg.get('grade'), count: rg.get('responses.length'), value: Math.floor(rg.get('grade') * 100.0)};
    });
  }.property('responseGroups.@each.grade')
});
