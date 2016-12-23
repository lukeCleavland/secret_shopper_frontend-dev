import Ember from 'ember';

export default Ember.ObjectController.extend({
  needs: ['auth'],
  auth: Ember.computed.alias('controllers.auth'),
  sortByScore: false,
  propagateSortTypeToResponseGroups: function(){
    var self = this;
    self.get('model.responseGroups').forEach(function(rg){
      rg.set('sortByScore', self.get('sortByScore'));
    });
  }.observes('sortByScore'),
  actions: {
    toggleSortByScore: function(){
      this.toggleProperty('sortByScore');
    }
  }
});
