/**
 * Created by fuiste on 12/10/14.
 */
import Ember from 'ember';

export default Ember.ArrayController.extend({
 sortProperties: ['createdDate'],
  sortAscending: true,
   sortedContent: (function() {
    var content;
    content = this.get("content") || [];
    return Ember.ArrayProxy.createWithMixins(Ember.SortableMixin, {
      content: content.toArray(),
      sortProperties: this.get('sortProperties'),
      sortAscending: this.get('sortAscending')
    });
  }).property("content.@each", 'sortProperties', 'sortAscending'),

  doSort: function(sortBy) {
    var previousSortBy;
    previousSortBy = this.get('sortProperties.0');
    if (sortBy === previousSortBy) {
      return this.set('sortAscending', !this.get('sortAscending'));
    } else {
      set('sortAscending', true);
      return this.set('sortProperties', [sortBy]);
    }
  },
  actions: {
    /**
     * Create and save a new SurveyResult, triggering the notification of the shopper of their survey.
     *
     * @param assignment the assignment to build the result from.
     */

    sendSurvey: function(assignment){
      this.store.createRecord('surveyResult', {assignment: assignment, done: false}).save().then(function(){
        Ember.$('#sent-modal').modal('show');
      });
    }
  }
});
