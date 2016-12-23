import Ember from 'ember';

export default Ember.Component.extend({
  name: null,
  path: null,
  tagName: 'li',
  classNameBindings: ['isActive:active'],
  uppercaseName: function(){
    var n = this.get('name');
    return n.charAt(0).toUpperCase() + n.slice(1);
  }.property('name'),
  isActive: function(){
    return this.get('path').indexOf(this.get('name')) !== -1;
  }.property('path')
});
