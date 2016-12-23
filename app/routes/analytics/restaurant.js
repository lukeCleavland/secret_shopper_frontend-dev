import RestrictedRoute from '../restricted';

export default RestrictedRoute.extend({
  model: function(params){
    return this.store.recordForId('restaurant', params.restaurant_id);
  },
  setupController: function(controller, model){
    controller.set('model', model);
  }
});
