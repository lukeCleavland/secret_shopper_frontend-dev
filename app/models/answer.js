import DS from 'ember-data';

export default DS.Model.extend({
  text: DS.attr('string'),
  grade: DS.attr('number'),
  isNA: function(){
    return this.get('grade') === -1;
  }.property('grade')
});
