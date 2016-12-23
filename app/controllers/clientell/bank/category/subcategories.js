import Ember from 'ember';

export default Ember.Controller.extend({
  needs: ['clientell/bank/categories'],
  newSubcategoryName: '',
  parentCategory: null,
  categories: Ember.computed.alias('controllers.clientell/bank/categories'),
  actions: {
    /**
     * Build and save a new subcategory, given a parent.
     *
     * @param category the parent category
     */
    createSubcategoryWithNewNameAndCategory: function(category){
      var self = this;
      var name = self.get('newSubcategoryName');
      this.store.createRecord('subcategory', {name: name, category: category}).save().then(function(){
        self.set('newSubcategoryName', '');
        Ember.$('#success-modal').modal('show');
      });
    },
    /**
     * Mark a subcategory for editing (so the inputs and checkboxes show up)
     *
     * @param sub the subcategory to edit
     */
    editSubcategoryStart: function(sub){
      sub.set('isEditing', true);
    },
    /**
     * Remove a subcategory from the bank.
     *
     * @param sub the subcategory to delete.
     */
    deleteSubcategory: function(sub){
      sub.get('questions').forEach(function(q){
        q.unloadRecord();
      });
      sub.destroyRecord().then(function(){
        Ember.$('#success-modal').modal('show');
      });
    },
    /**
     * Save changes to an edited subcategory
     *
     * @param sub the subcategory to save
     */
    editSubcategorySave: function(sub){
      sub.save().then(function(s){
        s.set('isEditing', false);
        Ember.$('#success-modal').modal('show');
      });
    },
    /**
     * Stop editing without persisting changes
     *
     * @param sub the target subcategory
     */
    cancelEditSubcategory: function(sub){
      sub.set('isEditing', false);
    }
  }
});
