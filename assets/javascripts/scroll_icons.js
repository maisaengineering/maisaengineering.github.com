$.ajaxSetup({
	beforeSend: function() {
		showWaitron();
	},
	complete: function() {
		hideWaitron();
	}
});

if ($.browser.msie && $.browser.version < 10) {
	$.support.cors = true;
	$.ajaxSetup({
		cache: false,
		xhr: window.IEXMLHttpRequest || $.ajaxSettings.xhr
	});
}

$(onDocumentLoad);
$(window).load(onContentLoad);

var TooltipWidget = function(widget, content) {
  var self = this;
  self.$widget = $(widget);
  self.$content = self.$widget.find(content);

  function showSearchField() {
    self.showSearchField.apply(self);
  }
  function hideSearchField() {
    self.hideSearchField.apply(self);
  }
  function activateSearchField() {
    self.activateSearchField.apply(self);
  }
  function deactivateSearchField() {
    self.deactivateSearchField.apply(self);
  }

  self.$widget.hover(showSearchField, hideSearchField);

  self.$widget.click(function(event){
    event.stopPropagation();
    activateSearchField();

    $('html').click(function(){
      deactivateSearchField();
    });
  });
};
TooltipWidget.prototype.animationTimeout = 1000;
TooltipWidget.prototype.showSearchField = function () {
  clearTimeout(this.animationTimer);
  this.$content.show();
};
TooltipWidget.prototype.hideSearchField = function () {
  (function(self){
    self.animationTimer = setTimeout(function(){
      self.$content.hide();
    }, self.animationTimeout);
  })(this);
};
TooltipWidget.prototype.activateSearchField = function () {
  clearTimeout(this.animationTimer);
  this.$widget.addClass('active');
};
TooltipWidget.prototype.deactivateSearchField = function () {
  this.$widget.removeClass('active');
  this.$content.hide();
};

function onContentLoad() {
	reportLeads();
}

function onDocumentClick(e) {
	//Be very careful NOT TO e.preventDefault ALL!

	if (e.button === 0) {	//mouse left click
		var $target = $(e.target);

		var $modalTrigger = $target.closest('.modal-trigger');
		if ($modalTrigger.size()) {
			e.preventDefault();

			if (!$modalTrigger.attr('id')) {
				$modalTrigger.attr('id', 'element-' + new Date().getTime());
			}

			window.location.hash = '#!/' + $modalTrigger.attr('id');

			return;
		}

		var $expandableTrigger = $target.closest('.expandable:not(.disabled) .toggle');
		if ($expandableTrigger.size()) {
			var toggleExpandable = function($toggler) {
				$toggler.find('.target').slideToggle(function(){
					$toggler.toggleClass('expanded');
					$toggler.trigger('toggle');
				});
			};

			var $parent = $expandableTrigger.closest('.expandable');
			toggleExpandable($parent);

			if ($expandableTrigger.hasClass('show-next')) {
				var $toggler = $parent.next();
				if (!$toggler.hasClass('expanded')) {
					toggleExpandable($toggler);
				}
			}

			return;
		}

		var $tabSwitchTrigger = $target.closest('.tab-switcher > .tab');
		if ($tabSwitchTrigger.size()) {
			if($(e.target).hasClass('tab-title')) {
				e.preventDefault();
			}

			$tabSwitchTrigger.addClass('active');
			$tabSwitchTrigger.siblings().removeClass('active');

			return;
		}

		var $notificationTrigger = $target.closest('.remove-notification');
		if ($notificationTrigger.size()) {
			var $thisItem = $notificationTrigger.closest('.item');
			$thisItem.slideUp('fast', function(){
				var $container = $thisItem.closest('.notifications');

				$thisItem.remove();

				if(!$container.children('.item').size()) {
					$container.remove();
				}
			});
		}
	}
}

function onDocumentLoad() {
	$(document).click(onDocumentClick);
	$(window).scroll(onDocumentScroll);


	$('input, textarea').placeholder();
	

	$('[type=date],[type=datetime]').click(function(e){
		e.preventDefault();
	}).datepicker({
		constrainInput: true,
		dateFormat: 'yy-mm-dd',
		firstDay: 1
	});


	new TooltipWidget('#main-search', '.fields');
	$('.tooltip').each(function(){
		new TooltipWidget(this, '.tip');
	});


	$('form').each(function(){
		var $form = $(this);

		$form.validator({
			errorClass: 'field-validation-fail',
			messageClass: 'field-validation-error',
			position: 'bottom left',
			singleError: true
		});
	});


	if($(".slider.banner > .slides:visible").size()){
		$("#content-menu li a").each(function(){
			this.href += "#headline";
		});
	}


    var $contactUsWidget = $("#contact-us-floating");
	$contactUsWidget.find(".email > div, .phone > div").click(function(){
		window.location = '/company/contact/';
	}).css('cursor', 'pointer');


//	var $inlineSharingButtons = $('.socialize-in-content');
//	if ($inlineSharingButtons.size()) {
//		$inlineSharingButtons.attr('data-original-topoffset', $inlineSharingButtons.offset().top);
//
//		$inlineSharingButtons.css({
//			position: 'absolute',
//			width: $inlineSharingButtons.width(),
//			top: 0,
//			zIndex: 100
//		});
//
//		$inlineSharingButtons.parent().css({
//			position: 'relative',
//			paddingTop: $inlineSharingButtons.outerHeight()
//		});
//	}


	$(".people-list > .person").click(function(){
		var $this = $(this);
		$this.addClass('expanded');
		$this.find('.placeholder').width($this.find('.details').width());
	}).mouseleave(function(){
		var $this = $(this);
		$this.removeClass('expanded');
		$this.find('.placeholder').css('width','auto');
	});


	$('.content-body > .content > .sidebar').each(function(){
		var $sidebar = $(this);
		$sidebar.parent().css('min-height', $sidebar.height());
	});
	$('#forum-content > .content').css('min-height', $('#forum-sidebar').height()); //Mighty hack! :)


	(function($twitterCallout){
		if ($twitterCallout.size()) {
			var $tweets = $twitterCallout.find('.tweets');

			var $featuredReports = $('.featured-reports');
			if ($featuredReports.size()) {
				$featuredReports.find('.item:first-child').append($twitterCallout);
				$twitterCallout.css('margin', '1.5em 0');
			}

			setInterval(function(){
				var $firstTweet = $tweets.find('.tweet:first-child');
				$firstTweet.fadeOut('slow', function(){
					$firstTweet.next().fadeIn('normal', function(){
						$tweets.append($firstTweet);
					});
				});
			}, 6000);

			$twitterCallout.show();
		}
	})( $('.widget-twitter-callout') );


	window.onhashchange = onLocationHashChange;
	if (window.location.hash) {
		onLocationHashChange();
	}
}

function onDocumentScroll() {
	var $this = $(this);
	var topOffset = $this.scrollTop();

	$('#contact-us-floating').css('top', topOffset + 'px');

//	var $socialButtons = $('.socialize-in-content');
//	if (topOffset > $socialButtons.attr('data-original-topoffset')) {
//		$socialButtons.addClass('sticky');
//	} else {
//		$socialButtons.removeClass('sticky');
//	}
}

function onModalFormSubmit(submitEvent, $dialogContent) {
	var form = submitEvent.target;
	var $form = $(form);

	if (form.id === 'registerform') {
		submitEvent.preventDefault();

		$.ajax({
			url: $form.attr('action'),
			cache: false,
			data: $form.serialize(),
			type: $form.attr('method'),
			success: function(data, textStatus, jqXHR) {
				var width = $dialogContent.dialog( "option", "width" );
				$dialogContent.dialog('destroy');
				onModalLoad(data, textStatus, jqXHR, width);
			}
		});
	} else if (form.id === 'loginform') {
		$form.attr('action', function(i, val){
			return val + window.location.hash;
		});
	}
}

function onModalLoad(data, textStatus, jqXHR, width) {
	var $modalHtml = $(data);
	var $notifications = $modalHtml.find('.notifications');
	var $header = $modalHtml.find('.modal-header');
	var $content = $modalHtml.find('.modal-content');

	$('.notifications').remove();
	$('body').append($notifications);

	$modalHtml.find('form').submit(function(e){
		onModalFormSubmit(e, $content);
	});

	$modalHtml.find('.modal-trigger').click(function(){
		$content.dialog('destroy');
	});

	$content.dialog({
		title: $header.text(),
		width: width ? width : '540px',
		modal: true,
		resizable: false,
		draggable: false,
		close: function() {
			window.location.hash = '#!/';
			$content.find('.file-download-frame').remove()
			$content.dialog('destroy');
		}
	});

	reportLeads();
}

function onLocationHashChange() {
	var elementHash = window.location.hash.replace(/#!(\/)?/, '#');

	var $this = $(elementHash);

	if ($this && $this.hasClass('modal-trigger')) {
		if ($this.get(0).nodeName.toLowerCase() === 'a') {
			var width = $this.attr("data-modal-width");

			$.ajax({
				url: $this.attr('href'),
				cache: false,
				success: function(data, textStatus, jqXHR) {
					onModalLoad(data, textStatus, jqXHR, width);
				}
			});
		}
	}
}

function reportLead(id, leadData, successCallback) {
	if (!id) {
		return false;
	}

	var digestData = {email: id};
	var onSuccess = function(data) {
		if (data.status === 0) {
			reportMarketoLead(data.content, leadData);

			if (successCallback) {
				successCallback();
			}
		}
	};

	$.ajax({url: 'http://headless.zeroturnaround.org/public/api/get-marketo-digest.php',
		data: digestData,
		dataType: 'json',
		success: onSuccess
	});
}

function reportLeads() {
	$('.marketo-munchkin-lead-data').each(function(){
		var $this = $(this);
		var data = $this.serializeArray();
		var fields = {};
		$.each(data, function(index, values) {
			fields[values.name] = values.value;
		});

		reportLead(fields.Email, fields, function(){
			$this.remove();
		});
	});
}

function reportMarketoLead(hash, data) {
	try {
		mktoMunchkinFunction('associateLead', data, hash);
		return true;
	} catch(e) {
		return false;
	}
}

function showWaitron(el) {
	el = el ? el : document.body;

	el._waitrons = el._waitrons > 0 ? el._waitrons+1 : 1;

	$(el).addClass('waitron');
}
function hideWaitron(el) {
	el = el ? el : document.body;

	el._waitrons = el._waitrons > 0 ? el._waitrons-1 : 0;

	if (el._waitrons < 1) {
		$(el).removeClass('waitron');
	}
}
