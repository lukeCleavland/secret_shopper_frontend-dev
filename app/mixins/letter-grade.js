import Ember from 'ember';

export default Ember.Mixin.create({
  letterGrade: function(){
    var g = this.get('grade');
    return g === -1 ? 'N/A' : g >= 0.95 ? 'A' : g >= 0.89 ? 'A-' : g >= 0.82 ? 'B+' : g >= 0.75 ? 'B' : g >= 0.69 ? 'B-' : g >= 0.62 ? 'C+' : g >= 0.55 ? 'C' : g >= 0.49 ? 'C-' : g >= 0.42 ? 'D+' : g >= 0.35 ? 'D' : g >= 0.29 ? 'D-' : 'F';
  }.property('grade'),
  fivePointLetterGrade: function(){
    var g = this.get('grade');
    return g === -1 ? 'N/A' : g > 0.90 ? 'A' : g > 0.80 ? 'B' : g > 0.60 ? 'C' : g > 0.40 ? 'D' : 'F';
  }.property('grade'),
  fivePointLetterGradeColorCssStyle: function(){
    var gradeColors = ['#d7191c', '#fdae61', '#333', '#a6d96a', '#1a9641'], g = this.get('grade');
    var cssStr = 'color: ';
    return g === -1 ? cssStr + 'inherit' : g > 0.87 ? cssStr + gradeColors[4] : g > 0.67 ? cssStr + gradeColors[3] : g > 0.47 ? cssStr + gradeColors[2] : g > 0.27 ? cssStr + gradeColors[1] : cssStr + gradeColors[0];
  }.property('grade'),
  letterGradeBackgroundColorCssStyle: function(){
    var gradeColors = ['#d7191c', '#fdae61', '#ffffbf', '#a6d96a', '#1a9641'], g = this.get('grade');
    var cssStr = 'background-color: ';
    return g === -1 ? cssStr + 'inherit' : g >= 0.88 ? cssStr + gradeColors[4] : g >= 0.68 ? cssStr + gradeColors[3] : g >= 0.48 ? cssStr + gradeColors[2] : g >= 0.28 ? cssStr + gradeColors[1] : cssStr + gradeColors[0];
  }.property('grade')
});
