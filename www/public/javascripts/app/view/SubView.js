/**
 * @module view/SubView
 */

define(function (require) {

	'use strict';

	var $ = require('jquery'),
		_ = require('underscore'),
		Backbone = require('backbone'),
		App = require('global'),
		Swig = require('swig');

	return Backbone.View.extend({

		'events': {
			
			'#createSubmit click': 'addUser'
			
		},

		'initialize': function (options) {
			var view = this;

			_.bindAll(this);

			view.render();

			log('Backbone : Global : SubView : Initialized');
		},

		'render': function () {
			var view = this;
			newUser = new App.Views.Edit({el: $("#newUser")})
			view.exampleTemplate = swig.compile(App.templates.ExampleTemplate);
			view.$el.append(view.exampleTemplate({
				'url': 'https://github.com/cpbtechnology/US-boilerplate-backbonejs'
			}));
		},
		'addUser': function(){
			
			alert('clicked');
		}

	});

});