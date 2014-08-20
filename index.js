'use strict';

var args = require('yargs').argv;
var storage = require('node-persist');
var path = require('path');
var _ = require('underscore');

/**
 * defaults config object for instances
 * also enumerates and documents options
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
 * Constructor for node-persist instance with a preferences key that handles
 * command-line switches
 * @param {Object} config object like defaults
 */
function Preferences(config) {
  // allow an existing Preferences instance to be reused
  // if (config === preferences)
  // {
  //   return config;
  // }

  _.defaults(config, defaults);
  _.defaults(config.rememberableKeys, defaults.rememberableKeys);

  storage.initSync({
    //need pass this out to get evaled by module consumer maybe
    dir: (typeof __dirname !== 'undefined' ? __dirname : process.cwd()) +
      path.sep + (_.has(config, 'dir') ? config.dir : '.persist')
  });

  /**
   * User preferences map.
   * @type {Object}
   */
  var preferences = storage.getItem('preferences') || {};

  if (_.has(args, 'remember')) {
    Object.keys(config.rememberableKeys).forEach(function (rememberableKey) {
      if (config.rememberableKeys[rememberableKey] &&
          _.has(args, rememberableKey)) {
        preferences[rememberableKey] = args[rememberableKey];
      }
    });
    storage.setItem('preferences', preferences);
  }

  //combine args and preferences with args taking precedence
  _.extend(preferences, args);

  return storage;
}

module.exports = Preferences;
