jQuery(document).ready(function() {
	jQuery('.rha').addClass("hidden").viewportChecker({
	    classToAdd: 'gently', // Class to add to the elements when they are visible
	    offset: 0
	   });
	jQuery('.fromr').addClass("hidden").viewportChecker({
	    classToAdd: 'fromright', // Class to add to the elements when they are visible
	    offset: 0
	   });
	   jQuery('.fromr1').addClass("hidden").viewportChecker({
	    classToAdd: 'fromright1', // Class to add to the elements when they are visible
	    offset: 0
	   });
	jQuery('.froml').addClass("hidden").viewportChecker({
	    classToAdd: 'fromleft', // Class to add to the elements when they are visible
	    offset: 0
	   });
	   jQuery('.froml1').addClass("hidden").viewportChecker({
	    classToAdd: 'fromleft1', // Class to add to the elements when they are visible
	    offset: 0
	   });
	jQuery('.panel-faq .panel-heading').click(function(){
		$(this).find('.plus').toggleClass('hides');
		$(this).find('.minus').toggleClass('hides');
		$(this).parents('.panel-faq').siblings().find('.panel-heading').next().slideUp();
		$(this).parents('.panel-faq').siblings().find('.panel-heading .minus').addClass('hides');
		$(this).parents('.panel-faq').siblings().find('.panel-heading .plus').removeClass('hides');
		$(this).next().slideToggle();
	})
});