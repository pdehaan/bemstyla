/*
 * bemstyla
 * Copyright(c) 2015 Vladimir Rodkin <mail@vovanr.com>
 * MIT Licensed
 */

var _ = require('lodash');
var formatFileName = require('./format-file-name');
var ENV = require('./env');
var TERMS = ENV.TERMS;
var FORMATS = ENV.FORMATS;
var DEFAULT_FORMAT = ENV.DEFAULT_FORMAT;

var formatters = [
	/**
	* CSS
	*
	* @param {String} name
	* @return {String}
	*/
	function (name) {
		return '.' + name + ' {\n}';
	},

	/**
	* Stylus
	*
	* @param {String} name
	* @return {String}
	*/
	function (name) {
		return '.' + name + '\n    {}';
	}
];

/**
 * Format content
 *
 * @param {String} source
 * @param {String} [format='styl']
 * @return {String}
 */
function formatContent(source, format) {
	format = FORMATS[String(format)] === undefined ? FORMATS[DEFAULT_FORMAT] : FORMATS[format];
	var formatter = formatters[format];
	return formatter(source);
}

module.exports = {
	/**
	* File content data
	*
	* @param {String} source
	* @param {String} [format='styl']
	* @return {Object}
	*/
	format: function (source, format) {
		var result = {};
		var fileNames = formatFileName.format(source);

		_.forEach(TERMS, function (term) {
			var content = '';
			var name = fileNames[term].file.name;
			if (name) {
				content = formatContent(name, format);
			}
			result[term] = {
				file: {
					content: content
				}
			};
		});

		return result;
	}
};