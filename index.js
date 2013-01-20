/**
 * amass
 *
 * Gather system information and expose it as JSON
 *
 * Author: Dave Eddy <dave@daveeddy.com>
 * Date: 1/20/2013
 * License: MIT
 */

var modules = {
  os: require('./lib/os'),
  process: require('./lib/process')
};

module.exports = amass;

function amass(cb) {
  var data = {};
  var errors = [];

  var keys = Object.keys(modules);
  var len = keys.length;

  // loop the modules, run them, add them to `data`
  var i = 0;
  keys.forEach(function(mod) {
    modules[mod](function(err, d) {
      if (err) return errors.push(err);
      data[mod] = d;
      if (++i === len) done();
    });
  });

  // called when module loading is done
  function done() {
    cb(errors.length ? errors : null, data);
  }
}
