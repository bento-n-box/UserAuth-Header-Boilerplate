/**
 * @module global
 */

define(function (require, exports, module) {

	'use strict';

	var $ = require('jquery'),
		_ = require('underscore'),
		Backbone = require('backbone'),
		Swig = require('swig'),
		Utilities = require('helpers/utilities'),
		App = require('app/index'),
		settings = require('settings');

	_.extend(App, {

		/**
		 * Initialize Application. Responsible for instantiating Backbone router
		 * and starting Backbone history.
		 * @method App.initialize
		 */
		'initialize': function () {

			var exampleView;

			this.config = new App.models.AppConfig(settings);
			this.router = new App.routers.AppRouter();

			Backbone.history.start();

			exampleView = new App.views.ExampleView();

			log('Global : Initialized');

		}
	}, Backbone.Events);

	exports = _.extend(exports, App);

});