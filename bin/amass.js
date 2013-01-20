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

var amass = require('../');

amass(function(errors, data) {
  if (errors) errors.forEach(function(err) {
    console.error(err);
  });
  console.log(JSON.stringify(data, null, 2));
});
