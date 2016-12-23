import Ember from 'ember';

export default Ember.Mixin.create({
  answerColorCssStyle: function(){
    if (this.get('isGraded')) {
      var gradeColors = ['#d7191c', '#fdae61', '#ffffbf', '#a6d96a', '#1a9641'];
      var g = this.get('answer.grade');
      return 'background-color: ' + gradeColors[g-1];
    } else if (this.get('question.openEnded')) {
      return 'background-color: #d9edf7';
    } else {
      return '';
    }
  }.property('answer', 'isGraded', 'question')
});
