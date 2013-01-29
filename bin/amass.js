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
    'plugins are installed to `/var/amass/node_modules` and as such, may',
    'require root or super-user privileges to modify',
    '',
    '-a, --add <name>      add the plugin <name> to amass',
    '-h, --help            print this message and exit',
    '-l, --list            list the currently installed plugins',
    '-r, --remove <name>   remove the plugin <name> from amass',
    '-u, --updates         check for available updates',
    '-v, --version         print the version number and exit'
  ].join('\n');
}

// command line arguments
var options = [
  'a(add)',
  'h(help)',
  'l(list)',
  'r(remove)',
  'u(updates)',
  'v(version)'
].join('');
var parser = new getopt.BasicParser(options, process.argv);
var add = false;
var list = false;
var remove = false;
var option;
while ((option = parser.getopt()) !== undefined) {
  switch (option.option) {
    case 'a': add = true; break;
    case 'h': console.log(usage()); process.exit(0);
    case 'l': list = true; break;
    case 'r': remove = true; break;
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
var args = process.argv.slice(parser.optind());

if (add || list || remove) {
  var plugins = require('../plugins');
  // handle add, remove, or list
  function cb(err, out, code) {
    if (out) process.stdout.write(out);
    if (err) process.stderr.write(err);
    process.exit(code);
  }
  if (add) return plugins.add(args, cb);
  if (list) return plugins.list(cb);
  if (remove) return plugins.remove(args, cb);
}

// amass!
amass(function(errors, data) {
  if (errors) errors.forEach(function(err) {
    console.error(err);
  });
  console.log(JSON.stringify(data, null, 2));
});
