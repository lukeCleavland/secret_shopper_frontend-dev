import DS from 'ember-data';
/* global moment */

export default DS.Model.extend({
  survey: DS.belongsTo('survey'),
  shopper: DS.belongsTo('shopper'),
  restaurant: DS.belongsTo('restaurant'),
  emailText: DS.attr('string'),
  emailTitle: DS.attr('string'),
  optedIn: DS.attr('boolean'),
  surveyResult: DS.belongsTo('surveyResult'),
  createdDate: DS.attr('isodate'),
  formattedDate: function(){
    var cd = this.get('createdDate'), m = moment(cd);
    return m.format('MM/DD/YYYY');
  }.property('createdDate'),
  isTestRestaurant: function(){
 var survey = this.get('restaurant').get('name');
  return survey === 'TEST 2';
  }.property('restaurant'),
  isTestShopper: function(){
 var shopper = this.get('shopper').get('email');
  return shopper === ('lukefoodfight@gmail.com' );
  }.property('shopper'),
  isOld: function(){
  var cdate = this.get('createdDate');
var cdate = cdate.getTime()/1000;
var today = new Date();
var today = today.getTime()/1000;

if( cdate + (60*60*24*7*15) < today){
return true;
 }

  }.property('createDate')
});
