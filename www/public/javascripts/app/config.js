/**
 * @module config
 */

(function () {

	'use strict';

	// Use Requirejs optimizer has() integration for custom builds.
	// Polyfill has() when not provided via Requirejs optimizer.
	var has;

	has = has ||
	function () {
		return true;
	};

	// debugMode property provided by requirejs build task.
	window.isDebugMode = (has('debugMode')) ? true : false;

	require.config({

		// Disable timeout for scripts.
		'waitSeconds': 0,

		'baseUrl': 'javascripts',

		'paths': {

			'config': 'app/config',

			// Core Libraries
			'jquery': 'lib/jquery-1.9.0.min',
			'underscore': 'lib/underscore-min',
			'backbone': 'lib/backbone-min',
			'swig': 'lib/swig.min',

			// Backbone Submodule Directories
			'router': 'app/router',
			'model': 'app/model',
			'collection': 'app/collection',
			'view': 'app/view',
			'template': 'app/template',

			// Helper Modules
			'helpers': 'app/helpers',

			// Application
			'global': 'app/global',

			// 3rd party
			'facebook': '//connect.facebook.net/en_US/all',
			'google-analytics': '//google-analytics.com/ga'
		},

		// Sets the configuration for your third party scripts that are not AMD compatible
		'shim': {

			'underscore': {
				'exports': '_'
			},

			'backbone': {
				'deps': ['underscore', 'jquery'],
				'exports': 'Backbone'
			},

			'facebook': {
				'exports': 'FB'
			},

			'swig': {
				'exports': 'swig'
			}

		}

	});

	// Require global here for optimizer build.
	require(['global']);

}());