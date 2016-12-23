import Ember from 'ember';
import DS from 'ember-data';
import {
  moduleForModel,
  test
} from 'ember-qunit';

moduleForModel('category', 'Category', {
  // Specify the other units that are required for this test.
  needs: ['model:subcategory', 'model:question', 'model:scale']
});

test('it exists', function() {
  var model = this.subject();
  // var store = this.store();
  ok(!!model);
});

test('Category is a valid ember-data Model', function() {
  var name = 'test';
  var category = this.subject({name: name});
  ok(category);
  ok(category instanceof DS.Model);
  equal(category.get('name'), name);
});

test('Category can have a M2M relationship with Subcategories', function(){
  var name = 'test', store = this.store();
  var category = this.subject({name: name});
  ok(category);
  ok(category.get('subcategories'));
  equal(category.get('subcategories.length'), 0);
  Ember.run(function(){
    category.get('subcategories').pushObject(store.createRecord('subcategory', {name: 's1'}));
  });
  equal(category.get('subcategories.length'), 1);
});
