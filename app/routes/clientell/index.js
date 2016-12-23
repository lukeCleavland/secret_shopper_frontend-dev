import RestrictedRoute from '../restricted';

export default RestrictedRoute.extend({
  redirect: function(){
    this.transitionTo('clientell.bank');
  }
});
