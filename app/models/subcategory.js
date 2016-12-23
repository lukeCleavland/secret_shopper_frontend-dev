import DS from 'ember-data';

export default DS.Model.extend({
  name: DS.attr('string'),
  questions: DS.hasMany('question'),
  category: DS.belongsTo('category'),
  isEditing: false,
  addedToSurvey: false
});
