var fs = require('fs');
var path = require('path');

var exec = require('exec');
var package = require('./package.json');

var basedir = '/var/amass'
var dir = path.join(basedir, 'node_modules');
var p = path.join(basedir, 'package.json');
var readme = path.join(basedir, 'README.md');

module.exports.basedir = dir;
module.exports.dir = dir;

module.exports.add = add;
module.exports.list = list;
module.exports.remove = remove;

function add(args, cb) {
  _check_exists();
  var command = ['npm', 'install', '-S'].concat(args);
  exec(command, {cwd: basedir}, cb);
}
function list(cb) {
  _check_exists();
  var command = ['npm', 'ls', '--depth', '0']
  exec(command, {cwd: basedir}, cb);
}
function remove(args, cb) {
  _check_exists();
  var command = ['npm', 'remove', '-S'].concat(args);
  exec(command, {cwd: basedir}, cb);
}

function _check_exists() {
  if (!fs.existsSync(p)) {
    try {
      fs.mkdirSync(basedir);
      fs.writeFileSync(readme, '');
    } catch (e) {}
    var data = {
      version: package.version,
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
