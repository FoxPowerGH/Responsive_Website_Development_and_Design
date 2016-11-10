$(document).ready(function() {
    $("button.btn-show").click(function() {
        $(this).hide();
        $(this).next().show();
        $(this).parent().next("div.bio").slideDown("slow");
    });
    $("button.btn-hide").click(function() {
        $(this).hide();
        $(this).prev().show();
        $(this).parent().next("div.bio").slideUp("slow");
    });
    $("a#polaroid").fancybox({
      'overlayColor'		: '#666',
      'overlayOpacity'	: 0.3,
      'titlePosition'	  : 'inside',
      'opacity'		      : false,
      'overlayShow'	    : false,
      'transitionIn'	  : 'none',
      'transitionOut'	  : 'none',
      showCloseButton	: true
    });
});
