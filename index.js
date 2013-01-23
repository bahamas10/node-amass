/**
 * amass
 *
 * Gather system information and expose it as JSON
 *
 * Author: Dave Eddy <dave@daveeddy.com>
 * Date: 1/20/2013
 * License: MIT
 */

var path = require('path');

var package = require('./package.json');
var modules = {
  os: require('./lib/os'),
  process: require('./lib/process')
};

module.exports = amass;

function amass(plugins, cb) {
  if (typeof plugins === 'function') {
    cb = plugins;
    plugins = null;
  }

  var data = {};
  var errors = [];
  data.amass = {
    version: package.version,
    plugins: plugins || []
  };

  // try to load the plugins
  if (plugins) {
    plugins.forEach(function(plugin) {
      modules[path.basename(plugin).replace(/^amass-/, '')] = require(plugin);
    });
  }
  var keys = Object.keys(modules);
  var len = keys.length;

  // loop the modules, run them, add them to `data`
  var i = 0;
  keys.forEach(function(mod) {
    modules[mod](function(err, d) {
      if (err) {
        errors.push(err);
      } else {
        data[mod] = d;
      }
      if (++i === len) done();
    });
  });

  // called when module loading is done
  function done() {
    cb(errors.length ? errors : null, data);
  }
}

