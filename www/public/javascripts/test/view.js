
// Tests : Backbone : Views

var i, // testing iframe.
	w; // testing iframe's window object.

module("Global : Backbone Views", {

	setup: function() {

		stop();

		iframeLoad('/', function(iframe){

			i = iframe;
			w = i.contentWindow;
			w.qunits = {};

			w.sectionInit = function(AppGlobal) {
				AppGlobal.utilities.init();
				AppGlobal.init();
				w.qunits.ExampleView = new AppGlobal.views.ExampleView();
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

test("ExampleView Exists", function() {
	equal( typeof w.qunits.ExampleView, "object" );
});
