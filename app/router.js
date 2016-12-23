import Ember from 'ember';
import config from './config/environment';

var Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.route('index', {path: '/'});
  this.route('auth', {path: 'login'});
  this.route('restricted');
  /*
   * Analytics paths
   */
  this.resource('analytics', {path: 'analytics'}, function() {
    this.resource('analytics.restaurants', {path: 'restaurants'});
    this.resource('analytics.restaurant', {path: 'restaurants/:restaurant_id'}, function(){
      this.resource('analytics.restaurant.surveys', {path: 'surveys'});
      this.resource('analytics.restaurant.survey-result', {path: 'surveyResults/:survey_result_id'}, function(){

      });
      this.resource('analytics.restaurant.survey', {path: 'surveys/:survey_id'}, function(){
        this.resource('analytics.restaurant.survey.section', {path: 'sections/:section_id'}, function(){

        });
      });
    });
  });
  /*
   * Clientell Paths
   */
  this.resource('clientell', {path: 'clientell'}, function(){
    this.resource('clientell.bank', {path: 'bank'}, function(){
      this.resource('clientell.bank.categories', {path: 'categories'});
      this.resource('clientell.bank.category', {path: 'categories/:category_id'}, function(){
        this.resource('clientell.bank.category.subcategories', {path: 'subcategories'});
        this.resource('clientell.bank.category.subcategory', {path: 'subcategories/:subcategory_id'}, function(){
          this.resource('clientell.bank.category.subcategory.questions', {path: 'questions'});
          this.resource('clientell.bank.category.subcategory.question', {path: 'questions/:question_id'});
        });
      });
    });
    this.resource('clientell.wizard', {path: 'wizard'});
    this.resource('clientell.create', {path: 'create'}, function(){
      this.resource('clientell.create.surveys', {path: 'surveys'}, function(){});
      this.resource('clientell.create.build', {path: 'build'}, function(){});
      this.resource('clientell.create.finalize', {path: 'finalize'}, function(){});
    });
    this.resource('clientell.assign', {path: 'assign'}, function(){
      this.resource('clientell.assign.new', {path: 'new'}, function(){});
      this.resource('clientell.assign.outstanding', {path: 'outstanding'}, function(){});
    });
  });
  /*
   * Shopper paths
   */
  this.resource('optin', {path: 'optin'}, function(){});
  this.resource('optout', {path: 'optout'}, function(){});
  this.resource('shopper', {path: 'shopper'}, function(){
    this.resource('shopper.play', {path: 'play'}, function(){});
    this.resource('shopper.code', {path: 'code'}, function(){});
    this.resource('shopper.complete', {path: 'complete'}, function(){});
  });

});

export default Router;
