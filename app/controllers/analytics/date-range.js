import Ember from 'ember';
/* global moment */

export default Ember.ObjectController.extend({
  startMoment: null,
  stopMoment: null,
  start: null,
  stop: null,
  init: function(){
    this._super();
    Ember.run(this, 'initializeDates');
    Ember.run(this, 'updateBothMoments');
  },
  startHasChanged: function(){
    Ember.run(this, 'updateStartMoment');
  }.observes('start'),
  stopHasChanged: function(){
    Ember.run(this, 'updateStopMoment');
  }.observes('stop'),
  initializeDates: function(){
    var m = moment(new Date().toISOString()), self = this;
    self.set('stop', m.format('YYYY-MM-DD').replace(/-/g, "/"));
    self.set('start', m.subtract(6, 'months').format('YYYY-MM-DD').replace(/-/g, "/"));
  },
  updateStartMoment: function(){
    this.set('startMoment', moment(new Date(this.get('start')).toISOString()));
  },
  updateStopMoment: function(){
    this.set('stopMoment', moment(new Date(this.get('stop')).toISOString()));
  },
  updateBothMoments: function(){
    this.set('startMoment', moment(new Date(this.get('start')).toISOString())).set('stopMoment', moment(new Date(this.get('stop')).toISOString()));
  }
});
