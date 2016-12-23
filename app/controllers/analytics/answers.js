import Ember from 'ember';

export default Ember.ArrayController.extend({
  gradedAnswers: function(){
    // -1 is the value for the N/A answer in the DB
    return this.get('model').filter(function(a){ return a.get('grade') > -1; });
  }.property('model'),
  gradedAnswersWithNotApplicable: function(){
    return this.get('model');
  }.property('model')
});
