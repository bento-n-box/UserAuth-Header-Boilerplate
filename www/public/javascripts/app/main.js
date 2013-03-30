/**
 * @module main
 */

(function () {

	'use strict';

	require(['config'], function () {

		require(['global', 'helpers/utilities'], function (App, Utilities) {

			Utilities.initialize();
			App.initialize();

			require(['helpers/analytics', 'google-analytics'], function (Analytics) {
				Analytics.initialize(App.config.get('gaAccountId'), 'pageName');
			});

			require(['helpers/analytics', 'facebook'], function (Analytics) {
				FB.init({
					'appId': App.config.get('fbAccountId'),
					'xfbml': true
				});
				Analytics.socialTrackFacebook();
			});
		});
		// end require['global']
	});
	// end require['config']

}());