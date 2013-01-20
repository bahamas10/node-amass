module.exports = amass_process;

var keys = ['execPath', 'features', 'arch', 'versions']

function amass_process(cb) {
  var data = {};

  keys.forEach(function(key) {
    data[key] = process[key];
  });

  cb(null, data);
}
