/**
 * Created by fuiste on 12/8/14.
 */
import Ember from 'ember';

export default Ember.Controller.extend({
  needs: ['clientell/create/surveys', 'clientell/assign/shoppers', 'auth'],
  surveys: Ember.computed.alias('controllers.clientell/create/surveys'),
  shoppers: Ember.computed.alias('controllers.clientell/assign/shoppers'),
  activeRestaurant: null,
  inputEmail: '',
  surveyError: false,
  emailError: false,
  titleError: false,
  newAssignment: null,
  actions: {
    /**
     * Set the target restaurant for the new assignment.
     *
     * @param restaurant the restaurant to send a shopper to
     */
    selectActiveRestaurant: function(restaurant){
      this.set('newAssignment', this.store.createRecord('assignment'));
      this.set('newAssignment.restaurant', restaurant);
    },
    /**
     * Set the survey to send the shopper.
     *
     * @param survey the selected survey
     */
    selectActiveSurvey: function(survey){
      this.set('newAssignment.survey', survey);
    },
    /**
     * Save the 'under construction' assignment.  Emailing will be handled in the serializer, we just need to make sure the data is all entered and save the record.
     */
    saveNewAssignment: function() {
      if (this.get('inputEmail') === '') {
        //No email entered
        this.set('emailError', true);
      } else if (this.get('newAssignment.emailTitle') === '') {
        //No title entered
        this.set('titleError', true);
      } else if (!this.get('newAssignment.survey')){
        //No survey selected
        this.set('surveyError', true);
      } else {
        //Good to go
        var self = this;
        var assign = this.get('newAssignment');
        var email = this.get('inputEmail');
        this.store.filter('shopper', function(sh){
          return sh.get('email') === email;
        }).then(function(list){
          var shopper;
          if(list.get('length')){
            //This shopper is in the DB
            shopper = list.objectAt(0);
            assign.set('shopper', shopper);
            assign.save().then(function(){
              self.set('surveyError', false);
              self.set('emailError', false);
              self.set('titleError', false);
              self.set('newAssignment', self.store.createRecord('assignment'));
              Ember.$('#sent-modal').modal('show');
            });
          }else{
            //Gotta make a new shopper
            shopper = self.store.createRecord('shopper', {email: email});
            shopper.save().then(function(sh){
              assign.set('shopper', sh);
              assign.save().then(function(){
                self.set('surveyError', false);
                self.set('emailError', false);
                self.set('titleError', false);
                self.set('newAssignment', self.store.createRecord('assignment'));
                Ember.$('#sent-modal').modal('show');
              });
            });
          }
        });
      }
    }
  }
});
