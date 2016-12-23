import Ember from 'ember';

export default Ember.Controller.extend({
  newCategoryName: '',
  subcategoryParentCategory: null,
  questionParentCategory: null,
  actions: {
    /**
     * Create a new category from the provided string
     */
    createCategoryWithNewName: function(){
      var name = this.get('newCategoryName');
      // Create the new category model
      var newCat = this.store.createRecord('category', {
        name: name,
      });
      // Clear the name field
      this.set('newCategoryName', '');
      // Save the new model
      newCat.save().then(function(){
        Ember.$('#success-modal').modal('show');
      });
    },
    /**
     * Mar ka category for editing (so the inputs/whatever appear)
     *
     * @param cat the target category
     */
    editCategoryStart: function(cat){
      cat.set('isEditing', true);
    },
    /**
     * Delete a category from the bank
     *
     * @param cat the category to delete
     */
    deleteCategory: function(cat){
      cat.get('subcategories').forEach(function(s){
        s.get('questions').forEach(function(q){
          q.unloadRecord();
        });
        s.unloadRecord();
      });
      cat.destroyRecord().then(function(){
        Ember.$('#success-modal').modal('show');
      });
    },
    /**
     * Persist changes to a category
     *
     * @param cat the target category
     */
    editCategorySave: function(cat){
      cat.save().then(function(c){
        c.set('isEditing', false);
        Ember.$('#success-modal').modal('show');
      });
    },
    /**
     * Stop editing a category without persisting changes
     *
     * @param cat the target category
     */
    cancelEditCategory: function(cat){
      cat.set('isEditing', false);
    }
  }
});
