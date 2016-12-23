import Ember from 'ember';
/*jshint scripturl:true*/

export default Ember.Component.extend({
  tagName: 'a',
  anchor: '',
  classNames: ['skip-link'],
  // Add attributes to component for href
  // href should be set to retain anchor properties
  // such as pointer cursor and text underline
  attributeBindings: ['href'],
  // Used so that upon clicking on the link
  // anchor behaviors or ignored
  href: 'javascript:void(0);',

  scrollTo: function(){
    var anchor = this.get('anchor'), $el = Ember.$(anchor);
    if($el){
      // Scrolls to the top of main content or whatever
      // is passed to the anchor attribute
      Ember.$('body').scrollTop($el.offset().top);
      // This sets focus on the content which was skipped to
      // upon losing focus, the tabindex should be removed
      // so that normal keyboard navigation picks up from focused
      // element
      Ember.$($el).attr('tabindex', -1).on('blur focusout', function(){
        Ember.$(this).removeAttr('tabindex');
      }).focus();
    }
  }.on('click')
});
