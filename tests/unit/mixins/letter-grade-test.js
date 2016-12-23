import Ember from 'ember';
import LetterGradeMixin from 'frontend/mixins/letter-grade';

module('LetterGradeMixin');

// Replace this with your real tests.
test('it works', function() {
  var LetterGradeObject = Ember.Object.extend(LetterGradeMixin);
  var subject = LetterGradeObject.create();
  ok(subject);
});
