/**
 * Created by fuiste on 12/1/14.
 */
import Ember from 'ember';

export default Ember.Controller.extend({
  currentSurvey: null,
  actions: {
    /**
     * Add a section to the survey using a subcategory.  Basic logic as follows:
     *  -Ensure a section with that subcategory doesn't currently exist in the survey.
     *  -If section doesn't exist, build a record for it, then records for it's questions
     *  -Set up indices and push section to the new survey
     *
     * @param subcategory
     */
    addSubcategory: function(subcategory){
      var self = this;
      var survey = this.get('currentSurvey');
      var index = survey.get('sections.length') + 1;
      var section = this.store.createRecord('section', {subcategory: subcategory, position: index});
      subcategory.get('questions').forEach(function(q){
        var qIndex = section.get('items.length') + 1;
        var item = self.store.createRecord('item', {question: q, position: qIndex});
        section.get('items').pushObject(item);
      });
      subcategory.set('addedToSurvey', true);
      survey.get('sections').pushObject(section);
    },
    /**
     * Remove a section from the survey, then update indices
     *
     * @param section the section to remove
     */
    removeSection: function(section){
      section.get('subcategory').set('addedToSurvey', false);
      this.get('currentSurvey.sections').removeObject(section);
      var index = 0;
      this.get('currentSurvey').get('sortedSections').forEach(function(s){
        index++;
        s.set('position', index);
      });
    },
    /**
     * Remove an item from a section, then update indices.
     *
     * @param section the section containing target item
     * @param item the item to remove
     */
    removeItem: function(section, item){
      section.get('items').removeObject(item);
      var index = 0;
      section.get('sortedItems').forEach(function(i){
        index++;
        i.set('position', index);
      });
    },
    /**
     * Handles repositioning sections in the active survey.  Basic logic is as follows:
     *  -Grab current index and desired new index
     *  -If new index is out of bounds, set it to the edge
     *  -'swap' indices with the adjacent section, in the direction desired.
     *
     * @param section the section to move
     * @param move integer direction (1 or -1)
     */
    moveSection: function(section, move){
      var oldPos = section.get('position');
      var newPos = section.get('position') + move;
      if (newPos < 1){newPos = 1;}
      if (newPos > this.get('currentSurvey').get('sections.length')){newPos = this.get('currentSurvey').get('sections.length');}
      this.get('currentSurvey').get('sections').forEach(function(s){
        if (s.get('position') === oldPos){s.set('position', newPos);}
        else if (s.get('position') === newPos){s.set('position', oldPos);}
      });
    },
    /**
     * Handles repositioning items in a section within the active survey.  Basic logic is as follows:
     *  -Grab current index and desired new index
     *  -If new index is out of bounds, set it to the edge of target section
     *  -'swap' indices with the adjacent item, in the direction desired.
     *
     * @param section the section containing the item to move
     * @param item the item to move
     * @param move integer direction (1 or -1)
     */
    moveItem: function(section, item, move){
      var oldPos = item.get('position');
      var newPos = item.get('position') + move;
      if (newPos < 1){newPos = 1;}
      if (newPos > section.get('items.length')){newPos = section.get('items.length');}
      section.get('items').forEach(function(i){
        if (i.get('position') === oldPos){i.set('position', newPos);}
        else if (i.get('position') === newPos){i.set('position', oldPos);}
      });
    },
    /**
     * Transition to finalize route.
     */
    finalizeSurvey: function(){
      this.transitionToRoute('clientell.create.finalize');
    }
  }
});
