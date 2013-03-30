
// Tests : Global : Utilities

var i, // testing iframe.
	w; // testing iframe's window object.

module('Global : Utilities', {

	setup: function() {

		stop();

		iframeLoad('/', function(iframe){

			i = iframe;
			w = i.contentWindow;
			w.qunits = {};

			w.sectionInit = function(AppGlobal) {
				AppGlobal.utilities.init();
				AppGlobal.init();
				w.qunits.utilities = AppGlobal.utilities;
			}

			w.require([w.globalPath], function(AppGlobal) {
				if (AppGlobal) {
					w.sectionInit(AppGlobal);
					start();
				} else {
					w.require(['global'], function(AppGlobal) {
						w.sectionInit(AppGlobal);
						start();
					});
				}
			});

		});

	},

	teardown: function() {
		iframeUnload(i);
	}

});

test('supportsCanvas() returns boolean', function() {
	var test = w.qunits.utilities.supportsCanvas();
	equal( typeof test, 'boolean' );
});

test('supportsPlaceholder() returns boolean', function() {
	var test = w.qunits.utilities.supportsPlaceholder();
	equal( typeof test, 'boolean' );
});

test('setInputPlaceholder() updates input value on init, focus, and blur.', function() {

	var $input = $('<input type="text" name="qunit-test" id="qunit-test">');
	w.$('body').append($input);
	w.qunits.utilities.setInputPlaceholder('qunit-test', 'foo');

	equal( $input.val(), 'foo' );

	$input.focus();

	equal( $input.val(), '' );

	$input.blur();

	equal( $input.val(), 'foo' );

});

test('supportsCss3() returns boolean', function() {
	var test = w.qunits.utilities.supportsCss3('borderRadius');
	equal( typeof test, 'boolean' );
});

test('isIpad() returns boolean', function() {
	var test = w.qunits.utilities.isIpad();
	equal( typeof test, 'boolean' );
});

test('preventXSS() strips corner brackets', function() {
	var test = w.qunits.utilities.preventXSS('<foo>');
	equal( test, 'foo' );
});

test('log() polyfill working, log.history order is correct.', function() {

	if (navigator.appName == 'Microsoft Internet Explorer' && !w.log.history) {
		ok(1==1, "IE; log() Not supported.");
		return;
	}

	var currentLogPosition = w.log.history.length;

	w.log('foo');
	w.log('bar');
	w.log('baz');

	equal( w.log.history[ w.log.history.length -1 ][0], 'baz' );
	equal( w.log.history[currentLogPosition][0], 'foo' );

});
