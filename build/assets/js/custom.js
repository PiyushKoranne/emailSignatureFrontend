jQuery(document).ready(function(){
	// Testimonials Slider
	// jQuery('.testimonials-slider').bxSlider({
	// 	minSlides: 1,
	// 	maxSlides: 1,
	// 	slideWidth: 844,
	// 	moveSlides: 1,
	// 	auto: true,
	// 	pause: 2500,
	// 	adaptiveHeight: true
	// });

	// Accordion

	// jQuery(".accordion-heading").click(function(){
	// 	jQuery(this).toggleClass("accordion-active");
	// 	jQuery(this).parents(".accordion-blk").siblings().find(".accordion-heading").removeClass("accordion-active");
	// 	jQuery(this).parents(".accordion-blk").find(".accordion-content").stop().slideToggle();
	// 	jQuery(this).parents(".accordion-blk").siblings().find(".accordion-content").slideUp();
	// });

	// Popup

	jQuery('.popup-play-btn').click(function () {
		var videoSrc = jQuery(this).attr('data-id');
		jQuery('.popup-overlay-wr').fadeIn();
		jQuery('.popup-content').fadeIn();
		jQuery('.popup-content iframe').attr('src', videoSrc += "?autoplay=1&rel=0&loop=0");
		jQuery("body").css("overflow", "hidden");
		jQuery('.popup-overlay-wr').click(function() {
			jQuery(this).fadeOut();
			jQuery('.popup-content').fadeOut();
			jQuery('.popup-content iframe').attr('src', '');
			jQuery("body").css("overflow", "auto");
		});
		jQuery('.close-btn').click(function() {
			jQuery('.popup-overlay-wr').fadeOut();
			jQuery('.popup-content').fadeOut();
			jQuery('.popup-content iframe').attr('src', '');
			jQuery("body").css("overflow", "auto");
		});
	});
  	// Scroll Top
	jQuery('.scroll-top').on('click', function() {
        jQuery('html, body').animate({scrollTop:0}, '800');
    });

	// jQuery Hover Effects for common img text section

	// if (jQuery(window).width() >= 1200) {
	// 	jQuery('.comn-text-img-content').mousemove(function(e) {
	// 		var comnImg1 = jQuery(this).find("figure");
	// 		var comnImg2 = jQuery(this).find("figure:nth-child(2)");
	// 		var comnImg3 = jQuery(this).find("figure:nth-child(3)");
	// 		var Image1X= (e.pageX * -1 / 50);
	// 		var Image1Y= (e.pageY * -1 / 150);
	// 		var Image2X= (e.pageX * -1 / 60);
	// 		var Image2Y= (e.pageY * -1 / 180);
	// 		var Image3X= (e.pageX * -1 / 65);
	// 		var Image3Y= (e.pageY * -1 / 170);
	// 		comnImg1.css('transform', 'translate3d('+Image1X+'px,'+Image1Y+'px, 0)');
	// 		comnImg2.css('transform', 'translate3d('+Image2X+'px,'+Image2Y+'px, 0)');
	// 		comnImg3.css('transform', 'translate3d('+Image3X+'px,'+Image3Y+'px, 0)');
	// 		jQuery('.comn-text-img-content').mouseleave(function(e) {
	// 			comnImg1.css('transform', 'unset');
	// 			comnImg2.css('transform', 'unset');
	// 			comnImg3.css('transform', 'unset');
	// 		});
	// 	});
	// }

	// jQuery Hover Effects for Banner icons

	// if (jQuery(window).width() >= 1200) {
	// 	jQuery('body').mousemove(function(e) {
	// 		var comnImg1Banner = jQuery(this).find(".banner-bg-1");
	// 		var comnImg2Banner = jQuery(this).find(".banner-bg-2");
	// 		var comnImg3Banner = jQuery(this).find(".banner-bg-3");
	// 		var comnImg4Banner = jQuery(this).find(".banner-bg-4");
	// 		var comnImg5Banner = jQuery(this).find(".banner-bg-5");
	// 		var comnImg6Banner = jQuery(this).find(".banner-bg-6");
	// 		var comnImg7Banner = jQuery(this).find(".banner-bg-7");
	// 		var Image1XBanner= (e.pageX * -1.5 / 50);
	// 		var Image1YBanner= (e.pageY * -3.5 / 150);
	// 		var Image2XBanner= (e.pageX * -1.5 / 60);
	// 		var Image2YBanner= (e.pageY * -3.5 / 180);
	// 		var Image3XBanner= (e.pageX * -1.5 / 65);
	// 		var Image3YBanner= (e.pageY * -3.5 / 170);
	// 		var Image4XBanner= (e.pageX * -1.5 / 70);
	// 		var Image4YBanner= (e.pageY * -3.5 / 140);
	// 		var Image5XBanner= (e.pageX * -1.5 / 80);
	// 		var Image5YBanner= (e.pageY * -3.5 / 190);
	// 		var Image6XBanner= (e.pageX * -1.5 / 90);
	// 		var Image6YBanner= (e.pageY * -3.5 / 130);
	// 		var Image7XBanner= (e.pageX * -1.5 / 100);
	// 		var Image7YBanner= (e.pageY * -3.5 / 200);
	// 		comnImg1Banner.css('transform', 'translate3d('+Image1XBanner+'px,'+Image1YBanner+'px, 0)');
	// 		comnImg2Banner.css('transform', 'translate3d('+Image2XBanner+'px,'+Image2YBanner+'px, 0)');
	// 		comnImg3Banner.css('transform', 'translate3d('+Image3XBanner+'px,'+Image3YBanner+'px, 0)');

	// 		comnImg4Banner.css('transform', 'translate3d('+Image4XBanner+'px,'+Image4YBanner+'px, 0)');
	// 		comnImg5Banner.css('transform', 'translate3d('+Image5XBanner+'px,'+Image5YBanner+'px, 0)');
	// 		comnImg6Banner.css('transform', 'translate3d('+Image6XBanner+'px,'+Image6YBanner+'px, 0)');
	// 		comnImg7Banner.css('transform', 'translate3d('+Image7XBanner+'px,'+Image7YBanner+'px, 0)');
	// 		jQuery('.home-banner-wr').mouseleave(function(e) {
	// 			// jQuery(".home-banner-wr .banner-bg").css('transform', 'unset');
	// 		});
	// 	});
	// }
	// Input Label Effect
	jQuery(".login-form .form-field input").focus(function(){
		jQuery(this).parents(".login-form .form-field").addClass("field-change-color");
	});
	jQuery(".login-form .form-field input").focusout(function(){
		jQuery(this).parents(".login-form .form-field").removeClass("field-change-color");   
	});
	// Tabber
	// jQuery('.tabber-content').first().show();
	// jQuery('.create-box-blk').first().addClass('tabber-active')
	// jQuery('.create-box-blk').click(function(){
	//    	jQuery('.create-box-blk').removeClass('tabber-active');
	// 	console.log('JQuery, click function invoked.')
	//    	jQuery(this).addClass('tabber-active');
    //    var value = jQuery(this).attr('data-filter');
    //    if (value == 'all') {
    //         jQuery('.tabber-content').show();
    //    }
    //    else {
    //         jQuery('.tabber-content').not('.'+value).hide();
    //         jQuery('.tabber-content').filter('.'+value).show();
    //     } 
	// });
	
	// Input File Select
	jQuery(".upload-banner-field input").change(function () {
		var fileLength = jQuery(this)[0].files.length;
		if(fileLength === 0){
		    console.log("No file selected.");
		}
		else {
			console.log("selected");
			var fileValue = jQuery(this).val();
			console.log("Value Without Trim: " + fileValue);
			var fileValueTrim = jQuery(this).val().slice(12);
			console.log("Value With Trim: " + fileValueTrim);
			if (fileValueTrim.length > 25) {
				console.log("Value More than 25");
				var fileValLessThan = fileValueTrim.substr(0, 25);
				console.log("Value If More Than 25: " + fileValLessThan);
				jQuery('.upload-banner-field span.upload-banner-span').text(fileValLessThan + '...');
			}
			else {
				jQuery('.upload-banner-field span.upload-banner-span').text(fileValueTrim);
			}
		}
	})
	// How Work Circle Slider On Mob From 768px
	/*  if (jQuery(window).width() < 980 ) {
		var totalSlidesCircle;
		function windowWidthCircle() {
			if((jQuery(window).width() < 568)){
				totalSlidesCircle = 2;
			}
			else {
				totalSlidesCircle = 3;
			}
		}
		windowWidthCircle();
			jQuery('.how-work-circle-blk').bxSlider({
				slideWidth: 170,
				slideMargin: 30,
				minSlides: totalSlidesCircle,
				maxSlides: totalSlidesCircle,
				moveSlides: 1,
				adaptiveHeight: true,
				pager: false
			});
		jQuery(window).on('resize',function(){
		     windowWidthCircle();
		});
	} */
	// Industries Assits Slider On Mob From 650px
	// 
	/* if (jQuery(window).width() < 768 ) {
		var slidesWidthIndustries, totalSlidesIndustries;
		function windowWidthIndustries() {
			if ((jQuery(window).width() < 375)) {
				totalSlidesIndustries = 1;
				slidesWidthIndustries = 225;
			}
			else {
				totalSlidesIndustries = 2;
				slidesWidthIndustries = 225;
			}
		}
		windowWidthIndustries();
			jQuery('.industries-assits-blk').bxSlider({
				slideWidth: slidesWidthIndustries,
				slideMargin: 30,
				minSlides: totalSlidesIndustries,
				maxSlides: totalSlidesIndustries,
				moveSlides: 1,
				adaptiveHeight: true,
				pager: false
			});
		jQuery(window).on('resize',function(){
		     windowWidthIndustries();
		});
	} */
	// Why Choose Slider On Mob From 480px
	
	/* if (jQuery(window).width() < 650 ) {
		var slidesWidthChoose, totalSlidesChoose, slideMarginChoose;
		function windowWidthChoose() {
			if ((jQuery(window).width() < 375)) {  
				slideMarginChoose = 15;
			}
			else if ((jQuery(window).width() < 375)) {  
				totalSlidesChoose = 1;
				slidesWidthChoose = 225;
			}
			else {
				totalSlidesChoose = 2;
				slidesWidthChoose = 225;
				slideMarginChoose = 30;
			}
		}
		windowWidthChoose();
			jQuery('.why-choose-bottom-box-blk ul').bxSlider({
				slideWidth: slidesWidthChoose,
				slideMargin: slideMarginChoose,
				minSlides: totalSlidesChoose,
				maxSlides: totalSlidesChoose,
				moveSlides: 1,
				adaptiveHeight: true,
				pager: false
			});
		jQuery(window).on('resize',function(){
		     windowWidthChoose();
		});
	} */
});
// Scroll Top 
jQuery(window).on('scroll load', function(){ 
	if (jQuery(this).scrollTop() > 600) { 
    	jQuery('.scroll-top').fadeIn(); 
	} else { 
    	jQuery('.scroll-top').fadeOut(); 
	} 
	// Sticky Header 
    if (jQuery(window).width() > 979) {
      	if (jQuery(document).scrollTop() > 300) {
            jQuery('.header-wr').addClass('sticky');
      	}
      	else {
            jQuery('.header-wr').removeClass('sticky');
      	}
	}
});
