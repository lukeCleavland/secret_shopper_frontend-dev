import RestrictedRoute from '../../restricted';

export default RestrictedRoute.extend({
  setupController: function(controller, model){
    controller.set('model', model);
  }
});
