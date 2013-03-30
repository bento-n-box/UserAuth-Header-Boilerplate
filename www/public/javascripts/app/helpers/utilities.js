/**
 * @module helpers/utilities
 */

define(function (require) {

	'use strict';

	var $ = require('jquery'),
		_ = require('underscore'),
		App = require('global'),
		self;

	self = {

		initialize: function () {
			self.normalizeLogs();
		},

		/**
		 * Test support for the canvas element
		 * @method Utilities.supportsCanvas
		 */
		'supportsCanvas': function () {
			var canvas = document.createElement('canvas');
			if (canvas.getContext) {
				return true;
			}
			return false;
		},

		/**
		 * Check for support of INPUT placeholder attribute.
		 * @method Utilities.supportsPlaceholder
		 */
		'supportsPlaceholder': function () {
			return document.createElement('input').placeholder !== undefined;
		},

		/**
		 * Use placeholder text when INPUT tag is empty.
		 * @method Utilities.setInputPlaceholder
		 * @param input {String} ID of INPUT tag
		 * @param placeholderTxt {String}
		 */
		'setInputPlaceholder': function (input, placeholderTxt) {
			var $input = $('#' + input),
				placeholder = placeholderTxt;

			$input.val(placeholder).addClass('placeholder').focus(function () {
				if ($input.val() === placeholder) {
					$input.val('').removeClass('placeholder');
				}
			}).blur(function () {
				if ($input.val() === '') {
					$input.val(placeholder).addClass('placeholder');
				}
			});
		},

		/**
		 * Test for support of CSS3 property.
		 * @method Utilities.supportsCss3
		 * @param property {String} property to test
		 */
		'supportsCss3': function (property) {
			var elem = document.body || document.documentElement,
				cssStyle = elem.style,
				vendors = ['Moz', 'Webkit', 'Khtml', 'O', 'Ms'],
				len = vendors.length;

			// No css support detected
			if (cssStyle === undefined) {
				return false;
			}

			// Tests for standard property
			if (typeof cssStyle[property] === 'string') {
				return true;
			}

			// Tests for vendor specific property
			property = property.charAt(0).toUpperCase() + property.substr(1);
			while (len--) {
				if (typeof cssStyle[vendors[len] + property] === 'string') {
					return true;
				}
			}

			return false;
		},

		/**
		 * Test to see if device is an iPad.
		 * @method Utilities.isIpad
		 */
		'isIpad': function () {
			return (navigator.userAgent.match(/iPad/i) === null) ? false : true;
		},

		/**
		 * Strip characters from string that may be used in an XSS attack.
		 * @method Utilities.preventXSS
		 * @param value {String} Property to clean.
		 */
		'preventXSS': function (value) {
			return value.toString().replace(/<|>/g, '');
		},

		'setupCustomSelect': function () {
			$('.input-select.custom').each(function () {

				var $this = $(this),
					polyfill = '<span class="selected" /><span class="cap-right"><span class="arrow">&nbsp;</span></span>';

				$this.find('select').wrap('<span />').before(polyfill).bind('change', function () {
					$this.find('.selected').text($.text($this.find(':selected')));
				});

				$this.find('.selected').text($.text($this.find(':selected')));

				$this.find('select').focus(function () {
					$this.addClass('active');
				}).blur(function () {
					$this.removeClass('active');
				});
			});
		},

		/**
		 * Normalizes the console.log method.
		 * http://paulirish.com/2009/log-a-lightweight-wrapper-for-consolelog/
		 * @method Utilities.normalizeLogs
		 */
		'normalizeLogs': function () {
			window.log = function () {
/*@cc_on
			  return;
			  @*/
				if (window.isDebugMode) {
					log.history = log.history || []; // store logs to an array for reference
					log.history.push(arguments);
					if (window.console) {
						window.console.log(Array.prototype.slice.call(arguments));
					}
					if (App !== undefined) {
						if (typeof App.trigger === 'function') {
							App.trigger('log', arguments);
						}
					}
				} else {
					log.history = log.history || []; // store logs to an array for reference
					log.history.push(arguments);
				}
			};

/*@cc_on
			  return;
			  @*/
			if (!window.isDebugMode) {
				$(document).keyup(function (e) {

					var i, len;

					if (e.keyCode === 192 || e.keyCode === 19) {
						if (window.console) {
							log.history = log.history || []; // store logs to an array for reference
							for (i = 0, len = log.history.length; i < len; i++) {
								window.console.log(Array.prototype.slice.call(log.history[i]));
							}
						}
					}
					log.history = [];
				});
			}
		}

	};

	return self;

});