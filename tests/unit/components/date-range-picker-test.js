/* global moment */
import { test, moduleForComponent } from 'ember-qunit';

moduleForComponent('date-range-picker', 'DateRangePickerComponent', {
  // specify the other units that are required for this test
  needs: ['component:date-picker']
});

test('it renders', function() {
  expect(2);

  // creates the component instance
  var component = this.subject();
  equal(component._state, 'preRender');

  // appends the component to the page
  this.append();
  equal(component._state, 'inDOM');
});

test('it has two input fields with labels', function() {
  expect(3);
  // first call to $() renders the component.
  equal(this.$().find('input.form-control').length, 2);
  equal(this.$().find('.left-date label').text(), 'Start');
  equal(this.$().find('.right-date label').text(), 'Stop');
});
