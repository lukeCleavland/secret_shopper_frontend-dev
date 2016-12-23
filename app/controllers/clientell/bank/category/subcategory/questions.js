import Ember from 'ember';

export default Ember.Controller.extend({
  needs: ['clientell/bank/categories', 'clientell/bank/category/subcategories'],
  questionParentCategory: null,
  questionParentSubcategory: null,
  questionSubcategories: [],
  newQuestions: function(){
    return [];
  }.property(),
  categories: Ember.computed.alias('controllers.clientell/bank/categories'),
  subcategories: Ember.computed.alias('controllers.clientell/bank/category/subcategories'),
  actions: {
    /**
     * Add another blank record to the new questions list to fill out.
     */
    addQuestionToList: function(){
      var self = this;
      var sub = self.get('questionParentSubcategory');
      var newQ = self.store.createRecord('question',
        {
          text: '',
          scale: this.store.all('scale').objectAt(0),
          subcategory: sub,
          scored: true,
          notApplicable: false,
          openEnded: false
        }
      );
      this.get("newQuestions").pushObject(newQ);
    },
    /**
     * Toggle whether a question is scored.
     *
     * @param newQ the question
     */
    setSC: function(newQ){
      newQ.toggleProperty('scored');
    },
    /**
     * Toggle whether a question has NA answers.
     *
     * @param newQ the question
     */
    setNA: function(newQ){
      newQ.toggleProperty('notApplicable');
    },
    /**
     * Toggle whether a question is open-ended.
     *
     * @param newQ the question
     */
    setOE: function(newQ){
      newQ.toggleProperty('openEnded');
    },
    /**
     * Persist all questions in the new questions list to the bank
     */
    saveAllQuestions: function(){
      var self = this;
      var arr = [];
      var len = self.get('newQuestions.length');
      var index = 0;
      self.get('newQuestions').forEach(function(q){
        q.save().then(function(){
          index++;
          if (index === len){
            Ember.$('#success-modal').modal('show');
            self.set('questionParentSubcategory', null);
            self.set('questionParentCategory', null);
            self.set('newQuestions', arr);
          }
        });
      });
    },
    /**
     * Mark a question for editing
     *
     * @param question the target question
     */
    editQuestionStart: function(question){
      question.set('isEditing', true);
    },
    /**
     * Delete a question from the bank
     *
     * @param question the target question
     */
    deleteQuestion: function(question){
      question.destroyRecord().then(function(){
        Ember.$('#success-modal').modal('show');
      });
    },
    /**
     * Persist edits to the bank
     *
     * @param question the target question
     */
    editQuestionSave: function(question){
      question.save().then(function(q){
        q.set('isEditing', false);
        Ember.$('#success-modal').modal('show');
      });
    },
    /**
     * Stop editing a question without persisting changes
     *
     * @param question the target question
     */
    cancelEditQuestion: function(question){
      question.set('isEditing', false);
    }
  }
});
