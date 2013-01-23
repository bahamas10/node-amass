#!/usr/bin/env node
/**
 * CLI amass
 *
 * Gather system information and expose it as JSON
 *
 * Author: Dave Eddy <dave@daveeddy.com>
 * Date: 1/20/2013
 * License: MIT
 */

var fs = require('fs');
var path = require('path');

var amass = require('../');
var getopt = require('posix-getopt');

var package = require('../package.json');
var pluginsdir = '/var/amass/node_modules';

/**
 * Usage
 *
 * return the usage message
 */
function usage() {
  return [
    'Usage: amass',
    '',
    'Gather system information and expose it as JSON',
    '',
    '-h, --help        print this message and exit',
    '-u, --updates     check for available updates',
    '-v, --version     print the version number and exit'
  ].join('\n');
}

// command line arguments
var options = [
  'h(help)',
  'u(updates)',
  'v(version)'
].join('');
var parser = new getopt.BasicParser(options, process.argv);
var option;
while ((option = parser.getopt()) !== undefined) {
  switch (option.option) {
    case 'h': console.log(usage()); process.exit(0);
    case 'u': // check for updates
      require('latest').checkupdate(package, function(ret, msg) {
        console.log(msg);
        process.exit(ret);
      });
      return;
    case 'v': console.log(package.version); process.exit(0);
    default: console.error(usage()); process.exit(1); break;
  }
}

// try to load the plugin
var plugins;
try {
  var pluginnames = fs.readdirSync(pluginsdir);
  plugins = pluginnames.map(function(name) {
    return path.join(pluginsdir, name);
  });
} catch (e) {}

// amass!
amass(plugins, function(errors, data) {
  if (errors) errors.forEach(function(err) {
    console.error(err);
  });
  console.log(JSON.stringify(data, null, 2));
});
