/**
 * Created by fuiste on 12/2/14.
 */
import Ember from 'ember';

export default Ember.Controller.extend({
  needs: ['clientell/create/build', 'auth'],
  build: Ember.computed.alias('controllers.clientell/create/build'),
  actions: {
    /**
     * Toggle whether section titles are shown to shoppers in this survey.
     */
    toggleShowSections: function(){
      this.get('build.currentSurvey').toggleProperty('showSectionTitles');
    },
    /**
     * Simultaneous bulk saving, this works as follows:
     *  -Once all items for a section are saved, save the section, same for sections + the whole survey.
     *  -reset the 'under construction' survey and show the success modal when done
     */
    saveNewSurvey: function(){
      var self = this;
      Ember.$('#sending-modal').modal('show');
      self.store.filter('item', function(it){
        return it.get('isDirty');
      }).then(function(dirtyItems){
        dirtyItems.save().then(function(){
          self.store.filter('section', function(sc){
            return sc.get('isDirty');
          }).then(function(dirtySections){
            dirtySections.save().then(function(){
              self.get('build.currentSurvey').save().then(function(){
                self.set('build.currentSurvey', null);
                Ember.$('#sending-modal').modal('hide');
                Ember.$('#success-modal').modal('show');
                self.transitionToRoute('clientell.create.surveys');
              });
            });
          });
        });
      });
    }
  }
});
