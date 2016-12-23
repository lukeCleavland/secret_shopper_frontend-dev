import DS from 'ember-data';

export default DS.Model.extend({
  text: DS.attr('string'),
  scale: DS.belongsTo('scale'),
  scored: DS.attr('boolean'),
  notApplicable: DS.attr('boolean'),
  subcategory: DS.belongsTo('subcategory'),
  openEnded: DS.attr('boolean'),
  isEditing: false,
  relevantAnswers: function(){
    if (this.get('notApplicable')){
      return this.get('scale.answers');
    } else {
      var arr = this.get('scale.answers').filter(function(item){
        return item.get('grade') !== -1;
      });
      return arr;
    }

  }.property('notApplicable')
});
