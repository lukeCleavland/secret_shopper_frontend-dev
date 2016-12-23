import Ember from 'ember';

export default Ember.ObjectController.extend({
  needs: ['analytics/answers'],
  selectedSurveyResults: null,
  answers: Ember.computed.alias('controllers.analytics/answers'),
  surveyResultsHaveChanged: function(){
    Ember.run.once(this, 'updateItemResults');
  }.observes('survey.surveyResultsInRange.@each.selected'),
  updateItemResults: function(){
    var self = this, matchingResponseGroups = [];
    this.get('survey.surveyResultsInRange').filterBy('selected').map(function(sr){
      var matchingGroup = sr.get('responseGroups').filter(function(rg){
        return rg.get('subcategory.id') === self.get('model.subcategory.id');
      })[0];
      matchingGroup.get('responses').filter(function(r){ return !r.get('surveyResult'); }).forEach(function(r){ r.set('surveyResult', sr); });
      matchingResponseGroups = matchingResponseGroups.concat(matchingGroup);
    });
    self.get('model.items').forEach(function(i){
      if (i.get('question.openEnded')) {
        // The OpenEndedData component will want the response objects
        var responses = [];
        matchingResponseGroups.forEach(function(rg){
          var matchingResponse = rg.get('responses').filter(function(r){ return r.get('question.id') === i.get('question.id'); }).objectAt(0);
          responses.push(matchingResponse);
        });
        i.set('responseData', responses);
      } else {
        var answersModel = i.get('question.notApplicable') ? self.get('answers.gradedAnswersWithNotApplicable') : self.get('answers.gradedAnswers');
        var answers = answersModel.map(function(a){ return {id: a.get('id'), text: a.get('text'), grade: a.get('grade'), responses: []}; });
        matchingResponseGroups.forEach(function(rg){
          // Find the response in this group which matches the item
          var matchingResponse = rg.get('responses').filter(function(r){ return r.get('question.id') === i.get('question.id'); }).objectAt(0);
          // Now put it in the appropriate answer slot
          answers.filter(function(a){ return a.id === matchingResponse.get('answer.id'); })[0].responses.push(matchingResponse);
        });
        answers.map(function(a){ a.value = a.responses.length; a.count = a.responses.length; a.label = a.text; });
        i.set('responseData', answers);
      }
    });
  }
});
