import RestrictedRoute from '../restricted';

export default RestrictedRoute.extend({
  beforeModel: function(transition){
    this._super(transition);
    return this.store.find('assignment', {completed_assignments: true});
  },
  redirect: function(){
    this.transitionTo('analytics.restaurants');
  }
});
