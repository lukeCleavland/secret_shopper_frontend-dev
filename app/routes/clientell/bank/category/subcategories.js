import RestrictedRoute from '../../../restricted';

export default RestrictedRoute.extend({
  model: function(){
    return this.store.find('subcategory', {category: this.modelFor('clientell.bank.category').get('id')});
  },
  setupController: function(controller, model){
    controller.set('model', model);
  }
});
