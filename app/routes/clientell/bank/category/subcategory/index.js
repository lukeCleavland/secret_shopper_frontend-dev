import RestrictedRoute from '../../../../restricted';

export default RestrictedRoute.extend({
    model: function(){
      return this.modelFor('subcategory');
    },
    afterModel: function(){
      this.transitionTo('clientell.bank.category.subcategory.questions');
    },
});
