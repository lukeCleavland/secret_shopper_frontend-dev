/**
 * Created by fuiste on 12/1/14.
 */
import DS from 'ember-data';
import LetterGradeMixin from '../mixins/letter-grade';

export default DS.Model.extend(LetterGradeMixin, {
  subcategory: DS.belongsTo('subcategory'),
  items: DS.hasMany('item'),
  position: DS.attr('number'),
  sortedItems: function(){
    return this.get('items').sortBy('position');
  }.property('items.@each.position'),
  gradedItems: function(){
    return this.get('items').filterBy('isGraded');
  }.property('items.[]'),
  hasGradedItems: function(){
    return this.get('gradedItems.length') > 0;
  }.property('gradedItems.[]')
});
