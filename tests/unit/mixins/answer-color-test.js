import Ember from 'ember';
import AnswerColorMixin from 'frontend/mixins/answer-color';

module('AnswerColorMixin');

// Replace this with your real tests.
test('it works', function() {
  var AnswerColorObject = Ember.Object.extend(AnswerColorMixin);
  var subject = AnswerColorObject.create();
  ok(subject);
});
