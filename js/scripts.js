$(function () {

	if ($('.portfolio').length) {
		var containerTop = $('#main-container').offset().top;

		// Full View
		$('#full-view').click(function () {
			var y = $(window).scrollTop();
			if ($('#project-list').hasClass('thumbs') && (y > containerTop)) {
				$('html, body').animate({
					scrollTop: containerTop-50
				}, {
					duration: 800,
					easing: 'easeOutExpo'
				});
			}
			$('#project-list').removeClass('thumbs');
			containerBottom = getContainerBottom();
			return false;
		});
		// Thumbnail View
		$('#thumb-view').click(function () {
			var y = $(window).scrollTop();
			if (!$('#project-list').hasClass('thumbs') && (y > containerTop)) {
				$('html, body').animate({
					scrollTop: containerTop-50
				}, {
					duration: 800,
					easing: 'easeOutExpo'
				});
			}
			$('#project-list').addClass('thumbs');
			containerBottom = getContainerBottom();
			return false;
		});

		function getContainerBottom() {
			return $('#main-container').offset().top + $('#main-container').outerHeight();
		}

		// Sliding track
		// I'm no pro, so if you have a better way of doing this kindly share <3

		var msie6 = $.browser.msie && $.browser.version < 7;
		if (($('#sliding-container').length) && !msie6) {

			var slidingBox = $('#sliding-container');
			var top = slidingBox.offset().top;
			containerBottom = getContainerBottom();

			$(window).scroll(function () {
				var y = $(window).scrollTop();
				if (y >= top) {
					if (y >= (containerBottom - slidingBox.outerHeight())) {
						slidingBox.removeClass('fixed');
						slidingBox.addClass('pinned');
					} else if (y <= (containerBottom - slidingBox.outerHeight())) {
						slidingBox.addClass('fixed');
						slidingBox.removeClass('pinned');
					}
				} else {
					slidingBox.removeClass('fixed');
					slidingBox.removeClass('pinned');
				}
			});
		}

		// Project Page Slideshow
		if ($('#project-slider').length) {
			$('#project-slider ul.slides').cycle({
				fx: 'fade',
				speed: 2000,
				timeout: 3000
			});
		}

		$('#project-slider').mouseenter(function () {
			$(this).find('a#lightbox').stop().animate({
				opacity: 0.5
			}, 300);
		}).mouseleave(function () {
			$(this).find('a#lightbox').stop().animate({
				opacity: 0
			}, 300);
		});

		$("#lightbox").click(function (a) {
			a.preventDefault();

			var slideImages = [];
			$('#project-slider .slides').find('li img').each(function (index) {
				slideImages[index] = $(this).attr('src');
			});

			$.fancybox(slideImages, {
				'padding': 0,
				'transitionIn': 'elastic',
				'transitionOut': 'elastic',
				'easingIn': 'easeOutBack',
				'easingOut': 'easeInBack',
				'type': 'image',
				'overlayOpacity': 0.5
			});
		});
	}

	// Front page Slideshow
	if ($('#slider').length) {
		$('#slider ul.slides').cycle({
			fx: 'fade',
			speed: 'fast',
			timeout: 4000,
			speedIn: 350,
			speedOut: 350,
			prev: '#slide-buttons .prev',
			next: '#slide-buttons .next',
			before: changeCaption
		});
	}

	function changeCaption() {
		// Hide all captions
		$('#slider .captions > li').hide();
		// Fade in the caption li with the same index
		$('#slider .captions li:eq(' + $('#slider .slides > li').index(this) + ')').fadeIn(450);
	}

	// Sidebar Tabs:
	if (jQuery().tabs) {
		$("#side-tabs").tabs();
	}

	// Blog List View
	$('#list-view').click(function () {
		$('#blog-posts').addClass('list');
		return false;
	});
	// Blog Grid View
	$('#grid-view').click(function () {
		$('#blog-posts').removeClass('list');
		return false;
	});

	// Clear search form value on focus:
	$('#search input').focus(function () {
		if (this.value == this.defaultValue) {
			this.value = '';
		}
		if (this.value != this.defaultValue) {
			this.select();
		}
	}).blur(function () {
		if ($.trim(this.value) == '') {
			this.value = (this.defaultValue ? this.defaultValue : '');
		}
	});

	// Front Page Slider Panel
	var delay = 400;

	$('#panel-wrapper').mouseenter(function () {
		setTimeout(showMenu, delay);
		$(this).data('in', true);
	}).mouseleave(function () {
		$(this).data('in', false);
		setTimeout(hideMenu, delay);
	});

	function showMenu() {
		if ($('#panel-wrapper').data('in')) {
			$('#panel').stop().animate({
				top: '136px'
			}, {
				queue: false,
				duration: 350,
				easing: 'easeOutExpo'
			}).data('hidden', false).end();
		}
	}

	function hideMenu() {
		if (!$('#panel-wrapper').data('in') && !$('#panel').data('hidden')) {

			//Animate the margin to closed state
			$('#panel').stop().animate({
				top: '218px'
			}, {
				queue: false,
				duration: 350,
				easing: 'easeOutExpo'
			});

			$('#panel').data('hidden', true);
		}
	}

	//Clear Form on Submit
	$.fn.clearForm = function () {
		return this.each(function () {
			var type = this.type,
				tag = this.tagName.toLowerCase();
			if (tag == 'form') return $(':input', this).clearForm();
			if (type == 'text' || tag == 'textarea') this.value = '';
		});
	};

	//Quick Contact Form
	$('form#quick-contact').submit(function () {

		//Remove error classes
		$('form#quick-contact input, form#quick-contact textarea').removeClass('error');

		//Variables
		var hasError = false;
		var emailRegex = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;

		//Validate Name
		if (jQuery.trim($('#qc-name').val()) == '') {
			$('#qc-name').addClass('error');
			hasError = true;
		}
		//Validate Email
		if (jQuery.trim($('#qc-email').val()) == '') {
			$('#qc-email').addClass('error');
			hasError = true;
		} else if (!emailRegex.test(jQuery.trim($('#qc-email').val()))) {
			$('#qc-email').addClass('error');
			hasError = true;
		}
		//Validate Message
		if (jQuery.trim($('#qc-message').val()) == '') {
			$('#qc-message').addClass('error');
			hasError = true;
		}

		if (!hasError) {

			$(this).parent().find('#qc-thanks').slideUp(200).end().find('input, textarea').animate({
				opacity: '0.5'
			}, 200);

			//AJAX Submit				
			$.ajax({
				url: $(this).attr('action'),
				type: 'post',
				data: $(this).serialize(),
				cache: false,
				error: function () {
					console.log("Failed to submit");
				},
				success: function (html) {
					$('p#qc-thanks').html(html).slideDown(200);
					$('form#quick-contact').find('input,textarea').animate({
						opacity: '1'
					}, 200).end().clearForm();
				}
			})

		} //end if no errors
		return false;

	}) //end if submitted
}); // End document ready

/*********************
 //* jQuery Multi Level CSS Menu #2- By Dynamic Drive: http://www.dynamicdrive.com/
 //* Last update: Nov 7th, 08': Limit # of queued animations to minmize animation stuttering
 //* Menu avaiable at DD CSS Library: http://www.dynamicdrive.com/style/
 *********************/

//Specify full URL to down and right arrow images (23 is padding-right to add to top level LIs with drop downs):
//var arrowimages={down:['downarrowclass', 'down.gif', 23], right:['rightarrowclass', 'right.gif']}
var jqueryslidemenu = {

	animateduration: {
		over: 200,
		out: 100
	},
	//duration of slide in/ out animation, in milliseconds
	buildmenu: function (menuid) {
		jQuery(document).ready(function ($) {
			var $mainmenu = $("#" + menuid + ">ul")
			var $headers = $mainmenu.find("ul").parent()
			$headers.each(function (i) {
				var $curobj = $(this)
				var $subul = $(this).find('ul:eq(0)')
				this._dimensions = {
					w: this.offsetWidth,
					h: this.offsetHeight,
					subulw: $subul.outerWidth(),
					subulh: $subul.outerHeight()
				}
				this.istopheader = $curobj.parents("ul").length == 1 ? true : false
				$subul.css({
					top: this.istopheader ? this._dimensions.h + "px" : 0
				})
				//$curobj.children("a:eq(0)").css(this.istopheader? {paddingRight: arrowsvar.down[2]} : {}).append(
				//'<img src="'+ (this.istopheader? arrowsvar.down[1] : arrowsvar.right[1])
				//+'" class="' + (this.istopheader? arrowsvar.down[0] : arrowsvar.right[0])
				//+ '" style="border:0;" />'
				//)
				$curobj.hover(

				function (e) {
					var $targetul = $(this).children("ul:eq(0)")
					this._offsets = {
						left: $(this).offset().left,
						top: $(this).offset().top
					}
					var menuleft = this.istopheader ? 0 : this._dimensions.w
					menuleft = (this._offsets.left + menuleft + this._dimensions.subulw > $(window).width()) ? (this.istopheader ? -this._dimensions.subulw + this._dimensions.w : -this._dimensions.w) : menuleft
					if ($targetul.queue().length <= 1) //if 1 or less queued animations
					$targetul.css({
						left: menuleft - 1 + "px",
						width: this._dimensions.subulw + 'px'
					}).show()
				}, function (e) {
					var $targetul = $(this).children("ul:eq(0)")
					$targetul.hide()
				}) //end hover
			}) //end $headers.each()
			$mainmenu.find("ul").css({
				display: 'none',
				visibility: 'visible'
			})
		}) //end document.ready
	}
}

//build menu with ID="myslidemenu" on page:
jqueryslidemenu.buildmenu("nav");