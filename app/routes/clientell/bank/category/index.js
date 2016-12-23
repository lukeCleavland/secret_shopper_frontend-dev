import RestrictedRoute from '../../../restricted';

export default RestrictedRoute.extend({
  model: function(){
    return this.modelFor('category');
  },
  setupController: function(controller, model){
    controller.set('model', model);
  },
  afterModel: function(){
    this.transitionTo('clientell.bank.category.subcategories');
  },
});
