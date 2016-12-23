import Ember from 'ember';

export default Ember.View.extend({
  didInsertElement: function(){
    setTimeout(function(){
      var b = Ember.$('.section-analytics-sidebar');
      b.affix({
        offset:{
          top:function(){
            var c = b.offset().top,
              d = parseInt(b.children(0).css('margin-top'),10),
              e = Ember.$('.page-header').height();
            return this.top = c - e - d;
          },
          bottom:function(){
            return (this.bottom = (Ember.$('.footer').outerHeight(!0)));
          }
        }
      });
    }, 100);
  }
});
