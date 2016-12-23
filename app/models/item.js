/**
 * Created by fuiste on 12/1/14.
 */
import DS from 'ember-data';

export default DS.Model.extend({
  question: DS.belongsTo('question'),
  position: DS.attr('number'),
  isGraded: function(){
    return this.get('question.scored') && !(this.get('question.openEnded')) && !(this.get('question.notApplicable'));
  }.property('question.scored')
});
