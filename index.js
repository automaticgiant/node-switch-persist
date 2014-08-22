'use strict';

var args = require('yargs').argv;
var storage = require('node-persist');
var path = require('path');
var underscore = require('underscore');

/**
 * Defaults config object for instances.
 * Enumerates and documents options - template for passed in object.
 * @namespace
 * @type {Object}
 */
var defaults = {
  /**
   * String of directory for backing JSONs.
   * @type {String}
   */
  dir: undefined,

  /**
   * Map of rememberable switches, and whether they are rememberable.
   * Name refers to keys in args map.
   * @type {Array}
   */
  rememberableKeys: {
    remember: false
  }
};

/**
 * path logic
 * @private
 * @param  {Object} config passed in config object
 * @return {String}        path to persist preferences
 */
function interpretDir(config){
  if (typeof config.dir !== 'undefined') {
    //./ or .\ doesn't normally get handled intelligently
    if (config.dir.search('.' + path.sep) === 0) {
      return process.cwd() + path.sep + config.dir.substr(2);
    }
    return config.dir;
  } else {
    //sane default
    return process.cwd() + path.sep + '.persist';
  }
}

/**
 * Constructor for node-persist instance with a preferences key that handles
 * command-line switches
 * @param {Object} config object like defaults
 */
function Preferences(config) {
  config = config || {};
  // allow an existing Preferences instance to be reused
  if (config === storage)
  {
    return config;
  }

  underscore.defaults(config, defaults);
  underscore.defaults(config.rememberableKeys, defaults.rememberableKeys);

  storage.initSync({
    dir: interpretDir(config)
  });

  /**
   * User preferences map.
   * @type {Object}
   */
  var preferences = storage.getItem('preferences') || {};

  //remember rememberables
  if (underscore.has(args, 'remember')) {
    Object.keys(config.rememberableKeys).forEach(function (rememberableKey) {
      if (config.rememberableKeys[rememberableKey] &&
          underscore.has(args, rememberableKey)) {
        preferences[rememberableKey] = args[rememberableKey];
      }
    });
    //update persisted data
    storage.setItem('preferences', preferences);
  }

  //combine args and preferences with args taking precedence
  underscore.extend(preferences, args);

  return storage;
}

module.exports = Preferences;
