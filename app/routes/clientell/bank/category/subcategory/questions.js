import RestrictedRoute from '../../../../restricted';

export default RestrictedRoute.extend({
  model: function(){
    return this.store.find('question', {subcategory: this.modelFor('clientell.bank.category.subcategory').get('id')});
  },
  setupController: function(controller, model){
    controller.set('model', model);
  },
});
