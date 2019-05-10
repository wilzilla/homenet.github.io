(function($) {

  /**
   * Copyright 2012, Digital Fusion
   * Licensed under the MIT license.
   * http://teamdf.com/jquery-plugins/license/
   *
   * @author Sam Sehnert
   * @desc A small plugin that checks whether elements are within
   *     the user visible viewport of a web browser.
   *     only accounts for vertical position, not horizontal.
   */

  $.fn.visible = function(partial) {
    
      var $t            = $(this),
          $w            = $(window),
          viewTop       = $w.scrollTop(),
          viewBottom    = viewTop + $w.height(),
          _top          = $t.offset().top,
          _bottom       = _top + $t.height(),
          compareTop    = partial === true ? _bottom : _top,
          compareBottom = partial === true ? _top : _bottom;
    
    return ((compareBottom <= viewBottom) && (compareTop >= viewTop));

  };
    
})(jQuery);

$(window).on('scroll', function() {
  
  $(".agent-pop .image-column .inner-column .author-one, .agent-pop .image-column .inner-column .author-two, .agent-pop .image-column .inner-column .author-three,  .agent-pop .image-column .inner-column .author-four,  .agent-pop .image-column .inner-column .author-five,  .agent-pop .image-column .inner-column .author-six,  .agent-pop .image-column .inner-column .author-seven,  .agent-pop .image-column .inner-column .author-eight,  .agent-pop .image-column .inner-column .author-nine,  .agent-pop .image-column .inner-column .author-ten, .agent-pop .image-column .inner-column .author-eleven, .agent-pop-two .image-column .inner-column .author-one, .agent-pop-two .image-column .inner-column .author-two, .agent-pop-two .image-column .inner-column .author-three, .agent-pop-two .image-column .inner-column .author-four, .agent-pop-two .image-column .inner-column .author-five, .agent-pop-two .image-column .inner-column .icon").each(function(i, el) {
    var el = $(el);
    if (el.visible(true)) {
      el.addClass("now-in-view"); 
    } else {
      el.removeClass("now-in-view");
    }
  });
  
});

$(document).on('ready', function() {
  $(".agent-pop .image-column .inner-column .author-one, .agent-pop .image-column .inner-column .author-two, .agent-pop .image-column .inner-column .author-three,  .agent-pop .image-column .inner-column .author-four,  .agent-pop .image-column .inner-column .author-five,  .agent-pop .image-column .inner-column .author-six,  .agent-pop .image-column .inner-column .author-seven,  .agent-pop .image-column .inner-column .author-eight,  .agent-pop .image-column .inner-column .author-nine,  .agent-pop .image-column .inner-column .author-ten,  .agent-pop .image-column .inner-column .author-eleven, .agent-pop-two .image-column .inner-column .author-one, .agent-pop-two .image-column .inner-column .author-two, .agent-pop-two .image-column .inner-column .author-three, .agent-pop-two .image-column .inner-column .author-four, .agent-pop-two .image-column .inner-column .author-five, .agent-pop-two .image-column .inner-column .icon").each(function(i, el) {
	var el = $(el);
	if (el.visible(true)) {
	  el.addClass("now-in-view"); 
	} else {
	  el.removeClass("now-in-view");
	}
  });
});