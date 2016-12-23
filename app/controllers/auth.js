import Ember from 'ember';
import ENV from '../config/environment';

export default Ember.ObjectController.extend({
  email: null,
  password: null,
  token: null,
  errors: null,
  unauthorized: false,
  attemptedTransition: null,
  reset: function() {
    this.setProperties({
      email: null,
      password: null,
      errors: null,
      model: null,
      unauthorized: false,
      attemptedTransition: null
    });
  },
  hasValidToken: function() {
    var token = this.get('token');
    return (!Ember.isEmpty(token) && token != 'null' && token !== 'undefined');
  }.property('token'),
  setupAjax: function() {
    var self = this, token = this.get('token');
    Ember.$(document).ajaxSend(function(event, xhr) {
      // there is also a 'settings' param available
      if (self.get('hasValidToken')) {
        xhr.setRequestHeader('Authorization', 'Token ' + token);
      }
    });
  },
  setCurrentUser: function() {
    if (this.get('hasValidToken')) {
      var currentUser = this.store.find('user', 'me');
      this.set('model', currentUser);
    } else {
      this.reset();
    }
  },
  isAdmin: function(){
    return this.get('model.isAdmin');
  }.property('model.isAdmin'),
  tokenChanged: function() {
    localStorage.APP_auth_token = this.get('token');
    this.setupAjax();
    this.setCurrentUser();
  }.observes('token'),
  actions: {
    login: function() {
      var self = this;
      var data = this.getProperties('email', 'password');
      Ember.$.post(ENV.APP.API_HOST + '/api-token-auth/', data, null, 'json').then(
          function(response) {
            var at = self.get('attemptedTransition');
            self.reset();
            self.set('token', response.token);
            if (at) {
              at.retry();
            } else {
              self.transitionToRoute('analytics');
            }
          },
          function(jqXHR) {
            // There are also 'status' and 'error' params available
            self.set('errors', Ember.$.parseJSON(jqXHR.responseText));
          }
      );
    }
  }
});
