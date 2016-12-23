import DS from 'ember-data';

export default DS.Model.extend({
  email: DS.attr('string'),
  is_active: DS.attr('boolean'),
  isAdmin: DS.attr('boolean')
});
