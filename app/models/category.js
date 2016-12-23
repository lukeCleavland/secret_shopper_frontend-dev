import DS from 'ember-data';

export default DS.Model.extend({
  name: DS.attr('string'),
  subcategories: DS.hasMany('subcategory'),
  isEditing: false
});
