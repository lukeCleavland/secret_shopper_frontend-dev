/**
 * Created by fuiste on 12/10/14.
 */
import Ember from 'ember';

export default Ember.Controller.extend({
  shopCode: '',
  codeError: false,
  actions: {
    submitCode: function(){
      var self = this;
      var resultId = this.get('shopCode') / 128;
      this.store.find('surveyResult', resultId).then(function(result){
        self.set('codeError', false);
        self.set('shopCode', '');
        self.transitionToRoute('shopper.play', {queryParams: {resultId: result.get('id')}});
      }, function(){
        self.set('codeError', true);
        self.set('shopCode', '');
      });
    }
  }
});
