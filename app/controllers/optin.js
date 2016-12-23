/**
 * Created by fuiste on 12/10/14.
 */
import Ember from 'ember';

export default Ember.Controller.extend({
  queryParams: ['assignmentId', 'fullUrl'],
  fullUrl: '',
  assignmentId: -1,
  complete: false,
  actions: {
    optIn: function(){
      var self = this;
      var aid = self.get('assignmentId');
      var url = self.get('fullUrl');
      Ember.$.ajax({
        url: url,
        data: {assignment_id: aid, type: 'IN'},
        type: 'POST'
      }).success(function(){
        self.set('complete', true);
      });
    }
  }
});
