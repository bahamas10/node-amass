var fs = require('fs');
var path = require('path');

var exec = require('exec');
var package = require('./package.json');

var basedir = '/var/amass'
var dir = path.join(basedir, 'node_modules');
var p = path.join(basedir, 'package.json');
var readme = path.join(basedir, 'README.md');

var commands = {
  add: ['npm', 'install', '-S'],
  list: ['npm', 'ls', '--depth', '0'],
  remove: ['npm', 'remove', '-S']
};

// try to load the plugins
var plugins = [];
try {
  var pluginnames = fs.readdirSync(dir);
  plugins = pluginnames.map(function(name) {
    // return the full path
    return path.join(dir, name);
  });
} catch (e) {}

// exports
module.exports.plugins = plugins;
module.exports.dir = dir;
module.exports.add = _npm_do('add');
module.exports.list = _npm_do('list');
module.exports.remove = _npm_do('remove');

// the entry point, return a function to call
function _npm_do(action) {
  return function(args, cb) {
    if (typeof args === 'function') {
      cb = args;
      args = null;
    }
    _check_exists();
    var cmd = commands[action];
    if (args) cmd = cmd.concat(args);
    exec(cmd, {cwd: basedir}, cb);
  };
}

// check for, and create, the necessary directories/files
// for plugins
function _check_exists() {
  if (!fs.existsSync(p)) {
    try {
      fs.mkdirSync(basedir);
      fs.writeFileSync(readme, '');
    } catch (e) {}
    var data = {
      version: package.version,
      private: true,
      name: package.name
    };
    try {
      fs.writeFileSync(p, JSON.stringify(data));
    } catch (e) {
      console.error(e.message);
      console.error('do you have permissions to do this?');
      process.exit(1);
    }
  }
}
