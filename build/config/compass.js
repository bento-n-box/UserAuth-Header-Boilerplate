/**
 * @module Build
 * @submodule Build.Config
 * @class Build.Config.Compass
 * @static
 */

module.exports = function(config) {

	return {

		'app': {},

		'watch': {
			'options': {
				'force': false
			}
		},

		'debug': {
			'options': {
				'debugInfo': true
			}
		},

		'options': {
			'sassDir': config.stylesheets + '/scss',
			'cssDir': config.stylesheets + '/generated',
			'imagesDir': config.images,
			'force': true,
			'noLineComments': true,
			'outputStyle': 'expanded',
			'relativeAssets': true
		}
	};

}