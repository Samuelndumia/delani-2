$(document).ready(function(){
    $("#development-image").click(function(){
      $("#development-image").slideDown('1500').hide('1000');
      $("#development").show('1500');
    });
    $("#development").click(function(){
      $("#development").slideUp('1500');
      $("#development-image").slideDown('1500');
    });
  });
  
  $(document).ready(function(){
    $("#design-image").click(function(){
      $("#design-image").slideDown('1500').hide('1000');
      $("#design").show('1500');
    });
    $("#design").click(function(){
      $("#design").slideUp('1500');
      $("#design-image").slideDown('1500');
    });
  });
  
  $(document).ready(function(){
    $("#product-image").click(function(){
      $("#product-image").slideDown('1500').hide('1000');
      $("#product").show('1500');
    });
    $("#product").click(function(){
      $("#product").slideUp('1500');
      $("#product-image").slideDown('1500');
    });
  });
  
  $(document).ready(function(){
    $("#work1").mouseover(function(){
      $("#overlay").show();
    }).mouseout(function(){
      $("#overlay").hide();
    });
  });
  $(document).ready(function(){
    $("#work2").mouseover(function(){
      $("#overlay2").show();
    }).mouseout(function(){
      $("#overlay2").hide();
    });
  });
  $(document).ready(function(){
    $("#work3").mouseover(function(){
      $("#overlay3").show();
    }).mouseout(function(){
      $("#overlay3").hide();
    });
  });
  $(document).ready(function(){
    $("#work4").mouseover(function(){
      $("#overlay4").show();
    }).mouseout(function(){
      $("#overlay4").hide();
    });
  });
  
  $(document).ready(function(){
    $("#work5").mouseover(function(){
      $("#overlay5").show();
    }).mouseout(function(){
      $("#overlay5").hide();
    });
    $("#work6").mouseover(function(){
      $("#overlay6").show();
    }).mouseout(function(){
      $("#overlay6").hide();
    });
    $("#work7").mouseover(function(){
      $("#overlay7").show();
    }).mouseout(function(){
      $("#overlay7").hide();
    });
    $("#work8").mouseover(function(){
      $("#overlay8").show();
    }).mouseout(function(){
      $("#overlay8").hide();
    });
  });
  
  $(document).ready(function(){
    $("form#form34A").submit(function(event){
      // event.preventDefault();
      var name = $("input#MERGE1").val();
      var email = $("input#MERGE0").val();
      var message = $("textarea#comment").val();
      if ($("input#MERGE1").val() && $("input#MERGE0").val()){
        alert (name + ", we have received your message. Thank you for reaching out to us.");
      }
      else {
        alert("Please enter your name and email!");
      }
      
    });
  
  });
  /*!  v1.2.2 | Fabio Quarantini - http://www.fabioquarantini.com */
!function(a,b,c,d){a.fn.formchimp=function(b){var d,e=a(this),f=a("body"),g=
(function($, window, document, undefined) {
	$.fn.formchimp = function(settings) {
		var $form = $(this);
		var $body = $('body');
		var actionUrl = $form.attr('action').replace('/post?', '/post-json?').concat('&c=?');
		var $button = $form.find('[type="submit"]');
		var defaults = {
			'appendElement': $form,					// Declare where the new element, containing the messages from Mailchimp will be appended to.
			'buttonSelector': $button,				// Set the button selector.
			'buttonText': '', 						// The message to be written on the submit button after a successful subscription.
			'debug': false, 						// Activate debug message in console.
			'errorMessage': '',						// Set custom error message given when return an error.
			'onMailChimpSuccess': function() {},	// Callback that fires on success.
			'onMailChimpError': function() {},		// Callback that fires on errors.
			'responseClass': 'mc-response',			// Declare custom element in page for message output. (Set different classes for multiple sign-up forms)
			'successMessage': '',					// Set a custom success message.
			'url': actionUrl,						// The mailchip list subscription url, to get the JSONP address just change `post` to `post-json` and append `&c=?` at the end.
		};
		var originalButtonText = defaults.buttonSelector.text();
		var $responseContainer;

		// Merge default whith settings
		$.extend(defaults, settings);

		// On submit
		$($form).on('submit', function(event) {
			// Disable default action of submit
			event.preventDefault();

			// Remove status class and add the loading
			$body.removeClass('mc-success mc-error').addClass('mc-loading');

			// If the response container does not exists
			if ($('.' + defaults.responseClass).length === 0) {
				// Add response container to append element
				$responseContainer = $('<div/>').addClass(defaults.responseClass).appendTo(defaults.appendElement);
			} else {
				// Remove old message
				$responseContainer.html('');
			}

			// Perform an Ajax request
			$.ajax({

				url: defaults.url,
				data: $(this).serialize(),
				dataType: 'jsonp'

			}).done(function(data) {
				// If debug is active
				if (defaults.debug) {
					// Log in cosole the Mailchimp data
					console.log(JSON.stringify(data));
				}

				// Save the Mailchimp data
				var responseMessage = data.msg;

				// If the message start with a number and contains "-"
				if(!isNaN(responseMessage.charAt(0)) && responseMessage.charAt(2) === '-') {
					// Remove first 3 characters
					responseMessage = responseMessage.substring(3);
				}

				// Add status class and remove the loading class
				$body.addClass('mc-' + data.result).removeClass('mc-loading');

				// If the Mailchimp result is success
				if (data.result === 'success') {
					// If success message parameter is not empty
					if (defaults.successMessage !== '') {
						// Replace the default success message with parameter
						responseMessage = defaults.successMessage;
					}

					// If button text parameter is not empty
					if (defaults.buttonText !== '') {
						// Replace the default button text with parameter
						defaults.buttonSelector.text(defaults.buttonText);
					}

					// Add event on error
					$(document).trigger('mailChimpSuccess');

					// Run callback
					defaults.onMailChimpSuccess.call();
				} else { // If there is an error
					// If error message parameter is not empty
					if (defaults.errorMessage !== '') {
						// Replace the default error message with parameter
						responseMessage = defaults.errorMessage;
					}

					// If button text parameter is not empty
					if (defaults.buttonText !== '') {
						// Replace the default button text with the original text
						defaults.buttonSelector.text(originalButtonText);
					}

					// Add event on error
					$(document).trigger('mailChimpError');

					// Run callback
					defaults.onMailChimpError.call();
				}

				// Show the message
				$responseContainer.html(responseMessage);
			});
		});
	};
})(jQuery, window, document);  