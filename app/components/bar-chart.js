import Ember from 'ember';
/* global d3 */
/* global BarChart */
import LetterGradeMixin from '../mixins/letter-grade';

export default Ember.Component.extend(LetterGradeMixin, {
  initialized: false,
  chart: null,
  tooltipText: null,
  showGrade: false,
  showUngraded: false,
  percentageColorScale: false,
  didInsertElement: function(){
    Ember.run.once(this, 'update');
  },
  update: function(){
    if (!this.get('initialized')) {
      var width = this.$('.chart').width();
      this.set('chart', new BarChart().width(width).tooltipText(this.get('tooltipText')));
      if (this.get('percentageColorScale')) {
        // The fill accessor should look at the value contained and set the color based on that
        var colorScale = this.get('chart').colorScale();
        colorScale.domain(['F','D','C','B','A']);
        this.get('chart').colorScale(colorScale);
        this.get('chart').fillAccessor(function(d){
          var grade = d.value >= 90 ? 'A' : d.value >= 80 ? 'B' : d.value >= 70 ? 'C' : d.value >= 60 ? 'D' : 'F';
          return colorScale(grade);
        });
      }
      this.set('initialized', true);
    }
    d3.select(this.$('.chart')[0])
      .datum(this.get('data'))
      .call(this.get('chart'));
  }.observes('data'),
  grade: function(){
    var answersGiven = 0.0, totalSum = 0.0;
    this.get('data').forEach(function(d){
      if (d.count && d.grade !== -1) {
        answersGiven += d.count;
        totalSum += (d.grade * d.count);
      }
    });
    return answersGiven ? totalSum / (answersGiven * 5.0) : -1;
  }.property('data')
});
