/**
 * Created by fuiste on 12/8/14.
 */
import Ember from 'ember';

export default Ember.Controller.extend({
  model: function(){
    return this.store.find('shopper');
  }.property()
});
