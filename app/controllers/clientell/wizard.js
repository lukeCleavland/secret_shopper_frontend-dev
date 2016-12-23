import Ember from 'ember';

export default Ember.Controller.extend({
  needs: ['clientell/bank/categories', 'clientell/bank/category/subcategories', 'clientell/bank/category/subcategory/questions', 'auth'],
  categories: Ember.computed.alias('controllers.clientell/bank/categories'),
  subcategories: Ember.computed.alias('controllers.clientell/bank/category/subcategories'),
  questions: Ember.computed.alias('controllers.clientell/bank/category/subcategory/questions'),
  actions: {
    /**
     * Select a parent for a new subcategory
     *
     * @param category the parent category
     */
    subcategorySelectCategory: function(category){
      this.set('subcategories.subcategoryParentCategory', category);
    },
    /**
     * Select a parent category for new questions, then find all applicable subcategories and grab them for the dropdown.
     *
     * @param category the parent category
     */
    questionSelectCategory: function(category){
      var self = this;
      self.set('questions.questionParentCategory', category);
      self.store.find('subcategory', {category: category.get('id')}).then(function(l){
        self.set('questions.questionSubcategories', l);
        self.set('questions.questionParentSubcategory', null);
      });
    },
    /**
     * Select a parent subcategory for new questions, then initialize a blank question record for the wizard.
     *
     * @param subcategory the parent subcategory
     */
    questionSelectSubcategory: function(subcategory){
      var self = this;
      this.set('questions.questionParentSubcategory', subcategory);
      var scale = self.store.all('scale').objectAt(0);
      self.get("questions.newQuestions").pushObject(self.store.createRecord('question',
        {
          text: "",
          scale: scale,
          subcategory: self.get('questions.questionParentSubcategory'),
          scored: true,
          notApplicable: false,
          openEnded: false
        }
      ));
    },
  },
});
