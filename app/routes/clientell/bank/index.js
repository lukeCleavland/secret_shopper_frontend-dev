import RestrictedRoute from '../../restricted';

export default RestrictedRoute.extend({
  beforeModel: function(transition){
    this._super(transition);
    this.store.unloadAll('assignment');
  },
  redirect: function(){
    this.transitionTo('clientell.bank.categories');
  }
});
