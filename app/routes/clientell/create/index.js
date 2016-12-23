import RestrictedRoute from '../../restricted';

export default RestrictedRoute.extend({
  beforeModel: function(transition) {
    this._super(transition);
  },
  redirect: function(){
    this.transitionTo('clientell.create.surveys');
  }
});
