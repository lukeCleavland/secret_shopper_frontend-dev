/**
 * Created by fuiste on 12/10/14.
 */
import Ember from 'ember';

export default Ember.Controller.extend({
  queryParams: ['resultId'],
  resultId: -1,
  sectionIndex: 0,
  numAnswered: function(){
    return this.get('allQuestions').filter(function(q){
      return q.get('answered');
    }).get('length');
  }.property('allQuestions'),
  progressPercent: function(){
    return Math.round((this.get('numAnswered') / this.get('allQuestions.length')) * 100);
  }.property('numAnswered', 'allQuestions'),
  allQuestions: function(){
    var qs = [];
    this.get('model.responseGroups').forEach(function(grp){
      grp.get('responses').forEach(function(resp){
        if(!(resp.get('question.openEnded'))){
          qs.pushObject(resp);
        }
      });
    });
    return qs;
  }.property('model.responseGroups.@each.responses'),
  firstPage: function(){
    return this.get('sectionIndex') === 0;
  }.property('sectionIndex'),
  lastPage: function(){
    return this.get('sectionIndex') === (this.get('model.responseGroups.length') - 1);
  }.property('sectionIndex'),
  activeSection: function(){
    return this.get('model.orderedResponseGroups').objectAt(this.get('sectionIndex'));
  }.property('sectionIndex'),
  surveyComplete: function(){
    return this.get('numAnswered') === this.get('allQuestions.length');
  }.property('allQuestions.length', 'numAnswered'),
  surveyIncomplete: function(){
   return this.get('numAnswered') != this.get('allQuestions.length');
  }.property('allQuestions.length', 'numAnswered'),
  actions: {
    /**
     * Move to new page of questions
     */
    changePage: function(dir){
      Ember.$('#loading-modal').modal('show');
      var self = this;
      self.store.filter('response', function(resp){
        return resp.get('isDirty');
      }).then(function(dirtyResps){
        dirtyResps.save().then(function(){
          self.store.filter('responseGroup', function(grp){
            return grp.get('isDirty');
          }).then(function(dirtyGroups){
            dirtyGroups.save().then(function(){
              self.get('model').save().then(function(){
                var i = self.get('sectionIndex');
                self.set('sectionIndex', i + dir);
                Ember.$('#loading-modal').modal('hide');
                Ember.$("html, body").animate({ scrollTop: 0 }, "slow");
              });
            });
          });
        });
      });
    },
    /**
     * Sets the answer for a response.
     *
     * @param answer the answer to set
     * @param response the response to attach the answer to
     */
    toggleAnswered: function(answer, response){
      var tmp = response.get('answered');
      if (tmp){
        this.set('numAnswered', this.get('numAnswered') - 1);
      } else {
        this.set('numAnswered', this.get('numAnswered') + 1);
      }
      response.set('answer', answer);
      response.save();
    },
    submitSurvey: function(){
      var self = this;
      self.store.filter('response', function(resp){
        return resp.get('isDirty');
      }).then(function(dirtyResps){
        dirtyResps.save().then(function(){
          self.store.filter('responseGroup', function(grp){
            return grp.get('isDirty');
          }).then(function(dirtyGroups){
            dirtyGroups.save().then(function(){
              self.get('model').set('done', true);
              var date = new Date();
              self.model.set('completedDate', date.toISOString());
              self.get('model').save().then(function(){
                self.transitionToRoute('shopper.complete');
              });
            });
          });
        });
      });
    }
  }
});
