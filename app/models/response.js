import DS from 'ember-data';
import AnswerColorMixin from '../mixins/answer-color';

export default DS.Model.extend(AnswerColorMixin, {
  question: DS.belongsTo('question'),
  answer: DS.belongsTo('answer'),
  comment: DS.attr('string'),
  position: DS.attr('number'),
  answered: function(){
    return this.get('answer') !== null;
  }.property('answer'),
  isGraded: function(){
    return (this.get('question.scored') && !(this.get('question.openEnded')) && !(this.get('question.notApplicable')));
  }.property('question.scored')
});
