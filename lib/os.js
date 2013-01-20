var os = require('os');
var deprecated = ['getNetworkInterfaces'];

module.exports = amass_os;

function amass_os(cb) {
  var data = {};

  Object.keys(os).forEach(function(key) {
    if (deprecated.indexOf(key) !== -1) return;
    data[key] = typeof os[key] === 'function' ? os[key]() : os[key];
  });

  cb(null, data);
}
