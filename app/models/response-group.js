import DS from 'ember-data';
import LetterGradeMixin from "../mixins/letter-grade";

export default DS.Model.extend(LetterGradeMixin, {
  subcategory: DS.belongsTo('subcategory'),
  responses: DS.hasMany('response'),
  position: DS.attr('number'),
  orderedResponses: function(){
    return this.get('responses').sortBy('position');
  }.property('responses.[]'),
  sortByScore: false,
  gradedResponses: function(){
    return this.get('responses').filterBy('isGraded');
  }.property('responses.[]'),
  hasGradedResponses: function(){
    return this.get('gradedResponses.length') > 0;
  }.property('gradedResponses.[]'),
  grade: function(){
    if (!this.get('gradedResponses.length')) {
      return -1;
    }
    var grade = 0.0;
    var gradedResponses = this.get('gradedResponses');
    gradedResponses.mapBy('answer').forEach(function(a){
if (a != null) {
         grade += a.get('grade');
}

    
   
    });
    return grade / (gradedResponses.get('length') * 5.0);
  }.property('gradedResponses.[]'),
  sortedResponses: function(){
    if (this.get('sortByScore')) {
      return this.get('responses').toArray().sort(function(a,b){
        if (a.get('question.openEnded')) {
          return 1;
        } else if (b.get('question.openEnded')) {
          return -1;
        } else {
          return a.get('answer.grade') - b.get('answer.grade');
        }
      });
    } else {
      return this.get('responses').toArray().sort(function(a,b){
        return a.get('position') - b.get('position');
      });
    }
  }.property('responses.[]', 'sortByScore'),
  responseGroupHref: function(){
    return '#' + this.get('responseGroupId');
  }.property('responseGroupId'),
  responseGroupId: function(){
    return 'section-' + this.get('position');
  }.property('position')
});
